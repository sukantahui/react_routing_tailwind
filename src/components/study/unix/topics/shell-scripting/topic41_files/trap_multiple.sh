#!/bin/bash
# trap_multiple.sh – Multiple signals, multiple handlers, listing traps
# Usage: ./trap_multiple.sh

set -euo pipefail
IFS=$'\n\t'

echo "PID: $$"

# ---------- Handlers ----------
cleanup_temp() {
    echo "🧹 Removing temporary files..."
}
log_shutdown() {
    echo "📝 Logging shutdown at $(date)"
}
graceful_exit() {
    echo "👋 Exiting gracefully..."
    exit 0
}

# ---------- Set multiple traps ----------
trap cleanup_temp EXIT
trap log_shutdown INT TERM
trap graceful_exit INT  # Overwrites log_shutdown for INT? No, last one wins.

# Show current traps
echo "Current traps:"
trap -p

# Better: combine multiple actions in one trap
trap 'cleanup_temp; log_shutdown; graceful_exit' INT TERM EXIT

echo -e "\nUpdated traps (combined):"
trap -p

echo -e "\nScript running. Try Ctrl+C or 'kill -INT $$' from another terminal."
echo "Press Ctrl+C to trigger combined handler."

# Infinite loop – wait for signal
while true; do
    sleep 5
done