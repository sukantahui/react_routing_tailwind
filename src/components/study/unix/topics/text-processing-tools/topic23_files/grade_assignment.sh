#!/bin/bash
# Grade Assignment Script
# Step 2: Calculate averages and assign grades

echo "=== Step 2: Grade Assignment ==="
echo ""

echo "2.1 Loading unified scores database:"
unified_file="/tmp/student_lab_data/unified_scores.csv"
echo "File: $unified_file"
echo ""
head -n 5 "$unified_file"
echo "..."

echo ""
echo "2.2 Calculating subject averages and overall average:"
cat > /tmp/calculate_averages.sh << 'EOF'
#!/bin/bash
input="$unified_file"
output="/tmp/student_lab_data/student_averages.csv"

echo "Processing each student's marks..."
echo "Converting NA to 0 for average calculation"
echo ""

awk -F, '
BEGIN {
    OFS = ","
    print "RollNo,Math,Science,English,History,Computer,Total,Average,Grade"
}
NR == 1 { next }  # Skip header

{
    rollno = $1
    
    # Convert marks to numeric, NA becomes 0
    math = ($2 == "NA") ? 0 : $2
    science = ($3 == "NA") ? 0 : $3
    english = ($4 == "NA") ? 0 : $4
    history = ($5 == "NA") ? 0 : $5
    computer = ($6 == "NA") ? 0 : $6
    
    # Count subjects with actual marks (not NA)
    subjects_count = 0
    if ($2 != "NA") subjects_count++
    if ($3 != "NA") subjects_count++
    if ($4 != "NA") subjects_count++
    if ($5 != "NA") subjects_count++
    if ($6 != "NA") subjects_count++
    
    # Calculate total and average
    total = math + science + english + history + computer
    average = (subjects_count > 0) ? total / subjects_count : 0
    
    # Assign grade based on average
    if (average >= 90) grade = "A+"
    else if (average >= 80) grade = "A"
    else if (average >= 70) grade = "B+"
    else if (average >= 60) grade = "B"
    else if (average >= 50) grade = "C"
    else if (average >= 40) grade = "D"
    else grade = "F"
    
    print rollno, math, science, english, history, computer, total, sprintf("%.2f", average), grade
}
' "$input" > "$output"

echo "Student averages with grades:"
column -t -s, "$output" | head -n 12
EOF

chmod +x /tmp/calculate_averages.sh
/tmp/calculate_averages.sh
echo ""

echo "2.3 Generating class statistics:"
cat > /tmp/class_statistics.sh << 'EOF'
#!/bin/bash
input="/tmp/student_lab_data/student_averages.csv"

echo "=== Class Statistics ==="
echo ""

# Calculate various statistics
awk -F, '
BEGIN {
    math_sum = science_sum = english_sum = history_sum = computer_sum = 0
    math_count = science_count = english_count = history_count = computer_count = 0
    max_avg = 0
    min_avg = 100
    total_students = 0
    
    # Grade distribution
    a_plus = a = b_plus = b = c = d = f = 0
}
NR == 1 { next }

{
    # Subject averages
    if ($2 > 0) { math_sum += $2; math_count++ }
    if ($3 > 0) { science_sum += $3; science_count++ }
    if ($4 > 0) { english_sum += $4; english_count++ }
    if ($5 > 0) { history_sum += $5; history_count++ }
    if ($6 > 0) { computer_sum += $6; computer_count++ }
    
    # Overall statistics
    avg = $8
    if (avg > max_avg) max_avg = avg
    if (avg < min_avg) min_avg = avg
    
    # Grade distribution
    grade = $9
    if (grade == "A+") a_plus++
    else if (grade == "A") a++
    else if (grade == "B+") b_plus++
    else if (grade == "B") b++
    else if (grade == "C") c++
    else if (grade == "D") d++
    else if (grade == "F") f++
    
    total_students++
}
END {
    print "SUBJECT-WISE AVERAGES:"
    print "Mathematics:   " (math_count > 0 ? sprintf("%.2f", math_sum/math_count) : "N/A")
    print "Science:       " (science_count > 0 ? sprintf("%.2f", science_sum/science_count) : "N/A")
    print "English:       " (english_count > 0 ? sprintf("%.2f", english_sum/english_count) : "N/A")
    print "History:       " (history_count > 0 ? sprintf("%.2f", history_sum/history_count) : "N/A")
    print "Computer:      " (computer_count > 0 ? sprintf("%.2f", computer_sum/computer_count) : "N/A")
    print ""
    
    print "OVERALL STATISTICS:"
    print "Total Students: " total_students
    print "Highest Average: " sprintf("%.2f", max_avg)
    print "Lowest Average:  " sprintf("%.2f", min_avg)
    print "Class Average:   " sprintf("%.2f", (math_sum + science_sum + english_sum + history_sum + computer_sum) / (math_count + science_count + english_count + history_count + computer_count))
    print ""
    
    print "GRADE DISTRIBUTION:"
    print "A+: " a_plus " students"
    print "A:  " a " students"
    print "B+: " b_plus " students"
    print "B:  " b " students"
    print "C:  " c " students"
    print "D:  " d " students"
    print "F:  " f " students"
    print ""
    
    pass_rate = (total_students - f) / total_students * 100
    print "PASS RATE: " sprintf("%.2f", pass_rate) "%"
}
' "$input"
EOF

chmod +x /tmp/class_statistics.sh
/tmp/class_statistics.sh
echo ""

echo "2.4 Creating rank list:"
cat > /tmp/create_rank_list.sh << 'EOF'
#!/bin/bash
input="/tmp/student_lab_data/student_averages.csv"
output="/tmp/student_lab_data/rank_list.csv"

echo "Generating rank list sorted by average..."
echo ""

# Add rank column
awk -F, '
BEGIN {
    OFS = ","
    print "Rank,RollNo,Name,Average,Grade"
}
NR == 1 { next }

# Store all records
{
    records[NR] = $0
    averages[NR] = $8
    rollnos[NR] = $1
}
END {
    # Sort by average (descending)
    n = length(averages)
    for (i = 2; i <= n; i++) {
        for (j = i + 1; j <= n; j++) {
            if (averages[i] < averages[j]) {
                # Swap averages
                temp_avg = averages[i]
                averages[i] = averages[j]
                averages[j] = temp_avg
                
                # Swap records
                temp_rec = records[i]
                records[i] = records[j]
                records[j] = temp_rec
                
                # Swap rollnos
                temp_roll = rollnos[i]
                rollnos[i] = rollnos[j]
                rollnos[j] = temp_roll
            }
        }
    }
    
    # Print ranked list
    for (i = 2; i <= n; i++) {
        split(records[i], fields, ",")
        rank = i - 1
        # Get name from student info file
        name = "Unknown"
        cmd = "awk -F, '\''$1 == " fields[1] " {print $2}'\'' /tmp/student_lab_data/student_info.txt"
        cmd | getline name
        close(cmd)
        
        print rank, fields[1], name, sprintf("%.2f", fields[8]), fields[9]
    }
}
' "$input" > "$output"

echo "Top 5 ranked students:"
head -n 6 "$output" | column -t -s,
echo ""
echo "Full rank list saved to: $output"
EOF

chmod +x /tmp/create_rank_list.sh
/tmp/create_rank_list.sh