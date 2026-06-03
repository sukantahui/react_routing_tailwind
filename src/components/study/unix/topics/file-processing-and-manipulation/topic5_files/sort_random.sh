#!/bin/bash
# sort_random.sh - Random sort (shuffle lines)
seq 1 10 > numbers.txt

echo "=== Random shuffle (sort -R) ==="
echo "First run:"
sort -R numbers.txt
echo -e "\nSecond run (different order):"
sort -R numbers.txt

# Note: `shuf` is more random, but `sort -R` works on most systems
# Cleanup
rm numbers.txt