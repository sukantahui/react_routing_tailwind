#!/bin/bash
# uniq_count.sh - Count occurrences with -c
cat > logs.txt <<EOF
INFO: started
ERROR: disk full
ERROR: disk full
INFO: backup done
ERROR: timeout
INFO: started
EOF

echo "=== Sorted lines with counts ==="
sort logs.txt | uniq -c

echo -e "\n=== Sorted by frequency (descending) ==="
sort logs.txt | uniq -c | sort -nr

# Cleanup
rm logs.txt