#!/bin/bash
# Process user input until quit command
echo "Student Grade Calculator"
echo "Enter 'quit' to exit"

total=0
count=0

while true; do
    read -p "Enter grade (0-100): " grade
    
    # Check for quit command
    if [[ "$grade" == "quit" ]]; then
        break
    fi
    
    # Validate input is a number
    if ! [[ "$grade" =~ ^[0-9]+$ ]]; then
        echo "Error: Please enter a valid number"
        continue
    fi
    
    # Validate range
    if (( grade < 0 || grade > 100 )); then
        echo "Error: Grade must be between 0 and 100"
        continue
    fi
    
    # Process valid grade
    total=$((total + grade))
    count=$((count + 1))
    
    current_average=$((total / count))
    echo "Current average for $count student(s): $current_average"
done

echo "Final average: $((total / count))"