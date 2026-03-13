#!/bin/bash
# pitfall_array.sh – Demonstrates word splitting and globbing

# Create some test files
touch "a b.txt" "*.txt" "c.txt"

echo "--- WRONG: Unquoted expansion of glob ---"
# WRONG: Unquoted expansion – * is expanded by the shell
files=(*.txt)
for f in ${files[@]}; do   # <-- missing quotes!
    echo "File: $f"
done

echo -e "\n--- RIGHT: Quoted array expansion ---"
# RIGHT: Quotes preserve each element
for f in "${files[@]}"; do
    echo "File: $f"
done

# Clean up
rm -f "a b.txt" "*.txt" "c.txt"