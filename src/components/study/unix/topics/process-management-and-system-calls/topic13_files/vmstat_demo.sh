#!/bin/bash
# vmstat_demo.sh – demonstrate vmstat usage and interpretation
echo "=== vmstat: single snapshot (since boot) ==="
vmstat

echo -e "\n=== vmstat every 2 seconds, 5 times (real-time) ==="
vmstat 2 5

echo -e "\n=== vmstat with wide output (easier to read) ==="
vmstat -w 2 3

echo -e "\n=== vmstat disk statistics ==="
vmstat -d | head -20

echo -e "\n=== Summary of memory and event counters ==="
vmstat -s | head -15