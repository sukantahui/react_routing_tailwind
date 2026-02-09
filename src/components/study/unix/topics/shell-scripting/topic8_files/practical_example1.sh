#!/bin/bash
# Complete Practical Example: Student Grade Calculator
# Topic 8: Reading User Input

echo "=== STUDENT GRADE CALCULATOR ==="
echo

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Calculate student grades and generate reports"
    echo
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -s, --student NAME  Student name (required)"
    echo "  -m, --math SCORE    Math score (0-100)"
    echo "  -s, --science SCORE Science score (0-100)"
    echo "  -e, --english SCORE English score (0-100)"
    echo "  -i, --interactive   Use interactive mode"
    echo
    echo "Examples:"
    echo "  $0 -s Swadeep -m 85 -s 92 -e 78"
    echo "  $0 --interactive"
    echo "  $0 --help"
}

# Function to calculate grade
calculate_grade() {
    local score=$1
    if [ $score -ge 90 ]; then
        echo "A+"
    elif [ $score -ge 80 ]; then
        echo "A"
    elif [ $score -ge 70 ]; then
        echo "B+"
    elif [ $score -ge 60 ]; then
        echo "B"
    elif [ $score -ge 50 ]; then
        echo "C"
    elif [ $score -ge 40 ]; then
        echo "D"
    else
        echo "F"
    fi
}

# Function to generate report
generate_report() {
    local name="$1"
    local math=$2
    local science=$3
    local english=$4
    
    # Calculate grades
    math_grade=$(calculate_grade $math)
    science_grade=$(calculate_grade $science)
    english_grade=$(calculate_grade $english)
    
    # Calculate average
    average=$(( (math + science + english) / 3 ))
    overall_grade=$(calculate_grade $average)
    
    # Generate report
    echo
    echo "========================================"
    echo "        STUDENT GRADE REPORT"
    echo "========================================"
    echo "Student: $name"
    echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "----------------------------------------"
    echo "SUBJECT       SCORE     GRADE"
    echo "----------------------------------------"
    printf "Mathematics   %3d       %s\n" $math "$math_grade"
    printf "Science       %3d       %s\n" $science "$science_grade"
    printf "English       %3d       %s\n" $english "$english_grade"
    echo "----------------------------------------"
    printf "AVERAGE       %3d       %s\n" $average "$overall_grade"
    echo "========================================"
    echo
}

# Initialize variables
student_name=""
math_score=""
science_score=""
english_score=""
interactive_mode=0

# Parse command line arguments
while [ $# -gt 0 ]; do
    case "$1" in
        -h|--help)
            usage
            exit 0
            ;;
        -s|--student)
            student_name="$2"
            shift 2
            ;;
        -m|--math)
            math_score="$2"
            shift 2
            ;;
        --science)
            science_score="$2"
            shift 2
            ;;
        -e|--english)
            english_score="$2"
            shift 2
            ;;
        -i|--interactive)
            interactive_mode=1
            shift
            ;;
        *)
            echo "Error: Unknown option '$1'"
            usage
            exit 1
            ;;
    esac
done

# Interactive mode
if [ $interactive_mode -eq 1 ] || [ -z "$student_name" ]; then
    echo "=== INTERACTIVE MODE ==="
    echo
    
    # Get student name
    while [ -z "$student_name" ]; do
        read -p "Enter student name (e.g., Swadeep, Tuhina): " student_name
        if [ -z "$student_name" ]; then
            echo "Error: Student name cannot be empty"
        fi
    done
    
    # Get math score
    while true; do
        read -p "Enter math score (0-100): " math_score
        if [[ "$math_score" =~ ^[0-9]+$ ]] && [ "$math_score" -ge 0 ] && [ "$math_score" -le 100 ]; then
            break
        else
            echo "Error: Please enter a number between 0 and 100"
        fi
    done
    
    # Get science score
    while true; do
        read -p "Enter science score (0-100): " science_score
        if [[ "$science_score" =~ ^[0-9]+$ ]] && [ "$science_score" -ge 0 ] && [ "$science_score" -le 100 ]; then
            break
        else
            echo "Error: Please enter a number between 0 and 100"
        fi
    done
    
    # Get english score
    while true; do
        read -p "Enter english score (0-100): " english_score
        if [[ "$english_score" =~ ^[0-9]+$ ]] && [ "$english_score" -ge 0 ] && [ "$english_score" -le 100 ]; then
            break
        else
            echo "Error: Please enter a number between 0 and 100"
        fi
    done
fi

# Validate all inputs
if [ -z "$student_name" ] || [ -z "$math_score" ] || [ -z "$science_score" ] || [ -z "$english_score" ]; then
    echo "Error: Missing required information"
    echo
    usage
    exit 1
fi

# Generate report
generate_report "$student_name" "$math_score" "$science_score" "$english_score"

# Additional statistics
echo "Additional Statistics:"
echo "----------------------"

# Check if student passed all subjects
passed=0
if [ $math_score -ge 40 ]; then ((passed++)); fi
if [ $science_score -ge 40 ]; then ((passed++)); fi
if [ $english_score -ge 40 ]; then ((passed++)); fi

if [ $passed -eq 3 ]; then
    echo "✓ Passed all subjects"
elif [ $passed -eq 2 ]; then
    echo "⚠ Passed 2 out of 3 subjects"
elif [ $passed -eq 1 ]; then
    echo "⚠ Passed only 1 subject"
else
    echo "✗ Failed all subjects"
fi

# Subject with highest score
if [ $math_score -ge $science_score ] && [ $math_score -ge $english_score ]; then
    echo "✓ Strongest subject: Mathematics"
elif [ $science_score -ge $math_score ] && [ $science_score -ge $english_score ]; then
    echo "✓ Strongest subject: Science"
else
    echo "✓ Strongest subject: English"
fi

# Save to file
report_file="${student_name// /_}_report_$(date +%Y%m%d).txt"
{
    generate_report "$student_name" "$math_score" "$science_score" "$english_score"
    echo "Additional Statistics:"
    echo "----------------------"
    if [ $passed -eq 3 ]; then
        echo "✓ Passed all subjects"
    elif [ $passed -eq 2 ]; then
        echo "⚠ Passed 2 out of 3 subjects"
    elif [ $passed -eq 1 ]; then
        echo "⚠ Passed only 1 subject"
    else
        echo "✗ Failed all subjects"
    fi
} > "$report_file"

echo
echo "Report saved to: $report_file"