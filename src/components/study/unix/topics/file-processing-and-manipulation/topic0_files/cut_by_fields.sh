#!/bin/bash
# cut_by_fields.sh - Cut fields with delimiter
cat > students.csv <<EOF
Name,Age,Grade
Swadeep,20,A
Tuhina,21,A+
Abhronila,19,B
Debangshu,22,A
EOF

echo "=== Default delimiter (tab) won't work for CSV ==="
cut -f 1 students.csv

echo -e "\n=== Using comma delimiter: extract Name and Grade ==="
cut -d',' -f1,3 students.csv

echo -e "\n=== Using output delimiter: replace comma with space ==="
cut -d',' -f1,3 --output-delimiter=' ' students.csv

echo -e "\n=== Fields 2 to end ==="
cut -d',' -f2- students.csv

# Cleanup
rm students.csv