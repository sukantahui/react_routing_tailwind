#!/bin/bash
# Basic Data Cleanup Example
# This script demonstrates common data cleanup operations using sed

echo "=== Example 1: Cleaning Student Data ==="
echo "Original data with inconsistencies:"
cat << 'EOF'
Name , Age , Grade ,City
John  DOE ,15,A, New York  
Jane Smith,16 ,B,Los Angeles
Bob  Johnson ,14 , A , Chicago
EOF

echo ""
echo "Step 1: Remove extra spaces around commas"
echo "sed 's/\\s*,\\s*/,/g' - removes spaces before/after commas"
echo "Result:"
sed 's/\s*,\s*/,/g' << 'EOF'
Name , Age , Grade ,City
John  DOE ,15,A, New York  
Jane Smith,16 ,B,Los Angeles
Bob  Johnson ,14 , A , Chicago
EOF

echo ""
echo "Step 2: Trim extra spaces between words"
echo "sed 's/\\s\\+/ /g' - reduces multiple spaces to single space"
echo "Result:"
sed -e 's/\s*,\s*/,/g' -e 's/\s\+/ /g' << 'EOF'
Name , Age , Grade ,City
John  DOE ,15,A, New York  
Jane Smith,16 ,B,Los Angeles
Bob  Johnson ,14 , A , Chicago
EOF

echo ""
echo "Step 3: Standardize column names to title case"
echo "sed 's/^[a-z]/\U&/' - capitalizes first letter of each line"
echo "Final Clean Data:"
sed -e 's/\s*,\s*/,/g' -e 's/\s\+/ /g' -e 's/^[a-z]/\U&/' << 'EOF'
Name , Age , Grade ,City
John  DOE ,15,A, New York  
Jane Smith,16 ,B,Los Angeles
Bob  Johnson ,14 , A , Chicago
EOF