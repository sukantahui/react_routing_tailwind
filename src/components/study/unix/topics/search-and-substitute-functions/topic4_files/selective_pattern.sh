#!/bin/bash
# selective_pattern.sh - Replace only on lines matching a pattern
cat > log.txt <<EOF
INFO: User login
ERROR: Disk full
INFO: Backup completed
ERROR: Network timeout
WARNING: Low memory
EOF

echo "=== Replace only on lines containing 'ERROR' ==="
sed '/ERROR/ s/ERROR/CRITICAL/' log.txt

echo -e "\n=== Replace on lines NOT containing 'INFO' ==="
sed '/INFO/! s/ERROR/CRITICAL/' log.txt

echo -e "\n=== Replace within a pattern range (from ERROR to next INFO) ==="
sed '/ERROR/,/INFO/ s/ERROR/CRITICAL/' log.txt