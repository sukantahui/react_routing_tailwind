#!/bin/bash
# Group-wise aggregation example
# Data: Class, Student, Marks

echo "Group-wise Average by Class"
echo "============================"

awk '
BEGIN {
    printf("%-10s %-15s %10s\n", "Class", "Student", "Marks")
    printf("%-10s %-15s %10s\n", "-----", "-------", "-----")
    
    # Variables for current group
    current_class = ""
    class_sum = 0
    class_count = 0
}
{
    # Check if class changed
    if (current_class != "" && current_class != $1) {
        # Print statistics for previous class
        class_avg = (class_count > 0) ? class_sum / class_count : 0
        printf("%-10s %-15s %10.2f  (Avg: %.2f)\n", 
               "", "Class Average", "", class_avg)
        printf("%-10s %-15s %10s\n", "", "", "---")
        
        # Reset for new class
        class_sum = 0
        class_count = 0
    }
    
    current_class = $1
    printf("%-10s %-15s %10d\n", $1, $2, $3)
    
    # Update group aggregates
    class_sum += $3
    class_count++
}
END {
    # Print final class statistics
    if (class_count > 0) {
        class_avg = class_sum / class_count
        printf("%-10s %-15s %10.2f  (Avg: %.2f)\n", 
               "", "Class Average", "", class_avg)
    }
}
' << 'EOF'
10A Tuhina 85
10A Swadeep 92
10A Abhronila 78
10B Debangshu 65
10B Priya 88
10B Rohit 75
10C Aniket 82
10C Sneha 91
EOF