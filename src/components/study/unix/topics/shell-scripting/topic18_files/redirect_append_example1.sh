#!/bin/bash
# Application logging in Shyamnagar monitoring

echo "=== Shyamnagar Application Logging ==="
APP_LOG="/var/log/shyamnagar/app.log"
AUDIT_LOG="/var/log/shyamnagar/audit.log"

# Ensure log directory exists
mkdir -p "/var/log/shyamnagar"

# Function to log messages
log_message() {
    local level="$1"
    local message="$2"
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    
    # Append to main log
    echo "[$timestamp] [$level] $message" >> "$APP_LOG"
    
    # Also log to audit if level is ERROR or CRITICAL
    if [[ "$level" =~ ^(ERROR|CRITICAL)$ ]]; then
        echo "[$timestamp] [AUDIT] $level: $message" >> "$AUDIT_LOG"
    fi
}

# Simulate application events
echo "Starting application logging simulation..."

# Initial log entry (would overwrite if using >)
log_message "INFO" "Application started in Shyamnagar"
log_message "INFO" "Loading configuration from /etc/shyamnagar"
log_message "WARN" "Configuration file missing defaults, using fallback"
log_message "INFO" "Database connection established"
log_message "ERROR" "Failed to connect to backup server"
log_message "INFO" "Starting scheduled tasks"
log_message "CRITICAL" "Disk usage above 90% on /var"

# Show log contents
echo -e "\nApplication log contents (last 5 entries):"
tail -5 "$APP_LOG"

echo -e "\nAudit log contents:"
cat "$AUDIT_LOG"

# Demonstrate append vs overwrite
echo -e "\n=== Append Demonstration ==="
echo "Using >> (append):"
echo "Entry 1" > test.log
echo "Entry 2" >> test.log
echo "Entry 3" >> test.log
echo "test.log contains:"
cat test.log

echo -e "\nUsing > (overwrite):"
echo "New Entry" > test.log
echo "test.log now contains:"
cat test.log

# Cleanup
rm -f test.log