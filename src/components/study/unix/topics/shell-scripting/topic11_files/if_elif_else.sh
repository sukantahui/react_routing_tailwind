# topic11_files/if_elif_else.sh
#!/bin/bash
# if-elif-else chain examples

echo "=== if-elif-else Chains ==="

# Example 1: Grade classification
score=85
if [ $score -ge 90 ]; then
    grade="A"
    echo "Excellent! Grade: $grade"
elif [ $score -ge 80 ]; then
    grade="B"
    echo "Good! Grade: $grade"
elif [ $score -ge 70 ]; then
    grade="C"
    echo "Average. Grade: $grade"
elif [ $score -ge 60 ]; then
    grade="D"
    echo "Passing. Grade: $grade"
else
    grade="F"
    echo "Failed. Grade: $grade"
fi

# Example 2: File type checking
file="document.pdf"
if [ -f "$file" ]; then
    echo "$file is a regular file"
elif [ -d "$file" ]; then
    echo "$file is a directory"
elif [ -L "$file" ]; then
    echo "$file is a symbolic link"
else
    echo "$file does not exist or is special"
fi

# Example 3: User role checking
user_role="editor"
if [ "$user_role" = "admin" ]; then
    echo "Full system access granted"
elif [ "$user_role" = "editor" ]; then
    echo "Content editing access granted"
elif [ "$user_role" = "viewer" ]; then
    echo "Read-only access granted"
else
    echo "No access granted"
fi

# Example 4: Time-based greeting
hour=$(date +%H)
if [ $hour -lt 12 ]; then
    echo "Good morning!"
elif [ $hour -lt 17 ]; then
    echo "Good afternoon!"
elif [ $hour -lt 21 ]; then
    echo "Good evening!"
else
    echo "Good night!"
fi

# Example 5: Complex condition with logical operators
age=25
has_license=true

if [ $age -ge 18 ] && [ "$has_license" = "true" ]; then
    echo "You can drive"
elif [ $age -ge 18 ] && [ "$has_license" = "false" ]; then
    echo "You need a license to drive"
else
    echo "You're too young to drive"
fi