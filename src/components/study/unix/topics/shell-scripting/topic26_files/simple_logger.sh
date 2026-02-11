#!/bin/bash
# simple_logger.sh – basic timestamped logging
LOG_FILE="/var/log/myapp/script.log"

log() {
    local msg="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $msg" >> "$LOG_FILE"
}

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

log "Script started"
# ... do work ...
log "Script finished"