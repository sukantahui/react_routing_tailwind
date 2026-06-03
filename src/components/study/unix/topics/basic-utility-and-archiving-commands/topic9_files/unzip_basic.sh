#!/bin/bash
# unzip_basic.sh - Basic extraction with unzip

echo "=== Basic unzip Usage ==="

# Create a sample ZIP file
echo "Creating sample archive..."
mkdir -p testdata
echo "File one content" > testdata/file1.txt
echo "File two content" > testdata/file2.txt
mkdir -p testdata/subdir
echo "Nested content" > testdata/subdir/secret.txt
zip -r sample.zip testdata

echo -e "\n1. Extract entire archive:"
unzip sample.zip
ls -l testdata/

echo -e "\n2. Extract to a different directory (-d):"
mkdir extracted
unzip sample.zip -d extracted
ls -l extracted/

echo -e "\n3. List contents without extracting (-l):"
unzip -l sample.zip

echo -e "\n4. Quiet extraction (-q) - suppress messages:"
mkdir quiet_extract
unzip -q sample.zip -d quiet_extract
echo "Extraction completed silently"

echo -e "\n5. Overwrite prevention (-n):"
# Simulate existing file
touch testdata/file1.txt
echo "Trying to extract without overwriting:"
unzip -n sample.zip -d testdata

# Cleanup
rm -rf testdata extracted quiet_extract sample.zip