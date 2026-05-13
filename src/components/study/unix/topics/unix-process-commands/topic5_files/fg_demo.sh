#!/bin/bash
# topic5_files/fg_demo.sh
# Demonstration of foreground/background cycling using fg

echo "=== Foreground (fg) Command Demo ==="
echo "We will start a countdown script in foreground, suspend it, background it, then bring it back."

# Create a countdown script
cat > /tmp/countdown_fg.sh << 'SCRIPT'
#!/bin/bash
for i in {10..1}; do
    echo "Countdown: $i"
    sleep 1
done
echo "Countdown finished!"
SCRIPT
chmod +x /tmp/countdown_fg.sh

echo "Starting countdown in foreground (it will run for 10 seconds)."
echo "In a real terminal, press Ctrl+Z after 3 seconds to suspend it."
echo "We will simulate using 'sleep' and signals."

# Start the script in foreground (but we'll use a subshell to capture signals)
/tmp/countdown_fg.sh &
CHILD_PID=$!
echo "Countdown started with PID $CHILD_PID"
sleep 3

# Simulate Ctrl+Z (SIGTSTP) on the child process group
echo "Simulating Ctrl+Z (suspending process $CHILD_PID)..."
kill -TSTP $CHILD_PID
sleep 1

echo "Job suspended. Checking simulated jobs list:"
jobs -l 2>/dev/null || echo "(Non-interactive shell)"

echo "Now resuming in background using bg..."
kill -CONT $CHILD_PID
echo "Process $CHILD_PID is now running in background."

sleep 2
echo "Now bringing it back to foreground with fg..."
kill -CONT $CHILD_PID   # ensure it's not stopped
# In a real shell, you would type 'fg' and the shell would wait.
echo "Process $CHILD_PID is now in foreground (simulated). Waiting for it to finish..."

# Wait for the countdown to complete
wait $CHILD_PID 2>/dev/null
echo "Countdown completed."

rm -f /tmp/countdown_fg.sh
echo "Demo finished."