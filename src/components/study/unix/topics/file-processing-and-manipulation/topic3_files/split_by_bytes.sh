#!/bin/bash
# split_by_bytes.sh - Split by byte size
# Create a sample binary file (text works too)
echo -n "1234567890ABCDEFGHIJ" > data.txt
ls -l data.txt

echo "=== Split into chunks of 5 bytes ==="
split -b 5 data.txt bytes_part_
ls -l bytes_part_*

echo -e "\n=== Content of each chunk ==="
for f in bytes_part_*; do
    echo "$f: $(cat $f)"
done

# Cleanup
rm data.txt bytes_part_*