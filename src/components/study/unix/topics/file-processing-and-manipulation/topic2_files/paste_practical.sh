#!/bin/bash
# paste_practical.sh - Real-world: building CSV from separate files
cat > names.txt <<EOF
Swadeep
Tuhina
Abhronila
Debangshu
EOF

cat > ages.txt <<EOF
20
21
19
22
EOF

cat > grades.txt <<EOF
A
A+
B
A
EOF

echo "=== Create CSV header + data ==="
echo "Name,Age,Grade" > report.csv
paste -d ',' names.txt ages.txt grades.txt >> report.csv
cat report.csv

echo -e "\n=== Convert to space-separated for readability ==="
paste -d ' ' names.txt ages.txt grades.txt | column -t

# Cleanup
rm names.txt ages.txt grades.txt report.csv