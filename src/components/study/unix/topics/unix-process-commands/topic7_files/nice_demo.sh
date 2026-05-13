#!/bin/bash
# topic7_files/nice_demo.sh
# Demonstrate starting a CPU‑intensive task with a low nice value

echo "=== nice Command Demo ==="
echo "We will start a CPU burner with nice 19 (lowest priority)."
echo "Simultaneously, you can run a normal process to see the difference."

# Use a simple CPU loop
cat > /tmp/cpu_burner.sh << 'EOF'
#!/bin/bash
echo "CPU burner started with PID $$"
COUNTER=0
while true; do
    ((COUNTER++))
    if [ $((COUNTER % 100000000)) -eq 0 ]; then
        echo -n "."
    fi
done
EOF
chmod +x /tmp/cpu_burner.sh

# Start with nice 19
nice -n 19 /tmp/cpu_burner.sh &
BURNER_PID=$!
echo "Started CPU burner with PID $BURNER_PID"
echo "Checking its nice value:"
ps -o pid,ni,cmd -p $BURNER_PID

echo ""
echo "Now start a similar task without nice (default 0) in another terminal,"
echo "and observe CPU distribution in 'top' (press P to sort by CPU)."
echo "Press Enter to kill the burner and exit."
read -r
kill $BURNER_PID 2>/dev/null
rm -f /tmp/cpu_burner.sh
echo "Demo finished."