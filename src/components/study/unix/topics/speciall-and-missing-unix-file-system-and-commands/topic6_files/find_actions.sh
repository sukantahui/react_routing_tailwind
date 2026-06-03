#!/bin/bash
# find_actions.sh - Using -exec, -delete, -ok, and xargs

mkdir -p /tmp/find_actions
cd /tmp/find_actions

# Create test files
touch file{1..10}.tmp
mkdir backup

echo "=== Using -exec to echo each file ==="
find . -name "*.tmp" -exec echo "Found: {}" \;

echo -e "\n=== Using -exec with {} + (batch) ==="
find . -name "*.tmp" -exec echo {} + | wc -w

echo -e "\n=== Copy found files to backup directory ==="
find . -name "*.tmp" -exec cp {} backup/ \;
ls backup/

echo -e "\n=== Delete using -delete ==="
find . -name "*.tmp" -delete
echo "Remaining files:"; ls

# Recreate for -ok demo
touch ask{1,2,3}.tmp
echo -e "\n=== Using -ok (interactive) ==="
echo "Would remove each file if confirmed; answering 'n' here"
find . -name "*.tmp" -ok rm {} \;

echo -e "\n=== Using -exec with grep on multiple files ==="
echo "ERROR" > err1.log
echo "INFO" > info.log
echo "ERROR" > err2.log
find . -name "*.log" -exec grep -l "ERROR" {} \;

cd /tmp
rm -rf /tmp/find_actions