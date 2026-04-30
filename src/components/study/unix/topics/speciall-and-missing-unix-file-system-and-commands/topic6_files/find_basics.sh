#!/bin/bash
# find_basics.sh - Basic find examples: name, type, size, time

mkdir -p /tmp/find_demo
cd /tmp/find_demo

# Create test files and directories
echo "=== Creating test files ==="
touch file1.txt file2.log file3.TXT
mkdir subdir
touch subdir/note.txt subdir/data.log
echo "Large content" > large.log
truncate -s 15M large.log 2>/dev/null || dd if=/dev/zero of=large.log bs=1M count=15 2>/dev/null
echo "Old content" > old.txt
touch -t 202001010000 old.txt

echo -e "\n=== Find by name (case-sensitive) ==="
find . -name "*.txt"
echo -e "\n=== Find by name (case-insensitive) ==="
find . -iname "*.txt"

echo -e "\n=== Find only regular files ==="
find . -type f

echo -e "\n=== Find only directories ==="
find . -type d

echo -e "\n=== Find files larger than 10MB ==="
find . -size +10M

echo -e "\n=== Find files modified in last 2 minutes ==="
sleep 1
touch newfile.txt
find . -mmin -2

echo -e "\n=== Find files accessed more than 30 days ago ==="
find . -atime +30

cd /tmp
rm -rf /tmp/find_demo