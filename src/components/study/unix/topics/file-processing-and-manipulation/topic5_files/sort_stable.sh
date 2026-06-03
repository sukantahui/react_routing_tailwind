#!/bin/bash
# sort_stable.sh - Stable sort (-s) and unique (-u)
cat > duplicates.txt <<EOF
apple 10
banana 20
apple 30
cherry 15
apple 5
EOF

echo "=== Default sort (order of ties not preserved) ==="
sort duplicates.txt

echo -e "\n=== Stable sort (-s) preserves original order for ties ==="
sort -s -k1,1 duplicates.txt

echo -e "\n=== Unique (-u) removes duplicate lines (keeping first) ==="
sort -u duplicates.txt

# Demo: sorting without -u removes duplicates entirely
echo -e "\n=== Unique sorted output ==="
sort -u fruits.txt 2>/dev/null || echo "fruits.txt not found"

# Cleanup
rm duplicates.txt