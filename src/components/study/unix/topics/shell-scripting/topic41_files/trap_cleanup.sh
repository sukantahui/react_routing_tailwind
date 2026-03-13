#!/bin/bash
# trap_cleanup.sh – Structured cleanup with function stack
# Usage: ./trap_cleanup.sh

set -euo pipefail
IFS=$'\n\t'

# ---------- Cleanup stack ----------
CLEANUP_STACK=()

push_cleanup() {
    local cmd="$1"
    CLEANUP_STACK+=("$cmd")
}

pop_cleanup() {
    if [[ ${#CLEANUP_STACK[@]} -gt 0 ]]; then
        local cmd="${CLEANUP_STACK[-1]}"
        unset 'CLEANUP_STACK[${#CLEANUP_STACK[@]}-1]'
        eval "$cmd"
    fi
}

run_all_cleanup() {
    echo "🧹 Running all cleanup handlers..."
    local cmd
    # Run in reverse order (LIFO)
    for (( idx=${#CLEANUP_STACK[@]}-1 ; idx>=0 ; idx-- )); do
        eval "${CLEANUP_STACK[idx]}"
    done
}

trap run_all_cleanup EXIT INT TERM

# ---------- Main script ----------
echo "Creating resources..."

# Create temporary directory
TEMP_DIR=$(mktemp -d)
push_cleanup "rm -rf '$TEMP_DIR'"
echo "   Created $TEMP_DIR"

# Create temporary file
TEMP_FILE=$(mktemp)
push_cleanup "rm -f '$TEMP_FILE'"
echo "   Created $TEMP_FILE"

# Simulate work
echo "Working... (press Ctrl+C to test cleanup)"
sleep 5

# Normally, we would pop cleanups as resources are released
pop_cleanup  # removes TEMP_FILE (but we already have run_all_cleanup on exit)
pop_cleanup  # removes TEMP_DIR

echo "✅ Script completed normally."
exit 0