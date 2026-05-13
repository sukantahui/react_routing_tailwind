#!/bin/bash
# topic7_files/renice_demo.sh
# Demonstrate changing priority of a running process

echo "=== renice Command Demo ==="
echo "Starting a background CPU task with default nice (0)."

cat > /tmp/background_task.sh << 'EOF'
#!/bin/bash
while true; do
    for i in {1..1000000}; do
        echo -n > /dev/null
    done
    echo -n "."
done
EOF
chmod +x /tmp/background_task.sh

/tmp/background_task.sh &
TASK_PID=$!
sleep 1
echo "Task PID: $TASK_PID"
echo "Initial nice value:"
ps -o pid,ni,cmd -p $TASK_PID

echo ""
echo "Now renice to +15 (lower priority)..."
renice -n 15 -p $TASK_PID
echo "New nice value:"
ps -o pid,ni,cmd -p $TASK_PID

echo ""
echo "Now try to increase priority (requires root)."
echo "If you are root, uncomment the next line; otherwise it will fail."
# sudo renice -n -5 -p $TASK_PID

echo "Press Enter to kill the task and finish."
read -r
kill $TASK_PID 2>/dev/null
rm -f /tmp/background_task.sh
echo "Demo completed."