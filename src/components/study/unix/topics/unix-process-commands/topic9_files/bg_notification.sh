#!/bin/bash
# bg_notification.sh - Background task that notifies when done

echo "Launching a background task that simulates work and notifies."

(
    echo "Background task started at $(date)"
    sleep 5
    echo "Background task finished at $(date)" > /tmp/bg_notify.$$
    # In real life you might use wall, notify-send, or write to a log
) &

BG_JOB=$!
echo "Background job ID: $BG_JOB"
echo "You can continue working. When the task finishes, check /tmp/bg_notify.$$"
echo "Use 'jobs' to see status."

# Show that the shell prompt returns immediately
sleep 1
echo -e "\n[Shell is free] Running 'jobs' now:"
jobs -l

# Wait for the background job to finish and show that it's gone from job list
sleep 6
echo -e "\nAfter 6 seconds, background task likely done. 'jobs' output:"
jobs -l