#!/bin/bash
# comm_different_delimiters.sh - Using comm with non‑default delimiters via sort
cat > data1.tsv <<EOF
001	apple
002	banana
003	cherry
EOF

cat > data2.tsv <<EOF
002	banana
003	cherry
004	date
EOF

echo "=== We want to compare by first column (tab‑separated) ==="
echo "Extract first column, sort, then comm:"
cut -f1 data1.tsv | sort > col1.txt
cut -f1 data2.tsv | sort > col2.txt

echo "Lines only in data1 (by ID):"
comm -23 col1.txt col2.txt

echo "Lines only in data2 (by ID):"
comm -13 col1.txt col2.txt

# Cleanup
rm data1.tsv data2.tsv col1.txt col2.txt