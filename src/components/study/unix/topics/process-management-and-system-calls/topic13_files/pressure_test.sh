#!/bin/bash
# pressure_test.sh – generate CPU, memory, and I/O load while watching vmstat
echo "=== Generating system load for 30 seconds (press Ctrl+C to stop early) ==="
echo "Open another terminal and run: vmstat 1"
echo "Starting background processes..."

# CPU load (2 processes)
for i in 1 2; do
    yes > /dev/null &
done
CPU_PIDS=$!

# I/O load (disk writes)
dd if=/dev/zero of=/tmp/stress_test bs=1M count=200 2>/dev/null &
IO_PID=$!

# Memory load (allocate and sleep)
for i in 1 2; do
    stress --vm 1 --vm-bytes 256M --timeout 30s 2>/dev/null &
done

echo "Load started. Watch vmstat output for changes."
sleep 30

echo "Stopping load processes..."
kill $CPU_PIDS $IO_PID 2>/dev/null
pkill -f "stress.*vm" 2>/dev/null
rm -f /tmp/stress_test

echo "Done."