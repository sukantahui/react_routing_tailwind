#!/bin/bash
# sort_case_insensitive.sh - Ignore case with -f
cat > words.txt <<EOF
zebra
Apple
banana
Grape
Date
EOF

echo "=== Default case‑sensitive sort ==="
sort words.txt

echo -e "\n=== Case‑insensitive sort (-f) ==="
sort -f words.txt

echo -e "\n=== Using `-f` with reverse ==="
sort -fr words.txt

# Cleanup
rm words.txt