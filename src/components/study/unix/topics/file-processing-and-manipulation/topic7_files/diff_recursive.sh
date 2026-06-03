#!/bin/bash
# diff_recursive.sh - Comparing directories with -r
mkdir -p dir1/sub dir2/sub
echo "Hello" > dir1/file.txt
echo "Hello World" > dir2/file.txt
echo "Common" > dir1/sub/common.txt
echo "Common" > dir2/sub/common.txt

echo "=== Recursive diff of directories ==="
diff -r dir1 dir2

echo -e "\n=== Recursive diff with brief summary (-q) ==="
diff -qr dir1 dir2

# Cleanup
rm -rf dir1 dir2