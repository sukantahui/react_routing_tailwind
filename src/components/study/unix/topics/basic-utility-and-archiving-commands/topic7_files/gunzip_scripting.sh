#!/bin/bash
# gunzip_scripting.sh - Using gunzip in scripts

echo "=== Scripting with gunzip ==="

# Function to safely decompress with verification
safe_decompress() {
    local archive=$1
    if [ ! -f "$archive" ]; then
        echo "Error: $archive not found"
        return 1
    fi
    
    # Test integrity first
    if gunzip -t "$archive" 2>/dev/null; then
        echo "Integrity check passed for $archive"
        gunzip "$archive"
        echo "Decompressed: ${archive%.gz}"
    else
        echo "ERROR: $archive is corrupt"
        return 1
    fi
}

# Create test archives
echo "Creating test archives..."
echo "Good data" > good.txt
gzip good.txt
echo "Bad data" > bad.txt
gzip bad.txt
# Corrupt one by appending garbage
echo "corrupt" >> bad.txt.gz

echo -e "\n1. Safe decompression function:"
safe_decompress good.txt.gz
safe_decompress bad.txt.gz

echo -e "\n2. Extract specific file from a directory of .gz:"
mkdir -p archive_dir
for i in {1..3}; do
    echo "Content $i" > archive_dir/file$i.txt
    gzip archive_dir/file$i.txt
done
# Decompress only file2.gz
gunzip archive_dir/file2.txt.gz
ls -l archive_dir/

echo -e "\n3. Decompress and send to different directory:"
mkdir output_dir
gunzip -c archive_dir/file1.txt.gz > output_dir/restored.txt
cat output_dir/restored.txt

echo -e "\n4. Monitor decompression progress for large files (simulate):"
# Using pv if installed
if command -v pv &>/dev/null; then
    dd if=/dev/zero bs=1M count=10 2>/dev/null | gzip > large.gz
    pv large.gz | gunzip > /dev/null
    rm large.gz
else
    echo "Install 'pv' for progress monitoring"
fi

# Cleanup
rm -rf good.txt bad.txt good.txt.gz bad.txt.gz archive_dir output_dir