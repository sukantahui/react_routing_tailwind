#!/bin/bash
# bulk_find_replace.sh - Find and replace across all files in a project
mkdir -p project
echo "old_function()" > project/file1.js
echo "call_old_function()" > project/file2.js
echo "// no match" > project/file3.txt

echo "=== Original files ==="
grep -n "old" project/* 2>/dev/null

echo -e "\n=== Find all files containing 'old_function' ==="
grep -l "old_function" project/*

echo -e "\n=== Replace 'old_function' with 'new_function' in those files ==="
grep -l "old_function" project/* | xargs sed -i 's/old_function/new_function/g'

echo -e "\n=== After replacement ==="
grep -n "old\|new" project/* 2>/dev/null

# Cleanup
rm -rf project