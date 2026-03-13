#!/bin/bash
# Sum aggregation example - Sales data
# Data: Product, Quantity, Price

echo "Sales Total Calculator"
echo "======================"

awk '
BEGIN {
    total_sales = 0
    printf("%-15s %10s %12s %12s\n", "Product", "Quantity", "Price", "Subtotal")
    printf("%-15s %10s %12s %12s\n", "-------", "--------", "-----", "--------")
}
{
    subtotal = $2 * $3
    total_sales += subtotal  # Accumulate running total
    
    printf("%-15s %10d ₹%10.2f ₹%10.2f\n", $1, $2, $3, subtotal)
}
END {
    printf("\n%-15s %10s %12s %12s\n", "", "", "", "-----------")
    printf("%-15s %10s %12s ₹%10.2f\n", "TOTAL SALES", "", "", total_sales)
}
' << 'EOF'
Laptop 5 45999.99
Mouse 25 849.50
Keyboard 12 1299.00
Monitor 8 15499.75
EOF