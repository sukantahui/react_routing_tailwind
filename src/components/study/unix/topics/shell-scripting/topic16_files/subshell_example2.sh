#!/bin/bash
# Subshell for isolated student data processing in Shyamnagar

echo "=== Shyamnagar Student Data Processing ==="

# Original sensitive data
original_data="Name,Grade,Score
Swadeep,12th,95
Tuhina,11th,88
Abhronila,12th,92"

# Process data in subshell without modifying original
processed_data=$(
    echo "$original_data" | 
    awk -F, 'NR>1 {
        name=$1
        grade=$2
        score=$3
        
        # Anonymize and process
        if(score >= 90) grade="A"
        else if(score >= 80) grade="B"
        else grade="C"
        
        printf "Student_%d,%s\n", NR-1, grade
    }'
)

echo "Original data (unchanged):"
echo "$original_data"
echo -e "\nProcessed data (from subshell):"
echo "$processed_data"

# Demonstrate variable isolation
counter=0
(
    echo -e "\nInside subshell:"
    counter=100
    echo "Counter in subshell: $counter"
)

echo -e "\nOutside subshell:"
echo "Counter in main shell: $counter (unchanged!)"