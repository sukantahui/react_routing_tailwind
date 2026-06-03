#!/bin/bash
# tar_bzip2.sh - Using tar with bzip2 compression (.tar.bz2)

echo "=== Tar + bzip2 (.tar.bz2) ==="

# Create test data (larger text for better compression comparison)
mkdir -p data
for i in {1..200}; do echo "Repetitive line $i" >> data/file.txt; done
dd if=/dev/urandom of=data/random.bin bs=1K count=100 2>/dev/null

echo -e "\n1. Create .tar.bz2 archive (default):"
tar -cjvf data.tar.bz2 data/
ls -lh data.tar.bz2

echo -e "\n2. Create with best compression (-9 via bzip2):"
tar -cvf - data/ | bzip2 -9 > data_best.tar.bz2
ls -lh data_best.tar.bz2

echo -e "\n3. Extract .tar.bz2 archive:"
mkdir extract_bz2
tar -xjvf data.tar.bz2 -C extract_bz2/
ls -l extract_bz2/

echo -e "\n4. Compare with gzip size:"
tar -czf data.tar.gz data/
ls -lh data.tar.gz | awk '{print "gzip:  " $5}'
ls -lh data.tar.bz2 | awk '{print "bzip2: " $5}'

echo -e "\n5. List contents:"
tar -tjvf data.tar.bz2 | head -5

echo -e "\n6. Create .tar.bz2 while excluding files:"
tar -cjvf filtered.tar.bz2 --exclude="*.bin" data/
tar -tjvf filtered.tar.bz2

# Cleanup
rm -rf data data.tar.bz2 data_best.tar.bz2 data.tar.gz extract_bz2 filtered.tar.bz2