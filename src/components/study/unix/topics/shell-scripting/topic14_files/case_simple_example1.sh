#!/bin/bash
# Simple grade management system for Barrackpore school
echo "=== Barrackpore School Grade Management ==="
echo "1. Add student grade"
echo "2. View class average"
echo "3. Generate report"
echo "4. Exit"
read -p "Enter your choice (1-4): " choice

case "$choice" in
    "1")
        echo "Adding new student grade..."
        read -p "Enter student name: " student
        read -p "Enter grade (0-100): " grade
        echo "$student: $grade" >> grades.txt
        echo "Grade added successfully!"
        ;;
    "2")
        echo "Calculating class average..."
        if [ -f grades.txt ] && [ -s grades.txt ]; then
            total=0
            count=0
            while IFS=: read -r name score; do
                total=$((total + score))
                count=$((count + 1))
            done < grades.txt
            average=$((total / count))
            echo "Class average: $average"
        else
            echo "No grades found. Add grades first."
        fi
        ;;
    "3")
        echo "Generating report..."
        if [ -f grades.txt ]; then
            echo "=== Grade Report ===" > report.txt
            date >> report.txt
            echo "=================" >> report.txt
            cat grades.txt >> report.txt
            echo "Report saved to report.txt"
        else
            echo "No grades available for report."
        fi
        ;;
    "4")
        echo "Exiting grade management system."
        exit 0
        ;;
    *)
        echo "Error: Invalid choice. Please enter 1-4."
        exit 1
        ;;
esac
