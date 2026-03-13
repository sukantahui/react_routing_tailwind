#!/bin/bash
# Practical here string usage

# Simple math calculation
bc <<< "5 + 3 * 2"

# Check if string contains digits
grep -q "[0-9]" <<< "Student123" && echo "Contains numbers"

# String manipulation
rev <<< "Debangshu"  # Reverse string

# Compare two values
[[ $(bc <<< "5.5 > 3.2") -eq 1 ]] && echo "5.5 is greater"