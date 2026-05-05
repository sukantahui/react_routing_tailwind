#!/bin/bash
# diff_practical.sh - Real-world use cases
# 1. Compare two sorted reports
echo "=== 1. Report comparison ==="
cat > report1.csv <<EOF
Name,Score
Swadeep,85
Tuhina,92
EOF
cat > report2.csv <<EOF
Name,Score
Tuhina,92
Swadeep,86
EOF
echo "Lines only in report1:"
diff report1.csv report2.csv | grep '^<' | cut -c3-
echo "Lines only in report2:"
diff report1.csv report2.csv | grep '^>' | cut -c3-

# 2. Checking if config file changed
echo -e "\n=== 2. Detecting config changes (exit status) ==="
cp report1.csv config1.txt
cp config1.txt config2.txt
echo "extra line" >> config2.txt
if diff -q config1.txt config2.txt >/dev/null; then
    echo "Configs are identical"
else
    echo "Configs differ"
fi

# 3. Using diff to find missing entries in one file compared to another
echo -e "\n=== 3. Find lines in fileA not in fileB ==="
cat > fileA.txt <<EOF
apple
banana
cherry
date
EOF
cat > fileB.txt <<EOF
apple
cherry
EOF
# diff --new-line-format='' --old-line-format='%L' fileA.txt fileB.txt 2>/dev/null
# Simpler: comm -23 <(sort fileA.txt) <(sort fileB.txt)
comm -23 <(sort fileA.txt) <(sort fileB.txt) | sed 's/^/Missing: /'

# Cleanup
rm report1.csv report2.csv config1.txt config2.txt fileA.txt fileB.txt