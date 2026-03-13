#!/bin/bash
# Advanced awk with built-in functions for Barrackpore College

echo "=== Advanced awk with Functions ==="
echo

# Create detailed sample
cat > student_details.csv << 'EOF'
ID,Name,Department,Score,Email,EnrollmentDate
101,Tuhina Das,Computer Science,92,tuhina.das@barrackpore.edu,2023-08-15
102,Swadeep Roy,Mathematics,88,swadeep.roy@barrackpore.edu,2023-08-16
103,Abhronila Sen,Physics,95,abhronila.sen@naihati.edu,2023-08-14
104,Debangshu Ghosh,Chemistry,87,debangshu.ghosh@shyamnagar.edu,2023-08-17
105,John Doe,Unknown,75,john.doe@example.com,2023-08-18
EOF

echo "Data:"
cat student_details.csv
echo

echo "1. String functions - uppercase names:"
awk -F, 'NR>1 {print toupper($2)}' student_details.csv
echo

echo "2. String functions - extract first name:"
awk -F, 'NR>1 {split($2, names, " "); print names[1]}' student_details.csv
echo

echo "3. String functions - email username:"
awk -F, 'NR>1 {print "Username: " substr($5, 1, index($5, "@")-1)}' student_details.csv
echo

echo "4. Math functions - rounded scores:"
awk -F, 'NR>1 {printf "%s: %.0f\n", $2, $4}' student_details.csv
echo

echo "5. Arrays - count by department:"
awk -F, 'NR>1 {dept[$3]++} END {for (d in dept) print d ": " dept[d] " students"}' student_details.csv
echo

echo "6. Arrays - average score by department:"
awk -F, 'NR>1 {sum[$3] += $4; count[$3]++} 
        END {for (d in sum) printf "%s: %.1f\n", d, sum[d]/count[d]}' student_details.csv
echo

echo "7. Custom field separator with regex:"
echo "Tuhina:Das:92|Swadeep:Roy:88" | awk -F'[:|]' '{print $1, $3, $5}'
echo

echo "8. Formatting with printf:"
awk -F, 'NR>1 {printf "%-15s %-20s %4d\n", $2, $3, $4}' student_details.csv
echo

echo "9. Condition with regex:"
awk -F, '$5 ~ /barrackpore/ {print $2 " - barrackpore student"}' student_details.csv
echo

echo "10. Complex processing - grade assignment:"
awk -F, 'NR>1 {
    if ($4 >= 90) grade = "A";
    else if ($4 >= 80) grade = "B";
    else if ($4 >= 70) grade = "C";
    else grade = "F";
    print $2 " (" $4 "): " grade;
}' student_details.csv