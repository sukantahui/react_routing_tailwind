#!/bin/bash
# split_basic.sh - Split by lines (default 1000, but here use small numbers for demo)
# Create a sample file with 15 lines
seq 1 15 > lines.txt

echo "=== Original file (15 lines) ==="
cat lines.txt

echo -e "\n=== Split into files of 5 lines each ==="
split -l 5 lines.txt chunk_
ls chunk_*

echo -e "\n=== Content of chunk_aa ==="
cat chunk_aa

echo -e "\n=== Content of chunk_ab ==="
cat chunk_ab

# Cleanup
rm lines.txt chunk_*