#!/bin/bash
# join_unmatched.sh - Using -a and -v for unmatched lines
cat > employees.txt <<EOF
E101 Alice
E102 Bob
E103 Charlie
EOF

cat > salaries.txt <<EOF
E101 50000
E103 60000
E104 55000
EOF

sort -k1,1 employees.txt -o emp_sorted.txt
sort -k1,1 salaries.txt -o sal_sorted.txt

echo "=== Lines in employees.txt not in salaries.txt (unmatched from left) ==="
join -v1 emp_sorted.txt sal_sorted.txt

echo -e "\n=== Lines in salaries.txt not in employees.txt (unmatched from right) ==="
join -v2 emp_sorted.txt sal_sorted.txt

echo -e "\n=== Lines in both (inner join) ==="
join emp_sorted.txt sal_sorted.txt

# Cleanup
rm employees.txt salaries.txt emp_sorted.txt sal_sorted.txt