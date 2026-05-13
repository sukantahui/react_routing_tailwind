#!/bin/bash
# fg_bg_demo.sh - Demonstrates moving processes between foreground and background

echo "=== Foreground/Background Demo ==="
echo "Starting a long task in the background..."
sleep 30 &
BG_PID=$!
echo "Background job started with PID $BG_PID (job %1)"

echo -e "\nListing jobs:"
jobs -l

echo -e "\nNow we will bring it to the foreground (fg %1)..."
echo "Press Ctrl+Z to suspend it, then we'll bg it again."
fg %1 2>/dev/null   # This will block; the user must press Ctrl+Z

echo -e "\nJob suspended. Now resuming in background with 'bg %1'"
bg %1 2>/dev/null
sleep 1
jobs -l

echo -e "\nKilling background job..."
kill %1 2>/dev/null
echo "Demo complete."