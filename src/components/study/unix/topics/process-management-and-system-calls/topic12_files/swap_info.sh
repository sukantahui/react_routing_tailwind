#!/bin/bash
# swap_info.sh – display swap space information
echo "=== Swap usage summary ==="
free -h

echo -e "\n=== Swap devices/files ==="
swapon --show

echo -e "\n=== Detailed swap from /proc/swaps ==="
cat /proc/swaps

echo -e "\n=== Swappiness value ==="
sysctl vm.swappiness

echo -e "\n=== Top 10 processes by swap usage ==="
for file in /proc/*/status; do
    pid=$(grep -E '^Pid:' "$file" 2>/dev/null | awk '{print $2}')
    swap=$(grep -E '^VmSwap:' "$file" 2>/dev/null | awk '{print $2}')
    if [ -n "$swap" ] && [ "$swap" != "0" ]; then
        comm=$(grep -E '^Name:' "$file" 2>/dev/null | awk '{print $2}')
        echo "$pid $comm $swap"
    fi
done | sort -k3 -n -r | head -10 | column -t