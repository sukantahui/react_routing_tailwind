#!/bin/bash
# CSV Data Integrity Checking
# Comprehensive validation of CSV file structure and content

echo "=== CSV Data Integrity Validation ==="
echo ""

# Create sample CSV with integrity issues
cat > /tmp/sales_data.csv << 'EOF'
OrderID,CustomerID,ProductID,Quantity,Price,Total,OrderDate
1001,C101,P001,2,25.50,51.00,2023-12-15
1002,C102,P002,1,99.99,99.99,2023-12-15
1003,C103,P003,3,15.00,45.00,2023-12-16
1004,C104,P004,0,10.00,0.00,2023-12-16
1005,C105,P005,2,30.00,60.00,2023-12-17
1006,C106,P006,1,25.50,25.50,2023-12-17
1007,C107,P007,5,12.00,60.00,2023-12-18
1008,C108,P008,2,45.00,90.00,2023-12-18
1009,C109,P009,1,75.00,75.00,2023-12-19
1010,C110,P010,3,20.00,60.00,2023-12-19
EOF

echo "Sample Sales Data:"
cat /tmp/sales_data.csv
echo ""

echo "=== Running Integrity Checks ==="
echo ""

echo "1. Checking File Structure:"
echo "   - Line endings: $(file /tmp/sales_data.csv | grep -o 'with [^,]*' || echo 'Unknown')"
echo "   - Total lines: $(wc -l < /tmp/sales_data.csv)"
echo "   - Expected columns: $(head -1 /tmp/sales_data.csv | tr ',' '\n' | wc -l)"
echo ""

echo "2. Validating Column Count Consistency:"
awk -F, '{
    if (NR == 1) {
        expected_cols = NF
        print "Header has " expected_cols " columns"
    } else if (NF != expected_cols) {
        print "ERROR: Line " NR " has " NF " columns (expected " expected_cols ")"
    }
}' /tmp/sales_data.csv
echo ""

echo "3. Checking for Duplicate OrderIDs:"
awk -F, 'NR>1 {
    if (orderids[$1]++) {
        print "ERROR: Duplicate OrderID " $1 " at line " NR
    }
    orderids[$1] = NR
}' /tmp/sales_data.csv
echo ""

echo "4. Validating Numeric Fields:"
awk -F, 'NR>1 {
    # Quantity validation (positive integer)
    if ($4 !~ /^[0-9]+$/ || $4 < 0) {
        print "ERROR: Line " NR " - Invalid quantity: " $4
    }
    
    # Price validation (positive decimal)
    if ($5 !~ /^[0-9]+(\.[0-9]+)?$/ || $5 <= 0) {
        print "ERROR: Line " NR " - Invalid price: " $5
    }
    
    # Total validation (should equal Quantity * Price)
    expected_total = $4 * $5
    actual_total = $6 + 0  # Force numeric conversion
    if (expected_total != actual_total) {
        print "ERROR: Line " NR " - Total mismatch: expected " expected_total ", got " actual_total
    }
}' /tmp/sales_data.csv
echo ""

echo "5. Date Validation:"
awk -F, 'NR>1 {
    if ($7 !~ /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) {
        print "ERROR: Line " NR " - Invalid date format: " $7
    } else {
        split($7, d, "-")
        # Basic date validation
        if (d[1] < 2023 || d[1] > 2024) {
            print "WARNING: Line " NR " - Year out of range: " d[1]
        }
        if (d[2] < 1 || d[2] > 12) {
            print "ERROR: Line " NR " - Invalid month: " d[2]
        }
        if (d[3] < 1 || d[3] > 31) {
            print "ERROR: Line " NR " - Invalid day: " d[3]
        }
    }
}' /tmp/sales_data.csv
echo ""

echo "6. Referential Integrity (simplified):"
echo "   Checking for orphaned references..."
# In real scenario, we would check against actual reference tables
awk -F, 'NR>1 {
    # CustomerID format check
    if ($2 !~ /^C[0-9]{3}$/) {
        print "WARNING: Line " NR " - Non-standard CustomerID: " $2
    }
    # ProductID format check
    if ($3 !~ /^P[0-9]{3}$/) {
        print "WARNING: Line " NR " - Non-standard ProductID: " $3
    }
}' /tmp/sales_data.csv
echo ""

echo "7. Business Rule Validation:"
echo "   - Orders with zero quantity should have zero total"
awk -F, 'NR>1 && $4 == 0 && $6 != 0 {
    print "ERROR: Line " NR " - Zero quantity but non-zero total"
}' /tmp/sales_data.csv

echo "   - Large orders (>10 items) should be reviewed"
awk -F, 'NR>1 && $4 > 10 {
    print "WARNING: Line " NR " - Large order: " $4 " items"
}' /tmp/sales_data.csv
echo ""

echo "8. Generating Integrity Report:"
awk -F, '
BEGIN {
    print "=== DATA INTEGRITY REPORT ==="
    print "File: /tmp/sales_data.csv"
    print "Generated: " strftime("%Y-%m-%d %H:%M:%S")
    print ""
    
    error_count = 0
    warning_count = 0
    valid_count = 0
}

NR == 1 {
    header = $0
    expected_cols = NF
    next
}

{
    line_errors = 0
    line_warnings = 0
    
    # Check 1: Column count
    if (NF != expected_cols) {
        errors[NR] = errors[NR] "Wrong column count (" NF " vs " expected_cols "). "
        line_errors++
    }
    
    # Check 2: OrderID uniqueness
    if (orderids[$1]) {
        errors[NR] = errors[NR] "Duplicate OrderID. "
        line_errors++
    }
    orderids[$1] = 1
    
    # Check 3: Quantity validation
    if ($4 !~ /^[0-9]+$/ || $4 < 0) {
        errors[NR] = errors[NR] "Invalid quantity. "
        line_errors++
    }
    
    # Check 4: Price validation
    if ($5 !~ /^[0-9]+(\.[0-9]+)?$/ || $5 <= 0) {
        errors[NR] = errors[NR] "Invalid price. "
        line_errors++
    }
    
    # Check 5: Total calculation
    if ($4 * $5 != $6 + 0) {
        errors[NR] = errors[NR] "Total calculation error. "
        line_errors++
    }
    
    # Check 6: Date format
    if ($7 !~ /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) {
        errors[NR] = errors[NR] "Invalid date format. "
        line_errors++
    }
    
    # Warnings
    if ($4 == 0) {
        warnings[NR] = warnings[NR] "Zero quantity order. "
        line_warnings++
    }
    if ($4 > 5) {
        warnings[NR] = warnings[NR] "Large order. "
        line_warnings++
    }
    
    if (line_errors == 0 && line_warnings == 0) {
        valid_count++
    } else {
        if (line_errors > 0) error_count++
        if (line_warnings > 0) warning_count++
    }
}

END {
    print "=== SUMMARY ==="
    print "Total records: " NR-1
    print "Valid records: " valid_count
    print "Records with errors: " error_count
    print "Records with warnings: " warning_count
    print ""
    
    if (error_count > 0) {
        print "=== ERROR DETAILS ==="
        for (line in errors) {
            print "Line " line ": " errors[line]
        }
    }
    
    if (warning_count > 0) {
        print "=== WARNING DETAILS ==="
        for (line in warnings) {
            print "Line " line ": " warnings[line]
        }
    }
    
    print ""
    print "=== RECOMMENDATIONS ==="
    if (error_count > 0) {
        print "1. Fix data errors before processing"
        print "2. Review the error details above"
    }
    if (warning_count > 0) {
        print "3. Review warnings for potential issues"
    }
    if (error_count == 0 && warning_count == 0) {
        print "Data integrity check passed successfully!"
    }
}
' /tmp/sales_data.csv