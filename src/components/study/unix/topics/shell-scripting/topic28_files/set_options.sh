#!/bin/bash
# set_options.sh – Strict mode: exit on error, unset var, pipefail
set -euo pipefail

echo "🚀 Strict mode enabled – script will abort at first serious problem."

# Uncomment to see unset variable error:
# echo "UNDEFINED: $UNDEFINED_VAR"

# This command fails (false always returns 1)
false
echo "❌ This line is NEVER executed because 'set -e' aborts the script."