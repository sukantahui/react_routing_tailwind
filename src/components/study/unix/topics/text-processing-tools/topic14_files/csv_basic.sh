#!/bin/bash
# Basic CSV processing example
# Data: Product,Quantity,Price,Date

echo "Basic CSV Processing - Sales Report"
echo "==================================="

awk '
BEGIN {
    FS = ","  # Set field separator to comma
    total_sales = 0
    printf("%-15s %8s %10s %12s %12s\n", 
           "Product", "Qty", "Price", "Date", "Subtotal")
    printf("%-15s %8s %10s %12s %12s\n", 
           "-------", "---", "-----", "----", "--------")
}
NR == 1 { next }  # Skip header row
{
    quantity = $2
    price = $3
    date = $4
    subtotal = quantity * price
    total_sales += subtotal
    
    # Format output with proper alignment
    printf("%-15s %8d ₹%9.2f %12s ₹%11.2f\n", 
           $1, quantity, price, date, subtotal)
}
END {
    printf("\n%-15s %8s %10s %12s %12s\n", 
           "", "", "", "", "-----------")
    printf("%-15s %8s %10s %12s ₹%11.2f\n", 
           "TOTAL", "", "", "", total_sales)
}
' << 'EOF'
Product,Quantity,Price,Date
Laptop,5,45999.99,2024-01-15
Mouse,25,849.50,2024-01-15
Keyboard,12,1299.00,2024-01-16
Monitor,8,15499.75,2024-01-16
Tablet,15,28999.00,2024-01-17
EOF