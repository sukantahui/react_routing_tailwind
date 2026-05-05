#!/bin/bash
# cmp_diff_contrast.sh – Compare cmp vs diff on text files
cat > poem1.txt <<EOF
Roses are red
Violets are blue
Sugar is sweet
And so are you
EOF

cat > poem2.txt <<EOF
Roses are red
Violets are blue
And so are you
EOF

echo "=== cmp (binary) on text files ==="
cmp poem1.txt poem2.txt
echo "Exit: $? (differs at byte 47, line 3)"

echo -e "\n=== diff (line‑oriented) ==="
diff poem1.txt poem2.txt

# Cleanup
rm poem1.txt poem2.txt