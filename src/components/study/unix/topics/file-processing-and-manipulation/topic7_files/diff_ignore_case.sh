#!/bin/bash
# diff_ignore_case.sh - Case-insensitive diff (-i)
cat > text1.txt <<EOF
Hello World
Unix is Great
EOF

cat > text2.txt <<EOF
hello world
unix is great
EOF

echo "=== Default diff (case-sensitive) ==="
diff text1.txt text2.txt

echo -e "\n=== Case-insensitive diff (-i) ==="
diff -i text1.txt text2.txt

# Cleanup
rm text1.txt text2.txt