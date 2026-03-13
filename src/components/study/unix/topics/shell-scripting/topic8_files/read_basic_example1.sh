#!/bin/bash
# Basic READ Command Examples
# Topic 8: Reading User Input

echo "=== BASIC READ COMMAND EXAMPLES ==="
echo

# Example 1: Simple read (waiting for Enter)
echo "Example 1: Simple read"
echo -n "What is your name? "
read username
echo "Hello, $username!"
echo

# Example 2: Read with prompt (-p option)
echo "Example 2: Using -p for inline prompt"
read -p "Where are you from? (e.g., Barrackpore, Naihati): " location
echo "Nice! $location is a beautiful place."
echo

# Example 3: Reading multiple variables
echo "Example 3: Reading multiple values at once"
read -p "Enter your full name (First Last): " first last
echo "First name: $first"
echo "Last name: $last"
echo

# Example 4: Silent input for passwords (-s option)
echo "Example 4: Silent mode for passwords"
read -sp "Enter your password (won't show): " password
echo -e "\nPassword accepted! (Length: ${#password} characters)"
echo

# Example 5: Reading into an array (-a option)
echo "Example 5: Reading into an array"
echo "Enter your top 3 favorite subjects (separated by spaces):"
read -a subjects
echo "Your subjects:"
for i in "${!subjects[@]}"; do
    echo "  $((i+1)). ${subjects[i]}"
done
echo

# Example 6: Reading with timeout (-t option)
echo "Example 6: Timeout after 5 seconds"
read -t 5 -p "Quick! Enter your favorite color: " color
if [ -z "$color" ]; then
    echo "Too slow! Timeout reached."
else
    echo "You chose: $color"
fi
echo

# Example 7: Reading exactly N characters (-n option)
echo "Example 7: Reading exactly 1 character (no Enter needed)"
read -n 1 -p "Continue? (y/n): " choice
echo -e "\nYou chose: $choice"
echo

# Example 8: Reading with default value
echo "Example 8: Read with default value"
read -p "Enter editor [vim]: " editor
editor="${editor:-vim}"  # Default to vim if empty
echo "Using editor: $editor"