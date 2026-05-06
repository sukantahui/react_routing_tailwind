#!/bin/bash
# pr_basic.sh - Basic pagination with pr

echo "=== Basic pr usage ==="
echo "1. Simple pagination with default header (66 lines per page):"
pr -l 10 sample.txt

echo -e "\n2. Without header/footer (-T):"
pr -T sample.txt

echo -e "\n3. Double-spaced output (-d):"
pr -d sample.txt

echo -e "\n4. Custom page length (-l 5):"
pr -l 5 sample.txt

# Create a sample file
cat > sample.txt <<EOF
Apple
Banana
Cherry
Date
Elderberry
Fig
Grape
Honeydew
EOF
echo "Sample file created: sample.txt"