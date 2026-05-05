#!/bin/bash
# cal_scripting.sh - Using cal in real scripts
# Examples: count days until end of month, generate monthly reports

echo "=== Scripting with cal ==="

# Get current month's last day (by parsing Julian output)
# This is a robust way: use cal -j and take last number
last_day=$(cal -j | awk 'NF {last=$NF} END {print last}')
echo "📅 Today is day number $(date +%j) of the year."
echo "📆 Last day of this month (Julian): $last_day"

days_left=$((last_day - $(date +%j)))
echo "⏳ Days left in this month: $days_left"

# Create a backup filename with month-year
backup_file="backup_$(date +%b_%Y).tar.gz"
echo "🗄️ Suggested backup filename: $backup_file"

# Example: Send a calendar report via email (commented for safety)
# cal -3 | mail -s "Monthly Calendar" admin@example.com

echo "✅ Great for scheduled cron jobs."