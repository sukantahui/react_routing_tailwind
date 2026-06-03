#!/bin/bash
# diff_patch.sh - Creating and applying patches
cat > v1.sh <<EOF
#!/bin/bash
echo "Version 1"
echo "Hello"
exit 0
EOF

cat > v2.sh <<EOF
#!/bin/bash
echo "Version 2"
echo "Hello World"
exit 0
EOF

echo "=== Create unified patch ==="
diff -u v1.sh v2.sh > changes.patch
cat changes.patch

echo -e "\n=== Apply patch to v1.sh to get v2.sh ==="
cp v1.sh patched.sh
patch patched.sh < changes.patch
echo "Patched file content:"
cat patched.sh

echo -e "\n=== Reverse patch (undo changes) ==="
patch -R patched.sh < changes.patch
echo "After revert:"
cat patched.sh

# Cleanup
rm v1.sh v2.sh changes.patch patched.sh