#!/bin/bash
# flag_case_insensitive.sh - Case-insensitive flag /i
cat > mixed.txt <<EOF
Error: disk full
ERROR: network down
error: timeout
ErrOr: unknown
EOF

echo "=== Without /i ==="
sed 's/error/WARNING/' mixed.txt

echo -e "\n=== With /i ==="
sed 's/error/WARNING/i' mixed.txt