#!/bin/bash
# let Command Examples

echo "=== let Command for Arithmetic ==="
echo ""

# 1. Basic let usage
echo "1. Basic let commands:"
a=10
b=3

let "sum = a + b"
echo "  let \"sum = a + b\": sum = $sum"

let "diff = a - b"
echo "  let \"diff = a - b\": diff = $diff"

let "product = a * b"
echo "  let \"product = a * b\": product = $product"

let "quotient = a / b"
echo "  let \"quotient = a / b\": quotient = $quotient"

let "remainder = a % b"
echo "  let \"remainder = a % b\": remainder = $remainder"
echo ""

# 2. Without quotes (spaces matter!)
echo "2. Without quotes (note spacing):"
x=5
y=2

let z=x+y      # No spaces around =
let "w = x + y"  # Spaces okay with quotes

echo "  let z=x+y: z = $z"
echo "  let \"w = x + y\": w = $w"
echo "  Note: Without quotes, no spaces allowed!"
echo ""

# 3. Multiple assignments
echo "3. Multiple assignments in one let:"
x=5
y=10
z=15

let "x += 5" "y *= 2" "z = x + y"
echo "  After let \"x += 5\" \"y *= 2\" \"z = x + y\":"
echo "  x = $x, y = $y, z = $z"
echo ""

# 4. Increment/decrement
echo "4. Increment and decrement:"
counter=0
echo "  Initial: counter = $counter"

let "counter++"
echo "  After let \"counter++\": $counter"

let "counter += 5"
echo "  After let \"counter += 5\": $counter"

let "counter *= 2"
echo "  After let \"counter *= 2\": $counter"

let "counter--"
echo "  After let \"counter--\": $counter"
echo ""

# 5. Return value and error handling
echo "5. Return values and errors:"
num=10

# let returns 0 for success, 1 for failure (division by zero)
let "result = num / 2"
echo "  let \"result = num / 2\": result = $result, exit status: $?"

let "result = num / 0" 2>/dev/null
echo "  let \"result = num / 0\": exit status: $? (division by zero)"
echo ""

# 6. Different number bases
echo "6. Different number bases:"
let "dec = 42"
let "hex = 0x2A"
let "oct = 052"
let "bin = 2#101010"

echo "  Different representations of 42:"
echo "  Decimal: let \"dec = 42\": $dec"
echo "  Hex: let \"hex = 0x2A\": $hex"
echo "  Octal: let \"oct = 052\": $oct"
echo "  Binary: let \"bin = 2#101010\": $bin"
echo ""

# 7. Complex expressions
echo "7. Complex expressions:"
a=10
b=3
c=2

let "result = (a + b) * c - b / 2"
echo "  let \"result = (a + b) * c - b / 2\": $result"
echo "  Calculation: (10 + 3) * 2 - 3 / 2 = 13 * 2 - 1 = 25"
echo ""

# 8. Bitwise operations
echo "8. Bitwise operations:"
a=5    # 0101
b=3    # 0011

let "and = a & b"
let "or = a | b"
let "xor = a ^ b"
let "leftshift = a << 1"
let "rightshift = a >> 1"

echo "  Bitwise operations on a=5 (0101), b=3 (0011):"
echo "  a & b: $and"
echo "  a | b: $or"
echo "  a ^ b: $xor"
echo "  a << 1: $leftshift"
echo "  a >> 1: $rightshift"
echo ""

# 9. Comparison expressions
echo "9. Comparison expressions:"
x=10
y=20

let "is_equal = x == y"
let "not_equal = x != y"
let "less_than = x < y"
let "greater_than = x > y"

echo "  Comparisons (1=true, 0=false):"
echo "  $x == $y: $is_equal"
echo "  $x != $y: $not_equal"
echo "  $x < $y: $less_than"
echo "  $x > $y: $greater_than"
echo ""

# 10. Using let in conditionals
echo "10. Using let in conditionals:"
num=7

if let "num % 2 == 0"; then
    echo "  $num is even"
else
    echo "  $num is odd"
fi

if let "num > 5 && num < 10"; then
    echo "  $num is between 5 and 10"
fi
echo ""

# 11. Performance comparison
echo "11. Performance note:"
echo "  Creating test..."
time for (( i=0; i<10000; i++ )); do
    let "result = i * 2"
done > /dev/null

echo "  let is slightly slower than (( )) but more readable for assignments"
echo ""

# 12. Common errors
echo "12. Common errors with let:"
echo "  Error 1: Spaces without quotes"
echo "    let x = 5 + 3  # Error: 'let: =: syntax error: operand expected'"
echo ""
echo "  Error 2: Using \$ unnecessarily"
echo "    let \"result = \$a + \$b\"  # Works but \$ not needed"
echo "    let \"result = a + b\"      # Better"
echo ""
echo "  Error 3: Division by zero"
echo "    let \"x = 5 / 0\"  # Error: division by 0"
echo ""

echo "=== When to Use let ==="
echo "• When you want explicit assignment"
echo "• For complex expressions with quotes"
echo "• When you need multiple assignments in one statement"
echo "• When portability is important (works in older bash)"
echo "• For base conversion: let \"hex = 0xFF\""