awk -F',' '{
    # Calculate average of 5 subjects
    total = $2 + $3 + $4 + $5 + $6
    avg = total / 5
    
    # Multi-level grade classification
    if (avg >= 90) {
        grade = "A+"
        category = "Excellent"
    } else if (avg >= 80) {
        grade = "A"
        category = "Very Good"
    } else if (avg >= 70) {
        grade = "B+"
        category = "Good"
    } else if (avg >= 60) {
        grade = "B"
        category = "Above Average"
    } else if (avg >= 50) {
        grade = "C"
        category = "Average"
    } else if (avg >= 40) {
        grade = "D"
        category = "Below Average"
    } else {
        grade = "F"
        category = "Fail"
    }
    
    # Additional conditions
    if ($2 < 40 || $3 < 40 || $4 < 40 || $5 < 40 || $6 < 40) {
        grade = "F"
        category = "Fail in one or more subjects"
    }
    
    print $1, "Average:", avg, "Grade:", grade, "Category:", category
}' students.txt