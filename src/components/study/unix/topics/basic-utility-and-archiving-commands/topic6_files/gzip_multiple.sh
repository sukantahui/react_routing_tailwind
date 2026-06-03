#!/bin/bash
# gzip_multiple.sh - Compressing multiple files

echo "=== Multiple File Compression ==="

# Create multiple files
for f in file1.log file2.log file3.log; do
    echo "Log entry for $(date)" > $f
    for i in {1..100}; do echo "Data line $i" >> $f; done
done
echo "Created file1.log, file2.log, file3.log"

echo -e "\n1. Compressing multiple files one by one:"
gzip -v file1.log file2.log file3.log
ls -lh *.gz

echo -e "\n2. Decompress all .gz files:"
gunzip -v *.gz
ls -lh *.log

echo -e "\n3. Using wildcards: compress all .log files"
gzip *.log
ls -lh *.gz

echo -e "\n4. Recursive compression with find:"
mkdir -p testdir/subdir
echo "Content" > testdir/fileA.txt
echo "Content" > testdir/subdir/fileB.txt
find testdir -name "*.txt" -exec gzip {} \;
find testdir -name "*.gz" -ls

# Cleanup
rm -rf testdir file*.log *.gz