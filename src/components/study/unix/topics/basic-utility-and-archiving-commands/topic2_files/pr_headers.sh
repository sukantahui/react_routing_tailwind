#!/bin/bash
# pr_headers.sh - Adding headers and footers

echo "=== Custom headers and footers ==="
cat > report.txt <<EOF
Sales Report Q1
----------------
January: $12,000
February: $13,500
March: $14,200
Total: $39,700

Top Products:
1. Widget A
2. Gadget B
3. Thing C
EOF

echo "1. Default header (date + file name):"
pr -l 15 report.txt

echo -e "\n2. Custom header (-h):"
pr -l 15 -h "QUARTERLY SALES REPORT" report.txt

echo -e "\n3. Suppress header and footer (-T):"
pr -T report.txt

echo -e "\n4. Add line numbers (-n):"
pr -n -l 20 report.txt