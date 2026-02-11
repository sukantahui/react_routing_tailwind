#!/bin/bash
# debug_example4.sh - Script to test with bash -x
# Run with: bash -x debug_example4.sh <username>

# Check if username is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <username>"
    echo "Example: $0 swadeep"
    exit 1
fi

USERNAME="$1"
BASE_DIR="/tmp/backup_test"

echo "Starting backup simulation for user: $USERNAME"

# Create backup directory
mkdir -p "$BASE_DIR/$USERNAME"

# Create some test files
for i in {1..3}; do
    echo "Test file $i for $USERNAME" > "$BASE_DIR/$USERNAME/file$i.txt"
done

# List created files
echo "Created files:"
ls -la "$BASE_DIR/$USERNAME/"

# Calculate total size
total_size=$(du -sh "$BASE_DIR/$USERNAME" | cut -f1)
echo "Total backup size: $total_size"

# Cleanup (comment out for debugging)
# rm -rf "$BASE_DIR/$USERNAME"

echo "Backup simulation completed."