#!/bin/bash
# Command grouping for I/O redirection in Ichapur logs

echo "=== Ichapur Server Monitoring ==="
LOG_FILE="/tmp/ichapur_monitor_$(date +%Y%m%d).log"

# Group commands to redirect all output to log file
{
    echo "Starting monitoring at $(date)"
    echo "=== System Information ==="
    uname -a
    echo -e "\n=== Disk Usage ==="
    df -h
    echo -e "\n=== Memory Usage ==="
    free -h
    echo -e "\n=== Top Processes ==="
    ps aux --sort=-%cpu | head -10
    echo "Monitoring completed at $(date)"
} > "$LOG_FILE"

echo "All monitoring output saved to: $LOG_FILE"
echo "Log file size: $(wc -l < "$LOG_FILE") lines"

# Another example: Group with error redirection
echo -e "\n=== Testing Command Grouping ==="
{
    echo "Starting test commands..."
    ls /tmp
    ls /nonexistent  # This will fail
    echo "More commands..."
} 2>&1 | tee /tmp/test_output.log

echo -e "\nCheck /tmp/test_output.log for combined stdout/stderr"