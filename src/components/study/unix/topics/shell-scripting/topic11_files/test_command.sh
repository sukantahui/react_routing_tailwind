# topic11_files/test_command.sh
#!/bin/bash
# test command examples

echo "=== test Command Examples ==="

# Example 1: Basic test command (same as [ ])
x=10
y=20

if test $x -lt $y; then
    echo "$x is less than $y"
fi

# Example 2: String comparison with test
name="Debangshu"
if test "$name" = "Debangshu"; then
    echo "Hello, $name"
fi

# Example 3: File tests with test
file="script.sh"
if test -f "$file"; then
    echo "$file is a regular file"
fi

if test -x "$file"; then
    echo "$file is executable"
fi

# Example 4: Combining tests with logical operators
age=25
if test $age -ge 18 -a $age -le 65; then
    echo "Working age"
fi

# Example 5: Negation with test
if ! test -d "/nonexistent"; then
    echo "/nonexistent is not a directory"
fi

# Example 6: test vs [ ] comparison
echo -e "\n=== test vs [ ] ==="
num=5

# These are equivalent:
test $num -eq 5 && echo "test: Equal"
[ $num -eq 5 ] && echo "[ ]: Equal"

# test command with -z (empty string)
empty=""
if test -z "$empty"; then
    echo "String is empty"
fi

# test with -n (non-empty string)
nonempty="Hello"
if test -n "$nonempty"; then
    echo "String is not empty: $nonempty"
fi

# Example 7: Exit status of test
test 10 -gt 5
echo "Exit status of 'test 10 -gt 5': $?"

test 10 -lt 5
echo "Exit status of 'test 10 -lt 5': $?"