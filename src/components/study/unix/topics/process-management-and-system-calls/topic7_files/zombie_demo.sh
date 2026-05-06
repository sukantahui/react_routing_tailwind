#!/bin/bash
# zombie_demo.sh – create and detect a zombie process
echo "=== Zombie Creator ==="
echo "Starting a C program that will create a zombie..."
echo "But first, we can also create a zombie using bash subshell trick:"

# Create a zombie using (subshell &) technique
# The parent (subshell) exits immediately, child becomes zombie only temporarily
(sleep 100 &)
child_pid=$!
echo "Child PID: $child_pid"
kill $child_pid
echo "Sent SIGTERM to child $child_pid. It is now zombie if parent (subshell) hasn't waited."

echo -e "\nCheck for zombie (defunct) processes:"
ps aux | grep defunct

echo -e "\nNow killing the parent shell (this script will exit, init will adopt and reap)."
echo "Press Enter to finish and let init reap..."
read