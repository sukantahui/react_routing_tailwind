#!/bin/bash
# Topic 25: Basic CSV Cleanup Script
# Removes duplicates, empty lines, and fixes basic formatting

INPUT_FILE="${1:-students_raw.csv}"
CLEAN_FILE="students_cleaned.csv"
ERROR_LOG="cleanup_errors.log"

echo "Starting CSV cleanup process..."
echo "Input: $INPUT_FILE"
echo "Output: $CLEAN_FILE"
echo ""

# 1. Remove exact duplicates (keeping first occurrence)
echo "1. Removing duplicate records..."
awk '!seen[$0]++' "$INPUT_FILE" > temp1.csv
duplicates_removed=$(( $(wc -l < "$INPUT_FILE") - $(wc -l < temp1.csv) ))
echo "   Removed $duplicates_removed exact duplicates"
echo ""

# 2. Remove completely empty lines
echo "2. Removing empty lines..."
grep -v '^$' temp1.csv > temp2.csv
empty_removed=$(( $(wc -l < temp1.csv) - $(wc -l < temp2.csv) ))
echo "   Removed $empty_removed empty lines"
echo ""

# 3. Fix inconsistent quoting (ensure fields with commas are quoted)
echo "3. Standardizing quotation..."
awk -F',' '
BEGIN { OFS="," }
{
    for (i=1; i<=NF; i++) {
        if ($i ~ /,/ && $i !~ /^"/) {
            $i = "\"" $i "\""
        }
    }
    print $0
}' temp2.csv > temp3.csv
echo "   Fixed field quoting"
echo ""

# 4. Trim whitespace from all fields
echo "4. Trimming whitespace..."
awk -F',' '
BEGIN { OFS="," }
{
    for (i=1; i<=NF; i++) {
        gsub(/^[ \t]+|[ \t]+$/, "", $i)
    }
    print $0
}' temp3.csv > "$CLEAN_FILE"
echo "   Trimmed leading/trailing spaces"
echo ""

# 5. Generate summary
echo "=== CLEANUP SUMMARY ==="
echo "Original records: $(wc -l < "$INPUT_FILE")"
echo "Final records: $(wc -l < "$CLEAN_FILE")"
echo "Total removed: $(( $(wc -l < "$INPUT_FILE") - $(wc -l < "$CLEAN_FILE") ))"
echo "Clean file saved as: $CLEAN_FILE"

# Cleanup temp files
rm -f temp1.csv temp2.csv temp3.csv