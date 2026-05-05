#!/bin/bash
# global_replace.sh - Replace all occurrences globally (per line)
cat > data.txt <<EOF
apple apple apple
banana apple orange
apple pie
EOF

echo "=== Without /g (only first on each line) ==="
sed 's/apple/MANGO/' data.txt

echo -e "\n=== Global replacement /g (all occurrences) ==="
sed 's/apple/MANGO/g' data.txt

echo -e "\n=== Case-insensitive global replacement (with /i) ==="
sed 's/APPLE/MANGO/gi' data.txt