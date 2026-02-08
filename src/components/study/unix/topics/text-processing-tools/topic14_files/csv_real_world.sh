#!/bin/bash
# Real-world CSV processing with multiple challenges

echo "School Database Processing - Shyamnagar High School"
echo "==================================================="

awk '
BEGIN {
    # Try to auto-detect delimiter
    print "Processing student records..."
    print "-----------------------------"
    
    # Variables for statistics
    student_count = 0
    total_age = 0
    max_age = 0
    min_age = 100
}
NR == 1 {
    # Analyze first line to detect delimiter
    if (index($0, "|") > 0) {
        FS = "|"
        print "Detected pipe delimiter (|)"
    } else if (index($0, ",") > 0) {
        FS = ","
        print "Detected comma delimiter (,)"
    } else if (index($0, ";") > 0) {
        FS = ";"
        print "Detected semicolon delimiter (;)"
    } else {
        FS = " "  # Fallback to space
        print "Using space delimiter"
    }
    next  # Skip header
}
{
    student_count++
    
    # Clean and normalize data
    gsub(/^[ \t]+|[ \t]+$/, "", $1)  # Trim spaces
    gsub(/^[ \t]+|[ \t]+$/, "", $2)
    gsub(/^[ \t]+|[ \t]+$/, "", $3)
    
    # Remove quotes if present
    gsub(/^"|"$/, "", $1)
    gsub(/^"|"$/, "", $2)
    
    # Convert age to number, handle empty values
    if ($3 == "") {
        age = 0
        missing_age_count++
    } else {
        age = $3 + 0  # Force numeric conversion
    }
    
    total_age += age
    
    # Track min/max
    if (age > max_age && age > 0) max_age = age
    if (age < min_age && age > 0) min_age = age
    
    # Format and print
    printf("%2d. %-15s | %-20s | %3d years\n", 
           student_count, $1, $2, age)
}
END {
    print "\nStatistics:"
    print "-----------"
    printf("Total students: %d\n", student_count)
    if (student_count > 0 && total_age > 0) {
        printf("Average age: %.1f years\n", total_age/student_count)
        printf("Age range: %d - %d years\n", min_age, max_age)
    }
    if (missing_age_count > 0) {
        printf("Warning: %d records missing age data\n", missing_age_count)
    }
}
' << 'EOF'
Name|Address|Age
"Tuhina Das"|"12 College St, Barrackpore"|17
Swadeep Roy|"45 Gopal Nagar, Naihati"|16
Abhronila Sen|"78 Station Road, Ichapur"|
"Deb, Roy"|"90 Lake Town, Kolkata"|18
Priya Sharma|"23 Park Street, Shyamnagar"|17
Rohit Verma|"56 Mall Road"|16
EOF