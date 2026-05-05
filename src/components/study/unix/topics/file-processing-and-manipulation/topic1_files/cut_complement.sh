#!/bin/bash
# cut_complement.sh - Using --complement to exclude fields
cat > employees.txt <<EOF
ID:Name:Dept:Salary
101:Swadeep:IT:50000
102:Tuhina:HR:45000
103:Abhronila:Finance:55000
EOF

echo "=== All fields ==="
cut -d':' -f1-4 employees.txt

echo -e "\n=== Exclude Salary (field 4) ==="
cut -d':' -f4 --complement employees.txt

echo -e "\n=== Exclude ID and Dept (fields 1 and 3) ==="
cut -d':' -f1,3 --complement employees.txt

# Cleanup
rm employees.txt