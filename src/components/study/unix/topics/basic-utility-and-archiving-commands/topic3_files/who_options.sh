#!/bin/bash
# who_options.sh - Explore different options of who

echo "=== Exploring who options ==="

echo "1. Default output:"
who

echo -e "\n2. Including idle time and PID (-u):"
who -u

echo -e "\n3. Short format (-s, same as default on many systems):"
who -s

echo -e "\n4. Show only names and line (-l, listing terminals):"
who -l

echo -e "\n5. Show dead processes (-d):"
who -d

echo -e "\n6. Historical logins (read from wtmp):"
if [ -f /var/log/wtmp ]; then
    who /var/log/wtmp | head -5
else
    echo "wtmp file not accessible"
fi

echo -e "\n7. Messaging status (-T): shows '+' if terminal writeable, '-' if not:"
who -T