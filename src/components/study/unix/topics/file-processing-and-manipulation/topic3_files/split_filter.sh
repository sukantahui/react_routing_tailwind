#!/bin/bash
# split_filter.sh - Using --filter to process chunks immediately
seq 1 100 > logs.txt

echo "=== Split into 30-line chunks and compress each with gzip ==="
split -l 30 --filter='gzip > $FILE.gz' logs.txt compressed_

ls -lh compressed_*.gz

echo -e "\n=== Decompress and view first chunk ==="
gunzip -c compressed_aa.gz | head -5

# Cleanup
rm logs.txt compressed_*.gz