#!/bin/bash
# Sales report with currency formatting

echo "Monthly Sales Report - Shyamnagar Store"
echo "========================================"

awk '
BEGIN {
    printf("%-15s %12s %12s %12s\n", "Product", "Quantity", "Price", "Total")
    printf("%-15s %12s %12s %12s\n", "-------", "--------", "-----", "-----")
    grand_total = 0
}
{
    total = $2 * $3
    grand_total += total
    
    # Format with currency symbol and proper alignment
    printf("%-15s %12d ₹%10.2f ₹%10.2f\n", $1, $2, $3, total)
}
END {
    printf("\n%-15s %12s %12s %12s\n", "", "", "", "-----------")
    printf("%-15s %12s %12s ₹%10.2f\n", "GRAND TOTAL", "", "", grand_total)
}
' << 'EOF'
Laptop 15 45999.99
Mouse 120 849.50
Keyboard 85 1299.00
Monitor 42 15499.75
EOF