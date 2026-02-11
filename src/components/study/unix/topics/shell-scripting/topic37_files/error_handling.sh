#!/bin/bash
# error_handling.sh – Professional error handling with die() and trap
# Usage: ./error_handling.sh

set -euo pipefail
IFS=$'\n\t'

# die() – print error message and exit with custom code
die() {
    local msg="$1"
    local code="${2:-1}"
    echo "ERROR: $msg" >&2
    exit "$code"
}

# Cleanup function (called on exit)
cleanup() {
    local exit_code=$?
    if [ -d "${TEMP_DIR:-}" ]; then
        rm -rf "$TEMP_DIR"
        echo "Cleaned up temporary directory"
    fi
    exit "$exit_code"
}
trap cleanup EXIT

# Main script
echo "Creating temporary directory..."
TEMP_DIR=$(mktemp -d) || die "Failed to create temp dir"

echo "Writing data..."
echo "test data" > "$TEMP_DIR/sample.txt" || die "Failed to write file"

echo "Processing..."
grep "test" "$TEMP_DIR/sample.txt" >/dev/null || die "Pattern not found"

echo "✅ All operations succeeded"
exit 0