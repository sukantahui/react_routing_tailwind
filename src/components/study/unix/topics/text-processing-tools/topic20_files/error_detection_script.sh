#!/bin/bash
# Comprehensive Error Detection Script
# Detecting various types of errors in data files

echo "=== Comprehensive Error Detection ==="
echo ""

# Create a sample data file with various errors
cat > /tmp/student_data.csv << 'EOF'
ID,Name,Age,Grade,Email,Phone,JoinDate
1,John Doe,25,B,john@example.com,555-123-4567,2023-01-15
2,Jane Smith, ,A,jane.smith@company,123-456-7890,2023-02-30
3,Bob Johnson,30,F,bob@,987654321,2023-13-01
4, ,22,C,alice@test.com,555-987-6543,2023-01-15
5,Mike Brown,17,A,mike@example.com,555-111-2233,2023-01-15
6,Sarah Davis,120,D,sarah@test.com,555-444-5566,2023-01-15
7,Tom Wilson,19,E,tom@company.com,123-456-789,2023-01-15
8,,21,B,invalid-email,555-999-8888,2023-01-15
EOF

echo "Sample Student Data:"
cat /tmp/student_data.csv
echo ""

echo "=== Running Error Detection ==="
echo ""

echo "1. Detecting Empty Fields:"
awk -F, 'NR>1 {
    for(i=1; i<=NF; i++) {
        if ($i ~ /^[[:space:]]*$/) {
            print "Line " NR ", Field " i " is empty: " $0
        }
    }
}' /tmp/student_data.csv
echo ""

echo "2. Validating Age Range (5-100):"
awk -F, 'NR>1 && $3 !~ /^[0-9]+$/ || $3 < 5 || $3 > 100 {
    print "Line " NR ": Invalid age (" $3 "): " $0
}' /tmp/student_data.csv
echo ""

echo "3. Validating Grade (A-F only):"
awk -F, 'NR>1 && $4 !~ /^[A-F]$/ {
    print "Line " NR ": Invalid grade (" $4 "): " $0
}' /tmp/student_data.csv
echo ""

echo "4. Validating Email Format:"
awk -F, 'NR>1 && $5 !~ /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ {
    print "Line " NR ": Invalid email (" $5 "): " $0
}' /tmp/student_data.csv
echo ""

echo "5. Validating Phone Format (###-###-####):"
awk -F, 'NR>1 && $6 !~ /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/ {
    print "Line " NR ": Invalid phone (" $6 "): " $0
}' /tmp/student_data.csv
echo ""

echo "6. Validating Date Format (YYYY-MM-DD):"
awk -F, 'NR>1 {
    if ($7 !~ /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) {
        print "Line " NR ": Invalid date format (" $7 "): " $0
    } else {
        split($7, d, "-")
        # Simple date validation (not accounting for month lengths)
        if (d[2] < 1 || d[2] > 12 || d[3] < 1 || d[3] > 31) {
            print "Line " NR ": Impossible date (" $7 "): " $0
        }
    }
}' /tmp/student_data.csv
echo ""

echo "7. Generating Summary Report:"
echo "Total records: $(awk 'END{print NR-1}' /tmp/student_data.csv)"
echo "Records with errors: $(awk -F, '
NR>1 {
    error=0
    if ($3 < 5 || $3 > 100) error=1
    if ($4 !~ /^[A-F]$/) error=1
    if ($5 !~ /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/) error=1
    if ($6 !~ /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/) error=1
    if (error) count++
} END {print count+0}
' /tmp/student_data.csv)"