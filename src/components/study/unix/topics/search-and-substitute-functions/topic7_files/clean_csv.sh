#!/bin/bash
# clean_csv.sh - Normalize CSV quotes and delimiters
cat > messy.csv <<EOF
"Swadeep",85,"A"
"Tuhina", 92 , "A+"
Abhronila,78,B
"Debangshu",45,F
EOF

echo "=== Original messy CSV ==="
cat messy.csv

echo -e "\n=== Remove extra spaces around commas ==="
sed -i 's/ *, */,/g' messy.csv
sed -i 's/ *,/,/g' messy.csv
sed -i 's/, */,/g' messy.csv

echo -e "\n=== Remove surrounding double quotes (but keep if needed) ==="
sed -i 's/"\([^"]*\)"/\1/g' messy.csv

echo -e "\n=== Cleaned CSV ==="
cat messy.csv

# Cleanup
rm messy.csv