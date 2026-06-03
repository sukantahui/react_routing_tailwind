#!/bin/bash
# join_outer_join.sh - Left, right, full outer joins
cat > dept.txt <<EOF
D01 IT
D02 HR
D03 Finance
EOF

cat > emp.txt <<EOF
D01 Alice
D02 Bob
D04 Charlie
EOF

sort -k1,1 dept.txt -o dept_sorted.txt
sort -k1,1 emp.txt -o emp_sorted.txt

echo "=== Left outer join (all dept, matching emp) ==="
join -a1 dept_sorted.txt emp_sorted.txt

echo -e "\n=== Right outer join (all emp, matching dept) ==="
join -a2 dept_sorted.txt emp_sorted.txt

echo -e "\n=== Full outer join (all keys from both) ==="
join -a1 -a2 dept_sorted.txt emp_sorted.txt

# Cleanup
rm dept.txt emp.txt dept_sorted.txt emp_sorted.txt