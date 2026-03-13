#!/bin/bash
# backup_project.sh – Automated, configurable backup with rotation
# Usage: ./backup_project.sh [-c config] [-v] [-d] [--help]

set -euo pipefail
IFS=$'\n\t'

# ---------- Defaults ----------
CONFIG_FILE="./backup_config.conf"
VERBOSE=0
DRY_RUN=0
LOG_FILE="/var/log/backup_project.log"  # fallback; config may override

# ---------- Functions ----------
log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $*" | tee -a "$LOG_FILE"
}
log_error() {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $*" >&2 | tee -a "$LOG_FILE" >&2
}
die() {
    log_error "$*"
    exit 1
}
usage() {
    cat <<EOF
Usage: $0 [OPTIONS]

Options:
  -c FILE    Configuration file (default: $CONFIG_FILE)
  -v         Verbose output
  -d         Dry run – show what would be done, no actual changes
  --help     Show this help
EOF
    exit 0
}

# ---------- Parse Options ----------
while getopts "c:vd-:" opt; do
    case "$opt" in
        c) CONFIG_FILE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        d) DRY_RUN=1 ;;
        -) case "$OPTARG" in
               help) usage ;;
               *) die "Unknown option --$OPTARG" ;;
           esac ;;
        *) die "Invalid option. Use --help for usage." ;;
    esac
done

# ---------- Load Configuration ----------
if [ ! -f "$CONFIG_FILE" ]; then
    die "Configuration file not found: $CONFIG_FILE"
fi
# shellcheck source=/dev/null
. "$CONFIG_FILE"

# Validate required config variables
: "${SOURCE_DIRS:?Must be set in config}"
: "${BACKUP_DEST:?Must be set in config}"
: "${RETENTION_DAYS:?Must be set in config}"
LOG_FILE="${LOG_FILE:-/var/log/backup_project.log}"

# ---------- Setup Logging ----------
touch "$LOG_FILE" 2>/dev/null || die "Cannot write to log file $LOG_FILE"

# ---------- Trap for Cleanup ----------
cleanup() {
    log_error "Backup interrupted – cleaning up partial backup."
    [ -n "$TEMP_BACKUP" ] && [ -d "$TEMP_BACKUP" ] && rm -rf "$TEMP_BACKUP"
    exit 1
}
trap cleanup INT TERM

# ---------- Verbose Mode ----------
[ "$VERBOSE" -eq 1 ] && set -x

# ---------- Backup Function ----------
perform_backup() {
    local src="$1"
    local dest_base="$2"
    local timestamp
    timestamp=$(date '+%Y-%m-%d_%H%M%S')
    local backup_dir="${dest_base}/${timestamp}"
    local latest_link="${dest_base}/latest"

    if [ "$DRY_RUN" -eq 1 ]; then
        log_info "[DRY RUN] Would create backup of $src at $backup_dir"
        return 0
    fi

    mkdir -p "$backup_dir" || die "Cannot create backup directory $backup_dir"

    # Use rsync with --link-dest if available, otherwise fallback to cp -al
    if command -v rsync >/dev/null 2>&1; then
        log_info "Using rsync for $src"
        rsync -aAX --delete --link-dest="$latest_link" "$src/" "$backup_dir/" || die "rsync failed"
    else
        log_info "rsync not found, using cp -al (hardlink copy)"
        if [ -d "$latest_link" ]; then
            cp -al "$latest_link/." "$backup_dir/" || die "cp -al failed"
        else
            cp -a "$src/" "$backup_dir/" || die "cp -a failed"
        fi
    fi

    # Update 'latest' symlink
    rm -f "$latest_link"
    ln -s "$backup_dir" "$latest_link"

    log_info "Backup completed: $backup_dir"
}

# ---------- Rotation Function ----------
rotate_backups() {
    local dest="$1"
    local days="$2"

    log_info "Rotating backups older than $days days in $dest"

    if [ "$DRY_RUN" -eq 1 ]; then
        find "$dest" -maxdepth 1 -type d -name "????-??-??_*" -mtime "+$days" -print \
            | while read -r d; do
                log_info "[DRY RUN] Would delete: $d"
            done
        return 0
    fi

    find "$dest" -maxdepth 1 -type d -name "????-??-??_*" -mtime "+$days" \
        -exec rm -rf {} \; \
        -exec log_info "Deleted old backup: {}" \;
}

# ---------- Main ----------
log_info "========== Backup started =========="

# Ensure backup destination exists
mkdir -p "$BACKUP_DEST" || die "Cannot create backup destination $BACKUP_DEST"

# Convert SOURCE_DIRS (space-separated list in config) into array
IFS=' ' read -r -a src_dirs <<< "$SOURCE_DIRS"

for src in "${src_dirs[@]}"; do
    if [ ! -d "$src" ]; then
        log_error "Source directory $src does not exist – skipping"
        continue
    fi
    perform_backup "$src" "$BACKUP_DEST"
done

rotate_backups "$BACKUP_DEST" "$RETENTION_DAYS"

log_info "========== Backup finished =========="
exit 0