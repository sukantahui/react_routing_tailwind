#!/bin/bash
# state_observer.sh – observe process states in real time
echo "=== Current process states statistics ==="
ps -e -o stat | cut -c1 | sort | uniq -c

echo -e "\n=== Detailed states of current shell and children ==="
ps -l

echo -e "\n=== Watching state changes (press Ctrl+C to stop) ==="
watch -n 1 'echo "--- $(date) ---"; ps -e -o pid,stat,comm | head -20'