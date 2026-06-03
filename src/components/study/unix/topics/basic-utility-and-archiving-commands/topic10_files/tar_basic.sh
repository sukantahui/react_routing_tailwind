#!/bin/bash
# tar_basic.sh - Basic tar archive operations

echo "=== Basic tar Usage ==="

# Create sample files and directories
mkdir -p documents backups
echo "Hello World" > documents/readme.txt
echo "Important data" > documents/secret.txt
cp -r documents backups/
echo "Backup copy" > backups/backup_info.txt

echo -e "\n1. Create a tar archive (without compression):"
tar -cvf archive.tar documents/ backups/
ls -lh archive.tar

echo -e "\n2. List contents of tar archive:"
tar -tvf archive.tar | head -10

echo -e "\n3. Extract tar archive:"
mkdir extract_test
tar -xvf archive.tar -C extract_test
ls -l extract_test/

echo -e "\n4. Create compressed tar (gzip):"
tar -czvf archive.tar.gz documents/
ls -lh archive.tar.gz

echo -e "\n5. Extract with automatic compression detection:"
tar -xvf archive.tar.gz -C extract_test/
echo "Extracted using same method"

# Cleanup
rm -rf documents backups archive.tar archive.tar.gz extract_test