#!/bin/bash
# zip_basic.sh - Basic zip archive creation

echo "=== Basic zip Usage ==="

# Create sample files
echo "Creating sample files..."
echo "Content of file1" > file1.txt
echo "Content of file2" > file2.txt
echo "Content of file3" > file3.txt
mkdir -p sampledir
echo "Inside directory" > sampledir/data.txt

echo -e "\n1. Create ZIP archive of multiple files:"
zip archive.zip file1.txt file2.txt file3.txt
ls -lh archive.zip

echo -e "\n2. Add more files to existing archive:"
echo "New file" > file4.txt
zip archive.zip file4.txt
unzip -l archive.zip

echo -e "\n3. Create archive with a directory (without -r, only directory name stored):"
zip dir_only.zip sampledir
unzip -l dir_only.zip

echo -e "\n4. Create archive with directory recursively:"
zip -r full_dir.zip sampledir
unzip -l full_dir.zip

echo -e "\n5. Create archive with custom compression level (-1 fastest):"
zip -1 -r fast.zip sampledir file*.txt
unzip -l fast.zip

echo -e "\n6. Quiet mode (-q) for scripts:"
zip -q -r quiet.zip sampledir
echo "Quiet archive created"

# Cleanup
rm -f file*.txt sampledir/data.txt file4.txt archive.zip dir_only.zip full_dir.zip fast.zip quiet.zip
rmdir sampledir