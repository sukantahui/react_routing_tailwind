#!/bin/bash
# wc_basic.sh - Default wc (lines, words, characters)
cat > sample.txt <<EOF
Hello world
The quick brown fox
Unix is powerful
EOF

echo "=== Default wc output (lines, words, characters) ==="
wc sample.txt

echo -e "\n=== Also works with multiple files ==="
cp sample.txt sample2.txt
wc sample.txt sample2.txt

# Cleanup
rm sample.txt sample2.txt