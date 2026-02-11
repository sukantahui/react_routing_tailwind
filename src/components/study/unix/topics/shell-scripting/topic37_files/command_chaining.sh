#!/bin/bash
# command_chaining.sh – Conditional execution with && and ||
# Usage: ./command_chaining.sh

set -euo pipefail
IFS=$'\n\t'

# Chain 1: Create directory and then a file inside it
mkdir -p /tmp/chaining-demo && \
    echo "Hello from chain" > /tmp/chaining-demo/hello.txt && \
    echo "✓ Chain 1 succeeded"

# Chain 2: Try to remove a non-existent file (fails) and then fallback
rm /tmp/nonexistent 2>/dev/null || echo "⚠️  File not found, continuing..."

# Chain 3: One-liner condition
[ -f /etc/passwd ] && echo "✓ /etc/passwd exists" || echo "✗ /etc/passwd missing"

# Clean up
rm -rf /tmp/chaining-demo 2>/dev/null || true