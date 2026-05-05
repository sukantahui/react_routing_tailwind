#!/bin/bash
# select_rows_columns.sh - Combine head/tail with cut
cat > sales.csv <<EOF
Date,Product,Quantity,Price
2025-01-01,Widget,10,100
2025-01-02,Gadget,5,200
2025-01-03,Widget,7,150
2025-01-04,Thingy,3,300
2025-01-05,Widget,12,120
EOF

echo "=== First 2 rows (including header) ==="
head -2 sales.csv

echo -e "\n=== First 3 rows, only Product and Quantity ==="
head -3 sales.csv | cut -d',' -f2,3

echo -e "\n=== Skip header, get last 2 rows, only Quantity and Price ==="
tail -n +2 sales.csv | tail -2 | cut -d',' -f3,4

# Cleanup
rm sales.csv