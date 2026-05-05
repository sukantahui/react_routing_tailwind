#!/bin/bash
# selective_line.sh - Replace only on specific line numbers
cat > report.txt <<EOF
Line 1: All good
Line 2: Warning detected
Line 3: All good
Line 4: Warning detected
Line 5: All good
EOF

echo "=== Replace on line 2 only ==="
sed '2 s/Warning/ERROR/' report.txt

echo -e "\n=== Replace on lines 2 to 4 ==="
sed '2,4 s/Warning/ERROR/' report.txt

echo -e "\n=== Replace on last line ==="
sed '$ s/good/EXCELLENT/' report.txt