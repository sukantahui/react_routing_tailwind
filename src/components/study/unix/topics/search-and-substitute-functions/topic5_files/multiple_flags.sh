#!/bin/bash
# multiple_flags.sh - Combining flags
cat > text.txt <<EOF
Error error ERRor
WARN warning Warn
EOF

echo "=== Combine g (global) and i (case-insensitive) ==="
sed 's/error/BUG/gi' text.txt

echo -e "\n=== Replace from 2nd occurrence onward (2g) ==="
echo "a a a a a" | sed 's/a/b/2g'

echo -e "\n=== Print and write together (with -n) ==="
sed -n 's/error/BUG/gpw changes.log' text.txt
cat changes.log