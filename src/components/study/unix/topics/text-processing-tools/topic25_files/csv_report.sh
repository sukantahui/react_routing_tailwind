#!/bin/bash
# Topic 25: CSV Analysis Report Generation
# Creates comprehensive data quality and summary report

INPUT_FILE="${1:-students_transformed.csv}"
REPORT_FILE="analysis_report.txt"

echo "Generating analysis report..."
echo "Input: $INPUT_FILE"
echo ""

# Get total records (excluding header)
total_records=$(tail -n +2 "$INPUT_FILE" | wc -l)

{
echo "=== CSV DATA QUALITY REPORT ==="
echo "Generated: $(date '+%Y-%m-%d %H:%M:%S')"
echo "File: $INPUT_FILE"
echo ""
echo "SUMMARY STATISTICS:"
echo "Total Records: $total_records"
echo ""

# Count by school
echo "SCHOOL DISTRIBUTION:"
tail -n +2 "$INPUT_FILE" | awk -F',' '
{
    # Extract school name, remove quotes
    school = $4
    gsub(/"/, "", school)
    schools[school]++
}
END {
    for (s in schools) {
        printf "  %-30s: %4d (%.1f%%)\n", s, schools[s], (schools[s]/NR)*100
    }
}'
echo ""

# Grade distribution
echo "GRADE DISTRIBUTION:"
tail -n +2 "$INPUT_FILE" | awk -F',' '
{
    grade = $6
    gsub(/"/, "", grade)
    if (grade == "") grade = "Ungraded"
    grades[grade]++
    total++
}
END {
    for (g in grades) {
        printf "  %-10s: %4d (%.1f%%)\n", g, grades[g], (grades[g]/total)*100
    }
}'
echo ""

# Marks statistics
echo "MARKS STATISTICS:"
tail -n +2 "$INPUT_FILE" | awk -F',' '
{
    marks = $5 + 0
    if (marks > 0) {
        sum += marks
        count++
        if (marks > max || count == 1) max = marks
        if (marks < min || count == 1) min = marks
    }
}
END {
    if (count > 0) {
        printf "  Average marks: %.1f\n", sum/count
        printf "  Highest marks: %d\n", max
        printf "  Lowest marks:  %d\n", min
        printf "  Records with marks: %d\n", count
    }
}'
echo ""

# Data completeness
echo "DATA COMPLETENESS:"
tail -n +2 "$INPUT_FILE" | awk -F',' '
BEGIN {
    total = 0
    has_name = 0
    has_dob = 0
    has_school = 0
    has_marks = 0
    has_grade = 0
}
{
    total++
    
    # Check each field
    if ($2 != "\"\"") has_name++
    if ($3 != "\"\"") has_dob++
    if ($4 != "\"\"") has_school++
    if ($5 != "") has_marks++
    if ($6 != "\"\"") has_grade++
}
END {
    printf "  Name:     %4d/%d (%.1f%%)\n", has_name, total, (has_name/total)*100
    printf "  DOB:      %4d/%d (%.1f%%)\n", has_dob, total, (has_dob/total)*100
    printf "  School:   %4d/%d (%.1f%%)\n", has_school, total, (has_school/total)*100
    printf "  Marks:    %4d/%d (%.1f%%)\n", has_marks, total, (has_marks/total)*100
    printf "  Grade:    %4d/%d (%.1f%%)\n", has_grade, total, (has_grade/total)*100
}'

} > "$REPORT_FILE"

echo "Report generated: $REPORT_FILE"
echo ""
echo "=== REPORT PREVIEW ==="
head -30 "$REPORT_FILE"