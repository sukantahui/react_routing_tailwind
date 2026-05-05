#!/bin/bash
# grep_count_before_sed.sh - Count matches before transforming
cat > logs.txt <<EOF
ERROR: timeout
INFO: success
ERROR: disk full
WARN: low space
ERROR: network
EOF

echo "=== Count ERROR lines ==="
grep -c "ERROR" logs.txt

echo -e "\n=== If count > 0, then transform and show ==="
count=$(grep -c "ERROR" logs.txt)
if [ $count -gt 0 ]; then
    echo "Found $count errors. Transforming:"
    grep "ERROR" logs.txt | sed 's/ERROR/CRITICAL/'
else
    echo "No errors found."
fi