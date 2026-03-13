# topic11_files/condition_pitfalls.sh
#!/bin/bash
# Common conditional statement pitfalls

echo "=== Common Condition Pitfalls ==="

echo -e "\n1. Missing spaces around [ ]:"
x=5
# WRONG: if [$x -eq 5]; then  # Syntax error
# RIGHT:
if [ $x -eq 5 ]; then
    echo "Correct: Spaces around [ ]"
fi

echo -e "\n2. Using wrong operators:"
string="hello"
number=10
# WRONG: if [ $string -eq "hello" ]; then  # -eq is for numbers
# RIGHT:
if [ "$string" = "hello" ]; then
    echo "Correct: = for strings"
fi

# WRONG: if [ $number = 10 ]; then  # = is for strings
# RIGHT:
if [ $number -eq 10 ]; then
    echo "Correct: -eq for numbers"
fi

echo -e "\n3. Unquoted variables with spaces:"
filename="my file.txt"
touch "$filename"
# WRONG: if [ -f $filename ]; then  # Expands to two arguments
# RIGHT:
if [ -f "$filename" ]; then
    echo "File exists (quoted variable)"
fi
rm "$filename"

echo -e "\n4. Forgetting then or fi:"
# WRONG: if [ true ] echo "yes"  # Missing then
# RIGHT:
if [ true ]; then echo "yes"; fi

echo -e "\n5. Using && inside [ ] incorrectly:"
a=1
b=2
# WRONG: if [ $a -eq 1 && $b -eq 2 ]; then  # Use -a or separate [ ]
# RIGHT:
if [ $a -eq 1 -a $b -eq 2 ]; then
    echo "Both conditions true (-a)"
fi

# Also RIGHT:
if [ $a -eq 1 ] && [ $b -eq 2 ]; then
    echo "Both conditions true (&& between [ ])"
fi

echo -e "\n6. Testing empty strings incorrectly:"
empty=""
# PROBLEMATIC: if [ $empty ]; then  # Expands to [ ] which is false
# BETTER:
if [ -n "$empty" ]; then
    echo "String is not empty"
else
    echo "String is empty (correct test)"
fi

echo -e "\n7. Arithmetic in [ ]:"
x=5
y=10
# WRONG: if [ $x * 2 -eq $y ]; then  # * expands as glob
# RIGHT:
if [ $((x * 2)) -eq $y ]; then
    echo "Arithmetic works with $(( ))"
fi

echo -e "\n8. Comparing floats (bash only does integers):"
float1=3.14
float2=3.14
# WRONG: if [ $float1 -eq $float2 ]; then  # Error: integer expected
echo "Note: Bash only handles integer arithmetic"

echo -e "\n9. File test with variables that might be empty:"
file=""
# DANGEROUS: if [ -f $file ]; then  # Expands to [ -f ] which is true!
# SAFER:
if [ -n "$file" ] && [ -f "$file" ]; then
    echo "File exists"
else
    echo "Either file is empty or doesn't exist"
fi

echo -e "\n10. Using single = in [[ ]] for pattern match:"
filename="data.txt"
# WRONG: if [[ $filename = "*.txt" ]]; then  # Literal match
# RIGHT:
if [[ $filename == *.txt ]]; then
    echo "Pattern matches with =="
fi

echo -e "\n=== Best Practices Summary ==="
echo "1. Always quote variables in [ ]"
echo "2. Use [[ ]] in bash scripts"
echo "3. Check for empty variables before using"
echo "4. Use correct operators for data types"
echo "5. Test your conditions with edge cases"