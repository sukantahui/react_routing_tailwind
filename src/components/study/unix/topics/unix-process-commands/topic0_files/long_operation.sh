#!/bin/bash
# topic0_files/long_operation.sh
# Simulates a lengthy background task — great for demonstrating background execution

echo "[$(date)] Starting heavy data processing simulation (background demo)"
echo "Process ID: $$"
sleep 1

for i in {1..5}; do
    echo "Processing chunk $i/5 ..."
    # Simulate I/O or CPU work
    sleep 2
done

echo "[$(date)] Long operation finished successfully"