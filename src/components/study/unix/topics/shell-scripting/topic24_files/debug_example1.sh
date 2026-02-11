#!/bin/bash
# debug_example1.sh - Basic set -x demonstration
# Shows how set -x prints each command before execution

echo "Starting backup process..."

# Enable debug mode
set -x

USER="abhronila"
echo "Backing up files for user: $USER"

BACKUP_DIR="/home/$USER/backups"
echo "Backup completed at: $(date)"

# Turn off debug mode
set +x

echo "Backup process finished."