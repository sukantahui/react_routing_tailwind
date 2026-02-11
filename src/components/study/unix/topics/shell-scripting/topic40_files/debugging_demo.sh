#!/bin/bash
# debugging_demo.sh – Demonstrates set -x for tracing execution
# Usage: ./debugging_demo.sh [--debug]

set -euo pipefail
IFS=$'\n\t'

# Enable debugging if --debug flag is passed
if [[ "${1:-}" == "--debug" ]]; then
    echo "🔍 Debug mode ON"
    set -x
fi

# A simple function to demonstrate tracing
greet() {
    local name="$1"
    echo "Hello, $name!"
}

# Loop with arithmetic
sum=0
for i in {1..5}; do
    sum=$((sum + i))
done
echo "Sum 1..5 = $sum"

# Function call
greet "Tuhina"

# Word splitting demonstration (unquoted)
files="file1.txt file2.txt"
for f in $files; do
    echo "Processing: $f"
done

# Disable tracing if it was enabled
if [[ "${1:-}" == "--debug" ]]; then
    set +x
    echo "🔍 Debug mode OFF"
fi

exit 0