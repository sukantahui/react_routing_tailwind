#!/bin/bash
# uniq_basic.sh - Basic uniq (remove consecutive duplicates)
cat > fruits.txt <<EOF
apple
apple
banana
banana
cherry
apple
cherry
EOF

echo "=== Original file (unsorted, duplicates not adjacent) ==="
cat fruits.txt

echo -e "\n=== uniq without sort (only removes consecutive duplicates) ==="
uniq fruits.txt

echo -e "\n=== sort then uniq (complete deduplication) ==="
sort fruits.txt | uniq

# Cleanup
rm fruits.txt