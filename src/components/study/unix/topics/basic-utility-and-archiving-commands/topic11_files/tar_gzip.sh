#!/bin/bash
# tar_gzip.sh - Using tar with gzip compression (.tar.gz)

echo "=== Tar + gzip (.tar.gz) ==="

# Setup test directory
mkdir -p project/{src,docs}
for i in {1..50}; do echo "Line $i" >> project/src/main.py; done
echo "README" > project/docs/README.md

echo -e "\n1. Create .tar.gz archive with default compression:"
tar -czvf project.tar.gz project/
ls -lh project.tar.gz

echo -e "\n2. Create with maximum compression (-9):"
tar -czvf - project/ | gzip -9 > project_max.tar.gz
ls -lh project_max.tar.gz

echo -e "\n3. Extract .tar.gz archive:"
mkdir extract_gz
tar -xzvf project.tar.gz -C extract_gz/
ls -l extract_gz/

echo -e "\n4. List contents without extracting:"
tar -tzvf project.tar.gz | head -5

echo -e "\n5. Create .tgz (same as .tar.gz):"
tar -czvf project.tgz project/
ls -lh project.tgz

echo -e "\n6. Pipe tar over SSH (simulate):"
echo "tar -czf - project/ | ssh user@host 'cat > remote.tar.gz'"
echo "(Command would stream compressed archive)"

# Cleanup
rm -rf project project.tar.gz project_max.tar.gz project.tgz extract_gz