#!/bin/bash
# sort_custom_delimiter.sh - Using -t for CSV/comma separation
cat > data.csv <<EOF
Swadeep,20,85
Tuhina,21,92
Abhronila,19,78
Debangshu,22,88
EOF

echo "=== CSV: default delimiter doesn't work ==="
sort -k2 data.csv

echo -e "\n=== Sort by age (field 2) with comma delimiter ==="
sort -t',' -k2,2n data.csv

echo -e "\n=== Sort by score (field 3) descending ==="
sort -t',' -k3,3nr data.csv

# Cleanup
rm data.csv