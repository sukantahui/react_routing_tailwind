#!/bin/bash
# sort_month_column.sh - Sorting by month name (-M)
cat > dates.txt <<EOF
Jan 15
Mar 10
Feb 20
Dec 5
EOF

echo "=== Default alpha sort (not correct month order) ==="
sort dates.txt

echo -e "\n=== Month sort (-M) ==="
sort -k1,1M dates.txt

echo -e "\n=== Month and day numeric ==="
sort -k1,1M -k2,2n dates.txt

# Cleanup
rm dates.txt