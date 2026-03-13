#!/bin/bash
# Average calculation - Student marks
# Data: StudentName, Marks

echo "Class Average Calculator - Barrackpore School"
echo "=============================================="

awk '
BEGIN {
    sum = 0
    count = 0
    printf("%-20s %10s\n", "Student", "Marks")
    printf("%-20s %10s\n", "-------", "-----")
}
{
    printf("%-20s %10d\n", $1, $2)
    sum += $2      # Add to running sum
    count++        # Increment count
}
END {
    if (count > 0) {
        average = sum / count
        printf("\n%-20s %10s\n", "---------------", "----------")
        printf("%-20s %10d\n", "Total Students:", count)
        printf("%-20s %10d\n", "Sum of Marks:", sum)
        printf("%-20s %10.2f\n", "Class Average:", average)
    } else {
        print "No data found"
    }
}
' << 'EOF'
Abhronila 85
Swadeep 92
Tuhina 78
Debangshu 65
Rohit 88
Priya 95
EOF