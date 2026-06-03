#!/bin/bash
# uniq_repeated.sh - Show only duplicate lines with -d
cat > data.txt <<EOF
alpha
beta
beta
gamma
gamma
gamma
delta
EOF

echo "=== Sorted file ==="
sort data.txt > sorted.txt
cat sorted.txt

echo -e "\n=== Lines that are duplicated (appear more than once) ==="
uniq -d sorted.txt

echo -e "\n=== Count how many duplicate lines (each line once) ==="
uniq -d sorted.txt | wc -l

# Cleanup
rm data.txt sorted.txt