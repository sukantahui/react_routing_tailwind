#!/bin/bash
# zip_recursive.sh - Recursive directory archiving

echo "=== Recursive Zip Examples ==="

# Create a nested directory structure
echo "Creating nested directory tree..."
mkdir -p project/{src,docs,tests}
echo "print('Hello')" > project/src/main.py
echo "README" > project/README.md
echo "test1" > project/tests/test_a.py
echo "test2" > project/tests/test_b.py
mkdir -p project/docs/images
echo "logo" > project/docs/images/logo.png

echo -e "\n1. Recursively zip entire project:"
zip -r project.zip project
unzip -l project.zip | head -15

echo -e "\n2. Zip only certain file types recursively:"
zip -r source.zip project --include "*.py" "*.md"
unzip -l source.zip

echo -e "\n3. Zip without storing directory paths (-j junk paths):"
zip -j flat.zip project/src/main.py project/README.md
unzip -l flat.zip

echo -e "\n4. Recursive with exclude pattern:"
zip -r filtered.zip project -x "*.png" "docs/*"
unzip -l filtered.zip

echo -e "\n5. Zip while following symlinks (dangerous for loops):"
ln -s project/project project/self_link
zip -r --symlinks with_links.zip project
unzip -l with_links.zip | grep link

echo -e "\n6. Verbose recursive archive:"
zip -r -v verbose.zip project 2>&1 | head -10

# Cleanup
rm -rf project project.zip source.zip flat.zip filtered.zip with_links.zip verbose.zip
