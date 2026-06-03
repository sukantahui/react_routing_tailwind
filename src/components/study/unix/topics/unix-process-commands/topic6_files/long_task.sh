#!/bin/bash
# long_task.sh - Simulates a long-running background task

echo "[$$] Starting long task: counting to 30..."
for i in {1..30}; do
    echo "[$$] Step $i/30 completed"
    sleep 1
done
echo "[$$] Long task finished successfully!"