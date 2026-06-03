#!/bin/bash
# flag_number_occurrence.sh - Nth occurrence flag
cat > data.txt <<EOF
a,b,c,d
1,2,3,4
x,y,z,w
EOF

echo "=== Replace the 2nd comma with semicolon on each line ==="
sed 's/,/;/2' data.txt

echo -e "\n=== Replace the 3rd space with newline (example) ==="
echo "one two three four" | sed 's/ /\n/3'