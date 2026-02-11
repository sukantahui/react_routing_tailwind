#!/bin/bash
# user_registration.sh – Interactive registration using validation library
# Usage: ./user_registration.sh

set -euo pipefail
IFS=$'\n\t'

# Source the validation library (assumes same directory)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$SCRIPT_DIR/validate_input_demo.sh"

echo "=== User Registration ==="
echo ""

# ----- Username -----
while true; do
    read -r -p "Enter username: " username
    if validate_username "$username"; then
        break
    fi
done

# ----- Email -----
while true; do
    read -r -p "Enter email: " email
    if validate_email "$email"; then
        break
    fi
done

# ----- Age -----
while true; do
    read -r -p "Enter age (13-120): " age
    if validate_integer "$age" 13 120; then
        break
    fi
done

# ----- Confirmation -----
echo ""
echo "Registration summary:"
echo "  Username: $username"
echo "  Email:    $email"
echo "  Age:      $age"
echo ""
read -r -p "Is this correct? (y/n): " confirm
if [[ "$confirm" =~ ^[Yy]$ ]]; then
    # In a real script, we would write to a database or file.
    echo "✅ User '$username' registered successfully."
else
    echo "❌ Registration cancelled."
    exit 1
fi

exit 0