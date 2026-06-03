#!/bin/bash
# redirect_append.sh - Using append for logging and preserving data

mkdir -p /tmp/append_demo
cd /tmp/append_demo

echo "=== Log file simulation ==="
echo "$(date): Script started" > script.log
echo "$(date): Step 1 completed" >> script.log
echo "$(date): Step 2 completed" >> script.log
echo "Log contents:"
cat script.log

echo -e "\n=== Multiple commands appending to same file ==="
> combined.log   # clear
echo "Hostname: $(hostname)" >> combined.log
echo "Kernel: $(uname -r)" >> combined.log
echo "Uptime: $(uptime -p)" >> combined.log
cat combined.log

echo -e "\n=== Append inside loop ==="
> loop.log
for i in {1..3}; do
    echo "Iteration $i at $(date +%H:%M:%S)" >> loop.log
    sleep 1
done
cat loop.log

cd /tmp
rm -rf /tmp/append_demo