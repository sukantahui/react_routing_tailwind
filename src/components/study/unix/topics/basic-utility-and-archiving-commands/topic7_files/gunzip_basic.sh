#!/bin/bash
# gunzip_basic.sh - Basic decompression examples

echo "=== Basic gunzip Usage ==="

# Create a sample file and compress it
echo "Creating test file..."
echo "This is a test file for decompression practice." > sample.txt
for i in {1..100}; do echo "Line $i of repetitive text." >> sample.txt; done
gzip sample.txt
ls -lh sample.txt.gz

echo -e "\n1. Decompress with gunzip:"
gunzip sample.txt.gz
ls -lh sample.txt

echo -e "\n2. Recompress and use gzip -d (same as gunzip):"
gzip sample.txt
gzip -d sample.txt.gz
ls -lh sample.txt

echo -e "\n3. Decompress while keeping .gz (-k):"
gzip sample.txt
gunzip -k sample.txt.gz
ls -lh sample.txt sample.txt.gz

echo -e "\n4. Decompress to stdout (-c) and redirect:"
gzip -c sample.txt > copy.gz
gunzip -c copy.gz > restored.txt
ls -lh copy.gz restored.txt

# Cleanup
rm -f sample.txt sample.txt.gz copy.gz restored.txt