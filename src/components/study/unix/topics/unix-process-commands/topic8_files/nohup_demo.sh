#!/bin/bash
# topic8_files/nohup_demo.sh
# Demonstrate nohup for logout‑safe execution

echo "=== nohup Command Demo ==="
echo "We will start a background logger that survives terminal logout."

# Create a simple logging script
cat > /tmp/logger.sh << 'EOF'
#!/bin/bash
echo "Logger started at $(date)" 
COUNTER=0
while true; do
    sleep 10
    ((COUNTER++))
    echo "[$(date)] Logger tick #$COUNTER"
done
EOF
chmod +x /tmp/logger.sh

echo "Starting logger with nohup (output goes to nohup.out by default)..."
nohup /tmp/logger.sh &
PID=$!
echo "Process PID: $PID"
echo "Output is being appended to nohup.out in the current directory."

echo "Check the first few lines:"
sleep 2
head -n 5 nohup.out 2>/dev/null || echo "No output yet"

echo ""
echo "Now you can close this terminal (or exit SSH) and the logger will continue."
echo "To verify later, log back in and run: ps -p $PID"
echo "Also tail -f nohup.out to see ongoing ticks."
echo ""
echo "To stop the logger manually when ready, run: kill $PID"
echo "Demo ready. Press Enter to exit (the script will not kill the logger)."
read -r
echo "Exiting demo. Logger still running in background with nohup."