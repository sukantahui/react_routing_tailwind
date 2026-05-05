#!/bin/bash
# sort_basic.sh - Basic alphabetical sort
cat > fruits.txt <<EOF
banana
Apple
grape
cherry
Date
EOF

echo "=== Original order ==="
cat fruits.txt

echo -e "\n=== Sorted alphabetically (ASCII order) ==="
sort fruits.txt

# Cleanup
rm fruits.txt