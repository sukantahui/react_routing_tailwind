#!/bin/bash
# job_control_demo.sh - Interactive job control demonstration

echo "=== Interactive Job Control Demo ==="
echo "This script demonstrates using 'jobs', 'fg', 'bg', and job IDs."
echo

# Create a function that simulates a process
slow_echo() {
    for word in "Learning" "job" "control" "with" "Sukanta" "sir"; do
        echo -n "$word "
        sleep 1
    done
    echo
}

echo "Starting a slow task in the background..."
slow_echo &
JOB1_PID=$!
echo "Job started with PID $JOB1_PID"

echo -e "\nChecking jobs (should show Running):"
jobs -l

echo -e "\nSuspending the job (Ctrl+Z simulation)..."
kill -STOP $JOB1_PID 2>/dev/null
sleep 1
jobs -l

echo -e "\nResuming in background with 'bg %1'..."
bg %1 2>/dev/null
sleep 1
jobs -l

echo -e "\nBringing to foreground with 'fg %1' (will complete execution)..."
fg %1 2>/dev/null

echo -e "\nDemo finished. No jobs should remain."
jobs -l