#!/bin/bash
# Data cleaning pipeline for messy CSV data

echo "CSV Data Cleaning Pipeline"
echo "=========================="

# Process messy CSV data through a cleaning pipeline
cat << 'EOF' | \
# Stage 1: Normalize delimiters (semicolon to comma)
sed 's/;/,/g' | \
# Stage 2: Remove quotes and extra spaces
sed 's/"//g; s/^[[:space:]]*//; s/[[:space:]]*$//' | \
# Stage 3: Clean up multiple spaces within fields
sed 's/,[[:space:]]*/,/g' | \
# Stage 4: Remove empty lines
grep -v '^[[:space:]]*$' | \
# Stage 5: Format as proper CSV
awk -F',' '{
    if (NF >= 4) {
        printf("\"%-10s\",\"%-20s\",%3d,%7.2f\n", $1, $2, $3, $4)
    } else {
        print "ERROR: Line", NR, "has only", NF, "fields"
    }
}'
"John Doe" ; "123 Main St";25;45000.50
"Jane Smith";"456 Oak Ave, Apt 4B";30;52000.75
"Bob Johnson" ; "789 Pine Rd" ; ; 48000.00
"Alice Brown";"321 Maple St, Kolkata";28;51000.25

"Charlie Davis";"654 Elm St, Barrackpore";35;55000.80
EOF

echo -e "\nPipeline stages:"
echo "1. sed: Convert semicolons to commas"
echo "2. sed: Remove quotes and trim spaces"
echo "3. sed: Clean internal spacing"
echo "4. grep: Remove empty lines"
echo "5. awk: Validate and format output"