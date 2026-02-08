#!/bin/bash
# sort command examples

echo "sort Command - Data Organization"
echo "================================"

# Create test data
cat > /tmp/products.txt << 'EOF'
Laptop 85000
Mouse 1200
Keyboard 2500
Monitor 22000
Tablet 45000
Mouse 1200
Laptop 85000
Headphones 3500
EOF

echo "1. Basic alphabetical sort:"
echo "---------------------------"
sort /tmp/products.txt

echo -e "\n2. Reverse sort:"
echo "----------------"
sort -r /tmp/products.txt

echo -e "\n3. Numerical sort by price (2nd column):"
echo "------------------------------------------"
sort -k2 -n /tmp/products.txt

echo -e "\n4. Sort and remove duplicates:"
echo "---------------------------------"
sort -u /tmp/products.txt

echo -e "\n5. Case-insensitive sort:"
echo "---------------------------"
cat > /tmp/case_test.txt << 'EOF'
apple
Banana
cherry
Date
EOF
echo "Before sort:" && cat /tmp/case_test.txt
echo "After sort -f:" && sort -f /tmp/case_test.txt

echo -e "\n6. Sort by multiple columns:"
echo "------------------------------"
cat > /tmp/students.txt << 'EOF'
John Math 85
Alice Science 92
Bob Math 78
Alice Math 88
John Science 79
EOF
echo "Sort by name, then subject:"
sort -k1,1 -k2,2 /tmp/students.txt

# Cleanup
rm -f /tmp/products.txt /tmp/case_test.txt /tmp/students.txt