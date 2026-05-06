#!/bin/bash
# bc_basic.sh - Basic arithmetic with bc

echo "=== Basic bc Usage ==="

echo "1. Simple addition:"
echo "2 + 3" | bc

echo -e "\n2. Multiplication and division (integer division by default):"
echo "10 / 3" | bc

echo -e "\n3. Setting scale for decimal precision:"
echo "scale=2; 10 / 3" | bc

echo -e "\n4. Using bc in command substitution:"
result=$(echo "scale=4; 22/7" | bc)
echo "22/7 = $result"

echo -e "\n5. Multiple expressions:"
echo "x=5; y=3; x*y; x^y" | bc

echo -e "\n6. Using bc with here-document:"
bc <<EOF
scale=3
(10 + 5) / 3
EOF