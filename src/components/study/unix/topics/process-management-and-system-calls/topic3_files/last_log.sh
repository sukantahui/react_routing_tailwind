#!/bin/bash
# last_log.sh – examine login history
echo "=== Last 10 successful logins ==="
last -10

echo -e "\n=== Last 10 failed login attempts (requires root) ==="
sudo lastb -10 2>/dev/null || echo "No failed attempts logged or permission denied."

echo -e "\n=== Last login time for current user ==="
lastlog -u $USER

echo -e "\n=== Users who have never logged in ==="
lastlog -b 30 -t 1000