#!/bin/bash
# du_df_advanced.sh - Sorting, max depth, excluding, and showing file types

mkdir -p /tmp/du_adv
cd /tmp/du_adv

# Create varied content
mkdir dirA dirB dirC
echo "A content" > dirA/file1.txt
dd if=/dev/zero of=dirB/bigfile bs=1M count=5 2>/dev/null
dd if=/dev/zero of=dirC/hugefile bs=1M count=12 2>/dev/null
echo "small" > dirC/small.txt

echo "=== du with max depth ==="
du -h --max-depth=1

echo -e "\n=== Sort directories by size (largest last) ==="
du -sh * | sort -h

echo -e "\n=== Exclude patterns (--exclude) ==="
du -sh --exclude="*.dat" --exclude="*bigfile*"

echo -e "\n=== Show apparent size (du -b) vs block usage ==="
echo "Apparent size (bytes):"
du -sb
echo "Block usage (1K blocks):"
du -sk

cd /tmp
rm -rf /tmp/du_adv