#!/bin/bash
# unzip_selective.sh - Extracting specific files

echo "=== Selective Extraction ==="

# Create a structured ZIP
mkdir -p project/{src,doc,backup}
echo "main() { }" > project/src/main.c
echo "README" > project/README.md
echo "config" > project/settings.ini
echo "old data" > project/backup/old_backup.txt
zip -r project.zip project

echo -e "\n1. Extract only specific file types:"
mkdir only_c
unzip project.zip "*.c" -d only_c
find only_c -type f

echo -e "\n2. Extract excluding certain files (-x):"
mkdir exclude_backup
unzip project.zip -x "*/backup/*" -d exclude_backup
find exclude_backup -type f

echo -e "\n3. Extract files matching multiple patterns:"
mkdir multi_pattern
unzip project.zip "*.md" "*.ini" -d multi_pattern
ls multi_pattern/project/

echo -e "\n4. Extract files by name (literal):"
mkdir specific
unzip project.zip project/README.md project/settings.ini -d specific
ls specific/project/

echo -e "\n5. Extract from stdin using -p (pipe):"
unzip -p project.zip project/README.md
echo "Content piped to stdout above"

echo -e "\n6. Extract newest file only (using -l and tail):"
latest=$(unzip -l project.zip | grep -v '/' | tail -1 | awk '{print $4}')
echo "Latest file: $latest"
unzip project.zip "$latest" -d latest_only

# Cleanup
rm -rf project project.zip only_c exclude_backup multi_pattern specific latest_only