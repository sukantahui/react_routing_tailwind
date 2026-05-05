#!/bin/bash
# cmp_verbose.sh - Verbose output with -b (show byte values)
echo "Hello World" > A.txt
echo "Hella World" > B.txt  # 'o' vs 'a' at position 5 (1-indexed: H e l l o => byte 5 is 'o')
echo "=== Default cmp (byte and line number) ==="
cmp A.txt B.txt

echo -e "\n=== Verbose cmp -b (show octal and ASCII of differing bytes) ==="
cmp -b A.txt B.txt

# Compare -i (interactive) not available; but -l lists all differences
echo -e "\n=== List all differing bytes (-l) ==="
cmp -l A.txt B.txt

# Cleanup
rm A.txt B.txt