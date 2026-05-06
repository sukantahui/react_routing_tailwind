#!/bin/bash
# bc_advanced.sh - Math library, base conversion, functions

echo "=== Advanced bc Features ==="

echo "1. Using bc -l (math library):"
echo "scale=10; s(3.14159/2)" | bc -l
echo "Cosine of 0: c(0)" | bc -l
echo "Arctan(1) * 4 (pi): a(1)*4" | bc -l

echo -e "\n2. Base conversion (hex to decimal):"
echo "ibase=16; FF" | bc

echo -e "\n3. Decimal to hex:"
echo "obase=16; 255" | bc

echo -e "\n4. Binary conversion:"
echo "obase=2; 13" | bc

echo -e "\n5. Defining a custom function:"
bc <<EOF
define factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n-1);
}
factorial(5)
EOF

echo -e "\n6. Conditional logic:"
bc <<EOF
x = 42
if (x > 40) print "Large\n" else print "Small\n"
EOF