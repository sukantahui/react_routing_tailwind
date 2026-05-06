#!/bin/bash
# who_scripting.sh - Using who in scripts

echo "=== Scripting with who ==="

# Count logged-in users
user_count=$(who | wc -l)
echo "Currently logged-in users: $user_count"

# List only usernames
echo "Usernames: $(who | awk '{print $1}' | sort -u | tr '\n' ' ')"

# Check if a specific user is online
target_user="swadeep"
if who | grep -q "^$target_user "; then
    echo "$target_user is currently logged in."
else
    echo "$target_user is not logged in."
fi

# Get users logged in from remote IPs (not local)
echo "Remote logins (IP addresses):"
who | grep -E '\([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\)' | awk '{print $1, $5}'

# Send alert if root is logged in from remote
if who | grep -q "^root.*\([0-9]"; then
    echo "WARNING: root logged in remotely!" | mail -s "Security Alert" admin@example.com
    echo "Alert triggered."
else
    echo "No remote root login detected."
fi