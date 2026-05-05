#!/bin/bash
# paste_basic.sh - Basic paste with default tab delimiter
cat > names.txt <<EOF
Alice
Bob
Charlie
EOF

cat > scores.txt <<EOF
85
92
78
EOF

echo "=== Paste names and scores side by side ==="
paste names.txt scores.txt

echo -e "\n=== Paste with custom delimiter (space) ==="
paste -d ' ' names.txt scores.txt

# Cleanup
rm names.txt scores.txt