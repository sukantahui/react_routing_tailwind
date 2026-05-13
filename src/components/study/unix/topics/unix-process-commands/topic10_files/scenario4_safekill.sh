#!/bin/bash
# scenario4_safekill.sh - Safe escalation of kill signals

echo "=== Safe Process Termination: Escalate Signals ==="
# Create a dummy hung process (simulate by ignoring SIGTERM)
cat << 'EOF' > /tmp/hung_simulator.sh
#!/bin/bash
trap '' TERM   # Ignore SIGTERM
echo "I am ignoring SIGTERM. Use SIGKILL to stop me."
while true; do sleep 10; done
EOF
chmod +x /tmp/hung_simulator.sh
/tmp/hung_simulator.sh &
HUNG_PID=$!
echo "Simulated hung process PID: $HUNG_PID"

echo -e "\nStep 1: Try SIGTERM (kill -15)"
kill -15 $HUNG_PID
sleep 1
if kill -0 $HUNG_PID 2>/dev/null; then
    echo "Process still alive. Step 2: Try SIGINT (kill -2)"
    kill -2 $HUNG_PID
    sleep 1
    if kill -0 $HUNG_PID 2>/dev/null; then
        echo "Process still alive. Step 3: Force SIGKILL (kill -9)"
        kill -9 $HUNG_PID
        echo "SIGKILL sent."
    else
        echo "Process responded to SIGINT."
    fi
else
    echo "Process responded to SIGTERM."
fi

sleep 1
if kill -0 $HUNG_PID 2>/dev/null; then
    echo "ERROR: Process still exists!"
else
    echo "Process successfully terminated."
fi
rm -f /tmp/hung_simulator.sh