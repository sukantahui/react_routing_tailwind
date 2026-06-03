#!/bin/bash
# pr_printing.sh - Preparing files for printing

echo "=== Ready for printing ==="
# Suppose we have a long script
cat > script.sh <<'EOF'
#!/bin/bash
# demo script
echo "Hello"
echo "World"
for i in 1 2 3; do
    echo $i
done
EOF

echo "1. Format with page numbers and send to printer (commented out):"
# pr -l 66 -h "Script Listing" script.sh | lpr

echo "2. Preview with less:"
pr -l 24 -h "My Script" script.sh | less

echo "3. Save to a file for later printing:"
pr -l 66 -h "Backup Report" script.sh > printable_report.txt
echo "Saved to printable_report.txt"

echo "4. Two-up printing (2 pages per sheet) using pr and psutils:"
# pr -2 script.sh | psnup -2 | lpr
echo "(Requires psutils installed)"