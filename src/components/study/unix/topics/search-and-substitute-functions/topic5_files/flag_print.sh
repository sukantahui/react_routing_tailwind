#!/bin/bash
# flag_print.sh - Print flag /p (with -n)
cat > log.txt <<EOF
INFO: started
ERROR: something wrong
INFO: finished
ERROR: another issue
EOF

echo "=== Print only lines where substitution happened ==="
sed -n 's/ERROR/CRITICAL/p' log.txt

echo -e "\n=== Original file unchanged ==="
cat log.txt