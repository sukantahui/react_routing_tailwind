#!/bin/bash
# sort_numeric_column.sh - Numeric sorting on a column
cat > scores.txt <<EOF
John 85
Alice 92
Bob 78
Eve 100
EOF

echo "=== Default lexicographic (9 comes after 100?) ==="
sort -k2,2 scores.txt

echo -e "\n=== Numeric sort on field 2 ==="
sort -k2,2n scores.txt

echo -e "\n=== Reverse numeric (highest score first) ==="
sort -k2,2nr scores.txt

# Cleanup
rm scores.txt