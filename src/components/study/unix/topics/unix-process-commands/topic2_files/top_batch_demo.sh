#!/bin/bash
# topic2_files/top_batch_demo.sh
# Demonstrates using top in batch mode for logging and scripts

SNAPSHOT_FILE="snapshot.log"

echo "[INFO] Capturing top snapshot at $(date)"
echo "=====================" > "$SNAPSHOT_FILE"
echo "Snapshot taken: $(date)" >> "$SNAPSHOT_FILE"
echo "---------------------" >> "$SNAPSHOT_FILE"

# Run top in batch mode, one iteration, and append to file
top -b -n 1 >> "$SNAPSHOT_FILE"

echo "[INFO] Snapshot saved to $SNAPSHOT_FILE"
echo "[INFO] Here are the first 10 lines:"
head -n 10 "$SNAPSHOT_FILE"

# Example: capturing only CPU summary line
echo ""
echo "[INFO] CPU summary line only:"
top -b -n 1 | grep "Cpu(s)"

# Example: capturing top 5 memory consumers and logging
echo ""
echo "[INFO] Top 5 memory consumers:"
top -b -n 1 -o %MEM | head -n 17 | tail -n 5