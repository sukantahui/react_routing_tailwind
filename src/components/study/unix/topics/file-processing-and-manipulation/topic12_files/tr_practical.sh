#!/bin/bash
# tr_practical.sh - Real-world data cleaning
# 1. Normalise whitespace and lower case
cat > messy.txt <<EOF
Hello   World
This  is   a test.
EOF
echo "=== Original ==="
cat messy.txt
echo -e "\n=== Normalised (squeeze spaces, lower case) ==="
cat messy.txt | tr -s ' ' | tr '[:upper:]' '[:lower:]'

# 2. ROT13 cipher
echo -e "\n=== ROT13 encoding ==="
echo "Hello World" | tr 'A-Za-z' 'N-ZA-Mn-za-m'

# 3. Remove all vowels
echo -e "\n=== Remove vowels ==="
echo "The quick brown fox" | tr -d 'aeiouAEIOU'

# 4. Convert CSV semicolon to comma
echo -e "\n=== CSV delimiter conversion ==="
echo "name;age;city" | tr ';' ','

# Cleanup
rm messy.txt