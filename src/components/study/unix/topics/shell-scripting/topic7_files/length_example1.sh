#!/bin/bash
# String Length Examples
# Topic 7: String Manipulation

echo "=== STRING LENGTH EXAMPLES ==="
echo

# Example 1: Basic length calculation
name="Swadeep"
echo "Example 1: Basic length"
echo "Name: $name"
echo "Length: ${#name} characters"
echo

# Example 2: String with spaces
full_name="Swadeep Kumar"
echo "Example 2: String with spaces"
echo "Full Name: $full_name"
echo "Length (unquoted): ${#full_name} characters"
echo "Length (quoted): ${#\"$full_name\"} characters"
echo

# Example 3: Empty string
empty_string=""
echo "Example 3: Empty string"
echo "Empty string length: ${#empty_string}"
echo

# Example 4: Special characters
special="Hello@2024#Barrackpore"
echo "Example 4: String with special characters"
echo "String: $special"
echo "Length: ${#special}"
echo

# Example 5: Multi-line string (using variable)
address="123 Main Street
Barrackpore
Kolkata 700120"
echo "Example 5: Multi-line string length"
echo "Address:"
echo "$address"
echo "Length (first line only): ${#address}"
echo "Note: Newlines count as single character"
echo

# Example 6: Practical use - validation
validate_password() {
    local password="$1"
    local min_length=8
    
    if [ ${#password} -lt $min_length ]; then
        echo "Password too short! Minimum $min_length characters required."
    else
        echo "Password length OK."
    fi
}

echo "Example 6: Password validation"
validate_password "pass123"
validate_password "SecurePass@2024"