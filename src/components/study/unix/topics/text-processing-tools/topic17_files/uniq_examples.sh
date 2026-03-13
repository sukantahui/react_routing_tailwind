#!/bin/bash
# uniq command examples

echo "uniq Command - Deduplication & Counting"
echo "========================================"

# Create test data with duplicates
cat > /tmp/access_log.txt << 'EOF'
192.168.1.1
192.168.1.2
192.168.1.1
192.168.1.3
192.168.1.1
192.168.1.2
192.168.1.4
192.168.1.1
EOF

echo "1. Basic uniq (requires sorted input):"
echo "--------------------------------------"
echo "Raw data:" && cat /tmp/access_log.txt
echo -e "\nAfter sort | uniq:"
sort /tmp/access_log.txt | uniq

echo -e "\n2. Count occurrences (uniq -c):"
echo "---------------------------------"
sort /tmp/access_log.txt | uniq -c

echo -e "\n3. Show only duplicates (uniq -d):"
echo "-------------------------------------"
sort /tmp/access_log.txt | uniq -d

echo -e "\n4. Show only unique lines (uniq -u):"
echo "---------------------------------------"
sort /tmp/access_log.txt | uniq -u

echo -e "\n5. Case-insensitive uniq:"
echo "---------------------------"
cat > /tmp/case_dup.txt << 'EOF'
Apple
apple
Banana
banana
Apple
cherry
EOF
echo "Data:" && cat /tmp/case_dup.txt
echo -e "\nCase-insensitive uniq:"
sort -f /tmp/case_dup.txt | uniq -i

echo -e "\n6. Real example: Find duplicate products"
echo "-------------------------------------------"
cat > /tmp/products.txt << 'EOF'
Laptop
Mouse
Keyboard
Laptop
Monitor
Mouse
Tablet
Mouse
EOF
echo "Products with counts:"
sort /tmp/products.txt | uniq -c

# Cleanup
rm -f /tmp/access_log.txt /tmp/case_dup.txt /tmp/products.txt