#!/bin/bash
# tar_xz.sh - Using tar with xz compression (.tar.xz)

echo "=== Tar + xz (.tar.xz) ==="

# Create test data (mixture of compressible and random)
mkdir -p logs
for i in {1..500}; do echo "Log entry $i" >> logs/app.log; done
dd if=/dev/urandom of=logs/junk.bin bs=1K count=200 2>/dev/null

echo -e "\n1. Create .tar.xz archive:"
tar -cJvf logs.tar.xz logs/
ls -lh logs.tar.xz

echo -e "\n2. Extract .tar.xz archive:"
mkdir extract_xz
tar -xJvf logs.tar.xz -C extract_xz/
ls -l extract_xz/

echo -e "\n3. Compare compression methods:"
tar -czf logs.tar.gz logs/
tar -cjf logs.tar.bz2 logs/
ls -lh logs.tar.* | awk '{print $5, $9}'

echo -e "\n4. Create with different xz compression levels:"
xz -9 -c logs.tar > logs_best.xz 2>/dev/null
ls -lh logs_best.xz
echo "xz default vs -9:"
ls -lh logs.tar.xz logs_best.xz

echo -e "\n5. Parallel xz compression (if pxz installed):"
if command -v pxz &>/dev/null; then
    tar -cf - logs/ | pxz -9 > logs_parallel.tar.xz
    ls -lh logs_parallel.tar.xz
else
    echo "pxz not installed (parallel xz)"
fi

echo -e "\n6. Extract with auto-detection:"
tar -xf logs.tar.xz -C extract_xz/
echo "Extracted with generic tar -xf"

# Cleanup
rm -rf logs logs.tar.* logs_best.xz logs_parallel.tar.xz extract_xz