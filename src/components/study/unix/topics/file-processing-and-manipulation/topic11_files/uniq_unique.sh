#!/bin/bash
# uniq_unique.sh - Show only non-duplicate lines with -u
cat > students.txt <<EOF
Swadeep
Tuhina
Swadeep
Abhronila
Tuhina
Debangshu
EOF

sort students.txt > sorted.txt

echo "=== Lines that appear only once (unique students) ==="
uniq -u sorted.txt

# Cleanup
rm students.txt sorted.txt