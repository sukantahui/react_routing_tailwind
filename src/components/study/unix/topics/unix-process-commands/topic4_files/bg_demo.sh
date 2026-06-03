#!/bin/bash
# topic4_files/bg_demo.sh
# Demonstration of suspending and backgrounding a process

echo "=== Background (bg) Command Demo ==="
echo "We will start a countdown in foreground."
echo "In a real terminal, you would press Ctrl+Z to suspend it, then type 'bg'."
echo "For this script, we'll simulate the steps."

# Create a dummy countdown script
cat > /tmp/countdown.sh << 'SCRIPT'
#!/bin/bash
for i in {10..1}; do
    echo "Countdown: $i"
    sleep 1
done
echo "Countdown finished!"
SCRIPT
chmod +x /tmp/countdown.sh

# Start the script in foreground (we'll suspend it programmatically)
echo "Starting countdown in foreground (PID $$)"
/tmp/countdown.sh &
CHILD_PID=$!
# Give it a moment to run
sleep 2

# Simulate Ctrl+Z (SIGTSTP) on the child process group
echo "Simulating Ctrl+Z (suspending process $CHILD_PID)..."
kill -TSTP $CHILD_PID
sleep 1

echo "Job suspended. Checking jobs (simulated):"
jobs -l 2>/dev/null || echo "(Non-interactive shell, use 'jobs' command in real shell)"

echo "Now resuming in background using bg..."
# In a real shell, you would type 'bg %1'
kill -CONT $CHILD_PID
echo "Process $CHILD_PID is now running in background."

# Wait for the countdown to finish
sleep 12
echo "Demo completed. Background process finished."
rm -f /tmp/countdown.sh