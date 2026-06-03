#!/bin/bash
# scenario3_batch.sh - Run low-priority batch job

echo "=== Low Priority Batch Processing ==="
# Simulate a CPU-intensive task (compression, backup, etc.)
cat << 'EOF' > /tmp/intensive_task.sh
#!/bin/bash
echo "Starting intensive task at $(date)"
for i in {1..20}; do
    echo "Task progress: $i/20"
    dd if=/dev/zero of=/dev/null bs=1M count=100 2>/dev/null
    sleep 1
done
echo "Intensive task finished at $(date)"
EOF
chmod +x /tmp/intensive_task.sh

echo "Running task with nice +19 (lowest priority) in background:"
nice -n 19 /tmp/intensive_task.sh > /tmp/task_output.log 2>&1 &
TASK_PID=$!
echo "Task PID: $TASK_PID, priority: $(ps -o ni -p $TASK_PID | tail -1)"

echo "Checking system load while task runs:"
top -b -n 1 | head -5

echo -e "\nYou can also renice an existing process:"
echo "renice +10 -p $TASK_PID"
sudo renice +10 -p $TASK_PID 2>/dev/null || echo "(sudo may be required for renice)"

echo "Waiting for task to finish..."
wait $TASK_PID
echo "Output saved to /tmp/task_output.log"
rm -f /tmp/intensive_task.sh