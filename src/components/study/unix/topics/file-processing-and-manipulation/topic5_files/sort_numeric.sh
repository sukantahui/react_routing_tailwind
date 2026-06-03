#!/bin/bash
# sort_numeric.sh - Numeric sort vs alphabetical
cat > data.txt <<EOF
10
2
100
20
1
EOF

echo "=== Alphabetical (lexicographic) sort ==="
sort data.txt

echo -e "\n=== Numeric sort (-n) ==="
sort -n data.txt

echo -e "\n=== Reverse numeric sort ==="
sort -nr data.txt

# Cleanup
rm data.txt