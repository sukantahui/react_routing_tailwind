#!/bin/bash
# Batch File Processing Example
# Processing multiple files with sed

echo "=== Batch Processing Multiple Files ==="
echo "Creating sample data files..."

# Create sample data files
mkdir -p /tmp/sed_demo

cat > /tmp/sed_demo/data1.txt << 'EOF'
Student,Score,Date
John,85,04-12-2023
Jane,92,2023/12/04
Bob,78,Dec 4, 2023
EOF

cat > /tmp/sed_demo/data2.txt << 'EOF'
Employee,Department,Salary
Alice,IT,$75000
Bob,HR,$65000
Charlie,Sales,$80000
EOF

cat > /tmp/sed_demo/data3.txt << 'EOF'
Product,Price,Stock
Laptop,$999,50
Mouse,$49,200
Keyboard,$79,150
EOF

echo "Original files created in /tmp/sed_demo/"
echo ""
echo "Processing all text files in batch:"

# Create cleanup script
cat > /tmp/cleanup_script.sed << 'EOF'
# Common cleanup operations
s/\$//g
s/, /,/g
s/ ,/,/g
s/^[[:space:]]*//
s/[[:space:]]*$//
EOF

echo ""
echo "1. Clean all files (remove $ and fix commas):"
for file in /tmp/sed_demo/*.txt; do
    echo "Processing $(basename $file)..."
    sed -f /tmp/cleanup_script.sed "$file" | head -3
    echo "---"
done

echo ""
echo "2. Create backup and modify files in-place:"
echo "sed -i.bak -f /tmp/cleanup_script.sed /tmp/sed_demo/*.txt"
echo "(This would create backup files with .bak extension)"

echo ""
echo "3. Process and output to new directory:"
mkdir -p /tmp/sed_demo/cleaned
for file in /tmp/sed_demo/*.txt; do
    base=$(basename "$file" .txt)
    sed -f /tmp/cleanup_script.sed "$file" > "/tmp/sed_demo/cleaned/${base}_cleaned.txt"
    echo "Created: ${base}_cleaned.txt"
done

echo ""
echo "4. Log all changes made:"
echo "Processing with logging..."
for file in /tmp/sed_demo/*.txt; do
    echo "=== Processing $(basename $file) ===" >> /tmp/sed_demo/processing.log
    sed -f /tmp/cleanup_script.sed "$file" | tee -a "/tmp/sed_demo/cleaned/$(basename $file)" >> /tmp/sed_demo/processing.log
    echo "---" >> /tmp/sed_demo/processing.log
done
echo "Log saved to /tmp/sed_demo/processing.log"