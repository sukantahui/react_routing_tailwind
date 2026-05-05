#!/bin/bash
# split_custom_prefix.sh - Using custom prefix
seq 1 30 > bigfile.txt

echo "=== Split into 10-line chunks with prefix 'my_chunk_' ==="
split -l 10 bigfile.txt my_chunk_
ls my_chunk_*

echo -e "\n=== First chunk ==="
cat my_chunk_aa

# Cleanup
rm bigfile.txt my_chunk_*