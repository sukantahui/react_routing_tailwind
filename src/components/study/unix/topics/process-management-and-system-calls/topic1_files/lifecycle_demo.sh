#!/bin/bash
# lifecycle_demo.sh - shows parent and child processes with PID
echo "Parent PID: $$"
echo "Forking a child process..."
sleep 1 &
child_pid=$!
echo "Child PID (background sleep): $child_pid"
ps -o pid,ppid,stat,comm -p $$,$child_pid
echo "Waiting for child to finish..."
wait $child_pid
echo "Child finished. Parent exiting."