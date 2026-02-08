#!/bin/bash
# Advanced Data Normalization Example
# Standardizing product data with mixed formats

echo "=== Example 2: Product Data Normalization ==="
echo "Original inconsistent product data:"
cat << 'EOF'
product: Laptop, price: $999.99, date: 04-12-2023
PRODUCT: MOUSE, PRICE: $49.50, DATE: 2023/12/04
Product: Keyboard, Price: $79, Date: Dec 4, 2023
EOF

echo ""
echo "Step 1: Normalize product name casing"
echo "sed 's/^[Pp]RODUCT:/Product:/' - standardizes 'product:' prefix"
sed 's/^[Pp]RODUCT:/Product:/' << 'EOF'
product: Laptop, price: $999.99, date: 04-12-2023
PRODUCT: MOUSE, PRICE: $49.50, DATE: 2023/12/04
Product: Keyboard, Price: $79, Date: Dec 4, 2023
EOF

echo ""
echo "Step 2: Remove currency symbols and standardize price format"
echo "sed 's/\\$//g' - removes dollar signs"
sed -e 's/^[Pp]RODUCT:/Product:/' -e 's/\$//g' << 'EOF'
product: Laptop, price: $999.99, date: 04-12-2023
PRODUCT: MOUSE, PRICE: $49.50, DATE: 2023/12/04
Product: Keyboard, Price: $79, Date: Dec 4, 2023
EOF

echo ""
echo "Step 3: Standardize date format to YYYY-MM-DD"
echo "Multiple sed commands for different date formats"
cat > /tmp/normalize_dates.sed << 'EOF'
# Convert DD-MM-YYYY to YYYY-MM-DD
s/\([0-9]\{2\}\)-\([0-9]\{2\}\)-\([0-9]\{4\}\)/\3-\2-\1/
# Convert YYYY/MM/DD to YYYY-MM-DD
s|\([0-9]\{4\}\)/\([0-9]\{2\}\)/\([0-9]\{2\}\)|\1-\2-\3|
# Convert Month D, YYYY to YYYY-MM-DD (simplified)
s/Jan \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-01-\1/
s/Feb \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-02-\1/
s/Mar \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-03-\1/
s/Apr \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-04-\1/
s/May \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-05-\1/
s/Jun \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-06-\1/
s/Jul \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-07-\1/
s/Aug \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-08-\1/
s/Sep \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-09-\1/
s/Oct \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-10-\1/
s/Nov \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-11-\1/
s/Dec \([0-9]\{1,2\}\), \([0-9]\{4\}\)/\2-12-\1/
EOF

echo ""
echo "Step 4: Complete normalization pipeline"
echo "Final normalized data:"
sed -e 's/^[Pp]RODUCT:/Product:/' \
    -e 's/\$//g' \
    -e 's/price:/Price:/g' \
    -e 's/date:/Date:/g' \
    -e 's/PRICE:/Price:/g' \
    -e 's/DATE:/Date:/g' \
    -f /tmp/normalize_dates.sed << 'EOF'
product: Laptop, price: $999.99, date: 04-12-2023
PRODUCT: MOUSE, PRICE: $49.50, DATE: 2023/12/04
Product: Keyboard, Price: $79, Date: Dec 4, 2023
EOF