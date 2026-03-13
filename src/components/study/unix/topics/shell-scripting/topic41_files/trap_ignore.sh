#!/bin/bash
# trap_ignore.sh – Temporarily ignore SIGINT during critical section
# Usage: ./trap_ignore.sh

set -euo pipefail
IFS=$'\n\t'

# Critical section – cannot be interrupted
critical_work() {
    echo "🔐 Starting critical operation (Ctrl+C disabled)"
    # Ignore SIGINT
    trap '' INT
    
    # Simulate critical work
    sleep 3
    echo "   Critical operation finished"
    
    # Restore default SIGINT behaviour
    trap - INT
    echo "🔓 Ctrl+C re-enabled"
}

# Main
echo "Script started"
critical_work
echo "Continuing with normal work..."

# Loop to show Ctrl+C works again
for i in {1..5}; do
    echo "   ... working $i"
    sleep 1
done

echo "✅ Done"