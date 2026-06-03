#!/bin/bash
# ctime_vs_mtime.sh - Demonstrate operations that affect ctime but not mtime

mkdir -p /tmp/ctime_demo
cd /tmp/ctime_demo

echo "=== Create a file with initial timestamps ==="
echo "Content" > file.txt
stat --format="mtime: %y | ctime: %z" file.txt

sleep 2
echo -e "\n=== Rename the file (mv) ==="
mv file.txt renamed.txt
stat --format="mtime: %y | ctime: %z" renamed.txt
echo "mtime unchanged, ctime updated (directory entry changed)"

sleep 2
echo -e "\n=== Change ownership (chown) ==="
sudo chown nobody renamed.txt 2>/dev/null || echo "skip chown (need root)"
stat --format="mtime: %y | ctime: %z" renamed.txt
echo "Only ctime changes"

sleep 2
echo -e "\n=== Create a hard link ==="
ln renamed.txt hardlink.txt
stat --format="mtime: %y | ctime: %z" renamed.txt
echo "ctime changes (link count changed), mtime unchanged"

sleep 2
echo -e "\n=== Append to file (modifies content) ==="
echo "Extra" >> renamed.txt
stat --format="mtime: %y | ctime: %z" renamed.txt
echo "Both mtime and ctime changed"

cd /tmp
rm -rf /tmp/ctime_demo