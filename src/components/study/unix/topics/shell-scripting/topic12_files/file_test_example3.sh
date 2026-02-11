#!/bin/bash
# Process only non-empty log files
LOG_DIR="/var/log/myapp"

for log_file in "$LOG_DIR"/*.log; do
    if [ -s "$log_file" ]; then
        echo "Processing: $log_file"
        analyze_log "$log_file"
    else
        echo "Skipping empty file: $log_file"
    fi
done