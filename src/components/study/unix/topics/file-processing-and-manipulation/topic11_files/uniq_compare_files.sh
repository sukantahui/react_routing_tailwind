#!/bin/bash
# uniq_compare_files.sh - Find lines unique to each file using uniq
cat > fileA.txt <<EOF
apple
banana
cherry
EOF

cat > fileB.txt <<EOF
banana
date
elderberry
EOF

# Combine, sort, and use uniq -u to get lines that appear only once (unique to one file)
echo "=== Lines unique to either file (i.e., not common) ==="
cat fileA.txt fileB.txt | sort | uniq -u

echo -e "\n=== Lines common to both files ==="
cat fileA.txt fileB.txt | sort | uniq -d

# Cleanup
rm fileA.txt fileB.txt