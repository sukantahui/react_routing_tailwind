#!/bin/bash
# Student marks report using awk printf
# Data: Name, Physics, Chemistry, Maths

cat << 'EOF' | awk '
BEGIN {
    printf("%-20s %8s %8s %8s %8s\n", "Student Name", "Physics", "Chem", "Maths", "Total")
    printf("%-20s %8s %8s %8s %8s\n", "-----------", "-------", "----", "-----", "-----")
}
{
    total = $2 + $3 + $4
    printf("%-20s %8.2f %8.2f %8.2f %8.2f\n", $1, $2, $3, $4, total)
}
'
Tuhina 85.5 78.0 92.5
Swadeep 92.0 88.5 95.0
Abhronila 78.5 82.0 75.5
Debangshu 65.0 72.5 68.0
EOF