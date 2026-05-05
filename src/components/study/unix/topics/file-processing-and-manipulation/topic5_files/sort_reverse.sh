#!/bin/bash
# sort_reverse.sh - Reverse order with -r
cat > numbers.txt <<EOF
5
2
8
1
9
EOF

echo "=== Numeric values (alphabetical sort is wrong) ==="
sort numbers.txt

echo -e "\n=== Reverse order ==="
sort -r numbers.txt

# Cleanup
rm numbers.txt