#!/bin/bash
# Advanced READ Options
# Topic 8: Reading User Input

echo "=== ADVANCED READ OPTIONS ==="
echo

# Example 1: Raw input mode (-r) - preserves backslashes
echo "Example 1: Raw mode vs Normal mode"
echo "Enter a path with backslashes: C:\\Users\\Tuhina\\Documents"
echo -n "Normal read: "
read normal_path
echo "You entered: $normal_path"
echo -n "Raw read (-r): "
read -r raw_path
echo "You entered: $raw_path"
echo "Notice the difference in backslash handling!"
echo

# Example 2: Reading with delimiter
echo "Example 2: Custom delimiter"
IFS=: read -p "Enter name:age:city (separated by :): " name age city
echo "Name: $name, Age: $age, City: $city"
echo

# Example 3: Reading with validation loop
echo "Example 3: Input validation loop"
while true; do
    read -p "Enter a number between 1 and 10: " number
    
    # Check if it's a number
    if ! [[ "$number" =~ ^[0-9]+$ ]]; then
        echo "Error: Please enter a valid number"
        continue
    fi
    
    # Check range
    if [ "$number" -lt 1 ] || [ "$number" -gt 10 ]; then
        echo "Error: Number must be between 1 and 10"
        continue
    fi
    
    echo "Valid number entered: $number"
    break
done
echo

# Example 4: Reading file paths with validation
echo "Example 4: File path validation"
read -p "Enter a filename to check: " filename
if [ -f "$filename" ]; then
    echo "File exists: $filename"
    echo "Size: $(wc -c < "$filename") bytes"
else
    echo "File does not exist or is not a regular file"
fi
echo

# Example 5: Reading with line limit
echo "Example 5: Limiting input length"
read -n 20 -p "Enter a short message (max 20 chars): " message
echo -e "\nYou entered: '$message'"
echo "Length: ${#message} characters"
echo

# Example 6: Reading with default and timeout
echo "Example 6: Combined options - timeout with default"
read -t 3 -p "Press Enter quickly or use default [3 seconds]: " response
response="${response:-default_value}"
echo "Result: $response"
echo

# Example 7: Reading and processing immediately
echo "Example 7: Processing while reading"
echo "Enter numbers to sum (press Ctrl+D when done):"
sum=0
count=0
while read -p "Number: " num; do
    if [[ "$num" =~ ^[0-9]+$ ]]; then
        sum=$((sum + num))
        count=$((count + 1))
        echo "Current sum: $sum"
    else
        echo "Invalid number, skipping..."
    fi
done
echo "Final sum: $sum (from $count numbers)"