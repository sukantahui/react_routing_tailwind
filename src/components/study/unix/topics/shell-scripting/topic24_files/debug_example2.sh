#!/bin/bash
# debug_example2.sh - set -e demonstration
# Script exits immediately when any command fails

set -e  # Exit on error

echo "Processing file: data1.txt"
# Simulate successful processing
sleep 0.1
echo "File processed successfully"

echo "Processing file: data2.txt"
# Another successful operation
sleep 0.1
echo "File processed successfully"

echo "Processing file: /nonexistent"
# This command will fail
ls /nonexistent

# This line will never execute because of set -e
echo "This message will not appear"

# Note: The script exits with the exit code of the failed command