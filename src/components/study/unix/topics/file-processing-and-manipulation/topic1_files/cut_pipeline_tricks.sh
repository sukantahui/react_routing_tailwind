#!/bin/bash
# cut_pipeline_tricks.sh - Advanced pipelines
cat > sales.csv <<EOF
Date,Product,Quantity,Price
2025-01-01,Widget,10,100
2025-01-02,Gadget,5,200
2025-01-03,Widget,7,150
2025-01-04,Thingy,3,300
EOF

echo "=== 1. Extract Product and Quantity, then sort by Quantity ==="
cut -d',' -f2,3 sales.csv | tail -n +2 | sort -t',' -k2 -n

echo -e "\n=== 2. Show only products sold > 5 units ==="
cut -d',' -f2,3 sales.csv | tail -n +2 | awk -F',' '$2>5 {print $1}'

echo -e "\n=== 3. Transform CSV to space-separated with custom header ==="
echo "Product Price"
cut -d',' -f2,3 --output-delimiter=' ' sales.csv | tail -n +2

echo -e "\n=== 4. Count of each product (using cut + sort + uniq) ==="
cut -d',' -f2 sales.csv | tail -n +2 | sort | uniq -c

# Cleanup
rm sales.csv