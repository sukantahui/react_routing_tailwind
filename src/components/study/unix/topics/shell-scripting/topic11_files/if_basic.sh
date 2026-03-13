# topic11_files/if_basic.sh
#!/bin/bash
# Basic if statement examples

echo "=== Basic if Statements ==="

# Example 1: Check if a number is positive
number=10
if [ $number -gt 0 ]; then
    echo "Number $number is positive"
fi

# Example 2: Check if a file exists
filename="data.txt"
if [ -f "$filename" ]; then
    echo "File $filename exists"
fi

# Example 3: Check if a string is empty
name="Swadeep"
if [ -n "$name" ]; then
    echo "Name is: $name"
fi

# Example 4: Check if user is root
if [ "$(whoami)" = "root" ]; then
    echo "You are running as root"
fi

# Example 5: One-line if (using ; then)
age=20
if [ $age -ge 18 ]; then echo "Adult"; fi