#!/bin/bash
# File backup with exit status checking in Barrackpore

echo "=== Barrackpore Server Backup ==="
BACKUP_DIR="/backups/barrackpore_$(date +%Y%m%d)"

# Create backup directory
mkdir -p "$BACKUP_DIR"
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to create backup directory $BACKUP_DIR"
    exit 1
fi
echo "✓ Backup directory created: $BACKUP_DIR"

# Backup important files
echo "Backing up configuration files..."
cp -r /etc/nginx "$BACKUP_DIR/"
NGINX_EXIT=$?

cp -r /etc/mysql "$BACKUP_DIR/"
MYSQL_EXIT=$?

# Check each copy operation
if [ $NGINX_EXIT -ne 0 ]; then
    echo "WARNING: Failed to backup nginx configuration"
fi

if [ $MYSQL_EXIT -ne 0 ]; then
    echo "WARNING: Failed to backup mysql configuration"
fi

# Create archive
echo "Creating backup archive..."
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
TAR_EXIT=$?

if [ $TAR_EXIT -eq 0 ]; then
    echo "✓ Backup archive created: $BACKUP_DIR.tar.gz"
    
    # Clean up temporary directory
    rm -rf "$BACKUP_DIR"
    echo "✓ Cleaned up temporary files"
    
    # Verify archive
    if tar -tzf "$BACKUP_DIR.tar.gz" > /dev/null 2>&1; then
        echo "✓ Backup verified successfully"
        exit 0
    else
        echo "ERROR: Backup verification failed"
        exit 3
    fi
else
    echo "ERROR: Failed to create backup archive"
    exit 2
fi