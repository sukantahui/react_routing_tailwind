#!/bin/bash
# wc_practical.sh - Real-world scenarios
# 1. Validate CSV has correct number of columns (using header line as reference)
cat > students.csv <<EOF
Name,Age,Grade
Swadeep,20,A
Tuhina,21,A+
Abhronila,19,B
Debangshu,22,A
EOF

echo "=== Expected columns: $(head -1 students.csv | tr ',' '\n' | wc -l) ==="

echo -e "\n=== Check each row has exactly 3 fields ==="
while IFS= read -r line; do
    fields=$(echo "$line" | tr ',' '\n' | wc -l)
    if [ $fields -ne 3 ]; then
        echo "Line has $fields fields: $line"
    fi
done < students.csv
echo "Validation complete."

# 2. Monitor log growth (simulate)
echo -e "\n=== Log file growth example ==="
cat > access.log <<EOF
2025-01-15 10:00:00 GET /index.html
2025-01-15 10:00:05 POST /login
EOF
echo "Current lines: $(wc -l < access.log)"
echo "Simulating growth..."
echo "2025-01-15 10:01:00 GET /about" >> access.log
echo "New lines: $(wc -l < access.log)"

# 3. Find largest file in directory by byte count
echo -e "\n=== Find largest file (by bytes) ==="
# Create some dummy files
echo "small" > small.txt
dd if=/dev/zero of=medium.txt bs=1024 count=10 2>/dev/null
echo "largest file: $(ls -S | head -1) has $(wc -c < $(ls -S | head -1)) bytes"

# 4. Count total lines of all .txt files, excluding total line
echo -e "\n=== Total lines in all .txt files ==="
wc -l *.txt 2>/dev/null | grep -v total | awk '{sum+=$1} END {print sum}'

# Cleanup
rm students.csv access.log small.txt medium.txt *.txt 2>/dev/null