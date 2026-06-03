#!/bin/bash
# diff_basic.sh - Basic diff output (normal format)
cat > file1.txt <<EOF
apple
banana
cherry
date
EOF

cat > file2.txt <<EOF
apple
banana
grape
date
EOF

echo "=== File1 ==="
cat file1.txt
echo "=== File2 ==="
cat file2.txt

echo -e "\n=== diff file1.txt file2.txt ==="
diff file1.txt file2.txt

# Cleanup
rm file1.txt file2.txt