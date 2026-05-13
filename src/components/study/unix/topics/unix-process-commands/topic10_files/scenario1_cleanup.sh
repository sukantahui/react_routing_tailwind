#!/bin/bash
# scenario1_cleanup.sh - Handle runaway process

echo "=== Runaway Process Detection and Termination ==="
echo "1. Identify CPU-hungry processes:"
ps -eo pid,pcpu,comm --sort=-pcpu | head -10

echo -e "\n2. Find a specific misbehaving script (simulate):"
# Simulate a runaway process (in real life you'd find a real PID)
# For demo: we create a dummy infinite loop in background
( while : ; do : ; done ) &
BAD_PID=$!
echo "Simulated runaway PID: $BAD_PID"

echo -e "\n3. Check its CPU usage:"
ps -p $BAD_PID -o pid,pcpu,comm

echo -e "\n4. Send SIGTERM (graceful):"
kill -15 $BAD_PID
sleep 1
if kill -0 $BAD_PID 2>/dev/null; then
    echo "Process still alive, sending SIGKILL..."
    kill -9 $BAD_PID
else
    echo "Process terminated successfully."
fi

echo -e "\n5. Verify termination:"
ps -p $BAD_PID 2>/dev/null || echo "Process $BAD_PID is gone"