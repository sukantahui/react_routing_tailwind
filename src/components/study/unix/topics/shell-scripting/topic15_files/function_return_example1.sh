#!/bin/bash
# Student grade processing functions for Shyamnagar school

# Function returns average via echo
calculate_average() {
    local total=0
    local count=0
    
    # Read grades from arguments
    for grade in "$@"; do
        if [[ "$grade" =~ ^[0-9]+$ ]] && (( grade >= 0 && grade <= 100 )); then
            total=$((total + grade))
            count=$((count + 1))
        else
            echo "Invalid grade: $grade" >&2
            return 1
        fi
    done
    
    if (( count > 0 )); then
        local average=$((total / count))
        echo "$average"  # Return value via stdout
        return 0
    else
        return 1  # Error exit status
    fi
}

# Function returns letter grade
get_letter_grade() {
    local numeric_grade="$1"
    
    case $((numeric_grade / 10)) in
        10|9) echo "A" ;;
        8) echo "B" ;;
        7) echo "C" ;;
        6) echo "D" ;;
        *) echo "F" ;;
    esac
}

# Main script
echo "Processing student grades for Shyamnagar school..."

# Call function and capture output
student_grades=(85 92 78 88 95)
average=$(calculate_average "${student_grades[@]}")

if [[ $? -eq 0 ]]; then
    echo "Average grade: $average"
    
    # Call another function
    letter_grade=$(get_letter_grade "$average")
    echo "Letter grade: $letter_grade"
else
    echo "Error calculating average"
fi