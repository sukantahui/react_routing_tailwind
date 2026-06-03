#!/bin/bash
# join_multiple_fields.sh - Selecting output fields with -o
cat > products.txt <<EOF
P001 Laptop Dell
P002 Mouse Logitech
P003 Keyboard HP
EOF

cat > prices.txt <<EOF
P001 1200
P002 25
P003 45
EOF

echo "=== Original files ==="
echo "products.txt (columns: ID, Product, Brand):"
cat products.txt
echo "prices.txt (columns: ID, Price):"
cat prices.txt

sort -k1,1 products.txt -o p_sorted.txt
sort -k1,1 prices.txt -o price_sorted.txt

echo -e "\n=== join with custom output (-o 1.2,1.3,2.2) ==="
echo "Output columns: Product, Brand, Price:"
join -o 1.2,1.3,2.2 p_sorted.txt price_sorted.txt

# Cleanup
rm products.txt prices.txt p_sorted.txt price_sorted.txt