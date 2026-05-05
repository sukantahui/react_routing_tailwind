#!/bin/bash
# join_substitute_outer.sh - Simulating full outer join with substitution
cat > left.txt <<EOF
1 Apple
2 Banana
EOF

cat > right.txt <<EOF
2 100
3 200
EOF

sort -k1,1 left.txt -o left_sorted.txt
sort -k1,1 right.txt -o right_sorted.txt

echo "=== Inner join ==="
join left_sorted.txt right_sorted.txt

echo -e "\n=== Full outer join with missing values shown as 'NULL' ==="
join -a1 -a2 -e 'NULL' -o '0,1.2,2.2' left_sorted.txt right_sorted.txt

# Cleanup
rm left.txt right.txt left_sorted.txt right_sorted.txt