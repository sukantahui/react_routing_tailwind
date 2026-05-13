#!/bin/bash
# topic3_files/kill_demo.sh
# Demonstrates sending signals and handling trap

# Create a temporary process that traps SIGTERM
echo "=== kill Command Demonstration ==="
echo "Starting a sleep process that can respond to SIGTERM..."

# First example: simple sleep (no trap)
sleep 200 &
SLEEP_PID=$!
echo "Background sleep with PID: $SLEEP_PID"

echo "Sending SIGTERM (15) to PID $SLEEP_PID..."
kill -15 $SLEEP_PID
sleep 1
if kill -0 $SLEEP_PID 2>/dev/null; then
    echo "ERROR: Process still alive!"
else
    echo "SUCCESS: Process terminated gracefully (exit code 0)."
fi

echo ""
echo "--- Starting a process that traps SIGTERM (shows handling) ---"
cat > /tmp/trap_demo.sh << 'EOF'
#!/bin/bash
trap 'echo "Received SIGTERM, cleaning up..."; exit 0' TERM
echo "Trap demo process PID: $$"
while true; do
    sleep 1
done
EOF
chmod +x /tmp/trap_demo.sh
/tmp/trap_demo.sh &
TRAP_PID=$!
echo "Trapper PID: $TRAP_PID"

echo "Sending SIGTERM (15) to $TRAP_PID (it will handle it)..."
kill -15 $TRAP_PID
sleep 1
if kill -0 $TRAP_PID 2>/dev/null; then
    echo "WARNING: Process did not exit (maybe ignored SIGTERM?)"
    kill -9 $TRAP_PID 2>/dev/null
else
    echo "Trapped process exited cleanly."
fi

rm -f /tmp/trap_demo.sh
echo "--- Demo completed ---"