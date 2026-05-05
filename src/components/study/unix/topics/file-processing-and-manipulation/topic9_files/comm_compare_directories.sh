#!/bin/bash
# comm_compare_directories.sh - Compare file lists from two directories
mkdir -p dir1 dir2
touch dir1/a.txt dir1/b.txt dir1/c.txt
touch dir2/b.txt dir2/c.txt dir2/d.txt

echo "=== File lists ==="
ls dir1 > list1.txt
ls dir2 > list2.txt

echo "Files only in dir1:"
comm -23 <(sort list1.txt) <(sort list2.txt)

echo "Files only in dir2:"
comm -13 <(sort list1.txt) <(sort list2.txt)

echo "Files common to both:"
comm -12 <(sort list1.txt) <(sort list2.txt)

# Cleanup
rm -rf dir1 dir2 list1.txt list2.txt