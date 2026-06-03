#!/bin/bash
# cmp_basic.sh - Basic byte comparison
echo "Hello World" > file1.txt
echo "Hello World" > file2.txt
echo "Hello Worlx" > file3.txt

echo "=== Identical files ==="
cmp file1.txt file2.txt
echo "Exit status: $?"

echo -e "\n=== Different files ==="
cmp file1.txt file3.txt
echo "Exit status: $?"

# Cleanup
rm file1.txt file2.txt file3.txt