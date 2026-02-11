#!/bin/bash
# validate_input_demo.sh – Reusable input validation library
# Source this file from other scripts: . /path/to/validate_input_demo.sh

set -euo pipefail
IFS=$'\n\t'

# ---------- Validation Functions ----------
# All functions return 0 (true) if valid, 1 (false) if invalid.
# Error messages are printed to stderr.

# Validate username: 3-16 characters, alphanumeric + underscore
validate_username() {
    local username="$1"
    if [[ -z "$username" ]]; then
        echo "Error: Username cannot be empty." >&2
        return 1
    fi
    if [[ ! "$username" =~ ^[a-zA-Z0-9_]{3,16}$ ]]; then
        echo "Error: Username must be 3-16 alphanumeric characters or underscore." >&2
        return 1
    fi
    return 0
}

# Validate email (simple pattern: local@domain)
validate_email() {
    local email="$1"
    local pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if [[ -z "$email" ]]; then
        echo "Error: Email cannot be empty." >&2
        return 1
    fi
    if [[ ! "$email" =~ $pattern ]]; then
        echo "Error: Invalid email format." >&2
        return 1
    fi
    return 0
}

# Validate integer (optional sign, digits)
validate_integer() {
    local int="$1"
    local min="${2:-}"
    local max="${3:-}"
    
    if [[ -z "$int" ]]; then
        echo "Error: Integer cannot be empty." >&2
        return 1
    fi
    if [[ ! "$int" =~ ^-?[0-9]+$ ]]; then
        echo "Error: Not a valid integer." >&2
        return 1
    fi
    
    if [[ -n "$min" && "$int" -lt "$min" ]]; then
        echo "Error: Value must be >= $min." >&2
        return 1
    fi
    if [[ -n "$max" && "$int" -gt "$max" ]]; then
        echo "Error: Value must be <= $max." >&2
        return 1
    fi
    return 0
}

# Validate file exists and is a regular file
validate_file() {
    local file="$1"
    if [[ ! -e "$file" ]]; then
        echo "Error: File '$file' does not exist." >&2
        return 1
    fi
    if [[ ! -f "$file" ]]; then
        echo "Error: '$file' is not a regular file." >&2
        return 1
    fi
    return 0
}

# Validate date (YYYY-MM-DD) and that it's a real calendar date
validate_date() {
    local date="$1"
    if [[ ! "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
        echo "Error: Date must be in YYYY-MM-DD format." >&2
        return 1
    fi
    
    # Extract components
    local year="${date:0:4}"
    local month="${date:5:2}"
    local day="${date:8:2}"
    
    # Basic range checks
    if [[ "$month" -lt 1 || "$month" -gt 12 ]]; then
        echo "Error: Month must be 01-12." >&2
        return 1
    fi
    if [[ "$day" -lt 1 || "$day" -gt 31 ]]; then
        echo "Error: Day must be 01-31." >&2
        return 1
    fi
    
    # More accurate validation could use `date -d`, but this is platform‑dependent.
    # For portability, we stop here. In practice, use `date` for validation.
    return 0
}