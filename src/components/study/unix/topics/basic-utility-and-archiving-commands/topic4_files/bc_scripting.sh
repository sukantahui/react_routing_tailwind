#!/bin/bash
# bc_scripting.sh - Practical scripting with bc

echo "=== Scripting Examples ==="

# Example 1: Calculate average of numbers from stdin
echo "1. Average of numbers:"
echo "10 20 30 45 50" | tr ' ' '\n' | (sum=0; count=0; while read n; do sum=$(echo "$sum + $n" | bc); count=$((count+1)); done; echo "scale=2; $sum / $count" | bc)

# Example 2: Compute compound interest
principal=1000
rate=5
years=3
interest=$(bc <<EOF
scale=2
p = $principal
r = $rate / 100
t = $years
p * (1 + r)^t - p
EOF)
echo "Compound interest on $principal at $rate% for $years years: \$$interest"

# Example 3: Convert Celsius to Fahrenheit
celsius=25
fahrenheit=$(echo "scale=1; ($celsius * 9/5) + 32" | bc)
echo "$celsius°C = $fahrenheit°F"

# Example 4: Disk usage percentage report
total=500000
used=375000
percent=$(echo "scale=2; ($used / $total) * 100" | bc)
echo "Disk usage: $percent%"

# Example 5: Calculate Pi to 100 digits
echo "Pi to 50 digits:"
echo "scale=50; 4*a(1)" | bc -l