#!/bin/bash
# extract_and_replace.sh - Across multiple files
mkdir -p logs
echo "ERROR: fail" > logs/app1.log
echo "INFO: success" > logs/app2.log
echo "ERROR: crash" > logs/app3.log

echo "=== Files containing ERROR ==="
grep -l "ERROR" logs/*.log

echo -e "\n=== Replace ERROR with CRITICAL in those files ==="
grep -l "ERROR" logs/*.log | xargs sed -i 's/ERROR/CRITICAL/g'

echo -e "\n=== Check results ==="
cat logs/app1.log
cat logs/app2.log
cat logs/app3.log

# Cleanup
rm -rf logs