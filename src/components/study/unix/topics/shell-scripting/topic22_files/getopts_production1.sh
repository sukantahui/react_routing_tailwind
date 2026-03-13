#!/bin/bash
# Production-ready backup script with comprehensive option handling
# Used by Abhronila for Barrackpore College backups

set -euo pipefail

# Default configuration
BACKUP_DIR="/backups/college"
COMPRESSION_LEVEL=6
RETENTION_DAYS=30
DRY_RUN=0
QUIET=0
LOG_FILE="/var/log/backup.log"
DEPARTMENT="all"

# Logging function
log() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    if [ $QUIET -eq 0 ]; then
        echo "[$timestamp] [$level] $message"
    fi
    
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
}

# Display usage
usage() {
    cat << EOF
Usage: $0 [OPTIONS] [SOURCE_DIRS...]

Backup script for Barrackpore College data.

OPTIONS:
  -d, --department NAME   Department to backup (default: all)
  -o, --output DIR        Backup directory (default: $BACKUP_DIR)
  -c, --compress LEVEL    Compression level 0-9 (default: $COMPRESSION_LEVEL)
  -r, --retention DAYS    Keep backups for N days (default: $RETENTION_DAYS)
  -l, --log FILE          Log file (default: $LOG_FILE)
  -q, --quiet             Suppress console output
  -n, --dry-run           Show what would be done without doing it
  -h, --help              Show this help message

EXAMPLES:
  $0 -d physics -c 9 /home/physics/data
  $0 --department "computer science" --retention 60 /var/www
  $0 -q -o /mnt/backup /home /etc

SOURCE_DIRS:
  One or more directories to backup. If not specified, defaults to
  department-specific directories.
EOF
    exit 0
}

# Parse long options as arguments
for arg in "$@"; do
    shift
    case "$arg" in
        "--help")      set -- "$@" "-h" ;;
        "--department") set -- "$@" "-d" ;;
        "--output")    set -- "$@" "-o" ;;
        "--compress")  set -- "$@" "-c" ;;
        "--retention") set -- "$@" "-r" ;;
        "--log")       set -- "$@" "-l" ;;
        "--quiet")     set -- "$@" "-q" ;;
        "--dry-run")   set -- "$@" "-n" ;;
        *)             set -- "$@" "$arg" ;;
    esac
done

# Parse options with getopts
while getopts ":d:o:c:r:l:qnh" opt; do
    case $opt in
        d)
            DEPARTMENT="$OPTARG"
            ;;
        o)
            BACKUP_DIR="$OPTARG"
            ;;
        c)
            if [[ ! "$OPTARG" =~ ^[0-9]$ ]] || [ "$OPTARG" -gt 9 ]; then
                echo "Error: Compression level must be 0-9" >&2
                exit 1
            fi
            COMPRESSION_LEVEL="$OPTARG"
            ;;
        r)
            if [[ ! "$OPTARG" =~ ^[0-9]+$ ]] || [ "$OPTARG" -lt 1 ]; then
                echo "Error: Retention days must be positive integer" >&2
                exit 1
            fi
            RETENTION_DAYS="$OPTARG"
            ;;
        l)
            LOG_FILE="$OPTARG"
            ;;
        q)
            QUIET=1
            ;;
        n)
            DRY_RUN=1
            log "INFO" "DRY RUN MODE ENABLED - No changes will be made"
            ;;
        h)
            usage
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            usage
            ;;
        :)
            echo "Option -$OPTARG requires an argument." >&2
            usage
            ;;
    esac
done

shift $((OPTIND - 1))

# Get source directories
if [ $# -eq 0 ]; then
    # Default directories based on department
    case "$DEPARTMENT" in
        physics)    SOURCE_DIRS=("/home/physics" "/var/physics_data") ;;
        maths)      SOURCE_DIRS=("/home/maths" "/opt/maths_app") ;;
        cs|"computer science")
                    SOURCE_DIRS=("/home/cs" "/var/www" "/opt/labs") ;;
        all)        SOURCE_DIRS=("/home" "/etc" "/var/www") ;;
        *)
            echo "Error: Unknown department: $DEPARTMENT" >&2
            echo "Available: physics, maths, cs, all" >&2
            exit 1
            ;;
    esac
else
    SOURCE_DIRS=("$@")
fi

# Validate
for dir in "${SOURCE_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "Error: Source directory not found: $dir" >&2
        exit 1
    fi
done

if [ ! -d "$BACKUP_DIR" ] && [ $DRY_RUN -eq 0 ]; then
    mkdir -p "$BACKUP_DIR"
    log "INFO" "Created backup directory: $BACKUP_DIR"
fi

# Create log directory if needed
LOG_DIR=$(dirname "$LOG_FILE")
if [ ! -d "$LOG_DIR" ] && [ $DRY_RUN -eq 0 ]; then
    mkdir -p "$LOG_DIR"
fi

# Main backup logic
log "INFO" "Starting backup for department: $DEPARTMENT"
log "INFO" "Source directories: ${SOURCE_DIRS[*]}"
log "INFO" "Backup directory: $BACKUP_DIR"
log "INFO" "Compression level: $COMPRESSION_LEVEL"

TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
BACKUP_NAME="${DEPARTMENT}_backup_${TIMESTAMP}.tar.gz"

if [ $DRY_RUN -eq 1 ]; then
    log "INFO" "Would create: $BACKUP_DIR/$BACKUP_NAME"
    log "INFO" "Would compress with level: $COMPRESSION_LEVEL"
    log "INFO" "Would clean backups older than $RETENTION_DAYS days"
else
    # Actual backup
    tar czf "$BACKUP_DIR/$BACKUP_NAME" \
        --exclude="*.tmp" \
        --exclude="*.log" \
        --exclude="cache/*" \
        -C / \
        "${SOURCE_DIRS[@]}" 2>&1 | while read line; do
        log "DEBUG" "tar: $line"
    done
    
    # Verify backup
    if [ -f "$BACKUP_DIR/$BACKUP_NAME" ]; then
        SIZE=$(du -h "$BACKUP_DIR/$BACKUP_NAME" | cut -f1)
        log "INFO" "Backup created: $BACKUP_NAME ($SIZE)"
    else
        log "ERROR" "Backup failed to create"
        exit 1
    fi
    
    # Clean old backups
    find "$BACKUP_DIR" -name "${DEPARTMENT}_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
fi

log "INFO" "Backup process completed"