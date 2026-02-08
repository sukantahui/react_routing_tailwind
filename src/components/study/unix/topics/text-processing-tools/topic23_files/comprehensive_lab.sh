#!/bin/bash
# Comprehensive Lab Solution
# Complete solution integrating all steps

echo "=== COMPREHENSIVE LAB SOLUTION ==="
echo "Student Marks Processing System"
echo "================================="
echo ""

# Configuration
DATA_DIR="/tmp/student_lab_comprehensive"
mkdir -p "$DATA_DIR"

echo "Step 0: Create sample data"
echo "--------------------------"
cat > "$DATA_DIR/create_sample_data.sh" << 'SAMPLE'
#!/bin/bash
# Create all sample data files
echo "Creating sample data files..."

# Student info
cat > $DATA_DIR/students.csv << EOF
101,Swadeep Roy,XII,A
102,Tuhina Das,XII,A
103,Abhronila Sen,XII,A
104,Debangshu Ghosh,XII,A
105,Arjun Kumar,XII,B
106,Priya Sharma,XII,B
107,Rohan Singh,XII,B
108,Anjali Verma,XII,B
109,Sneha Patel,XII,B
110,Ravi Kumar,XII,C
EOF

# Subject marks with various issues
cat > $DATA_DIR/math.txt << EOF
101  ,Swadeep Roy,  92
102,  Tuhina Das  ,88
103,Abhronila Sen,78
104,Debangshu Ghosh,85
105,Arjun Kumar,95
106, Priya Sharma , 82
107,Rohan Singh,NA
108,Anjali Verma,91
109,,75
110,Ravi Kumar,105
EOF

cat > $DATA_DIR/science.csv << EOF
RollNo;Name;Science
101;Swadeep Roy;88
102;Tuhina Das;92
103;Abhronila Sen;85
104;Debangshu Ghosh;80
105;Arjun Kumar;90
106;Priya Sharma;78
107;Rohan Singh;72
108;Anjali Verma;89
109;Sneha Patel;82
110;Ravi Kumar;88
EOF

cat > $DATA_DIR/english.tsv << EOF
RollNo	Name	English
101	Swadeep Roy	85
102	Tuhina Das	90
103	Abhronila Sen	82
104	Debangshu Ghosh	78
105	Arjun Kumar	88
106	Priya Sharma	85
107	Rohan Singh	68
108	Anjali Verma	92
109	Sneha Patel	80
110	Ravi Kumar	75
EOF

echo "Sample data created in $DATA_DIR/"
SAMPLE

chmod +x "$DATA_DIR/create_sample_data.sh"
"$DATA_DIR/create_sample_data.sh"
echo ""

echo "Step 1: Data Cleaning Module"
echo "----------------------------"
cat > "$DATA_DIR/clean_data.sh" << 'CLEAN'
#!/bin/bash
# Clean all data files

echo "1.1 Cleaning Mathematics data..."
awk '
BEGIN {FS=","; OFS=","}
{
    gsub(/^[ \t]+|[ \t]+$/, "", $1)
    gsub(/^[ \t]+|[ \t]+$/, "", $2)
    gsub(/^[ \t]+|[ \t]+$/, "", $3)
    
    if ($3 == "NA" || $3 == "") $3 = 0
    if ($3 > 100) $3 = 100
    
    if ($1 != "" && $2 != "") print $1, $2, $3
}' "$DATA_DIR/math.txt" > "$DATA_DIR/math_clean.csv"

echo "1.2 Cleaning Science data..."
sed 's/;/,/g' "$DATA_DIR/science.csv" | tail -n +2 > "$DATA_DIR/science_clean.csv"

echo "1.3 Cleaning English data..."
tail -n +2 "$DATA_DIR/english.tsv" | awk 'BEGIN {FS="\t"; OFS=","} {print $1, $2, $3}' > "$DATA_DIR/english_clean.csv"

echo "Data cleaning complete!"
CLEAN

chmod +x "$DATA_DIR/clean_data.sh"
"$DATA_DIR/clean_data.sh"
echo ""

echo "Step 2: Data Processing Module"
echo "------------------------------"
cat > "$DATA_DIR/process_data.sh" << 'PROCESS'
#!/bin/bash
# Process cleaned data

echo "2.1 Creating unified database..."
# Create a unified file with all marks
awk -F, '
BEGIN {
    print "RollNo,Name,Math,Science,English"
}
# Read math data into arrays
FILENAME == "'"$DATA_DIR/math_clean.csv"'" {
    math_name[$1] = $2
    math_mark[$1] = $3
}
FILENAME == "'"$DATA_DIR/science_clean.csv"'" {
    science_name[$1] = $2
    science_mark[$1] = $3
}
FILENAME == "'"$DATA_DIR/english_clean.csv"'" {
    english_name[$1] = $2
    english_mark[$1] = $3
}
END {
    for (rollno = 101; rollno <= 110; rollno++) {
        name = math_name[rollno] ? math_name[rollno] : 
               science_name[rollno] ? science_name[rollno] : 
               english_name[rollno] ? english_name[rollno] : "Unknown"
        
        math = (rollno in math_mark) ? math_mark[rollno] : 0
        science = (rollno in science_mark) ? science_mark[rollno] : 0
        english = (rollno in english_mark) ? english_mark[rollno] : 0
        
        print rollno "," name "," math "," science "," english
    }
}' "$DATA_DIR/math_clean.csv" "$DATA_DIR/science_clean.csv" "$DATA_DIR/english_clean.csv" > "$DATA_DIR/unified.csv"

echo "2.2 Calculating averages and grades..."
awk -F, '
BEGIN {
    print "RollNo,Name,Math,Science,English,Total,Average,Grade"
}
NR == 1 { next }
{
    rollno = $1
    name = $2
    math = $3
    science = $4
    english = $5
    
    total = math + science + english
    average = total / 3
    
    if (average >= 90) grade = "A+"
    else if (average >= 80) grade = "A"
    else if (average >= 70) grade = "B+"
    else if (average >= 60) grade = "B"
    else if (average >= 50) grade = "C"
    else if (average >= 40) grade = "D"
    else grade = "F"
    
    print rollno "," name "," math "," science "," english "," total "," sprintf("%.2f", average) "," grade
}' "$DATA_DIR/unified.csv" > "$DATA_DIR/processed.csv"

echo "Processing complete!"
PROCESS

chmod +x "$DATA_DIR/process_data.sh"
"$DATA_DIR/process_data.sh"
echo ""

echo "Step 3: Report Generation Module"
echo "--------------------------------"
cat > "$DATA_DIR/generate_reports.sh" << 'REPORT'
#!/bin/bash
# Generate various reports

echo "3.1 Generating rank list..."
sort -t, -k7,7nr "$DATA_DIR/processed.csv" | awk -F, '
BEGIN {
    print "Rank,RollNo,Name,Average,Grade"
    rank = 0
    last_avg = -1
    same_rank_count = 0
}
NR == 1 { next }
{
    if ($7 != last_avg) {
        rank = rank + same_rank_count + 1
        same_rank_count = 0
    } else {
        same_rank_count++
    }
    last_avg = $7
    print rank "," $1 "," $2 "," $7 "," $8
}' > "$DATA_DIR/rank_list.csv"

echo "3.2 Generating class summary..."
{
    echo "CLASS PERFORMANCE SUMMARY"
    echo "=========================="
    echo ""
    echo "Date: $(date)"
    echo ""
    
    echo "Top 3 Students:"
    echo "---------------"
    head -n 3 "$DATA_DIR/rank_list.csv" | awk -F, '{printf "%d. %s (Roll No: %s) - %s (Avg: %s)\n", $1, $3, $2, $5, $4}'
    echo ""
    
    echo "Grade Distribution:"
    echo "------------------"
    awk -F, '
    BEGIN {
        a_plus = a = b_plus = b = c = d = f = 0
    }
    NR == 1 { next }
    {
        grade = $8
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
        printf "A+: %d (%.1f%%)\n", a_plus, (a_plus/total)*100
        printf "A:  %d (%.1f%%)\n", a, (a/total)*100
        printf "B+: %d (%.1f%%)\n", b_plus, (b_plus/total)*100
        printf "B:  %d (%.1f%%)\n", b, (b/total)*100
        printf "C:  %d (%.1f%%)\n", c, (c/total)*100
        printf "D:  %d (%.1f%%)\n", d, (d/total)*100
        printf "F:  %d (%.1f%%)\n", f, (f/total)*100
        printf "\nPass Rate: %.1f%%\n", ((total-f)/total)*100
    }
    ' "$DATA_DIR/processed.csv"
    
    echo ""
    echo "Subject-wise Performance:"
    echo "-------------------------"
    awk -F, '
    BEGIN {
        math_sum = science_sum = english_sum = 0
        math_count = science_count = english_count = 0
    }
    NR == 1 { next }
    {
        if ($3 > 0) { math_sum += $3; math_count++ }
        if ($4 > 0) { science_sum += $4; science_count++ }
        if ($5 > 0) { english_sum += $5; english_count++ }
    }
    END {
        printf "Mathematics: %.1f/100\n", math_sum/math_count
        printf "Science:     %.1f/100\n", science_sum/science_count
        printf "English:     %.1f/100\n", english_sum/english_count
    }
    ' "$DATA_DIR/processed.csv"
} > "$DATA_DIR/class_summary.txt"

echo "3.3 Generating individual reports..."
mkdir -p "$DATA_DIR/individual_reports"
awk -F, '
NR == 1 { next }
{
    rollno = $1
    name = $2
    math = $3
    science = $4
    english = $5
    total = $6
    average = $7
    grade = $8
    
    # Get rank
    rank_cmd = "grep '\''^[0-9]*," rollno "," "'"$DATA_DIR/rank_list.csv"'" | head -1"
    rank_cmd | getline rank_line
    close(rank_cmd)
    split(rank_line, rank_fields, ",")
    rank = rank_fields[1]
    
    report_file = "'"$DATA_DIR/individual_reports/"'" "report_" rollno ".txt"
    
    print "STUDENT REPORT CARD" > report_file
    print "===================" > report_file
    print "Name:   " name > report_file
    print "Roll No: " rollno > report_file
    print "" > report_file
    print "SUBJECT    MARKS   GRADE" > report_file
    print "-------    -----   -----" > report_file
    print "Math       " sprintf("%3d", math) "      " get_grade(math) > report_file
    print "Science    " sprintf("%3d", science) "      " get_grade(science) > report_file
    print "English    " sprintf("%3d", english) "      " get_grade(english) > report_file
    print "" > report_file
    print "TOTAL:     " total "/300" > report_file
    print "AVERAGE:   " sprintf("%.1f", average) "%" > report_file
    print "GRADE:     " grade > report_file
    print "RANK:      " rank " of 10" > report_file
    print "" > report_file
    print "Generated on: " strftime("%d-%m-%Y") > report_file
    
    print "Generated report for " name
}

function get_grade(marks) {
    if (marks >= 90) return "A+"
    else if (marks >= 80) return "A"
    else if (marks >= 70) return "B+"
    else if (marks >= 60) return "B"
    else if (marks >= 50) return "C"
    else if (marks >= 40) return "D"
    else return "F"
}
' "$DATA_DIR/processed.csv"

echo "Report generation complete!"
REPORT

chmod +x "$DATA_DIR/generate_reports.sh"
"$DATA_DIR/generate_reports.sh"
echo ""

echo "Step 4: Verification and Output"
echo "-------------------------------"
echo ""
echo "4.1 Final output files:"
echo "======================="
ls -la "$DATA_DIR/"*.csv "$DATA_DIR/"*.txt "$DATA_DIR/individual_reports/" 2>/dev/null | head -20
echo ""

echo "4.2 Sample outputs:"
echo "==================="
echo "Processed data (first 3 lines):"
head -n 4 "$DATA_DIR/processed.csv" | column -t -s,
echo ""
echo "Rank list (top 3):"
head -n 4 "$DATA_DIR/rank_list.csv" | column -t -s,
echo ""
echo "Class summary:"
head -n 20 "$DATA_DIR/class_summary.txt"
echo ""
echo "Sample individual report (Roll No 101):"
cat "$DATA_DIR/individual_reports/report_101.txt" 2>/dev/null || echo "Report not found"
echo ""

echo "4.3 Statistics:"
echo "==============="
echo "Total students processed: $(tail -n +2 "$DATA_DIR/processed.csv" | wc -l)"
echo "Reports generated: $(ls "$DATA_DIR/individual_reports/"*.txt 2>/dev/null | wc -l)"
echo "Class average: $(awk -F, 'NR>1 {sum+=$7; count++} END {printf "%.2f", sum/count}' "$DATA_DIR/processed.csv")%"
echo ""

echo "========================================"
echo "LAB COMPLETED SUCCESSFULLY!"
echo "All tasks completed: Data cleaning, processing,"
echo "grade assignment, and report generation."
echo "========================================"