#!/bin/bash
# cron_logging.sh – demonstrates proper redirection for cron

LOG_DIR="/var/log/myapp"
LOG_FILE="$LOG_DIR/process_data.log"

mkdir -p "$LOG_DIR"

{
    echo "===== Job started at $(date) ====="
    /usr/bin/php /home/projects/import.php
    echo "===== Job finished at $(date) ====="
} >> "$LOG_FILE" 2>&1

# Optional: send email only on error
if [ $? -ne 0 ]; then
    echo "Cron job failed – check $LOG_FILE" | mail -s "Cron Failure" admin@example.com
fi