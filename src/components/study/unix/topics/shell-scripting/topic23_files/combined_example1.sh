#!/bin/bash
# Combined sed and awk pipeline for Shyamnagar school data

echo "=== sed + awk Pipeline Processing ==="
echo

# Create messy input data
cat > raw_data.txt << 'EOF'
# Student data - needs cleaning
NAME: Tuhina Das; SCORE: 92; DEPARTMENT: CS; EMAIL: tuhina@bpc.edu
NAME: Swadeep Roy; SCORE: 88; DEPARTMENT: MATH; EMAIL: swadeep@bpc.edu  
NAME: Abhronila Sen; SCORE: 95; DEPARTMENT: PHYSICS; EMAIL: abhronila@naihati.edu
NAME: Debangshu Ghosh; SCORE: 87; DEPARTMENT: CHEM; EMAIL: debangshu@shyamnagar.edu
# Invalid entry
NAME: John Doe; SCORE: NA; DEPARTMENT: UNKNOWN; EMAIL: john@example.com
EOF

echo "Raw input data:"
cat raw_data.txt
echo

echo "Processing pipeline:"
echo "1. sed - Remove comments and trim spaces"
echo "2. sed - Convert to CSV format"
echo "3. awk - Filter valid scores and calculate"
echo "4. sed - Format final output"
echo

echo "Final processed output:"
# Pipeline: Clean -> Convert -> Process -> Format
sed '/^#/d' raw_data.txt |                    # Remove comment lines
sed 's/; /,/g' |                              # Replace ; with ,
sed 's/NAME: //g; s/ SCORE: //g; s/ DEPARTMENT: //g; s/ EMAIL: //g' |
sed 's/^ *//; s/ *$//' |                      # Trim spaces
awk -F, '$2 != "NA" && $2 ~ /^[0-9]+$/ {      # Filter valid scores
    sum += $2; count++; 
    print $1 "," $2 "," $3 "," $4
} END { 
    print "Total students: " count
    print "Average score: " (count ? sum/count : 0)
}' |
sed '1i\Name,Score,Department,Email' |        # Add header
sed 's/CS/Computer Science/; s/MATH/Mathematics/; s/PHYSICS/Physics/; s/CHEM/Chemistry/'