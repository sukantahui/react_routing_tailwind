#!/bin/bash
# date_scripting.sh - Using date in scripts

LOG_FILE="app_$(date +%Y%m%d).log"
echo "[$(date +"%Y-%m-%d %H:%M:%S")] Script started" >> "$LOG_FILE"

BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S).tar.gz"
echo "Creating backup: $BACKUP_NAME"
# tar -czf "$BACKUP_NAME" /home/user/data 2>/dev/null

# Check if today is weekend
if [[ $(date +%u) -gt 5 ]]; then
    echo "Weekend: running light tasks only" >> "$LOG_FILE"
else
    echo "Weekday: full processing" >> "$LOG_FILE"
fi

# Record end time
echo "[$(date +"%Y-%m-%d %H:%M:%S")] Script finished" >> "$LOG_FILE"