#!/bin/bash
# selective_conditional.sh - Advanced conditional replacement
cat > scores.csv <<EOF
Name,Score,Grade
Swadeep,45,F
Tuhina,78,B
Abhronila,92,A
Debangshu,38,F
EOF

echo "=== Replace only for scores < 50 (F to Fail) ==="
sed '/,[0-4][0-9],F/ s/F/Fail/' scores.csv

echo -e "\n=== Replace for scores >= 90 (A to A+) ==="
sed '/,[9][0-9],A/ s/A/A+/' scores.csv

echo -e "\n=== Multiple conditions with {} grouping ==="
sed '/^[^,]*,,[FB]/ s/F/Fail/; s/B/BelowAverage/' scores.csv