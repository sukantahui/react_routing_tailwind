#!/bin/bash
# bc_variables.sh - Using variables and scale

echo "=== Variables and Scale in bc ==="

echo "1. Setting and using variables:"
bc <<EOF
price = 29.99
tax_rate = 0.08
total = price * (1 + tax_rate)
total
EOF

echo -e "\n2. Scale affects division:"
bc <<EOF
scale=0
5/2
scale=3
5/2
EOF

echo -e "\n3. Assigning scale inside bc:"
bc -l <<EOF
scale=10
sqrt(2)
EOF

echo -e "\n4. Using last result variable (dot):"
bc <<EOF
3.5 * 2
. + 1
EOF

echo -e "\n5. Arrays in bc:"
bc <<EOF
arr[0]=10; arr[1]=20; arr[0] + arr[1]
EOF