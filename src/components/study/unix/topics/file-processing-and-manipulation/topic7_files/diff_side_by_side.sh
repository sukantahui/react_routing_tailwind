#!/bin/bash
# diff_side_by_side.sh - Side-by-side diff (-y)
cat > left.txt <<EOF
Alice
Bob
Charlie
David
EOF

cat > right.txt <<EOF
Alice
Robert
Charlie
David
EOF

echo "=== Side-by-side diff (default width) ==="
diff -y left.txt right.txt

echo -e "\n=== With width control (--width=40) ==="
diff -y --width=40 left.txt right.txt

# Cleanup
rm left.txt right.txt