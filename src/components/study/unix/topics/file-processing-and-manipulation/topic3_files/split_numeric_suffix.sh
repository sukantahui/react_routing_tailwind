#!/bin/bash
# split_numeric_suffix.sh - Using -d for numeric suffixes
seq 1 25 > data.txt

echo "=== Split into 8-line chunks, numeric suffixes (default length 2) ==="
split -d -l 8 data.txt num_part_
ls num_part_*

echo -e "\n=== Adjust suffix length with -a 3 ==="
split -d -a 3 -l 5 data.txt long_num_
ls long_num_*

# Cleanup
rm data.txt num_part_* long_num_*