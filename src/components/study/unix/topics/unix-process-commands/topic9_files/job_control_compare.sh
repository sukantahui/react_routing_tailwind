#!/bin/bash
# job_control_compare.sh - Interactive tool to compare fg and bg behavior

echo "=== Job Control Comparison ==="

echo "1. Starting a foreground process (sleep 5). You cannot type until it finishes."
sleep 5
echo "Foreground done - shell back."

echo -e "\n2. Starting same process in background:"
sleep 5 &
echo "Background started. You can type right now:"
read -t 2 -p "Type anything within 2 seconds to prove shell is free: " answer
echo "You typed: ${answer:-nothing}"

echo -e "\n3. Suspending a foreground job:"
sleep 10 &
sleep_pid=$!
echo "Starting sleep 10 in background, then fg it."
fg %1 2>/dev/null       # Now in foreground, press Ctrl+Z
echo "Suspended. Now resume in background:"
bg %1 2>/dev/null
jobs -l

echo "Cleaning up..."
kill %1 2>/dev/null
echo "Done."