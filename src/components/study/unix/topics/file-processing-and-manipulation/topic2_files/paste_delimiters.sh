#!/bin/bash
# paste_delimiters.sh - Using different delimiters
cat > col1.txt <<EOF
A
B
C
EOF

cat > col2.txt <<EOF
1
2
3
EOF

cat > col3.txt <<EOF
X
Y
Z
EOF

echo "=== Tab delimiter (default) ==="
paste col1.txt col2.txt col3.txt

echo -e "\n=== Comma delimiter (CSV) ==="
paste -d ',' col1.txt col2.txt col3.txt

echo -e "\n=== Custom delimiter '|' ==="
paste -d '|' col1.txt col2.txt col3.txt

echo -e "\n=== Multiple delimiters (cyclical) ==="
# First separator between col1-col2 is ':', between col2-col3 is ',', then repeats
paste -d ':,' col1.txt col2.txt col3.txt

# Cleanup
rm col1.txt col2.txt col3.txt