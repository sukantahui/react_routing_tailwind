#!/bin/bash
# join_custom_fields.sh - Join on different fields
cat > file1.txt <<EOF
name:Swadeep:roll101
name:Tuhina:roll102
EOF

cat > file2.txt <<EOF
roll101:85
roll102:92
roll103:78
EOF

echo "=== Original files ==="
echo "File1 (field2 is key):"
cat file1.txt
echo "File2 (field1 is key):"
cat file2.txt

echo -e "\n=== Sort file1 on field2 (colon delimiter) ==="
sort -t':' -k2,2 file1.txt -o file1_sorted.txt
echo "Sorted file1:"
cat file1_sorted.txt

echo -e "\n=== Sort file2 on field1 ==="
sort -t':' -k1,1 file2.txt -o file2_sorted.txt

echo -e "\n=== Join -1 2 -2 1 (file1 field2 = file2 field1) ==="
join -t':' -1 2 -2 1 file1_sorted.txt file2_sorted.txt

# Cleanup
rm file1.txt file2.txt file1_sorted.txt file2_sorted.txt