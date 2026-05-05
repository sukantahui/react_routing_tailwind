#!/bin/bash
# sort_human_numeric.sh - Human‑readable numeric suffixes
cat > sizes.txt <<EOF
2K
1M
500
3G
100K
EOF

echo "=== Default alphabetical sort (wrong) ==="
sort sizes.txt

echo -e "\n=== Human‑numeric sort (-h) ==="
sort -h sizes.txt

echo -e "\n=== Reverse human‑numeric ==="
sort -hr sizes.txt

# Cleanup
rm sizes.txt