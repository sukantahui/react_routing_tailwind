#!/bin/bash
# comm_suppress_columns.sh - Suppressing columns
cat > setA.txt <<EOF
apple
banana
cherry
EOF
sort setA.txt -o setA_sorted.txt

cat > setB.txt <<EOF
banana
cherry
date
EOF
sort setB.txt -o setB_sorted.txt

echo "=== comm -1 (suppress column 1) ==="
comm -1 setA_sorted.txt setB_sorted.txt

echo -e "\n=== comm -2 (suppress column 2) ==="
comm -2 setA_sorted.txt setB_sorted.txt

echo -e "\n=== comm -3 (suppress column 3 – common lines) ==="
comm -3 setA_sorted.txt setB_sorted.txt

echo -e "\n=== comm -23 (lines only in setA) ==="
comm -23 setA_sorted.txt setB_sorted.txt

echo -e "\n=== comm -13 (lines only in setB) ==="
comm -13 setA_sorted.txt setB_sorted.txt

echo -e "\n=== comm -12 (common lines) ==="
comm -12 setA_sorted.txt setB_sorted.txt

# Cleanup
rm setA.txt setB.txt setA_sorted.txt setB_sorted.txt