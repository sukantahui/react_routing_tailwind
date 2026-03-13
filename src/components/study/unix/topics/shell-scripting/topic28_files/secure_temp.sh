#!/bin/bash
# secure_temp.sh – Safely create temporary files and guarantee cleanup
set -euo pipefail

cleanup() {
    echo "🧹 Cleaning up temporary files..."
    rm -f "$TMPFILE"
}
trap cleanup EXIT INT TERM

# Create temporary file securely
TMPFILE=$(mktemp) || exit 1
echo "📁 Temporary file created: $TMPFILE"

# Simulate work
echo "Processing sensitive data..." > "$TMPFILE"
cat "$TMPFILE"

# Script exits – trap triggers automatically