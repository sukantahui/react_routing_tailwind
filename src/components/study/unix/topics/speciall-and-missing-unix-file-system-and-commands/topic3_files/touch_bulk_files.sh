#!/bin/bash
# touch_bulk_files.sh - Bulk operations with touch

mkdir -p /tmp/touch_bulk
cd /tmp/touch_bulk

echo "=== Create multiple files at once ==="
touch file_{1..10}.txt
ls -l

echo -e "\n=== Update all .txt files in current directory ==="
ls -l *.txt | head -3
touch *.txt
echo "After touch *.txt:"
ls -l *.txt | head -3

echo -e "\n=== Use find to touch files older than 1 minute ==="
# Create an old file
touch -t 202001011200 oldfile.txt
find . -name "*.txt" -type f -mmin +1 -exec ls -l {} \;
echo "Updating only old files:"
find . -name "*.txt" -type f -mmin +1 -exec touch {} \;
ls -l oldfile.txt

echo -e "\n=== Touch files in subdirectories recursively ==="
mkdir -p sub1 sub2
touch sub1/a.txt sub2/b.txt
find . -type f -exec touch {} \;
ls -lR

cd /tmp
rm -rf /tmp/touch_bulk