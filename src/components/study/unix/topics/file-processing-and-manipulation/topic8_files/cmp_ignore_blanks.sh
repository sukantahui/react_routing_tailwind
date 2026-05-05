#!/bin/bash
# cmp_ignore_blanks.sh – cmp has no whitespace ignore; this script demonstrates that difference.
echo "Hello World" > wspace.txt
echo "Hello   World" > wspace2.txt

echo "=== cmp cannot ignore whitespace; byte 7 differs (space vs two spaces) ==="
cmp wspace.txt wspace2.txt
echo "Exit: $?"

echo -e "\n=== For whitespace‑insensitive compare, use diff -w ==="
diff -w wspace.txt wspace2.txt
echo "Diff exit: $?"

# Cleanup
rm wspace.txt wspace2.txt