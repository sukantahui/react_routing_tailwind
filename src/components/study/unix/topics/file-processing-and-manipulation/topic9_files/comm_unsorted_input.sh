#!/bin/bash
# comm_unsorted_input.sh – Demo of incorrect output when input is not sorted
cat > unsorted1.txt <<EOF
banana
apple
date
EOF

cat > unsorted2.txt <<EOF
apple
cherry
date
EOF

echo "=== Unsorted files (comm may give wrong results) ==="
comm unsorted1.txt unsorted2.txt

echo -e "\n=== After sorting ==="
sort unsorted1.txt -o sorted1.txt
sort unsorted2.txt -o sorted2.txt
comm sorted1.txt sorted2.txt

# Cleanup
rm unsorted1.txt unsorted2.txt sorted1.txt sorted2.txt