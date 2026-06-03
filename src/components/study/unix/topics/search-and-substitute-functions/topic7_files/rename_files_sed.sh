#!/bin/bash
# rename_files_sed.sh - Bulk file renaming using sed in a loop
mkdir -p test_files
cd test_files
touch report_2024_01.txt report_2024_02.txt report_2024_03.txt

echo "=== Original files ==="
ls -1

echo -e "\n=== Rename 'report_2024_' to 'annual_2024_' ==="
for file in report_2024_*.txt; do
    newname=$(echo "$file" | sed 's/report_2024_/annual_2024_/')
    mv "$file" "$newname"
    echo "Renamed: $file → $newname"
done

echo -e "\n=== After renaming ==="
ls -1

# Cleanup
cd .. && rm -rf test_files