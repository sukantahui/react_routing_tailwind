#!/bin/bash
# cut_by_bytes.sh - Cut by byte positions
cat > data.txt <<EOF
1234567890
abcdefghij
HelloWorld
EOF

echo "=== Byte positions 1-5 ==="
cut -b 1-5 data.txt

echo -e "\n=== Bytes 3,5,7 ==="
cut -b 3,5,7 data.txt

echo -e "\n=== Bytes 5 to end ==="
cut -b 5- data.txt

# Cleanup
rm data.txt