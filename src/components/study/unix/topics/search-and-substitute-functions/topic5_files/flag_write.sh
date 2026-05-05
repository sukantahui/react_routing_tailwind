#!/bin/bash
# flag_write.sh - Write flag /w filename
cat > source.txt <<EOF
line one
ERROR: fail
line two
ERROR: crash
line three
EOF

echo "=== Write changed lines to errors.log ==="
sed 's/ERROR/CRITICAL/w errors.log' source.txt

echo -e "=== errors.log content ==="
cat errors.log

echo -e "\n=== Original source.txt unchanged ==="
cat source.txt