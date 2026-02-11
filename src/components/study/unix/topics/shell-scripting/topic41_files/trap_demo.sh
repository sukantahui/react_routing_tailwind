#!/bin/bash
# trap_demo.sh – Basic trap for cleanup on exit and interrupt
# Usage: ./trap_demo.sh

set -euo pipefail
IFS=$'\n\t'

# ---------- Cleanup function ----------
cleanup() {
    local exit_code=$?
    echo "🧹 Cleaning up temporary files..."
    if [[ -n "${TEMP_FILE:-}" && -f "$TEMP_FILE" ]]; then
        rm -f "$TEMP_FILE"
        echo "   Removed $TEMP_FILE"
    fi
    echo "Exiting with code: $exit_code"
    exit "$exit_code"
}

# ---------- Set traps ----------
trap cleanup INT TERM EXIT

# ---------- Main script ----------
echo "Creating temporary file..."
TEMP_FILE=$(mktemp) || exit 1
echo "This is important data" > "$TEMP_FILE"
echo "Temporary file created: $TEMP_FILE"

echo "Processing... (press Ctrl+C to interrupt)"
for i in {1..10}; do
    echo "Step $i"
    sleep 1
done

echo "✅ Script completed normally."
exit 0