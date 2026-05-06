#!/bin/bash
# zip_options.sh - Exploring zip options

echo "=== Zip Options Demo ==="

# Create test data
echo "Creating test files..."
for i in {1..100}; do echo "Line $i of repetitive text for compression testing." >> compressible.txt; done
dd if=/dev/urandom of=random.bin bs=1K count=50 2>/dev/null
mkdir -p logs
echo "Log entry" > logs/app.log
echo "Another log" > logs/error.log

echo -e "\n1. Compression level comparison (-1 vs -9):"
zip -1 -r level1.zip compressible.txt logs
zip -9 -r level9.zip compressible.txt logs
ls -lh level*.zip

echo -e "\n2. Encryption (-e) - password protected:"
echo "password" | zip -e -P secret pass_protected.zip compressible.txt
unzip -l pass_protected.zip

echo -e "\n3. Excluding files (-x):"
zip -r backup.zip compressible.txt logs -x "*.bin" "logs/error.log"
unzip -l backup.zip

echo -e "\n4. Move files into archive (-m) - deletes originals after adding:"
cp compressible.txt to_move.txt
zip -m moved.zip to_move.txt
if [ ! -f to_move.txt ]; then echo "Original to_move.txt removed"; else echo "Original still exists"; fi

echo -e "\n5. Symlink handling (-y):"
ln -s compressible.txt link.txt
zip -y symlink.zip link.txt
unzip -l symlink.zip

echo -e "\n6. Update only new files (-u):"
echo "Updated" >> compressible.txt
zip -u backup.zip compressible.txt
echo "Update completed"

# Cleanup
rm -f compressible.txt random.bin level*.zip pass_protected.zip backup.zip moved.zip symlink.zip link.txt
rm -rf logs