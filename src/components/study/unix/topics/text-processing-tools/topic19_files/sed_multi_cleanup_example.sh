#!/bin/bash
# Multi-step Cleanup Pipeline Example
# Demonstrating complex data transformation pipeline

echo "=== Multi-step Cleanup Pipeline ==="
echo "Creating a complex cleanup script with multiple sed operations"

cat > cleanup_pipeline.sed << 'EOF'
# Cleanup Pipeline Script
# Step 1: Remove leading/trailing whitespace
s/^[[:space:]]*//
s/[[:space:]]*$//

# Step 2: Convert all text to lowercase first (for case normalization)
s/.*/\L&/

# Step 3: Capitalize first letter of each word (for proper names)
s/\b\(.\)/\u\1/g

# Step 4: Fix date formats (MM/DD/YYYY to YYYY-MM-DD)
s#\([0-9]\{1,2\}\)/\([0-9]\{1,2\}\)/\([0-9]\{4\}\)#\3-\1-\2#
s#\([0-9]\{4\}\)-\([0-9]\{1\}\)-\([0-9]\{1,2\}\)#\3-0\2-0\1#
s#\([0-9]\{4\}\)-\([0-9]\{2\}\)-\([0-9]\{1\}\)#\3-0\2-\1#
s#\([0-9]\{4\}\)-\([0-9]\{1\}\)-\([0-9]\{2\}\)#\3-0\2-\1#

# Step 5: Clean currency values (remove $ and add .00 if needed)
s/\$\([0-9]\+\.[0-9]\{2\}\)/\1/
s/\$\([0-9]\+\)/\1.00/

# Step 6: Remove duplicate whitespace
s/[[:space:]]\+/ /g

# Step 7: Normalize delimiters (ensure comma-space separation)
s/[[:space:]]*,[[:space:]]*/, /g

# Step 8: Remove empty lines
/^$/d
EOF

echo "Pipeline script created. Sample data processing:"
echo ""
echo "Original messy data:"
cat << 'EOF'
  john smith  , $100 , 1/5/2023  ,new york

JANE DOE,$150.50,2023-01-05,BOSTON  
  bob  jones,$75,2023-1-5,chicago
EOF

echo ""
echo "After applying cleanup pipeline:"
sed -f cleanup_pipeline.sed << 'EOF'
  john smith  , $100 , 1/5/2023  ,new york

JANE DOE,$150.50,2023-01-05,BOSTON  
  bob  jones,$75,2023-1-5,chicago
EOF