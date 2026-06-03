#!/bin/bash
# paste_serial.sh - Serial mode (-s) merges lines of a single file across columns
cat > data.txt <<EOF
Line1
Line2
Line3
Line4
EOF

echo "=== Normal paste (one column) ==="
paste data.txt

echo -e "\n=== Serial paste (-s): lines become columns in one row ==="
paste -s data.txt

echo -e "\n=== Serial with custom delimiter ==="
paste -s -d ',' data.txt

echo -e "\n=== Multiple files in serial mode ==="
cat > a.txt <<EOF
a1
a2
EOF
cat > b.txt <<EOF
b1
b2
EOF
paste -s a.txt b.txt

# Cleanup
rm data.txt a.txt b.txt