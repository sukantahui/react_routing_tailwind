#!/bin/bash
# cmp_practical.sh – Real‑world integrity and skip offsets
# 1. Check if two files are identical (exit status in script)
echo "=== 1. Integrity check ==="
echo "Content" > original.txt
cp original.txt copy.txt
if cmp -s original.txt copy.txt; then
    echo "Files are identical"
else
    echo "Files differ"
fi
rm original.txt copy.txt

# 2. Compare files with headers to skip
echo -e "\n=== 2. Skip first 10 bytes of each file ==="
printf "HEADER1234" > header.bin
dd if=/dev/urandom of=content1.bin bs=1 count=50 2>/dev/null
cat header.bin content1.bin > fileA.bin
dd if=/dev/urandom of=content2.bin bs=1 count=50 2>/dev/null
cat header.bin content2.bin > fileB.bin
echo "Compare entire files (headers same, content differs):"
cmp fileA.bin fileB.bin
echo "Compare starting after header (skip 10 bytes each):"
cmp fileA.bin fileB.bin 10 10
echo "Exit status: $? (0 if only content differs? Actually 1 because content differs after skip)"

# 3. Find first differing byte without verbose
echo -e "\n=== 3. Locate difference in large files (simulate) ==="
dd if=/dev/zero of=big1 bs=1M count=1 2>/dev/null
dd if=/dev/zero of=big2 bs=1M count=1 2>/dev/null
# corrupt big2 at offset 500000
printf '\x99' | dd of=big2 bs=1 seek=500000 count=1 conv=notrunc 2>/dev/null
cmp big1 big2 | head -1
rm big1 big2

# Cleanup
rm header.bin content1.bin content2.bin fileA.bin fileB.bin