#!/bin/bash
# Comprehensive aggregation - All statistics
# Data: Student, Physics, Chemistry, Maths

echo "Complete Student Performance Analysis"
echo "====================================="

awk '
BEGIN {
    # Initialize all aggregation variables
    phys_sum = chem_sum = math_sum = 0
    phys_min = chem_min = math_min = 100  # Start with perfect score
    phys_max = chem_max = math_max = 0    # Start with zero
    count = 0
    
    printf("%-12s %8s %8s %8s %8s\n", "Student", "Physics", "Chem", "Maths", "Total")
    printf("%-12s %8s %8s %8s %8s\n", "-------", "-------", "----", "-----", "-----")
}
{
    total = $2 + $3 + $4
    count++
    
    # Update sums
    phys_sum += $2
    chem_sum += $3
    math_sum += $4
    
    # Update minimums
    if ($2 < phys_min) phys_min = $2
    if ($3 < chem_min) chem_min = $3
    if ($4 < math_min) math_min = $4
    
    # Update maximums
    if ($2 > phys_max) phys_max = $2
    if ($3 > chem_max) chem_max = $3
    if ($4 > math_max) math_max = $4
    
    printf("%-12s %8.1f %8.1f %8.1f %8.1f\n", $1, $2, $3, $4, total)
}
END {
    if (count > 0) {
        phys_avg = phys_sum / count
        chem_avg = chem_sum / count
        math_avg = math_sum / count
        overall_avg = (phys_avg + chem_avg + math_avg) / 3
        
        printf("\n%-12s %8s %8s %8s\n", "STATISTICS", "Physics", "Chem", "Maths")
        printf("%-12s %8s %8s %8s\n", "----------", "-------", "----", "-----")
        printf("%-12s %8.1f %8.1f %8.1f\n", "Average:", phys_avg, chem_avg, math_avg)
        printf("%-12s %8.1f %8.1f %8.1f\n", "Minimum:", phys_min, chem_min, math_min)
        printf("%-12s %8.1f %8.1f %8.1f\n", "Maximum:", phys_max, chem_max, math_max)
        printf("\n%-12s %8.1f\n", "Overall Avg:", overall_avg)
        printf("%-12s %8d\n", "Students:", count)
    }
}
' << 'EOF'
Tuhina 85 78 92
Swadeep 92 88 95
Abhronila 78 82 75
Debangshu 65 72 68
Priya 88 85 90
Rohit 75 79 82
EOF