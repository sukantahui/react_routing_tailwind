#!/bin/bash
# tar_compare.sh - Compare different compression methods

echo "=== Comparing Compression Methods ==="

# Create a substantial test directory
mkdir -p testdata
echo "Creating test data (repetitive text, logs, source code)..."
for i in {1..1000}; do echo "Line $i of repetitive text for compression testing." >> testdata/bigfile.txt; done
for i in {1..100}; do echo "print('Hello $i')" >> testdata/script.py; done
dd if=/dev/urandom of=testdata/random.bin bs=1K count=500 2>/dev/null
mkdir -p testdata/sub
for i in {1..500}; do echo "Sub log $i" >> testdata/sub/subfile.log; done

# Calculate original size
original_size=$(du -sb testdata | cut -f1)
echo "Original size: $(numfmt --to=iec $original_size)"

# Create archives with different methods
echo -e "\n1. Uncompressed tar:"
time tar -cf test.tar testdata 2>/dev/null
tar_size=$(stat -c%s test.tar)
echo "Size: $(numfmt --to=iec $tar_size) (ratio: $(echo "scale=2; $tar_size/$original_size*100" | bc)%)"

echo -e "\n2. gzip (default level 6):"
time tar -czf test.tar.gz testdata
gz_size=$(stat -c%s test.tar.gz)
echo "Size: $(numfmt --to=iec $gz_size) (ratio: $(echo "scale=2; $gz_size/$original_size*100" | bc)%)"

echo -e "\n3. bzip2 (default):"
time tar -cjf test.tar.bz2 testdata
bz2_size=$(stat -c%s test.tar.bz2)
echo "Size: $(numfmt --to=iec $bz2_size) (ratio: $(echo "scale=2; $bz2_size/$original_size*100" | bc)%)"

echo -e "\n4. xz (default):"
time tar -cJf test.tar.xz testdata
xz_size=$(stat -c%s test.tar.xz)
echo "Size: $(numfmt --to=iec $xz_size) (ratio: $(echo "scale=2; $xz_size/$original_size*100" | bc)%)"

echo -e "\n5. Best compression comparison:"
tar -czf test_gz9.tar.gz --use-compress-program="gzip -9" testdata
tar -cjf test_bz2_9.tar.bz2 --use-compress-program="bzip2 -9" testdata
xz -9 -c test.tar > test_xz9.tar.xz 2>/dev/null
gz9_size=$(stat -c%s test_gz9.tar.gz)
bz2_9_size=$(stat -c%s test_bz2_9.tar.bz2)
xz9_size=$(stat -c%s test_xz9.tar.xz)
echo "gzip -9: $(numfmt --to=iec $gz9_size) (saved $(($gz_size - $gz9_size)) bytes from default)"
echo "bzip2 -9: $(numfmt --to=iec $bz2_9_size)"
echo "xz -9: $(numfmt --to=iec $xz9_size)"

echo -e "\nRecommendation based on this test:"
smallest=$xz9_size
if [ $gz9_size -lt $smallest ]; then smallest=$gz9_size; fi
if [ $bz2_9_size -lt $smallest ]; then smallest=$bz2_9_size; fi
if [ $xz9_size -eq $smallest ]; then echo "xz gave smallest size (best for archiving)"; fi
if [ $gz9_size -eq $smallest ]; then echo "gzip gave smallest size (best for this data type)"; fi
if [ $bz2_9_size -eq $smallest ]; then echo "bzip2 gave smallest size (good balance)"; fi

# Cleanup
rm -rf testdata test.tar test.tar.gz test.tar.bz2 test.tar.xz test_gz9.tar.gz test_bz2_9.tar.bz2 test_xz9.tar.xz