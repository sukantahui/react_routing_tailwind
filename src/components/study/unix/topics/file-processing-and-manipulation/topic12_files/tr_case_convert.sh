#!/bin/bash
# tr_case_convert.sh - Case conversion
echo "Hello World" > text.txt

echo "=== Lower to upper ==="
tr '[:lower:]' '[:upper:]' < text.txt

echo -e "\n=== Upper to lower ==="
tr '[:upper:]' '[:lower:]' < text.txt

echo -e "\n=== Using ranges (less portable) ==="
tr 'a-z' 'A-Z' < text.txt

# Cleanup
rm text.txt