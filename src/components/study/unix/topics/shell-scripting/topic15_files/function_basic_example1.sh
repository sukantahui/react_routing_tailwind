#!/bin/bash
# Logging utility for Barrackpore server monitoring

# Function definition
log_message() {
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    local level="$1"
    local message="$2"
    
    echo "[$timestamp] [$level] $message" >> /var/log/barrackpore_monitor.log
    
    # Also print to console if in debug mode
    if [[ "${DEBUG:-false}" == "true" ]]; then
        echo "[$timestamp] [$level] $message"
    fi
}

# Function usage examples
echo "Starting Barrackpore server monitoring..."

# Call the function multiple times
log_message "INFO" "Monitoring script started"
log_message "WARNING" "CPU usage above 80%"
log_message "ERROR" "Disk /var is 95% full"
log_message "INFO" "Backup completed successfully"

echo "Check /var/log/barrackpore_monitor.log for details"