#!/bin/bash
# gzip_options.sh - Exploring compression levels and options

echo "=== Gzip Options Demo ==="

# Create a test file
dd if=/dev/urandom of=random.bin bs=1M count=5 2>/dev/null
echo "Created random.bin (5MB) - hard to compress"

echo -e "\nCreating highly compressible text file..."
for i in {1..1000}; do echo "abcdefghijklmnopqrstuvwxyz$i"; done > text.txt
ls -lh text.txt

echo -e "\n1. Fastest compression (level 1):"
time gzip -1 -c text.txt > text_level1.gz
ls -lh text_level1.gz

echo -e "\n2. Default compression (level 6):"
time gzip -6 -c text.txt > text_level6.gz
ls -lh text_level6.gz

echo -e "\n3. Best compression (level 9):"
time gzip -9 -c text.txt > text_level9.gz
ls -lh text_level9.gz

echo -e "\n4. Test integrity (-t):"
gzip -t text_level9.gz && echo "File is valid"

echo -e "\n5. List compressed file info with -l:"
gzip -l text_level9.gz

# Cleanup
rm -f random.bin text.txt text_level*.gz