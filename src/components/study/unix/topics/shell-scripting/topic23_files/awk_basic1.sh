#!/bin/bash
# Basic awk operations for student data processing

echo "=== Basic awk Examples ==="
echo

# Create sample data
cat > grades.txt << 'EOF'
Tuhina Das Computer_Science 92 88 95
Swadeep Roy Mathematics 85 90 88
Abhronila Sen Physics 95 92 98
Debangshu Ghosh Chemistry 87 85 90
John Doe Unknown 75 70 72
EOF

cat > students.csv << 'EOF'
ID,Name,Age,Department,Grade
101,Tuhina Das,18,Computer Science,A
102,Swadeep Roy,19,Mathematics,B+
103,Abhronila Sen,18,Physics,A+
104,Debangshu Ghosh,19,Chemistry,B
105,John Doe,20,Unknown,C
EOF

echo "Sample data created: grades.txt and students.csv"
echo

echo "1. Print entire file:"
awk '{print}' grades.txt
echo

echo "2. Print first field (default whitespace separator):"
awk '{print $1}' grades.txt
echo

echo "3. Print first and last field:"
awk '{print $1, $NF}' grades.txt
echo

echo "4. Print line number with content:"
awk '{print NR ": " $0}' grades.txt
echo

echo "5. Sum of third column:"
awk '{sum += $3} END {print "Total: " sum}' grades.txt
echo

echo "6. Average of third column:"
awk '{sum += $3; count++} END {print "Average: " sum/count}' grades.txt
echo

echo "7. Lines where third column > 90:"
awk '$3 > 90 {print $1 " scored " $3}' grades.txt
echo

echo "8. CSV processing with comma separator:"
awk -F, '{print $2 " is in " $4}' students.csv
echo

echo "9. BEGIN and END blocks:"
awk 'BEGIN {print "Student Report"; print "=============="} 
     {print NR ": " $1} 
     END {print "==============\nTotal: " NR " students"}' grades.txt
echo

echo "10. Field count per line:"
awk '{print NR " has " NF " fields"}' grades.txt