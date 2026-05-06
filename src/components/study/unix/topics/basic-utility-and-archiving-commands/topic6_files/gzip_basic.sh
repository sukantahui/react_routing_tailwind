#!/bin/bash
# gzip_basic.sh - Basic compression examples

echo "=== Basic gzip Usage ==="

# Create a test file
echo "Creating test file with repetitive text..."
for i in {1..100}; do echo "This is line $i of repetitive text for compression testing."; done > test.txt
ls -lh test.txt

echo -e "\n1. Compress test.txt (default level 6):"
gzip test.txt
ls -lh test.txt.gz

echo -e "\n2. Decompress back to original:"
gunzip test.txt.gz
ls -lh test.txt

echo -e "\n3. Compress while keeping original (-k):"
gzip -k test.txt
ls -lh test.txt test.txt.gz

echo -e "\n4. Compress to custom output name using -c:"
gzip -c test.txt > custom.gz
ls -lh custom.gz

echo -e "\n5. Display compression stats with -v:"
gzip -v -c test.txt > /dev/null

# Cleanup
rm -f test.txt test.txt.gz custom.gz