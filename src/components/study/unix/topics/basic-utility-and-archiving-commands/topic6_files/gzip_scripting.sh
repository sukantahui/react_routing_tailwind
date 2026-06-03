#!/bin/bash
# gzip_scripting.sh - Using gzip in scripts

echo "=== Scripting with gzip ==="

# Function to compress a file with timestamp
compress_with_timestamp() {
    local file=$1
    if [ -f "$file" ] && [ ! -f "$file.gz" ]; then
        gzip -k "$file"
        echo "$(date): Compressed $file" >> compress.log
        echo "Compressed: $file"
    else
        echo "Skipping $file (already compressed or missing)"
    fi
}

# Create sample files
echo "Creating sample files..."
for i in {1..5}; do
    echo "Data for file $i" > "data_$i.txt"
done

echo -e "\n1. Conditional compression:"
for f in data_*.txt; do
    compress_with_timestamp "$f"
done

echo -e "\n2. Compress only if size > 1KB (simulate):"
for f in data_*.txt.gz; do
    size=$(stat -c%s "$f")
    if [ $size -gt 1024 ]; then
        echo "$f is already >1KB (not compressing further)"
    else
        echo "$f is small"
    fi
done

echo -e "\n3. Backup old logs (older than 7 days):"
# Simulate old files
touch -t 202503010000 old_log.log
touch new_log.log
find . -name "*.log" -type f -mtime +7 -exec gzip {} \; 2>/dev/null
echo "Compressed old logs:"
ls -l *.gz 2>/dev/null

echo -e "\n4. Cleanup compressed files older than 30 days:"
# find . -name "*.gz" -type f -mtime +30 -delete
echo "(Simulated: would delete old gz files)"

echo -e "\nLog entries:"
cat compress.log

# Cleanup
rm -f data_*.txt data_*.gz old_log.log new_log.log compress.log