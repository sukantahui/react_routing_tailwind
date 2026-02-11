#!/bin/bash
# Read server list and check status (Ichapur data center)
SERVER_LIST="/etc/ichapur_servers.txt"
LOG_FILE="/var/log/server_health.log"

echo "Starting server health check for Ichapur data center..."
timestamp=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$timestamp] Health check started" >> "$LOG_FILE"

# Read servers line by line
while IFS= read -r server || [ -n "$server" ]; do
    # Skip empty lines and comments
    [[ -z "$server" || "$server" =~ ^# ]] && continue
    
    echo "Checking $server..."
    
    if ping -c 2 -W 1 "$server" > /dev/null 2>&1; then
        status="UP"
        echo "  ✓ $server is responding"
    else
        status="DOWN"
        echo "  ✗ $server is not responding"
    fi
    
    # Log result
    echo "[$timestamp] $server: $status" >> "$LOG_FILE"
    
    # Small delay to avoid overwhelming network
    sleep 0.5
    
done < "$SERVER_LIST"

echo "Health check complete. Results logged to $LOG_FILE"