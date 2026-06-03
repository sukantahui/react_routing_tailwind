#!/bin/bash
# cmp_limit_bytes.sh - Limit comparison to N bytes (-n)
echo "ABCDEFGHIJ" > short1.txt
echo "ABCDEFGHIJ" > short2.txt
echo "ABCDEFGHIJ" > short3.txt
echo "XYZ" >> short3.txt  # extra bytes

echo "=== Compare only first 5 bytes (identical) ==="
cmp -n 5 short1.txt short2.txt
echo "Exit: $?"

echo -e "\n=== Compare only first 5 bytes (identical even if files differ later) ==="
cmp -n 5 short1.txt short3.txt
echo "Exit: $?"

echo -e "\n=== Compare first 10 bytes (will find difference at byte 11? No -n 10 stops before extra) ==="
cmp -n 10 short1.txt short3.txt
echo "Exit: $?"

# Cleanup
rm short1.txt short2.txt short3.txt