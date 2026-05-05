#!/bin/bash
# diff_ignore_whitespace.sh - Ignoring whitespace changes
cat > spaced.txt <<EOF
Hello   world
Unix    is  powerful
EOF

cat > nospaces.txt <<EOF
Hello world
Unix is powerful
EOF

echo "=== Default diff (sees whitespace difference) ==="
diff spaced.txt nospaces.txt

echo -e "\n=== Ignore all whitespace (-w) ==="
diff -w spaced.txt nospaces.txt

echo -e "\n=== Ignore blank lines (-B) ==="
# Create files with/without blank lines
echo -e "Line1\n\nLine2" > withblank.txt
echo -e "Line1\nLine2" > noblank.txt
diff -B withblank.txt noblank.txt

# Cleanup
rm spaced.txt nospaces.txt withblank.txt noblank.txt