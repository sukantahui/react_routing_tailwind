#!/bin/bash
# Non-interactive script example
# This would be run by cron or from another script

LOG_FILE="/tmp/backup_$(date +%Y%m%d).log"

echo "=== Non-Interactive Backup Script ===" > "$LOG_FILE"
echo "Start time: $(date)" >> "$LOG_FILE"

# No prompt, no user interaction
BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Backup directory created: $BACKUP_DIR" >> "$LOG_FILE"
    
    # Copy important files
    cp -r /etc/nginx/nginx.conf "$BACKUP_DIR/" 2>/dev/null
    cp -r /var/www/html/index.html "$BACKUP_DIR/" 2>/dev/null
    
    echo "Backup completed at: $(date)" >> "$LOG_FILE"
    echo "Files backed up:" >> "$LOG_FILE"
    find "$BACKUP_DIR" -type f >> "$LOG_FILE" 2>/dev/null
else
    echo "ERROR: Could not create backup directory" >> "$LOG_FILE"
    exit 1
fi

# Note: No interactive features available
# - No job control (Ctrl+Z won't work)
# - No command history
# - No line editing
# - PS1 is empty

echo "=== Script completed ===" >> "$LOG_FILE"