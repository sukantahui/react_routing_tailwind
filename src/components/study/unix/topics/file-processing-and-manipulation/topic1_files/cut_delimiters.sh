#!/bin/bash
# cut_delimiters.sh - Using different delimiters with -d
cat > data.txt <<EOF
apple,banana,cherry
one|two|three
first:second:third
EOF

echo "=== Comma delimiter ==="
cut -d',' -f2 data.txt

echo -e "\n=== Pipe delimiter (note quoting) ==="
cut -d'|' -f2 data.txt

echo -e "\n=== Colon delimiter ==="
cut -d':' -f2 data.txt

echo -e "\n=== Multiple fields with comma delimiter ==="
cut -d',' -f1,3 data.txt

# Cleanup
rm data.txt