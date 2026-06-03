#!/bin/bash
# wait_demo.sh – demonstrate waiting for background processes in shell
echo "=== Starting background processes ==="
sleep 4 &
pid1=$!
sleep 2 &
pid2=$!
sleep 6 &
pid3=$!

echo "Children: $pid1, $pid2, $pid3"

echo -e "\n=== Wait for all children ==="
echo "Waiting for $pid1 (4s)..."
wait $pid1
echo "  $pid1 finished"

echo "Waiting for $pid2 (2s)..."
wait $pid2
echo "  $pid2 finished"

echo "Waiting for $pid3 (6s)..."
wait $pid3
echo "  $pid3 finished"

echo -e "\nAll done. Total time: $(date +%T)"