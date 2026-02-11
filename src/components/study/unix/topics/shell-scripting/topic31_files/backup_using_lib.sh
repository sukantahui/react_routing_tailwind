#!/bin/sh
# backup_using_lib.sh – Demonstrates sourcing the logging library
# Usage: ./backup_using_lib.sh <source_dir> <dest_dir>

# Locate library relative to script
SCRIPT_DIR="$(dirname "$0")"
. "$SCRIPT_DIR/logging_lib.sh"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_dir> <dest_dir>" >&2
    exit 1
fi

SRC="$1"
DST="$2"

log_info "Starting backup from $SRC to $DST"
[ ! -d "$SRC" ] && die "Source directory $SRC does not exist."

mkdir -p "$DST" || die "Cannot create destination directory."

cp -r "$SRC"/* "$DST" 2>/dev/null
if [ $? -eq 0 ]; then
    log_info "Backup completed successfully."
else
    log_error "Backup finished with warnings (some files may not have copied)."
fi