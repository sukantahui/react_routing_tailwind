#!/bin/bash
# Basic Pattern Validation Examples
# Demonstrating common validation patterns using grep

echo "=== Basic Pattern Validation ==="
echo ""

# Create sample data file
cat > /tmp/sample_data.txt << 'EOF'
john.doe@example.com
invalid-email
jane@company
555-123-4567
1234567890
987654
01/15/2023
13/45/2023
2023-02-30
valid@test.co.in
(555) 987-6543
EOF

echo "Sample data:"
cat /tmp/sample_data.txt
echo ""

echo "1. Email Validation (basic pattern):"
echo "Pattern: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
grep -E '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' /tmp/sample_data.txt
echo ""

echo "2. Phone Number Validation (US format):"
echo "Pattern: ^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
grep -E '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' /tmp/sample_data.txt
echo ""

echo "3. Date Validation (MM/DD/YYYY format):"
echo "Pattern: ^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}$"
grep -E '^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}$' /tmp/sample_data.txt
echo ""

echo "4. Finding Invalid Emails (no @ symbol or no . after @):"
echo "Pattern: @.*\."
grep -v '@.*\.' /tmp/sample_data.txt | grep '@'
echo ""

echo "5. Validating Mixed Format Phone Numbers:"
echo "Pattern: ^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
grep -E '^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$' /tmp/sample_data.txt
echo ""

echo "6. Detecting Invalid Dates (month > 12 or day > 31):"
echo "Using awk for more complex validation:"
awk 'BEGIN {print "Line\tContent\t\t\tStatus"} 
     /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/ {
        split($0, d, "/")
        if (d[1] > 12 || d[2] > 31) 
            print NR "\t" $0 "\t\tINVALID_DATE"
        else 
            print NR "\t" $0 "\t\tvalid"
     }' /tmp/sample_data.txt