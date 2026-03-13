#!/bin/bash
# backup_utility.sh – Automated backup using tar archives
# Usage: ./backup_utility.sh [-c config] [-d] [-v] [-h]

set -euo pipefail
IFS=$'\n\t'

# ---------- Defaults ----------
CONFIG_FILE="./backup_utility.conf"
DRY_RUN=0
VERBOSE=0
LOG_FILE="/var/log/backup_utility.log"

# ---------- Functions ----------
die() {
    echo "ERROR: $*" >&2
    exit 1
}

usage() {
    cat <<EOF
Usage: $0 [OPTIONS]

Options:
  -c FILE   Configuration file (default: $CONFIG_FILE)
  -d        Dry run – show what would be done, no changes
  -v        Verbose output
  -h        Show this help
EOF
    exit 0
}

log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $*" | tee -a "$LOG_FILE"
}

log_error() {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $*" >&2 | tee -a "$LOG_FILE" >&2
}

# ---------- Parse Options ----------
while getopts "c:dvh" opt; do
    case "$opt" in
        c) CONFIG_FILE="$OPTARG" ;;
        d) DRY_RUN=1 ;;
        v) VERBOSE=1 ;;
        h) usage ;;
        *) die "Invalid option. Use -h for help." ;;
    esac
done

# ---------- Load Configuration ----------
if [[ ! -f "$CONFIG_FILE" ]]; then
    die "Configuration file not found: $CONFIG_FILE"
fi
# shellcheck source=/dev/null
. "$CONFIG_FILE"

# Set defaults if not defined in config
BACKUP_SOURCES="${BACKUP_SOURCES:-/home}"
BACKUP_DEST="${BACKUP_DEST:-/backup}"
BACKUP_COMPRESS="${BACKUP_COMPRESS:-gz}"
RETENTION_COUNT="${RETENTION_COUNT:-7}"
LOG_FILE="${LOG_FILE:-/var/log/backup_utility.log}"

# Validate required settings
[[ -z "$BACKUP_SOURCES" ]] && die "BACKUP_SOURCES not set"
[[ -z "$BACKUP_DEST" ]] && die "BACKUP_DEST not set"
[[ "$BACKUP_COMPRESS" =~ ^(gz|bz2|xz)$ ]] || die "BACKUP_COMPRESS must be gz, bz2, or xz"
[[ "$RETENTION_COUNT" -gt 0 ]] || die "RETENTION_COUNT must be positive"

# Create destination directory if missing
if [[ $DRY_RUN -eq 0 ]]; then
    mkdir -p "$BACKUP_DEST" || die "Cannot create $BACKUP_DEST"
fi

# ---------- Timestamp ----------
TIMESTAMP=$(date '+%Y-%m-%d_%H%M%S')
ARCHIVE_NAME="backup-${TIMESTAMP}.tar.${BACKUP_COMPRESS}"
ARCHIVE_PATH="${BACKUP_DEST}/${ARCHIVE_NAME}"

# ---------- Dry Run / Verbose ----------
[[ $VERBOSE -eq 1 ]] && set -x
[[ $DRY_RUN -eq 1 ]] && log_info "DRY RUN – no files will be changed"

# ---------- Perform Backup ----------
log_info "Starting backup of: $BACKUP_SOURCES"
log_info "Archive: $ARCHIVE_PATH"

# Construct tar options
tar_opt="c"
case "$BACKUP_COMPRESS" in
    gz)  tar_opt="czf" ;;
    bz2) tar_opt="cjf" ;;
    xz)  tar_opt="cJf" ;;
esac

if [[ $DRY_RUN -eq 1 ]]; then
    log_info "[DRY RUN] tar -$tar_opt '$ARCHIVE_PATH' $BACKUP_SOURCES"
else
    # Use -C / to make paths relative (strip leading slash)
    # shellcheck disable=SC2086
    tar -$tar_opt "$ARCHIVE_PATH" $BACKUP_SOURCES || die "tar failed"
    log_info "Backup completed. Size: $(du -h "$ARCHIVE_PATH" | cut -f1)"
fi

# ---------- Rotation – keep only last N backups ----------
if [[ $DRY_RUN -eq 0 ]]; then
    log_info "Rotating backups in $BACKUP_DEST (keeping last $RETENTION_COUNT)"
    
    # List backup files sorted by time (oldest first), exclude current one
    mapfile -t old_backups < <(
        find "$BACKUP_DEST" -maxdepth 1 -type f -name "backup-*.tar.*" \
            ! -name "$ARCHIVE_NAME" -printf '%T@ %p\n' | sort -n | cut -d' ' -f2-
    )
    
    # How many to delete
    count=${#old_backups[@]}
    delete_count=$((count - RETENTION_COUNT))
    
    if [[ $delete_count -gt 0 ]]; then
        for ((i=0; i<delete_count; i++)); do
            rm -f "${old_backups[$i]}" && log_info "Deleted old backup: ${old_backups[$i]}"
        done
    else
        log_info "No backups to delete"
    fi
else
    log_info "[DRY RUN] Would rotate backups (keep $RETENTION_COUNT)"
fi

log_info "Backup finished successfully"
exit 0