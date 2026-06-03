#!/bin/bash
# delimiter_alternatives.sh - Using different delimiters
cat > paths.txt <<EOF
/usr/local/bin
/usr/local/lib
/usr/local/share
EOF

echo "=== Default slash delimiter (needs escaping) ==="
sed 's/\/usr\/local/\/opt/' paths.txt

echo -e "\n=== Using pipe delimiter (clean) ==="
sed 's|/usr/local|/opt|' paths.txt

echo -e "\n=== Using hash delimiter ==="
sed 's#/usr/local#/opt#' paths.txt

echo -e "\n=== Using @ delimiter ==="
sed 's@/usr/local@/opt@' paths.txt