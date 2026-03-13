#!/usr/bin/awk -f
# Professional awk script with conditionals and loops

BEGIN {
    FS = ","
    OFS = "|"

    # Initialize counters
    excellent = 0
    good = 0
    average_count = 0
    poor = 0
    failures = 0

    print "Student Analysis Report"
    print "======================="
}

# Main processing
{
    # Validate record
    if (NF < 5) {
        printf "ERROR: Record %d has only %d fields\n", NR, NF >> "/dev/stderr"
        next
    }

    total = 0
    subject_count = 0

    # Process subject columns (fields 2–5)
    for (i = 2; i <= 5; i++) {
        if ($i >= 0 && $i <= 100) {
            total += $i
            subject_count++
        } else {
            printf "WARNING: Invalid mark %s for %s\n", $i, $1 >> "/dev/stderr"
        }
    }

    # Skip if no valid marks
    if (subject_count == 0) {
        next
    }

    average_mark = total / subject_count

    # Grading logic
    if (average_mark >= 90) {
        grade = "A+"
        excellent++
        comment = "Outstanding!"
    } else if (average_mark >= 80) {
        grade = "A"
        good++
        comment = "Very Good"
    } else if (average_mark >= 70) {
        grade = "B+"
        average_count++
        comment = "Good"
    } else if (average_mark >= 60) {
        grade = "B"
        average_count++
        comment = "Above Average"
    } else if (average_mark >= 50) {
        grade = "C"
        poor++
        comment = "Needs Improvement"
    } else {
        grade = "F"
        failures++
        comment = "Failed - Requires attention"
    }

    # Output result
    printf "%-20s %6.2f %-4s %-20s\n", $1, average_mark, grade, comment
}

END {
    print "\n======================="
    print "SUMMARY STATISTICS"
    print "======================="
    printf "Excellent (A+): %d\n", excellent
    printf "Good (A): %d\n", good
    printf "Average (B): %d\n", average_count
    printf "Poor (C): %d\n", poor
    printf "Failures (F): %d\n", failures
    printf "Total Students: %d\n", NR
}
