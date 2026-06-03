#!/bin/bash
# uniq_skip_chars.sh - Skip characters with -s
cat > fixed.txt <<EOF
2025-01-15 apple
2025-01-15 apple
2025-01-16 banana
2025-01-16 banana
EOF

echo "=== Default (dates cause lines to be different) ==="
uniq fixed.txt

echo -e "\n=== uniq -s11 (skip 11 characters, compare only fruit names) ==="
uniq -s11 fixed.txt

# Cleanup
rm fixed.txt