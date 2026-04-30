#!/bin/bash
# touch_basics.sh - Basic usage of touch

mkdir -p /tmp/touch_demo
cd /tmp/touch_demo

echo "=== Create empty files ==="
touch file1.txt file2.txt file3.log
ls -l

echo -e "\n=== Update timestamps of existing file ==="
echo "Before touch:"
stat file1.txt | grep -E "Modify|Access"
sleep 2
touch file1.txt
echo "After touch:"
stat file1.txt | grep -E "Modify|Access"

echo -e "\n=== Avoid creating new file with -c ==="
touch -c nonexistent.txt
ls -l nonexistent.txt 2>&1 || echo "File not created"

echo -e "\n=== Update only access time (-a) ==="
echo "Original atime:"
stat file2.txt | grep Access
sleep 2
touch -a file2.txt
echo "After touch -a:"
stat file2.txt | grep Access

echo -e "\n=== Update only modification time (-m) ==="
echo "Original mtime:"
stat file3.log | grep Modify
sleep 2
touch -m file3.log
echo "After touch -m:"
stat file3.log | grep Modify

cd /tmp
rm -rf /tmp/touch_demo