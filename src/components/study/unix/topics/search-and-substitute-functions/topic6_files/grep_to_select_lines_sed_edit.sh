#!/bin/bash
# grep_to_select_lines_sed_edit.sh - grep selects, sed edits
cat > students.csv <<EOF
Swadeep,85,A
Tuhina,92,A
Abhronila,78,B
Debangshu,45,F
EOF

echo "=== Original CSV ==="
cat students.csv

echo -e "\n=== Select A-grade students and add 'Excellent' before name ==="
grep ",A$" students.csv | sed 's/^/Excellent: /'

echo -e "\n=== Select F-grade, change F to Fail (full pipeline) ==="
grep ",F$" students.csv | sed 's/,F$/,Fail/'

echo -e "\n=== Count of A-grade students after transformation ==="
grep ",A$" students.csv | sed 's/^/EXCELLENT: /' | wc -l