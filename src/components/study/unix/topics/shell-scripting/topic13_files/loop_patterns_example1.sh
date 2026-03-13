#!/bin/bash
# Nested loops for complex processing
CLASSES=("ClassA" "ClassB" "ClassC")
SUBJECTS=("Math" "Science" "English")
YEARS=("2023" "2024")

echo "Processing student reports for multiple classrooms..."

for class in "${CLASSES[@]}"; do
    echo "=== Processing $class ==="
    
    for subject in "${SUBJECTS[@]}"; do
        echo "  Subject: $subject"
        
        for year in "${YEARS[@]}"; do
            report_file="/reports/$class/$subject/$year.txt"
            
            if [ -f "$report_file" ]; then
                # Count students who passed
                passing_count=$(grep -c "PASS" "$report_file")
                total_count=$(wc -l < "$report_file")
                
                pass_percentage=$((passing_count * 100 / total_count))
                echo "    Year $year: $passing_count/$total_count passed ($pass_percentage%)"
            else
                echo "    Year $year: Report not found"
            fi
        done
    done
done

echo "Report processing complete!"