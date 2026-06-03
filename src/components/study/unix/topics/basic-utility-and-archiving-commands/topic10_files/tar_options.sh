#!/bin/bash
# tar_options.sh - Advanced tar options

echo "=== Tar Options Demo ==="

# Setup
mkdir -p data/subdir
echo "Content 1" > data/file1.txt
echo "Content 2" > data/file2.txt
echo "Sub content" > data/subdir/file3.txt

echo -e "\n1. Create archive excluding files (-X or --exclude):"
tar -cvf exclude.tar data --exclude="*.txt"
tar -tvf exclude.tar

echo -e "\n2. Append files to existing archive (-r):"
tar -rf exclude.tar data/subdir/
tar -tvf exclude.tar

echo -e "\n3. Update only newer files (-u):"
sleep 1
echo "Updated" >> data/file1.txt
tar -uf exclude.tar data/file1.txt
tar -tvf exclude.tar

echo -e "\n4. Extract without directory structure (--strip-components=1):"
mkdir strip_test
tar -xvf exclude.tar --strip-components=1 -C strip_test
ls -l strip_test/

echo -e "\n5. Create archive with relative paths (-C):"
tar -cvf relative.tar -C data file1.txt file2.txt
tar -tvf relative.tar

echo -e "\n6. Create multi-volume tar (for floppy):"
# Use -M and --tape-length, simulate with small size
echo "tar -M -L 1024 -f volume.tar data/" | head -1

# Cleanup
rm -rf data exclude.tar strip_test relative.tar volume.tar*