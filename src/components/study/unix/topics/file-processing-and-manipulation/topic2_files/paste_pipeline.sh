#!/bin/bash
# paste_pipeline.sh - Using paste with pipes and process substitution
# Simulated: create two columns from different commands

echo "=== Column 1: current directory filenames (ls -1) ==="
ls -1 *.sh 2>/dev/null | head -5 > /tmp/col1.txt

echo "=== Column 2: file sizes (ls -l) ==="
ls -l *.sh 2>/dev/null | awk '{print $5}' | head -5 > /tmp/col2.txt

echo "=== Paste filenames and sizes side by side ==="
paste /tmp/col1.txt /tmp/col2.txt | column -t

# Using stdin with '-'
echo -e "\n=== Paste output of echo with content of a file ==="
echo -e "Header\nData1\nData2" > /tmp/data.txt
echo "Title" | paste - /tmp/data.txt

# Process substitution example (bash only, not for sh)
echo -e "\n=== Using process substitution (bash) ==="
if [ -n "$BASH_VERSION" ]; then
    paste <(echo -e "Name\nAge") <(echo -e "Swadeep\n20")
fi

# Cleanup
rm -f /tmp/col1.txt /tmp/col2.txt /tmp/data.txt