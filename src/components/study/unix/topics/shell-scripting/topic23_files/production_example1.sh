#!/bin/bash
# Production-grade student grade processing system
# Used across Barrackpore, Shyamnagar, and Ichapur schools

set -euo pipefail

# Default configuration
INPUT_FILE=""
OUTPUT_FILE="report_$(date +%Y%m%d).txt"
TITLE="Student Grade Report"
MIN_SCORE=0
MAX_SCORE=100
VERBOSE=0

# Help function
usage() {
    cat << EOF
Student Grade Processor v2.0

Usage: $0 -i INPUT_FILE [OPTIONS]

Options:
  -i FILE     Input CSV file (required)
  -o FILE     Output report file (default: report_DATE.txt)
  -t TITLE    Report title (default: Student Grade Report)
  -min N      Minimum valid score (default: 0)
  -max N      Maximum valid score (default: 100)
  -v          Verbose output
  -h          Show this help

Input CSV format:
  Name,Department,Score1,Score2,Score3,Email

Example:
  $0 -i grades.csv -o march_report.txt -t "March 2024 Results" -v
EOF
    exit 1
}

# Parse arguments
while getopts ":i:o:t:min:max:vh" opt; do
    case $opt in
        i) INPUT_FILE="$OPTARG" ;;
        o) OUTPUT_FILE="$OPTARG" ;;
        t) TITLE="$OPTARG" ;;
        min) MIN_SCORE="$OPTARG" ;;
        max) MAX_SCORE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        h) usage ;;
        ?) echo "Invalid option: -$OPTARG" >&2; usage ;;
        :) echo "Option -$OPTARG requires argument" >&2; usage ;;
    esac
done

shift $((OPTIND - 1))

# Validate input
if [ -z "$INPUT_FILE" ] || [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file required and must exist" >&2
    usage
fi

if [ $VERBOSE -eq 1 ]; then
    echo "=== Starting Grade Processing ==="
    echo "Input: $INPUT_FILE"
    echo "Output: $OUTPUT_FILE"
    echo "Title: $TITLE"
    echo "Score Range: $MIN_SCORE-$MAX_SCORE"
    echo
fi

# Temporary files
CLEANED_FILE=$(mktemp)
SUMMARY_FILE=$(mktemp)

# Cleanup trap
trap 'rm -f "$CLEANED_FILE" "$SUMMARY_FILE"' EXIT

# Step 1: Clean and validate data with sed
if [ $VERBOSE -eq 1 ]; then
    echo "Step 1: Cleaning input data..."
fi

sed '
# Remove empty lines
/^$/d
# Remove leading/trailing spaces
s/^[[:space:]]*//
s/[[:space:]]*$//
# Replace multiple commas with single comma
s/,,*/,/g
# Remove lines with insufficient fields (less than 6)
/^[^,]*\(,[^,]*\)\{4\}/!d
' "$INPUT_FILE" > "$CLEANED_FILE"

# Step 2: Process with awk for analysis
if [ $VERBOSE -eq 1 ]; then
    echo "Step 2: Analyzing data with awk..."
fi

awk -F, -v min="$MIN_SCORE" -v max="$MAX_SCORE" '
BEGIN {
    print "DEPARTMENT,COUNT,AVERAGE,HIGHEST,LOWEST,TOP_STUDENT"
    dept_count = 0
    total_students = 0
    overall_sum = 0
}

NR == 1 { next }  # Skip header if exists

{
    name = $1
    department = $2
    score1 = $3 + 0  # Force numeric
    score2 = $4 + 0
    score3 = $5 + 0
    email = $6
    
    # Validate scores
    if (score1 < min || score1 > max || 
        score2 < min || score2 > max || 
        score3 < min || score3 > max) {
        invalid++
        next
    }
    
    avg_score = (score1 + score2 + score3) / 3
    total_students++
    overall_sum += avg_score
    
    # Department statistics
    dept_count[department]++
    dept_sum[department] += avg_score
    
    if (avg_score > dept_high[department]) {
        dept_high[department] = avg_score
        dept_top_student[department] = name
    }
    
    if (dept_low[department] == 0 || avg_score < dept_low[department]) {
        dept_low[department] = avg_score
    }
    
    # Store for student ranking
    student_avg[name] = avg_score
    student_dept[name] = department
}

END {
    # Print department summary
    for (dept in dept_count) {
        avg = dept_sum[dept] / dept_count[dept]
        printf "%s,%d,%.1f,%.1f,%.1f,%s\n", 
            dept, dept_count[dept], avg, 
            dept_high[dept], dept_low[dept], 
            dept_top_student[dept]
    }
    
    # Overall statistics
    print ""
    print "OVERALL_STATISTICS"
    printf "Total students:,%d\n", total_students
    printf "Overall average:,.1f\n", (total_students ? overall_sum / total_students : 0)
    printf "Invalid records:,%d\n", invalid
    
    # Top 5 students
    print ""
    print "TOP_5_STUDENTS,AVERAGE,DEPARTMENT"
    n = asorti(student_avg, sorted, "@val_num_desc")
    for (i = 1; i <= (n < 5 ? n : 5); i++) {
        student = sorted[i]
        printf "%s,%.1f,%s\n", student, student_avg[student], student_dept[student]
    }
}' "$CLEANED_FILE" > "$SUMMARY_FILE"

# Step 3: Format final report with sed
if [ $VERBOSE -eq 1 ]; then
    echo "Step 3: Formatting final report..."
fi

{
    # Header
    echo "========================================="
    echo "    $TITLE"
    echo "    Generated: $(date)"
    echo "    Source: $INPUT_FILE"
    echo "========================================="
    echo
    
    # Department summary
    echo "DEPARTMENT SUMMARY"
    echo "------------------"
    sed -n '2,/^$/p' "$SUMMARY_FILE" | sed 's/,/ | /g'
    echo
    
    # Overall statistics
    sed -n '/OVERALL_STATISTICS/,/^$/p' "$SUMMARY_FILE" | 
        sed 's/,/ : /; /^$/d; s/OVERALL_STATISTICS/Overall Statistics/'
    echo
    
    # Top students
    sed -n '/TOP_5_STUDENTS/,/^$/p' "$SUMMARY_FILE" | 
        sed 's/,/ | /g; s/TOP_5_STUDENTS/Top 5 Students/; /^$/d'
    echo
    
    # Footer
    echo "========================================="
    echo "Processed by: Barrackpore College System"
    echo "========================================="
} > "$OUTPUT_FILE"

# Step 4: Final output
if [ $VERBOSE -eq 1 ]; then
    echo "Step 4: Generating output..."
    echo "Report saved to: $OUTPUT_FILE"
    echo
    echo "=== Report Preview ==="
    head -20 "$OUTPUT_FILE"
    echo "..."
fi

echo "Processing complete. Report generated: $OUTPUT_FILE"