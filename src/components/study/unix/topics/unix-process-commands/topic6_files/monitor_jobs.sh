#!/bin/bash
# monitor_jobs.sh - Demonstrates job monitoring with 'jobs' command

echo "=== Job Monitoring Demo ==="
echo "Starting 3 background tasks..."
sleep 100 &
SLEEP_PID=$!
sleep 200 &
sleep 150 &

echo "All tasks started. Use 'jobs -l' to see them."
echo "Current jobs:"
jobs -l

echo -e "\nWaiting 2 seconds then killing job %1..."
sleep 2
kill %1 2>/dev/null
echo "After kill:"
jobs -l

echo -e "\nBringing job %2 to foreground (will be stopped with Ctrl+Z later)..."
echo "Hint: Press Ctrl+Z after 2 seconds"
sleep 2
fg %2 2>/dev/null

echo -e "\nDemo complete. Remaining jobs:"
jobs -l