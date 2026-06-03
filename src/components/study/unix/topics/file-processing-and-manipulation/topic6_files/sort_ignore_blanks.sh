#!/bin/bash
# sort_ignore_blanks.sh - Handling leading spaces with -b
cat > messy.txt <<EOF
  apple
   banana
 apple
  cherry
EOF

echo "=== Without -b (spaces affect order) ==="
sort messy.txt

echo -e "\n=== With -b (ignore leading blanks) ==="
sort -b messy.txt

echo -e "\n=== Using key-specific -b (field 1, ignore leading blanks) ==="
sort -k1,1b messy.txt

# Cleanup
rm messy.txt