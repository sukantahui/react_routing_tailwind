#!/bin/bash
# du_df_basics.sh - Basic usage of df and du

echo "=== Disk Free (df) ==="
echo "Human-readable (default 1024-based):"
df -h
echo -e "\nHuman-readable with 1000-based (SI):"
df -H
echo -e "\nInode usage (df -i):"
df -i

echo -e "\n=== Create test directory for du ==="
mkdir -p /tmp/du_test
cd /tmp/du_test
echo "This is a test file" > small.txt
dd if=/dev/zero of=large.dat bs=1M count=10 2>/dev/null
mkdir emptydir subdir
echo "another" > subdir/file.txt

echo -e "\n=== Disk Usage (du) ==="
echo "Current directory summary:"
du -sh .
echo -e "\nAll files and directories (du -a):"
du -ah .
echo -e "\nSubdirectories only (du -sh *)"
du -sh *

cd /tmp
rm -rf /tmp/du_test