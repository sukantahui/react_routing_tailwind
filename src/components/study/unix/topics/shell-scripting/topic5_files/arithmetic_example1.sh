#!/bin/bash
# (( )) Arithmetic Examples

echo "=== (( )) Arithmetic Evaluation ==="
echo ""

# 1. Basic arithmetic
echo "1. Basic operations:"
a=10
b=3

(( sum = a + b ))
(( diff = a - b ))
(( product = a * b ))
(( quotient = a / b ))
(( remainder = a % b ))

echo "  $a + $b = $sum"
echo "  $a - $b = $diff"
echo "  $a * $b = $product"
echo "  $a / $b = $quotient  (integer division)"
echo "  $a % $b = $remainder"
echo ""

# 2. No $ needed for variables
echo "2. Automatic variable dereferencing:"
x=5
y=2
(( result = x * y + 10 ))
echo "  x * y + 10 = $result"
echo "  Note: No \$ needed inside (( ))"
echo ""

# 3. C-style operators
echo "3. C-style compound assignment:"
counter=0
echo "  Initial: counter = $counter"

(( counter++ ))
echo "  After counter++: $counter"

(( counter += 5 ))
echo "  After counter += 5: $counter"

(( counter *= 2 ))
echo "  After counter *= 2: $counter"

(( counter-- ))
echo "  After counter--: $counter"
echo ""

# 4. Return status (true/false)
echo "4. Using as condition (exit status):"
num=10

if (( num > 5 )); then
    echo "  $num > 5 is true"
fi

if (( num % 2 == 0 )); then
    echo "  $num is even"
else
    echo "  $num is odd"
fi

# Check the actual exit status
(( num == 10 ))
echo "  Exit status of (( num == 10 )): $? (0=true)"
(( num == 5 ))
echo "  Exit status of (( num == 5 )): $? (1=false)"
echo ""

# 5. Multiple operations
echo "5. Multiple operations in one (( )):"
x=5
y=3
z=2

(( x += y, y *= z, z = x + y ))
echo "  After (( x += y, y *= z, z = x + y )):"
echo "  x = $x, y = $y, z = $z"
echo ""

# 6. Different bases
echo "6. Working with different bases:"
hex_num=0xFF
oct_num=077
bin_num=2#1010

(( dec_from_hex = hex_num ))
(( dec_from_oct = oct_num ))
(( dec_from_bin = bin_num ))

echo "  Hex 0xFF = $dec_from_hex decimal"
echo "  Oct 077 = $dec_from_oct decimal"
echo "  Binary 1010 = $dec_from_bin decimal"
echo ""

# 7. Complex expressions
echo "7. Complex expressions with parentheses:"
a=10
b=3
c=2

(( result = (a + b) * c - b / 2 ))
echo "  (a + b) * c - b / 2 = $result"
echo "  Calculation: (10 + 3) * 2 - 3 / 2 = 13 * 2 - 1 = 25"
echo ""

# 8. Comparison operators
echo "8. Comparison operators:"
x=10
y=20

echo "  Comparisons with (( )):"
echo "  $x == $y : $(( x == y ))"  # 0=false, 1=true
echo "  $x != $y : $(( x != y ))"
echo "  $x < $y  : $(( x < y ))"
echo "  $x > $y  : $(( x > y ))"
echo "  $x <= $y : $(( x <= y ))"
echo "  $x >= $y : $(( x >= y ))"
echo ""

# 9. Bitwise operations
echo "9. Bitwise operations:"
a=5    # 0101
b=3    # 0011

echo "  Bitwise operations on a=5 (0101), b=3 (0011):"
echo "  a & b (AND): $(( a & b ))  # 0101 & 0011 = 0001 (1)"
echo "  a | b (OR):  $(( a | b ))  # 0101 | 0011 = 0111 (7)"
echo "  a ^ b (XOR): $(( a ^ b ))  # 0101 ^ 0011 = 0110 (6)"
echo "  ~a (NOT):    $(( ~a ))     # ~0101 = ...11111010 (-6 in two's complement)"
echo "  a << 1:      $(( a << 1 )) # 0101 << 1 = 1010 (10)"
echo "  a >> 1:      $(( a >> 1 )) # 0101 >> 1 = 0010 (2)"
echo ""

# 10. Using with arrays
echo "10. Arithmetic with array indices:"
numbers=(10 20 30 40 50)

(( sum = numbers[0] + numbers[1] + numbers[2] ))
echo "  Sum of first three elements: $sum"

for (( i = 0; i < ${#numbers[@]}; i++ )); do
    (( numbers[i] *= 2 ))
done
echo "  After doubling all elements: ${numbers[@]}"
echo ""

echo "=== Key Points About (( )) ==="
echo "• No \$ needed for variables"
echo "• Supports C-style operators (++, +=, etc.)"
echo "• Returns exit status (0 for true/non-zero, 1 for false/zero)"
echo "• Can be used directly in if statements"
echo "• Fastest arithmetic method in bash"
echo "• Bash-specific (not POSIX)"