#!/bin/bash
# cut_by_chars.sh - Cut by character positions (for multi-byte languages)
cat > unicode.txt <<EOF
αβγδε
Hello
世界你好
EOF

echo "=== Character positions 1-2 ==="
cut -c 1-2 unicode.txt

echo -e "\n=== Characters 2,4 ==="
cut -c 2,4 unicode.txt

# Note: -c works with multibyte, -b would break characters
# Cleanup
rm unicode.txt