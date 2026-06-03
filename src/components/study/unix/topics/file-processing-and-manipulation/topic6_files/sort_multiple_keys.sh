#!/bin/bash
# sort_multiple_keys.sh - Sorting by multiple columns
cat > employees.txt <<EOF
IT Swadeep 50000
HR Tuhina 45000
IT Abhronila 55000
HR Debangshu 48000
IT Moumita 52000
EOF

echo "=== Sort by department (field 1) then by salary (field 3) numeric ==="
sort -k1,1 -k3,3n employees.txt

echo -e "\n=== Sort by department ascending, salary descending ==="
sort -k1,1 -k3,3nr employees.txt

# Cleanup
rm employees.txt