#!/bin/bash
# wc_pipeline.sh - Using wc in pipelines
cat > data.txt <<EOF
apple
banana
apple
cherry
banana
apple
EOF

echo "=== Count lines containing 'apple' using grep|wc -l ==="
grep "apple" data.txt | wc -l

echo -e "\n=== Better: use grep -c (faster) ==="
grep -c "apple" data.txt

echo -e "\n=== Count total words across all .sh files ==="
echo "Total words in all .sh files: $(cat *.sh 2>/dev/null | wc -w)"

echo -e "\n=== Count number of files in current directory ==="
ls -1 | wc -l

# Cleanup
rm data.txt