#!/bin/bash
# wc_max_line_length.sh - Find longest line length with -L
cat > text.txt <<EOF
Short
A bit longer line
This is the longest line of the file
Another line
EOF

echo "=== Longest line length (in characters) ==="
wc -L text.txt

echo -e "\n=== Useful for fixed-width file validation ==="
# Create fixed-width file (should have consistent length)
printf "%-10s\n" "Col1" "Col2" > fixed.txt
wc -L fixed.txt

# Cleanup
rm text.txt fixed.txt