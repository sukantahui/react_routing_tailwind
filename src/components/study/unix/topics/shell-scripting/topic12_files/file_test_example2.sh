#!/bin/bash
# Safely create backup directory
BACKUP_DIR="/var/backups/$(date +%Y%m%d)"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Creating backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
else
    echo "Backup directory already exists: $BACKUP_DIR"
fi

# Now safe to use the directory
cp -r /data/* "$BACKUP_DIR/"