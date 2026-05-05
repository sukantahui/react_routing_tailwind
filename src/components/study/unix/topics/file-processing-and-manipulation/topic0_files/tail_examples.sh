#!/bin/bash
# tail_examples.sh - Demonstrate tail command
cat > log.txt <<EOF
[INFO] Start
[INFO] Processing
[ERROR] Disk full
[WARN] Low memory
[INFO] Retry
[ERROR] Timeout
[INFO] Shutdown
EOF

echo "=== Last 10 lines (default) ==="
tail log.txt

echo -e "\n=== Last 3 lines ==="
tail -3 log.txt

echo -e "\n=== Starting from line 3 (skip first 2) ==="
tail -n +3 log.txt

# Uncomment to show follow (-f) – interrupts with Ctrl+C
# echo -e "\n=== Following file (press Ctrl+C to stop) ==="
# tail -f log.txt &

# Cleanup
rm log.txt