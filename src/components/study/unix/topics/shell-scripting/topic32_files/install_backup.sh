#!/bin/sh
# install_backup.sh – Deploy backup_project.sh, config, and set up cron

set -e

BACKUP_SCRIPT="backup_project.sh"
CONFIG_FILE="backup_config.conf"
INSTALL_DIR="/usr/local/bin"
CONFIG_DIR="/etc"
CRON_SCHEDULE="30 2 * * *"   # 2:30 AM daily

# Ensure we are root (or use sudo)
if [ "$(id -u)" -ne 0 ]; then
    echo "Please run as root (use sudo)." >&2
    exit 1
fi

# 1. Copy script
echo "📄 Installing $BACKUP_SCRIPT to $INSTALL_DIR"
cp "$BACKUP_SCRIPT" "$INSTALL_DIR/"
chmod 755 "$INSTALL_DIR/$BACKUP_SCRIPT"

# 2. Copy config
echo "⚙️ Installing $CONFIG_FILE to $CONFIG_DIR"
cp "$CONFIG_FILE" "$CONFIG_DIR/"
chmod 644 "$CONFIG_DIR/$CONFIG_FILE"
# Secure config – readable only by root (optional)
chmod 600 "$CONFIG_DIR/$CONFIG_FILE"

# 3. Create backup destination
BACKUP_DEST=$(grep ^BACKUP_DEST "$CONFIG_DIR/$CONFIG_FILE" | cut -d= -f2 | tr -d '"' | tr -d ' ')
mkdir -p "$BACKUP_DEST"
chmod 755 "$BACKUP_DEST"

# 4. Set up cron job
TEMP_CRON=$(mktemp)
crontab -l > "$TEMP_CRON" 2>/dev/null || true

if grep -q "$BACKUP_SCRIPT" "$TEMP_CRON"; then
    echo "⚠️ Cron job already exists. Skipping."
else
    echo "$CRON_SCHEDULE $INSTALL_DIR/$BACKUP_SCRIPT -c $CONFIG_DIR/$CONFIG_FILE -v >> /var/log/backup_cron.log 2>&1" >> "$TEMP_CRON"
    crontab "$TEMP_CRON"
    echo "✅ Cron job added."
fi
rm "$TEMP_CRON"

echo "🎉 Backup system installed. Test with: $INSTALL_DIR/$BACKUP_SCRIPT -c $CONFIG_DIR/$CONFIG_FILE -d"