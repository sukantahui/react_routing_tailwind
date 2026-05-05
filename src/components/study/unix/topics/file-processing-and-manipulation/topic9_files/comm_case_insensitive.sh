#!/bin/bash
# comm_case_insensitive.sh - Case‑insensitive comparison (pre‑process)
cat > mixed1.txt <<EOF
Apple
banana
Cherry
EOF

cat > mixed2.txt <<EOF
apple
BANANA
date
EOF

echo "=== Original comm (case‑sensitive) ==="
sort mixed1.txt -o sorted1.txt
sort mixed2.txt -o sorted2.txt
comm sorted1.txt sorted2.txt

echo -e "\n=== Case‑insensitive by converting to lowercase ==="
tr '[:upper:]' '[:lower:]' < mixed1.txt | sort > lower1.txt
tr '[:upper:]' '[:lower:]' < mixed2.txt | sort > lower2.txt
comm lower1.txt lower2.txt

# Cleanup
rm mixed1.txt mixed2.txt sorted1.txt sorted2.txt lower1.txt lower2.txt