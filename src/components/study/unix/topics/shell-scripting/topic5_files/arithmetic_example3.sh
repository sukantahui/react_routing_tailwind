#!/bin/bash
# expr Command Examples

echo "=== expr Command for Arithmetic ==="
echo ""
echo "IMPORTANT: expr requires spaces around operators!"
echo ""

# 1. Basic arithmetic (MUST have spaces!)
echo "1. Basic arithmetic operations:"
a=10
b=3

echo "  Addition:"
result=$(expr $a + $b)
echo "    expr $a + $b = $result"

echo ""
echo "  Subtraction:"
result=$(expr $a - $b)
echo "    expr $a - $b = $result"

echo ""
echo "  Multiplication (must escape *):"
result=$(expr $a \* $b)
echo "    expr $a \\* $b = $result"

echo ""
echo "  Division:"
result=$(expr $a / $b)
echo "    expr $a / $b = $result (integer division)"

echo ""
echo "  Modulus:"
result=$(expr $a % $b)
echo "    expr $a % $b = $result"
echo ""

# 2. Common errors
echo "2. Common expr errors:"
echo "  No spaces (ERROR):"
echo "    expr 10+20  # Error: 'expr: syntax error'"
echo ""
echo "  Unescaped * (ERROR):"
echo "    expr 10 * 20  # Error: * expands to files"
echo ""
echo "  Correct way:"
echo "    expr 10 \\* 20  # Works: 200"
echo ""

# 3. Using parentheses
echo "3. Using parentheses (must escape them):"
a=10
b=3
c=2

result=$(expr \( $a + $b \) \* $c)
echo "  expr \\( $a + $b \\) \\* $c = $result"
echo "  Calculation: (10 + 3) * 2 = 26"
echo ""

# 4. Comparison operations
echo "4. Comparison operations (return 1 for true, 0 for false):"
x=10
y=20

echo "  Comparisons:"
echo "    expr $x = $y : $(expr $x = $y)  # Equality"
echo "    expr $x != $y : $(expr $x != $y)  # Inequality"
echo "    expr $x \\> $y : $(expr $a \> $b)  # Greater than"
echo "    expr $x \\< $y : $(expr $a \< $b)  # Less than"
echo ""
echo "  Note: > and < must be escaped to avoid redirection!"
echo ""

# 5. String operations
echo "5. String operations with expr:"
str1="hello"
str2="world"
str3="hello"

echo "  String length:"
length=$(expr length "$str1")
echo "    expr length \"$str1\" = $length"
echo ""
echo "  Substring:"
substr=$(expr substr "$str1" 2 3)
echo "    expr substr \"$str1\" 2 3 = \"$substr\""
echo ""
echo "  String match (returns matched length or 0):"
match=$(expr "$str1" : "$str3")
echo "    expr \"$str1\" : \"$str3\" = $match"
echo ""
echo "  Index of character:"
index=$(expr index "$str1" "l")
echo "    expr index \"$str1\" \"l\" = $index (first 'l' at position $index)"
echo ""

# 6. Logical operations
echo "6. Logical operations:"
echo "  OR (|): Returns first non-zero, or 0 if both zero"
echo "    expr 0 \\| 5 = $(expr 0 \| 5)"
echo "    expr 3 \\| 5 = $(expr 3 \| 5)"
echo "    expr 0 \\| 0 = $(expr 0 \| 0)"
echo ""
echo "  AND (&): Returns first if both non-zero, or 0"
echo "    expr 3 \\& 5 = $(expr 3 \& 5)"
echo "    expr 0 \\& 5 = $(expr 0 \& 5)"
echo ""

# 7. Working with command substitution
echo "7. Using expr with command substitution:"
file_count=$(ls -1 /tmp 2>/dev/null | wc -l)
max_files=50

echo "  Files in /tmp: $file_count"
echo "  Max allowed: $max_files"

if [ $(expr $file_count \> $max_files) -eq 1 ]; then
    echo "  WARNING: Too many files!"
else
    echo "  OK: File count within limits"
fi
echo ""

# 8. Performance test
echo "8. Performance comparison (expr vs (( ))):"
echo "  Testing expr:"
time for i in $(seq 1 1000); do
    expr $i + 1 > /dev/null
done

echo ""
echo "  Note: expr spawns a new process for each calculation"
echo "        This makes it MUCH slower than (( )) or let"
echo ""

# 9. Portability example
echo "9. Portable script example:"
cat << 'EOF'
#!/bin/sh
# POSIX-compliant script using expr

calculate() {
    a=$1
    b=$2
    # Use expr for maximum portability
    sum=$(expr $a + $b)
    diff=$(expr $a - $b)
    product=$(expr $a \* $b)
    
    echo "Sum: $sum"
    echo "Difference: $diff"
    echo "Product: $product"
}

calculate 10 3
EOF
echo ""

# 10. Error handling
echo "10. Error handling with expr:"
echo "  Division by zero:"
expr 10 / 0 2>/dev/null || echo "  Error caught: division by zero"
echo ""
echo "  Non-numeric argument:"
expr 10 + "abc" 2>/dev/null || echo "  Error caught: non-numeric argument"
echo ""

# 11. Real-world example: Calculating percentages
echo "11. Real-world example: Disk usage percentage"
total_space=1000
used_space=750

percentage=$(expr $used_space \* 100 / $total_space)
echo "  Disk usage: $used_space / $total_space = $percentage%"
echo ""
echo "  Note: Integer division - multiply before dividing!"
echo ""

# 12. Tips and tricks
echo "12. expr tips and tricks:"
echo "  • Always use spaces around operators"
echo "  • Escape *, (, ), <, >, &, | with backslash"
echo "  • Use command substitution: \$(expr ...)"
echo "  • Check exit status for errors"
echo "  • For complex math, consider bc or awk instead"
echo "  • Use for maximum portability across different shells"
echo ""

echo "=== When to Use expr ==="
echo "• Writing POSIX-compliant scripts (#!/bin/sh)"
echo "• Working on systems without bash"
echo "• When you need string operations along with arithmetic"
echo "• For maximum portability across Unix systems"
echo "• When performance is not critical"