#!/bin/bash
# topic1_files/ps_demo.sh
# Demonstrates various ps options with background processes

echo "=== ps Command Demo ==="
echo "Launching two background sleep processes..."
sleep 300 &
SLEEP1=$!
sleep 400 &
SLEEP2=$!

echo "Background PIDs: $SLEEP1, $SLEEP2"
echo ""

echo "--- ps -ef (full format, all processes) ---"
ps -ef | grep -E "sleep|PID" | grep -v grep

echo ""
echo "--- ps -u $USER (user-oriented) ---"
ps -u $USER -o pid,%cpu,%mem,cmd

echo ""
echo "--- Custom format: ps -eo pid,stat,time,cmd --sort=-time | head -5 ---"
ps -eo pid,stat,time,cmd --sort=-time | head -5

echo ""
echo "Cleaning up..."
kill $SLEEP1 $SLEEP2 2>/dev/null
echo "Demo completed."