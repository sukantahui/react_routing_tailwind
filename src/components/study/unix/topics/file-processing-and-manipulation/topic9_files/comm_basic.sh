#!/bin/bash
# comm_basic.sh - Basic comm usage
cat > file1.txt <<EOF
apple
banana
cherry
date
EOF

cat > file2.txt <<EOF
banana
cherry
fig
grape
EOF

echo "=== Original files (unsorted) ==="
echo "File1:"
cat file1.txt
echo "File2:"
cat file2.txt

echo -e "\n=== Sort files first ==="
sort file1.txt -o file1_sorted.txt
sort file2.txt -o file2_sorted.txt

echo -e "\n=== comm (three columns) ==="
comm file1_sorted.txt file2_sorted.txt

# Cleanup
rm file1.txt file2.txt file1_sorted.txt file2_sorted.txt