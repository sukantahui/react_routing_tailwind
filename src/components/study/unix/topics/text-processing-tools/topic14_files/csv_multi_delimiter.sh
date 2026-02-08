#!/bin/bash
# Handling multiple delimiter formats

echo "Multi-Delimiter CSV Processing"
echo "==============================="

# Example 1: Comma-separated
echo "1. Standard CSV (comma):"
echo "------------------------"
awk 'BEGIN {FS=","} {printf("%-10s | %-10s | %-10s\n", $1, $2, $3)}' << 'EOF'
Product,Qty,Price
Laptop,5,45999
Mouse,25,849
EOF

echo -e "\n2. Pipe-separated:"
echo "------------------"
awk 'BEGIN {FS="|"} {printf("%-10s | %-10s | %-10s\n", $1, $2, $3)}' << 'EOF'
Product|Qty|Price
Laptop|5|45999
Mouse|25|849
EOF

echo -e "\n3. Tab-separated (TSV):"
echo "------------------------"
awk 'BEGIN {FS="\t"} {printf("%-10s | %-10s | %-10s\n", $1, $2, $3)}' << 'EOF'
Product	Qty	Price
Laptop	5	45999
Mouse	25	849
EOF

echo -e "\n4. Mixed delimiters (comma or semicolon):"
echo "-------------------------------------------"
awk '
BEGIN {
    # Regular expression: comma OR semicolon
    FS = "[,;]"
    print "Processing mixed-format data:"
}
{
    if (NF == 3) {
        printf("  %-10s (Qty: %2s) = ₹%6s\n", $1, $2, $3)
    } else {
        printf("  ERROR: Expected 3 fields, got %d\n", NF)
    }
}
' << 'EOF'
Laptop,5,45999
Mouse;25,849  # Mixed - will cause error!
Keyboard,12,1299
Monitor;8,15499
EOF