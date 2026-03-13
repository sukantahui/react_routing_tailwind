#!/bin/bash
# daily_backup.sh – full backup of /home/students
BACKUP_DIR="/backup/student_data"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup-$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_FILE" /home/students

# Keep only last 7 backups
find "$BACKUP_DIR" -name "backup-*.tar.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE"