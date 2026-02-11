# topic11_files/if_else.sh
#!/bin/bash
# if-else statement examples

echo "=== if-else Statements ==="

# Example 1: Check file existence with else
file="report.txt"
if [ -f "$file" ]; then
    echo "File $file exists"
else
    echo "File $file does not exist"
    echo "Creating it now..."
    touch "$file"
fi

# Example 2: Number comparison with else
score=85
if [ $score -ge 60 ]; then
    echo "Score: $score - PASS"
else
    echo "Score: $score - FAIL"
fi

# Example 3: String comparison with else
user="abhronila"
if [ "$user" = "admin" ]; then
    echo "Welcome, administrator"
else
    echo "Welcome, regular user $user"
fi

# Example 4: Check directory with else
dir="/home/students"
if [ -d "$dir" ]; then
    echo "Directory $dir exists"
    echo "Contents:"
    ls "$dir"
else
    echo "Directory $dir does not exist"
fi

# Example 5: Check command success with else
if ping -c 1 google.com &> /dev/null; then
    echo "Network is reachable"
else
    echo "Network is not reachable"
fi