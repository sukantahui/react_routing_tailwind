#!/bin/bash
# diff_unified.sh - Unified diff (-u)
cat > original.sh <<EOF
#!/bin/bash
echo "Hello"
echo "World"
exit 0
EOF

cat > modified.sh <<EOF
#!/bin/bash
echo "Hello"
echo "Universe"
exit 0
EOF

echo "=== Unified diff (-u) ==="
diff -u original.sh modified.sh

# Cleanup
rm original.sh modified.sh