#!/bin/bash
# Student Data Example Files
# Creating sample data files for the lab exercise

echo "=== Creating Sample Student Data Files ==="
echo ""

# Create directory for data files
mkdir -p /tmp/student_lab_data

echo "1. Mathematics marks (math_marks.txt):"
cat > /tmp/student_lab_data/math_marks.txt << 'EOF'
RollNo,Name,Mathematics
101,Swadeep Roy,92
102,Tuhina Das,88
103,Abhronila Sen,78
104,Debangshu Ghosh,85
105,Arjun Kumar,95
106, Priya Sharma , 82
107,Rohan Singh,NA
108,Anjali Verma,91
109,,75
110,Ravi Kumar,105
EOF
cat /tmp/student_lab_data/math_marks.txt
echo ""

echo "2. Science marks (science_marks.txt):"
cat > /tmp/student_lab_data/science_marks.txt << 'EOF'
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
cat /tmp/student_lab_data/science_marks.txt
echo ""

echo "3. English marks (english_marks.txt):"
cat > /tmp/student_lab_data/english_marks.txt << 'EOF'
RollNo  Name  English
101  Swadeep Roy  85
102  Tuhina Das  90
103  Abhronila Sen  82
104  Debangshu Ghosh  78
105  Arjun Kumar  88
106  Priya Sharma  85
107  Rohan Singh  68
108  Anjali Verma  92
109  Sneha Patel  80
110  Ravi Kumar  75
EOF
cat /tmp/student_lab_data/english_marks.txt
echo ""

echo "4. History marks (history_marks.txt):"
cat > /tmp/student_lab_data/history_marks.txt << 'EOF'
RollNo,Name,History
101,Swadeep Roy,78
102,Tuhina Das,85
103,Abhronila Sen,88
104,Debangshu Ghosh,82
105,Arjun Kumar,90
106,Priya Sharma,79
107,Rohan Singh,65
108,Anjali Verma,87
109,Sneha Patel,81
110,Ravi Kumar,72
EOF
cat /tmp/student_lab_data/history_marks.txt
echo ""

echo "5. Computer Science marks (cs_marks.txt):"
cat > /tmp/student_lab_data/cs_marks.txt << 'EOF'
RollNo|Name|Computer
101|Swadeep Roy|95
102|Tuhina Das|88
103|Abhronila Sen|92
104|Debangshu Ghosh|85
105|Arjun Kumar|96
106|Priya Sharma|87
107|Rohan Singh|70
108|Anjali Verma|93
109|Sneha Patel|84
110|Ravi Kumar|89
EOF
cat /tmp/student_lab_data/cs_marks.txt
echo ""

echo "6. Student information (student_info.txt):"
cat > /tmp/student_lab_data/student_info.txt << 'EOF'
RollNo,Name,Class,Section,Gender
101,Swadeep Roy,XII,A,Male
102,Tuhina Das,XII,A,Female
103,Abhronila Sen,XII,A,Female
104,Debangshu Ghosh,XII,A,Male
105,Arjun Kumar,XII,B,Male
106,Priya Sharma,XII,B,Female
107,Rohan Singh,XII,B,Male
108,Anjali Verma,XII,B,Female
109,Sneha Patel,XII,B,Female
110,Ravi Kumar,XII,C,Male
EOF
cat /tmp/student_lab_data/student_info.txt
echo ""

echo "=== Data Issues Summary ==="
echo ""
echo "Issues to fix in the data:"
echo "1. Different delimiters: , ; | and whitespace"
echo "2. Inconsistent spacing: ' Priya Sharma ' has extra spaces"
echo "3. Missing values: Roll 109 has empty name in math file"
echo "4. Invalid marks: Ravi Kumar has 105 in math (out of 100)"
echo "5. NA values: Rohan Singh has 'NA' in math"
echo "6. Mixed case: Names inconsistent across files"
echo "7. Different column orders"
echo ""
echo "Total files created:"
ls -la /tmp/student_lab_data/*.txt | wc -l
echo "Total students: 10"
echo "Total subjects: 5"