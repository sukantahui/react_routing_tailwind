#!/bin/bash
# who_command.sh – show currently logged-in users and login origins
echo "=== Currently logged-in users ==="
who

echo -e "\n=== With process information ==="
who -u

echo -e "\n=== Login names and terminal types ==="
who -m

echo -e "\n=== System uptime and logged-in users count ==="
w