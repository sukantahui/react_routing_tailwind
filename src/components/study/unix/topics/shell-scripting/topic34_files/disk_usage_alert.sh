#!/bin/bash
# disk_usage_alert.sh – Check disk usage and send alert if above threshold
# Usage: ./disk_usage_alert.sh [threshold%] [email]
# Example (cron): 0 8 * * * /usr/local/bin/disk_usage_alert.sh 80 admin@example.com

set -euo pipefail
IFS=$'\n\t'

THRESHOLD="${1:-80}"
EMAIL="${2:-root}"

# Temporary file for message
TMPFILE=$(mktemp)
trap 'rm -f "$TMPFILE"' EXIT

# Check each mounted filesystem (skip pseudo, tmpfs)
df -P | awk 'NR>1 && $1 !~ /^(tmpfs|devtmpfs|none)/ {print $5 " " $6}' | while read -r line; do
    usage=$(echo "$line" | awk '{print $1}' | sed 's/%//')
    mount=$(echo "$line" | awk '{print $2}')
    
    if [[ $usage -gt $THRESHOLD ]]; then
        echo "⚠️  ALERT: $mount is ${usage}% full (threshold: ${THRESHOLD}%)" >> "$TMPFILE"
    fi
done

# Send email if any alerts
if [[ -s "$TMPFILE" ]]; then
    {
        echo "Disk Usage Alert on $(hostname) at $(date)"
        echo ""
        cat "$TMPFILE"
    } | mail -s "Disk Space Alert" "$EMAIL"
fi

exit 0