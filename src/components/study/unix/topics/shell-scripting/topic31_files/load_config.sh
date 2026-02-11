#!/bin/sh
# load_config.sh – Load configuration from a file and validate
# Usage: ./load_config.sh [config-file]

CONFIG_FILE="${1:-./config_example.conf}"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Config file not found: $CONFIG_FILE" >&2
    exit 1
fi

# Source the config file
. "$CONFIG_FILE"

# Validate required variables
[ -z "$BACKUP_DIR" ] && { echo "BACKUP_DIR not set"; exit 1; }
[ -z "$RETENTION_DAYS" ] && { echo "RETENTION_DAYS not set"; exit 1; }

# Use defaults if not set
LOG_LEVEL="${LOG_LEVEL:-info}"
VERBOSE="${VERBOSE:-0}"

echo "Configuration loaded successfully:"
echo "  BACKUP_DIR = $BACKUP_DIR"
echo "  LOG_LEVEL  = $LOG_LEVEL"
echo "  RETENTION_DAYS = $RETENTION_DAYS"
echo "  VERBOSE    = $VERBOSE"