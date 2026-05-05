#!/bin/bash
# flag_global.sh - Global flag /g
cat > words.txt <<EOF
apple apple apple
banana apple orange
apple pie
EOF

echo "=== Without /g (only first per line) ==="
sed 's/apple/MANGO/' words.txt

echo -e "\n=== With /g (all occurrences) ==="
sed 's/apple/MANGO/g' words.txt