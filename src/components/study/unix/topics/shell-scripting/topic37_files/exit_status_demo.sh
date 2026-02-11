#!/bin/bash
# exit_status_demo.sh – Demonstrates basic exit status checks
# Usage: ./exit_status_demo.sh

set -euo pipefail
IFS=$'\n\t'

echo "=== Example 1: if command; then ==="
if grep -q root /etc/passwd; then
    echo "✓ root user found"
else
    echo "✗ root user not found (strange!)"
fi

echo -e "\n=== Example 2: Explicit $? check ==="
mkdir /tmp/testdir 2>/dev/null
status=$?
if [ "$status" -eq 0 ]; then
    echo "✓ Directory created successfully"
else
    echo "✗ Failed to create directory (exit code: $status)"
fi
rmdir /tmp/testdir 2>/dev/null || true

echo -e "\n=== Example 3: && and || chaining ===""
ping -c 1 google.com >/dev/null 2>&1 \
    && echo "✓ Internet reachable" \
    || echo "✗ No internet connection"

echo -e "\n=== Example 4: Using exit status in function ===""
check_file() {
    if [ -f "$1" ]; then
        echo "✓ File $1 exists"
        return 0
    else
        echo "✗ File $1 not found" >&2
        return 1
    fi
}
check_file "/etc/passwd"
check_file "/nonexistent"