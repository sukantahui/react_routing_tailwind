#!/bin/bash
# gunzip_options.sh - Exploring decompression options

echo "=== Gunzip Options Demo ==="

# Setup: create compressed files
echo "Creating compressible data..."
for i in {1..200}; do echo "abcdefghijklmnopqrstuvwxyz$i" >> data.txt; done
gzip -k data.txt
echo "Created data.txt and data.txt.gz"

echo -e "\n1. Test integrity (-t) - checks if file is valid:"
gunzip -t data.txt.gz && echo "✓ File is valid" || echo "✗ File corrupt"

echo -e "\n2. Force decompression (-f) when output exists:"
cp data.txt.gz data_force.gz
gunzip data_force.gz          # this works (output doesn't exist yet)
echo "First decompression done."
# Now try to decompress again - should fail without -f
cp data.txt.gz data_force.gz
gunzip data_force.gz 2>/dev/null && echo "Unexpected success" || echo "Expected: refuses to overwrite"
echo "With -f:"
gunzip -f data_force.gz && echo "Overwrote existing"

echo -e "\n3. Verbose output (-v):"
gunzip -v data.txt.gz

echo -e "\n4. List contents (-l) - shows compressed/uncompressed sizes:"
gzip -l data.txt.gz

echo -e "\n5. Keep original with -k (already demonstrated):"
gzip -k data.txt
gunzip -k data.txt.gz
echo "Both data.txt and data.txt.gz exist:"
ls -l data.txt*

# Cleanup
rm -f data.txt data.txt.gz data_force.gz