#!/bin/bash
# sort_basic_column.sh - Basic column sorting with -k
cat > students.txt <<EOF
Swadeep 20 85
Tuhina 21 92
Abhronila 19 78
Debangshu 22 88
EOF

echo "=== Original order ==="
cat students.txt

echo -e "\n=== Sort by name (field 1) ==="
sort -k1,1 students.txt

echo -e "\n=== Sort by age (field 2) ==="
sort -k2,2 students.txt

echo -e "\n=== Sort by score (field 3) but without numeric (lexicographic, wrong!) ==="
sort -k3,3 students.txt

# Cleanup
rm students.txt