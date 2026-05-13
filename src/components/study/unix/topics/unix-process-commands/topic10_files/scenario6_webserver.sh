#!/bin/bash
# scenario6_webserver.sh - Keep process alive after logout

echo "=== Keeping Process Alive After Logout ==="
# Simulate a simple HTTP server using Python (if available) or a sleep task
if command -v python3 &>/dev/null; then
    echo "Using Python3 to start a simple HTTP server on port 8000"
    CMD="python3 -m http.server 8000"
elif command -v python &>/dev/null; then
    CMD="python -m SimpleHTTPServer 8000"
else
    CMD="sleep 3600"   # fallback
fi

echo "Method 1: nohup + background"
nohup $CMD > /tmp/server.out 2>&1 &
JOB1=$!
echo "Started with nohup, PID: $JOB1"
echo "Check: ps -p $JOB1"

echo -e "\nMethod 2: Disown after starting in background"
$CMD > /tmp/server2.out 2>&1 &
JOB2=$!
disown $JOB2
echo "Started and disowned, PID: $JOB2"

echo -e "\nNow you can log out; both processes should survive."
echo "To test without logging out, simulate SIGHUP:"
kill -HUP $$   # This would kill the script itself, so we won't do it.

echo "Demonstration: Use 'ps' to see they are still there after you exit this script."
echo "Press Enter to clean up (kill the jobs) before exiting."
read
kill $JOB1 $JOB2 2>/dev/null
rm -f /tmp/server.out /tmp/server2.out