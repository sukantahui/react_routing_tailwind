#!/bin/bash
# top_demo.sh – demonstrate top usage and interactive commands
echo "=== top: basic information ==="
top -b -n 1 | head -15

echo -e "\n=== top: custom fields (only PID, USER, %CPU, %MEM, COMMAND) ==="
# Using batch mode and awk to simulate (top itself doesn't have field selection in batch easily)
top -b -n 1 | awk 'NR>7 {print $1, $2, $9, $10, $12}' | head -10

echo -e "\n=== top: monitor specific PIDs (current shell and init) ==="
top -b -n 1 -p $$,1 | grep -E "PID|^ *[0-9]"

echo -e "\n=== top: load average history ==="
top -b -n 1 | grep 'load average'

echo -e "\n=== To see interactive top, run: top ==="
echo "Then try keys: P, M, k, u, q, c, V, H, W"