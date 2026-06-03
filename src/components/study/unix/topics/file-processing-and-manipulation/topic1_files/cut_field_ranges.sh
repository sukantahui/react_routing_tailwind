#!/bin/bash
# cut_field_ranges.sh - Field ranges and lists
cat > data.txt <<EOF
1 2 3 4 5 6 7 8 9 10
a b c d e f g h i j
EOF

echo "=== Fields 1-3 (using tab delimiter) ==="
cut -f1-3 data.txt

echo -e "\n=== Fields 2,4,6-8 ==="
cut -f2,4,6-8 data.txt

echo -e "\n=== Fields 5 to end ==="
cut -f5- data.txt

echo -e "\n=== Fields up to 4 (1-4) ==="
cut -f-4 data.txt

# Cleanup
rm data.txt