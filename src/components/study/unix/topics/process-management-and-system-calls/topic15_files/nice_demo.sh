#!/bin/bash
# nice_demo.sh – demonstrate setting nice values when launching commands
echo "=== Current shell nice value ==="
ps -o pid,ni,comm -p $$

echo -e "\n=== Launching a CPU stress with different nice values ==="
# Start a background CPU load with default nice
stress --cpu 1 --timeout 60 &
PID1=$!
echo "Stressed process 1 (nice default) PID: $PID1"

# Start with nice 15
nice -n 15 stress --cpu 1 --timeout 60 &
PID2=$!
echo "Stressed process 2 (nice 15) PID: $PID2"

# Start with nice -5 (requires root)
echo "Attempting to start with nice -5 (requires root)..."
if [ "$EUID" -eq 0 ]; then
    nice -n -5 stress --cpu 1 --timeout 60 &
    PID3=$!
    echo "Stressed process 3 (nice -5) PID: $PID3"
else
    echo "Skipping nice -5: not root"
fi

echo -e "\nCheck nice values:"
ps -o pid,ni,comm -p $PID1,$PID2
sleep 60
echo "Demo finished."