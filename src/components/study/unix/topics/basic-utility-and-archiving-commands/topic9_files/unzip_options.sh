#!/bin/bash
# unzip_options.sh - Exploring advanced options

echo "=== Unzip Options Demo ==="

# Create test ZIP with various files
echo "Creating test archive..."
mkdir -p testfiles
echo "Document 1" > testfiles/doc1.txt
echo "Document 2" > testfiles/doc2.txt
echo "Picture 1" > testfiles/image1.png
echo "Picture 2" > testfiles/image2.png
mkdir -p testfiles/backup
echo "Important" > testfiles/backup/data.txt
zip -r test.zip testfiles

echo -e "\n1. Test archive integrity (-t):"
unzip -t test.zip

echo -e "\n2. Extract with verbose output (-v):"
mkdir verbose_out
unzip -v test.zip -d verbose_out | head -20

echo -e "\n3. Extract without directory structure (-j):"
mkdir junked
unzip -j test.zip "*.txt" -d junked
ls -l junked/

echo -e "\n4. Extract only newer files (-u):"
touch testfiles/newer.txt
zip test.zip testfiles/newer.txt
mkdir update_test
cp testfiles/doc1.txt update_test/  # old version
unzip -u test.zip -d update_test
ls -l update_test/

echo -e "\n5. Password extraction (if encrypted):"
zip -e -P secret encrypted.zip testfiles/doc1.txt
unzip -P secret encrypted.zip -d encrypt_out
ls encrypt_out/

echo -e "\n6. Extract files matching a pattern:"
mkdir pattern_out
unzip test.zip "*.png" -d pattern_out
ls pattern_out/

# Cleanup
rm -rf testfiles test.zip verbose_out junked update_test encrypted.zip encrypt_out pattern_out