#!/bin/bash
# head_examples.sh - Demonstrate head command
cat > sample.txt <<EOF
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
Line 11
Line 12
Line 13
Line 14
Line 15
EOF

echo "=== First 10 lines (default) ==="
head sample.txt

echo -e "\n=== First 3 lines ==="
head -3 sample.txt

echo -e "\n=== All lines except last 5 (GNU head) ==="
head -n -5 sample.txt

# Cleanup
rm sample.txt