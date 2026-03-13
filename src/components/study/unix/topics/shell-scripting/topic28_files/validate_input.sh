#!/bin/bash
# validate_input.sh – Demonstrates input validation and safe quoting
set -u  # treat unset variables as errors

validate_username() {
    local username="$1"
    # Username: 3-16 alphanumeric or underscore
    if [[ ! "$username" =~ ^[a-zA-Z0-9_]{3,16}$ ]]; then
        echo "Error: Invalid username '$username'. Use 3-16 alnum/underscore." >&2
        return 1
    fi
    echo "✅ Valid username: $username"
    return 0
}

# Main
read -p "Enter username: " input
validate_username "$input"   # <-- the quotes are critical!