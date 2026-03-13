#!/bin/bash
# Error logging for Ichapur backup system

echo "=== Ichapur Backup System ==="
BACKUP_DIR="/backups/ichapur"
LOG_FILE="/var/log/ichapur_backup.log"
ERROR_LOG="/var/log/ichapur_errors.log"

# Create directories
mkdir -p "$BACKUP_DIR"
mkdir -p "/var/log"

# Clear previous logs
> "$LOG_FILE"
> "$ERROR_LOG"

echo "Starting backup process..."
echo "Backup started at $(date)" >> "$LOG_FILE"

# 1. Redirect stderr to error log, stdout to main log
echo "Backing up configuration files..." >> "$LOG_FILE"
cp -r /etc/nginx "$BACKUP_DIR/" 2>> "$ERROR_LOG"
cp -r /etc/mysql "$BACKUP_DIR/" 2>> "$ERROR_LOG"

# 2. Redirect both stdout and stderr
echo "Creating archive..." >> "$LOG_FILE"
tar -czf "$BACKUP_DIR/backup_$(date +%Y%m%d).tar.gz" "$BACKUP_DIR" &>> "$LOG_FILE"

# 3. Discard stderr completely
echo "Cleaning old backups..." >> "$LOG_FILE"
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete 2>/dev/null

# 4. Separate stdout and stderr to different files
echo "Verifying backup..." >> "$LOG_FILE"
{
    echo "=== Backup Verification ==="
    tar -tzf "$BACKUP_DIR/backup_$(date +%Y%m%d).tar.gz" | head -10
    echo "Verification completed"
} >> "$LOG_FILE" 2>> "$ERROR_LOG"

# 5. Show logs
echo -e "\n=== Main Log (last 10 lines) ==="
tail -10 "$LOG_FILE"

echo -e "\n=== Error Log ==="
if [ -s "$ERROR_LOG" ]; then
    echo "Errors found:"
    cat "$ERROR_LOG"
else
    echo "No errors encountered"
fi

# 6. Demonstrate stderr redirection
echo -e "\n=== stderr Redirection Demo ==="
echo "Testing error output:"
ls /nonexistent_directory 2>/dev/null || echo "Error redirected to /dev/null"
ls /nonexistent_directory 2>> test_errors.log && echo "This won't execute"
echo "Error log contents:"
cat test_errors.log 2>/dev/null || echo "No error log created"

# Cleanup
rm -f test_errors.log