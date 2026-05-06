#!/bin/bash
# pr_columns.sh - Displaying text in multiple columns

echo "=== Multi-column output ==="
cat > fruits.txt <<EOF
Apple
Apricot
Avocado
Banana
Blackberry
Blueberry
Cherry
Coconut
Cranberry
Date
Elderberry
Fig
Grape
Grapefruit
Guava
Honeydew
Kiwi
Lemon
Lime
Mango
EOF

echo "1. Two columns:"
pr -2 fruits.txt

echo -e "\n2. Three columns with custom header:"
pr -3 -h "Fruit List (3 columns)" fruits.txt

echo -e "\n3. Four columns, no header:"
pr -4 -T fruits.txt

echo -e "\n4. Wide columns (-W 50) for long names:"
pr -4 -W 50 fruits.txt