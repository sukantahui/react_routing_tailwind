#!/bin/bash
# uniq_ignore_case.sh - Case-insensitive uniq (via pre-processing)
cat > mixed.txt <<EOF
apple
Apple
APPLE
banana
Banana
EOF

echo "=== Default uniq (case-sensitive) ==="
sort mixed.txt | uniq

echo -e "\n=== Case-insensitive: convert to lowercase first ==="
tr '[:upper:]' '[:lower:]' < mixed.txt | sort | uniq

# Cleanup
rm mixed.txt