#!/bin/bash
# Professional table formatting with borders

echo "Creating formatted table..."
echo ""

awk '
BEGIN {
    # Print table header with borders
    printf("| %-10s | %3s | %6s | %5s |\n", "Name", "Age", "Score", "Grade")
    printf("|------------|-----|-------|-------|\n")
}
{
    # Determine grade based on score
    grade = ($3 >= 90) ? "A" : ($3 >= 80) ? "B+" : ($3 >= 70) ? "B" : ($3 >= 60) ? "C" : "D"
    
    # Format each row
    printf("| %-10s | %3d | %6.1f | %5s |\n", $1, $2, $3, grade)
}
' << 'EOF'
Tuhina 20 85.5
Swadeep 21 92.0
Abhronila 19 78.5
Debangshu 22 65.5
EOF