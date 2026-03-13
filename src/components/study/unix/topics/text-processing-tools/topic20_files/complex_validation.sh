#!/bin/bash
# Complex Business Rule Validation
# Validating data against business logic rules

echo "=== Complex Business Rule Validation ==="
echo ""

# Create sample product data
cat > /tmp/product_data.csv << 'EOF'
ID,Name,Category,Price,Stock,MinStock,MaxStock,LastOrder
1,Laptop,Electronics,999.99,50,10,100,2023-12-15
2,Mouse,Electronics,25.50,200,20,500,2023-12-30
3,Chair,Furniture,150.00,-5,5,50,2023-11-15
4,Desk,Furniture,300.00,15,5,30,2023-13-01
5,Monitor,Electronics,299.99,75,10,100,2023-12-15
6,Keyboard,,79.99,150,20,300,2023-12-15
7,Tablet,Electronics,499.99,0,5,50,2023-12-15
8,Printer,Electronics,199.99,8,5,25,2024-01-15
EOF

echo "Sample Product Data:"
cat /tmp/product_data.csv
echo ""

echo "=== Applying Business Rules ==="
echo ""

echo "1. Stock Level Validation:"
echo "   Rule: Stock must be between MinStock and MaxStock"
awk -F, 'NR>1 {
    if ($5 < 0) {
        print "ERROR: Line " NR " - Negative stock (" $5 ") for " $2
    } else if ($5 < $6) {
        print "WARNING: Line " NR " - Low stock (" $5 " < min " $6 ") for " $2
    } else if ($5 > $7) {
        print "WARNING: Line " NR " - High stock (" $5 " > max " $7 ") for " $2
    }
}' /tmp/product_data.csv
echo ""

echo "2. Price Validation:"
echo "   Rule: Price must be positive and reasonable for category"
awk -F, 'NR>1 {
    if ($4 <= 0) {
        print "ERROR: Line " NR " - Invalid price (" $4 ") for " $2
    } else if ($3 == "Electronics" && $4 > 1000) {
        print "WARNING: Line " NR " - High price for electronics: " $2
    } else if ($3 == "Furniture" && $4 > 500) {
        print "WARNING: Line " NR " - High price for furniture: " $2
    }
}' /tmp/product_data.csv
echo ""

echo "3. Category Validation:"
echo "   Rule: Category must not be empty and must be valid"
awk -F, 'NR>1 {
    if ($3 == "") {
        print "ERROR: Line " NR " - Empty category for " $2
    } else if ($3 !~ /^(Electronics|Furniture|Office|Books)$/) {
        print "WARNING: Line " NR " - Unusual category (" $3 ") for " $2
    }
}' /tmp/product_data.csv
echo ""

echo "4. Date Logic Validation:"
echo "   Rule: LastOrder date must be in the past"
awk -F, 'NR>1 {
    split($8, d, "-")
    order_date = d[1] d[2] d[3]
    current_date = strftime("%Y%m%d")
    if (order_date > current_date) {
        print "ERROR: Line " NR " - Future order date (" $8 ") for " $2
    } else if (order_date < "20230101") {
        print "WARNING: Line " NR " - Old order date (" $8 ") for " $2
    }
}' /tmp/product_data.csv
echo ""

echo "5. Cross-field Validation:"
echo "   Rule: High-value items should have adequate stock coverage"
awk -F, 'NR>1 {
    if ($4 > 200 && $5 < 20) {
        print "WARNING: Line " NR " - High value item " $2 " has low stock (" $5 ")"
    }
    if ($3 == "Electronics" && $5 == 0) {
        print "ERROR: Line " NR " - Electronics item " $2 " is out of stock"
    }
}' /tmp/product_data.csv
echo ""

echo "6. Generating Validation Report:"
awk -F, '
BEGIN {
    print "=== VALIDATION REPORT ==="
    print "Timestamp: " strftime("%Y-%m-%d %H:%M:%S")
    print ""
}
NR==1 { next }
{
    errors = 0
    warnings = 0
    
    # Check each rule
    if ($3 == "") { cat_error = "Missing category"; errors++ }
    if ($4 <= 0) { price_error = "Invalid price"; errors++ }
    if ($5 < 0) { stock_error = "Negative stock"; errors++ }
    if ($5 < $6) { low_stock = "Below minimum"; warnings++ }
    if ($5 > $7) { high_stock = "Above maximum"; warnings++ }
    
    if (errors > 0 || warnings > 0) {
        printf "Product: %s (ID: %s)\n", $2, $1
        if (errors > 0) printf "  ERRORS: %d - Needs immediate attention\n", errors
        if (warnings > 0) printf "  WARNINGS: %d - Review recommended\n", warnings
        print ""
    } else {
        valid_count++
    }
}
END {
    print "=== SUMMARY ==="
    print "Total products checked: " NR-1
    print "Fully valid products: " valid_count
    print "Products with issues: " (NR-1 - valid_count)
}
' /tmp/product_data.csv