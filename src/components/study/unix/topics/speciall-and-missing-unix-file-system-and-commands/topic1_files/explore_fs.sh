#!/bin/bash
# explore_fs.sh - Explore the Unix filesystem hierarchy

echo "=== Root directory contents ==="
ls -l /

echo -e "\n=== Inode numbers of root directories ==="
ls -li / | head -10

echo -e "\n=== Disk usage of key directories (human readable) ==="
du -sh /bin /etc /home /var /usr 2>/dev/null

echo -e "\n=== Check which filesystem each directory belongs to ==="
df -h / /home /var