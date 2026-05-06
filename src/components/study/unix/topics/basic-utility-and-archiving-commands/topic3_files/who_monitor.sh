#!/bin/bash
# who_monitor.sh - Monitor user logins and send alerts

LOG_FILE="/var/log/user_monitor.log"
ALERT_EMAIL="admin@example.com"

echo "=== User Monitoring Script ==="

# Function to log event
log_event() {
    echo "$(date): $1" >> "$LOG_FILE"
}

# Get current user list
current_users=$(who | awk '{print $1}' | sort -u)

# Compare with previous list (if exists)
if [ -f /tmp/last_users.txt ]; then
    previous_users=$(cat /tmp/last_users.txt)
    new_users=$(comm -23 <(echo "$current_users") <(echo "$previous_users"))
    logout_users=$(comm -13 <(echo "$current_users") <(echo "$previous_users"))
    
    if [ -n "$new_users" ]; then
        log_event "New login(s): $new_users"
        echo "New login(s): $new_users" | mail -s "Login Alert" "$ALERT_EMAIL"
    fi
    
    if [ -n "$logout_users" ]; then
        log_event "Logout(s): $logout_users"
    fi
else
    log_event "First run - recorded current users: $current_users"
fi

# Save current list for next run
echo "$current_users" > /tmp/last_users.txt

# Also show idle time warning if any user idle > 1 hour
who -u | awk '$5 ~ /[0-9]+:[0-9]+/ {split($5, t, ":"); if(t[1]>=1) print "Idle user: " $1 " for " $5}' | while read msg; do
    log_event "$msg"
    echo "$msg" | mail -s "Idle User Alert" "$ALERT_EMAIL"
done

echo "Monitoring completed. See $LOG_FILE"