#!/bin/bash
# Report Generation Script
# Step 3: Generate various reports from processed data

echo "=== Step 3: Report Generation ==="
echo ""

echo "3.1 Generating individual student report cards:"
cat > /tmp/generate_report_cards.sh << 'EOF'
#!/bin/bash
input="/tmp/student_lab_data/student_averages.csv"
student_info="/tmp/student_lab_data/student_info.txt"
output_dir="/tmp/student_lab_data/report_cards"
mkdir -p "$output_dir"

echo "Creating individual report cards for each student..."
echo ""

awk -F, '
BEGIN {
    # Read student info into array
    while ((getline < "'"$student_info"'") > 0) {
        split($0, info, ",")
        student_name[info[1]] = info[2]
        student_class[info[1]] = info[3]
        student_section[info[1]] = info[4]
    }
}
NR == 1 { next }  # Skip header

{
    rollno = $1
    math = $2
    science = $3
    english = $4
    history = $5
    computer = $6
    total = $7
    average = $8
    grade = $9
    
    name = student_name[rollno]
    class = student_class[rollno]
    section = student_section[rollno]
    
    # Get rank from rank list
    rank_cmd = "grep '^[0-9]*," rollno "," "'"$input"' | head -1"
    rank_cmd | getline rank_line
    close(rank_cmd)
    split(rank_line, rank_fields, ",")
    rank = rank_fields[1]
    
    # Create report card
    report_file = "'"$output_dir"'/report_" rollno "_" name ".txt"
    
    print "=========================================" > report_file
    print "      BARRACKPORE HIGH SCHOOL" > report_file
    print "      TERM EXAMINATION REPORT" > report_file
    print "=========================================" > report_file
    print "" > report_file
    print "STUDENT INFORMATION:" > report_file
    print "Name:      " name > report_file
    print "Roll No:   " rollno > report_file
    print "Class:     " class "-" section > report_file
    print "Date:      " strftime("%d-%m-%Y") > report_file
    print "" > report_file
    print "SUBJECT-WISE MARKS:" > report_file
    print "-----------------------------------------" > report_file
    print "Subject       Marks   Grade   Remarks" > report_file
    print "-----------------------------------------" > report_file
    print "Mathematics    " sprintf("%3d", math) "      " get_subject_grade(math) "     " get_remarks(math) > report_file
    print "Science        " sprintf("%3d", science) "      " get_subject_grade(science) "     " get_remarks(science) > report_file
    print "English        " sprintf("%3d", english) "      " get_subject_grade(english) "     " get_remarks(english) > report_file
    print "History        " sprintf("%3d", history) "      " get_subject_grade(history) "     " get_remarks(history) > report_file
    print "Computer       " sprintf("%3d", computer) "      " get_subject_grade(computer) "     " get_remarks(computer) > report_file
    print "-----------------------------------------" > report_file
    print "" > report_file
    print "OVERALL PERFORMANCE:" > report_file
    print "Total Marks:   " total "/500" > report_file
    print "Average:       " sprintf("%.2f", average) "%" > report_file
    print "Overall Grade: " grade > report_file
    print "Class Rank:    " rank " (out of 10)" > report_file
    print "-----------------------------------------" > report_file
    print "" > report_file
    print "TEACHER'"'"'S REMARKS:" > report_file
    print get_overall_remarks(grade) > report_file
    print "" > report_file
    print "=========================================" > report_file
    print "Principal'"'"'s Signature: _______________" > report_file
    print "Class Teacher: _______________" > report_file
    print "=========================================" > report_file
    
    print "Generated report for " name " (Roll No: " rollno ")"
}

function get_subject_grade(marks) {
    if (marks >= 90) return "A+"
    else if (marks >= 80) return "A"
    else if (marks >= 70) return "B+"
    else if (marks >= 60) return "B"
    else if (marks >= 50) return "C"
    else if (marks >= 40) return "D"
    else return "F"
}

function get_remarks(marks) {
    if (marks >= 90) return "Outstanding"
    else if (marks >= 80) return "Excellent"
    else if (marks >= 70) return "Very Good"
    else if (marks >= 60) return "Good"
    else if (marks >= 50) return "Satisfactory"
    else if (marks >= 40) return "Needs Improvement"
    else return "Poor"
}

function get_overall_remarks(grade) {
    if (grade == "A+") return "Exceptional performance. Keep up the excellent work!"
    else if (grade == "A") return "Very good performance. Continue to work hard."
    else if (grade == "B+") return "Good performance. Room for improvement."
    else if (grade == "B") return "Satisfactory performance. Needs more focus."
    else if (grade == "C") return "Average performance. Requires more effort."
    else if (grade == "D") return "Below average. Needs significant improvement."
    else return "Failed. Requires remedial classes and parental guidance."
}
' "$input"

echo ""
echo "Report cards generated in: $output_dir"
echo "Sample report card for Swadeep Roy:"
cat "$output_dir/report_101_Swadeep Roy.txt" 2>/dev/null || echo "Report not found"
EOF

chmod +x /tmp/generate_report_cards.sh
/tmp/generate_report_cards.sh
echo ""

echo "3.2 Generating class-wise summary report:"
cat > /tmp/generate_class_summary.sh << 'EOF'
#!/bin/bash
output="/tmp/student_lab_data/class_summary.txt"

echo "Generating comprehensive class summary..."
echo ""

# Combine various statistics
{
    echo "================================================"
    echo "       BARRACKPORE HIGH SCHOOL - CLASS XII"
    echo "           TERM EXAMINATION SUMMARY"
    echo "================================================"
    echo ""
    echo "GENERATED ON: $(date)"
    echo ""
    
    echo "1. OVERALL STATISTICS"
    echo "====================="
    awk -F, '
    BEGIN {
        total_students = 0
        total_avg = 0
        pass_count = 0
    }
    NR == 1 { next }
    {
        total_students++
        total_avg += $8
        if ($9 != "F") pass_count++
    }
    END {
        print "Total Students:      " total_students
        print "Class Average:       " sprintf("%.2f", total_avg/total_students) "%"
        print "Pass Percentage:     " sprintf("%.2f", (pass_count/total_students)*100) "%"
        print "Fail Percentage:     " sprintf("%.2f", ((total_students-pass_count)/total_students)*100) "%"
    }
    ' /tmp/student_lab_data/student_averages.csv
    
    echo ""
    echo "2. TOP PERFORMERS"
    echo "================="
    echo "Rank  Roll No  Name              Average  Grade"
    echo "----  -------  ----------------  -------  -----"
    head -n 5 /tmp/student_lab_data/rank_list.csv | awk -F, '{printf "%-4s  %-7s  %-16s  %-7s  %-5s\n", $1, $2, $3, $4, $5}'
    
    echo ""
    echo "3. SUBJECT-WISE ANALYSIS"
    echo "========================"
    awk -F, '
    BEGIN {
        math_sum = science_sum = english_sum = history_sum = computer_sum = 0
        math_count = science_count = english_count = history_count = computer_count = 0
        math_max = science_max = english_max = history_max = computer_max = 0
        math_min = science_min = english_min = history_min = computer_min = 100
    }
    NR == 1 { next }
    {
        if ($2 > 0) {
            math_sum += $2; math_count++
            if ($2 > math_max) math_max = $2
            if ($2 < math_min) math_min = $2
        }
        if ($3 > 0) {
            science_sum += $3; science_count++
            if ($3 > science_max) science_max = $3
            if ($3 < science_min) science_min = $3
        }
        if ($4 > 0) {
            english_sum += $4; english_count++
            if ($4 > english_max) english_max = $4
            if ($4 < english_min) english_min = $4
        }
        if ($5 > 0) {
            history_sum += $5; history_count++
            if ($5 > history_max) history_max = $5
            if ($5 < history_min) history_min = $5
        }
        if ($6 > 0) {
            computer_sum += $6; computer_count++
            if ($6 > computer_max) computer_max = $6
            if ($6 < computer_min) computer_min = $6
        }
    }
    END {
        printf "%-12s %-8s %-8s %-8s\n", "Subject", "Average", "Highest", "Lowest"
        printf "%-12s %-8s %-8s %-8s\n", "--------", "-------", "-------", "------"
        printf "%-12s %-8s %-8s %-8s\n", "Mathematics", sprintf("%.2f", math_sum/math_count), math_max, math_min
        printf "%-12s %-8s %-8s %-8s\n", "Science", sprintf("%.2f", science_sum/science_count), science_max, science_min
        printf "%-12s %-8s %-8s %-8s\n", "English", sprintf("%.2f", english_sum/english_count), english_max, english_min
        printf "%-12s %-8s %-8s %-8s\n", "History", sprintf("%.2f", history_sum/history_count), history_max, history_min
        printf "%-12s %-8s %-8s %-8s\n", "Computer", sprintf("%.2f", computer_sum/computer_count), computer_max, computer_min
    }
    ' /tmp/student_lab_data/student_averages.csv
    
    echo ""
    echo "4. GRADE DISTRIBUTION"
    echo "====================="
    awk -F, '
    BEGIN {
        a_plus = a = b_plus = b = c = d = f = 0
    }
    NR == 1 { next }
    {
        grade = $9
        if (grade == "A+") a_plus++
        else if (grade == "A") a++
        else if (grade == "B+") b_plus++
        else if (grade == "B") b++
        else if (grade == "C") c++
        else if (grade == "D") d++
        else if (grade == "F") f++
    }
    END {
        total = a_plus + a + b_plus + b + c + d + f
        printf "A+: %2d students (%5.1f%%)\n", a_plus, (a_plus/total)*100
        printf "A:  %2d students (%5.1f%%)\n", a, (a/total)*100
        printf "B+: %2d students (%5.1f%%)\n", b_plus, (b_plus/total)*100
        printf "B:  %2d students (%5.1f%%)\n", b, (b/total)*100
        printf "C:  %2d students (%5.1f%%)\n", c, (c/total)*100
        printf "D:  %2d students (%5.1f%%)\n", d, (d/total)*100
        printf "F:  %2d students (%5.1f%%)\n", f, (f/total)*100
    }
    ' /tmp/student_lab_data/student_averages.csv
    
    echo ""
    echo "5. RECOMMENDATIONS"
    echo "=================="
    echo "1. Students with grade F need remedial classes"
    echo "2. Focus on improving English scores"
    echo "3. Computer Science performed exceptionally well"
    echo "4. Consider additional support for Mathematics"
    echo ""
    echo "================================================"
    echo "Prepared by: School Administration System"
    echo "================================================"
} > "$output"

echo "Class summary report generated: $output"
echo ""
echo "First 30 lines of summary:"
head -n 30 "$output"
EOF

chmod +x /tmp/generate_class_summary.sh
/tmp/generate_class_summary.sh