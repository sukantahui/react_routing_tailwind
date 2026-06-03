#!/bin/bash
# wc_lines_only.sh - Count only lines with -l
cat > data.txt <<EOF
Line1
Line2
Line3
Line4
EOF

echo "=== Count lines ==="
wc -l data.txt

echo -e "\n=== Count lines of multiple files ==="
cp data.txt data2.txt
wc -l data.txt data2.txt

echo -e "\n=== Count lines from stdin ==="
echo -e "a\nb\nc" | wc -l

# Cleanup
rm data.txt data2.txt