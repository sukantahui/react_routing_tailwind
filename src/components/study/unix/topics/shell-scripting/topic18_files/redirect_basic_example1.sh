#!/bin/bash
# Log file management in Barrackpore server

echo "=== Barrackpore Server Log Management ==="
LOG_DIR="/var/log/barrackpore"
TIMESTAMP=$(date "+%Y%m%d_%H%M%S")

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR"

# 1. Overwrite (>) - Create new log file
echo "Creating new log file with > operator..."
echo "=== Server Startup ===" > "$LOG_DIR/server_$TIMESTAMP.log"
echo "Startup time: $(date)" >> "$LOG_DIR/server_$TIMESTAMP.log"
echo "Hostname: $(hostname)" >> "$LOG_DIR/server_$TIMESTAMP.log"

# 2. Input redirection (<) - Process configuration
echo -e "\nProcessing configuration with < operator..."
if [ -f /etc/barrackpore/config.txt ]; then
    echo "Config contents:"
    # Using < to feed file to cat (equivalent to cat file)
    cat < /etc/barrackpore/config.txt
    
    # Count lines in config
    line_count=$(wc -l < /etc/barrackpore/config.txt)
    echo "Config has $line_count lines"
else
    echo "No config file found, creating default..."
    echo "port=8080" > /etc/barrackpore/config.txt
    echo "timeout=30" >> /etc/barrackpore/config.txt
fi

# 3. Multiple redirections
echo -e "\nTesting multiple redirections..."
{
    echo "=== System Info ==="
    uname -a
    echo -e "\n=== Disk Usage ==="
    df -h /
} > "$LOG_DIR/system_info_$TIMESTAMP.log"

echo "System info saved to: $LOG_DIR/system_info_$TIMESTAMP.log"

# 4. Show log contents
echo -e "\nCurrent log file contents:"
cat "$LOG_DIR/server_$TIMESTAMP.log"