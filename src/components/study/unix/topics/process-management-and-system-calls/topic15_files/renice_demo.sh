#!/bin/bash
# renice_demo.sh – change nice value of a running process
echo "=== Starting a CPU‑intensive background process ==="
stress --cpu 1 --timeout 120 &
STRESS_PID=$!
echo "Stress process PID: $STRESS_PID"

echo -e "\nInitial nice value:"
ps -o pid,ni,comm -p $STRESS_PID

echo -e "\nRenicing to +15 (lower priority)..."
renice -n 15 -p $STRESS_PID
ps -o pid,ni,comm -p $STRESS_PID

echo -e "\nRenicing to -5 (higher priority) – requires root..."
if [ "$EUID" -eq 0 ]; then
    renice -n -5 -p $STRESS_PID
    ps -o pid,ni,comm -p $STRESS_PID
else
    echo "Cannot set negative nice. Run as root to see effect."
fi

echo -e "\nPress Enter to kill stress process..."
read
kill $STRESS_PID
echo "Done."