#!/bin/bash
# manual_rotation.sh – rotate a single log file when it exceeds 10M

LOG="$1"
MAX_SIZE=$((10*1024*1024))  # 10 MB

if [ -f "$LOG" ] && [ $(stat -c%s "$LOG") -gt $MAX_SIZE ]; then
    mv "$LOG" "$LOG.$(date +%Y%m%d-%H%M%S)"
    gzip "$LOG".* 2>/dev/null &
    touch "$LOG"
    echo "Rotated $LOG"
fi