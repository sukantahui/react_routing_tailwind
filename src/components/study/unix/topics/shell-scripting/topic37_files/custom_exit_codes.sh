#!/bin/bash
# custom_exit_codes.sh – Define and use meaningful custom exit codes
# Usage: ./custom_exit_codes.sh <username>

# Exit code conventions:
#   0 – success
#   1 – general error (e.g., missing argument)
#   2 – user not found
#   3 – user already exists

set -euo pipefail
IFS=$'\n\t'

die() {
    echo "ERROR: $1" >&2
    exit "${2:-1}"
}

# Check argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <username>" >&2
    exit 1
fi

username="$1"

# Check if user exists
if id "$username" &>/dev/null; then
    die "User $username already exists" 3
fi

# Simulate user creation (would require root)
echo "✅ User $username would be created (simulated)"
exit 0