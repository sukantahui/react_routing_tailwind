#!/bin/bash
# join_different_delimiters.sh - Using custom delimiter (-t)
cat > customers.csv <<EOF
101,Swadeep,Barrackpore
102,Tuhina,Shyamnagar
103,Abhronila,Ichapur
EOF

cat > orders.csv <<EOF
101,5000
103,7500
104,2000
EOF

echo "=== CSV files (comma delimiter) ==="
echo "customers.csv:"
cat customers.csv
echo "orders.csv:"
cat orders.csv

echo -e "\n=== Sort both on first field (comma) ==="
sort -t',' -k1,1 customers.csv -o customers_sorted.csv
sort -t',' -k1,1 orders.csv -o orders_sorted.csv

echo -e "\n=== join with -t',' ==="
join -t',' customers_sorted.csv orders_sorted.csv

# Cleanup
rm customers.csv orders.csv customers_sorted.csv orders_sorted.csv