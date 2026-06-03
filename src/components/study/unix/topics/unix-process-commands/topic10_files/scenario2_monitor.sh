#!/bin/bash
# scenario2_monitor.sh - Monitor logs in background

echo "=== Background Log Monitoring ==="
# Create a dummy log file that updates
LOGFILE="/tmp/dummy_app.log"
echo "Creating dummy log file at $LOGFILE"

# Generate log entries every 2 seconds in background
( for i in {1..10}; do echo "$(date): INFO - Processing item $i" >> $LOGFILE; sleep 2; done ) &
GENERATOR_PID=$!

echo "Log generator PID: $GENERATOR_PID"

echo -e "\nStart tail -f in background:"
tail -f $LOGFILE &
TAIL_JOB=$!
echo "Tail job PID: $TAIL_JOB"

echo -e "\nNow you can run other commands while tail runs in background."
echo "Check jobs:"
jobs -l

echo -e "\nAfter 5 seconds, we'll bring tail to foreground and stop it."
sleep 5
echo "Bringing tail to foreground (fg %1) - press Ctrl+C to stop it when you see logs."
read -p "Press Enter to bring tail to foreground..." 
fg %1 2>/dev/null

echo "Cleaning up log generator..."
kill $GENERATOR_PID 2>/dev/null
rm -f $LOGFILE