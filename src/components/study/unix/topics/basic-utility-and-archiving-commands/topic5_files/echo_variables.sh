#!/bin/bash
# echo_variables.sh - Displaying variables with echo

echo "=== Variables and Quoting ==="

student="Abhronila"
marks=88
subject="Science"

echo "1. Double quotes (expand variables):"
echo "Student $student scored $marks in $subject"

echo -e "\n2. Single quotes (literal):"
echo 'Student $student scored $marks in $subject'

echo -e "\n3. Preserving spaces with quotes:"
message="   Keep these spaces   "
echo "Without quotes: $message"
echo "With quotes:   \"$message\""

echo -e "\n4. Combining variables and text:"
echo "${student}'s result: ${marks}%"

echo -e "\n5. Using echo with array:"
fruits=("Apple" "Banana" "Cherry")
echo "First fruit: ${fruits[0]}"
echo "All fruits: ${fruits[@]}"