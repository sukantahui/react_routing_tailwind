#!/bin/bash
# diff_context.sh - Context diff (-c)
cat > old.txt <<EOF
Line 1
Line 2
Line 3
Line 4
Line 5
EOF

cat > new.txt <<EOF
Line 1
Line 2 changed
Line 3
Line 4
Line 5 new
EOF

echo "=== Context diff (-c) ==="
diff -c old.txt new.txt

# Cleanup
rm old.txt new.txt