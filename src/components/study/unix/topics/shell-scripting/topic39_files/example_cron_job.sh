#!/bin/bash
# example_cron_job.sh – A well‑behaved script for cron scheduling
# This script logs the current timestamp and disk usage to a file.
# Intended to be scheduled via cron.

set -euo pipefail
IFS=$'\n\t'

# ---------- Configuration ----------
LOG_DIR="${HOME}/cron_logs"
LOG_FILE="${LOG_DIR}/cron_job.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# ---------- Logging function ----------
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# ---------- Main ----------
log "=== Cron job started ==="

# Example task: log current disk usage of home directory
du -sh "$HOME" >> "$LOG_FILE" 2>&1

# Example task: count processes
echo "Process count: $(ps -e --no-headers | wc -l)" >> "$LOG_FILE"

log "=== Cron job completed ==="
exit 0