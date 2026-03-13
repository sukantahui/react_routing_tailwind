#!/bin/bash
# Topic 25: Advanced Cleanup - Handle complex CSV issues

echo "Advanced CSV cleanup techniques..."
echo ""

# 1. Convert Windows line endings to Unix
echo "1. Converting line endings..."
dos2unix -n input.csv temp1.csv 2>/dev/null || cp input.csv temp1.csv
echo "   Converted CRLF to LF"

# 2. Remove UTF-8 BOM if present
echo "2. Checking for BOM..."
if head -c3 temp1.csv | grep -q $'\xef\xbb\xbf'; then
    tail -c +4 temp1.csv > temp2.csv
    echo "   Removed UTF-8 BOM"
else
    cp temp1.csv temp2.csv
    echo "   No BOM found"
fi

# 3. Fix inconsistent delimiters (replace semicolons with commas)
echo "3. Standardizing delimiters..."
sed 's/;/,/g' temp2.csv > temp3.csv
echo "   Converted semicolons to commas"

# 4. Handle embedded commas in quoted fields
echo "4. Processing quoted fields..."
awk '
BEGIN { FPAT = "([^,]+)|(\"[^\"]+\")"; OFS="," }
{
    for (i=1; i<=NF; i++) {
        # Remove quotes, trim, then re-quote if contains comma
        gsub(/^"|"$/, "", $i)
        gsub(/^[ \t]+|[ \t]+$/, "", $i)
        if ($i ~ /,/) $i = "\"" $i "\""
    }
    print $0
}' temp3.csv > cleaned.csv

echo "   Processed embedded commas"

# Cleanup
rm -f temp1.csv temp2.csv temp3.csv
echo ""
echo "Advanced cleanup complete!"
echo "Output: cleaned.csv"