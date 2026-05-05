#!/bin/bash
# wc_bytes.sh - Difference between -c (bytes) and -m (characters)
cat > ascii.txt <<EOF
Hello
World
EOF

echo "=== ASCII file: -c and -m are same ==="
wc -c ascii.txt
wc -m ascii.txt

# Create UTF-8 file with Unicode characters
echo "αβγδε" > utf8.txt
echo "世界" >> utf8.txt

echo -e "\n=== UTF-8 file: -c (bytes) vs -m (characters) ==="
echo "Bytes: $(wc -c < utf8.txt)"
echo "Characters: $(wc -m < utf8.txt)"

# Cleanup
rm ascii.txt utf8.txt