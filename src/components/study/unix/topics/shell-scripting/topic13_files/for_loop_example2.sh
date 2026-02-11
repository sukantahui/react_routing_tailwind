#!/bin/bash
# C-style for loop for numeric operations
echo "Generating multiplication table for Shyamnagar classroom..."

for (( i=1; i<=10; i++ )); do
    for (( j=1; j<=10; j++ )); do
        result=$((i * j))
        printf "%-4d" "$result"
    done
    echo ""
done

# Process array of student names
students=("Swadeep" "Tuhina" "Abhronila" "Debangshu")
echo -e "\nClass Roll Call:"

for student in "${students[@]}"; do
    echo "Present: $student"
done