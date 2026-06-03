#!/bin/bash
# gunzip_multiple.sh - Decompressing multiple files

echo "=== Batch Decompression ==="

# Create multiple compressed files
echo "Creating compressed log files..."
for i in {1..5}; do
    echo "Log entry for day $i" > log$i.txt
    for j in {1..50}; do echo "Data line $j" >> log$i.txt; done
    gzip log$i.txt
done
ls -lh *.gz

echo -e "\n1. Decompress all .gz files at once:"
gunzip *.gz
ls -lh *.txt

echo -e "\n2. Recompress and decompress with wildcards:"
gzip *.txt
gunzip -v *.gz
echo "Done."

echo -e "\n3. Using find to decompress recursively:"
mkdir -p deep/folder
echo "Nested file" > deep/test.txt
gzip deep/test.txt
echo "Another" > deep/folder/data.txt
gzip deep/folder/data.txt
find deep -name "*.gz" -exec gunzip {} \;
find deep -type f -name "*.txt" -ls

echo -e "\n4. Decompress but skip if output exists (using shell loop):"
gzip -k data.txt 2>/dev/null || echo "Creating data.txt.gz"
for f in *.gz; do
    if [ -f "${f%.gz}" ]; then
        echo "Skipping $f: output exists"
    else
        gunzip "$f"
    fi
done

# Cleanup
rm -rf log*.txt data.txt data.txt.gz deep/