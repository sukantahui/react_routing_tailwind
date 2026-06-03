#!/bin/bash
# join_basic.sh - Basic join on first field (inner join)
cat > students.txt <<EOF
101 Swadeep
102 Tuhina
103 Abhronila
104 Debangshu
EOF

cat > scores.txt <<EOF
101 85
102 92
104 78
105 88
EOF

echo "=== Original files (unsorted) ==="
echo "students.txt:"
cat students.txt
echo "scores.txt:"
cat scores.txt

echo -e "\n=== Sort both on first field ==="
sort -k1,1 students.txt -o students_sorted.txt
sort -k1,1 scores.txt -o scores_sorted.txt

echo -e "\n=== join (inner join) ==="
join students_sorted.txt scores_sorted.txt

# Cleanup
rm students.txt scores.txt students_sorted.txt scores_sorted.txt