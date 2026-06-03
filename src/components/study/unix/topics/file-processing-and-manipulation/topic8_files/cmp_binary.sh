#!/bin/bash
# cmp_binary.sh - Binary file comparison
# Create two small binary files (using dd)
dd if=/dev/zero of=bin1.bin bs=1 count=16 2>/dev/null
dd if=/dev/zero of=bin2.bin bs=1 count=16 2>/dev/null
# Modify bin2.bin at offset 8
printf '\x01' | dd of=bin2.bin bs=1 seek=8 count=1 conv=notrunc 2>/dev/null

echo "=== Compare binary files ==="
cmp bin1.bin bin2.bin

echo -e "\n=== Verbose binary diff (-b) shows octal values ==="
cmp -b bin1.bin bin2.bin

echo -e "\n=== List all differing bytes (-l) ==="
cmp -l bin1.bin bin2.bin

# Cleanup
rm bin1.bin bin2.bin