#!/bin/bash
# Topic 25: Advanced CSV Transformation
# Converts data types and standardizes formats

INPUT_FILE="${1:-students_cleaned.csv}"
OUTPUT_FILE="students_transformed.csv"
TRANSFORM_LOG="transform.log"

echo "Starting advanced transformation..."
echo "Input: $INPUT_FILE"
echo "Output: $OUTPUT_FILE"
echo ""

# Save header
head -1 "$INPUT_FILE" > "$OUTPUT_FILE"

# Process data rows
echo "Processing transformations..." > "$TRANSFORM_LOG"
tail -n +2 "$INPUT_FILE" | while IFS= read -r line; do
    # Parse CSV fields (handling quoted fields with commas)
    echo "$line" | awk -F',' '
    BEGIN { OFS="," }
    {
        # Extract fields (simplified parsing)
        id = $1
        name = $2
        dob = $3
        school = $4
        marks = $5
        grade = $6
        
        # Transformation 1: Standardize date format to YYYY-MM-DD
        # Remove quotes first
        gsub(/"/, "", dob)
        
        # Try different date formats
        cmd = "date -d \"" dob "\" +%Y-%m-%d 2>/dev/null"
        cmd | getline std_date
        close(cmd)
        
        if (std_date == "") {
            std_date = "1900-01-01"  # Default for invalid dates
            print "WARN: Could not parse date: " dob >> "'"$TRANSFORM_LOG"'"
        }
        
        # Transformation 2: Standardize school names
        gsub(/"/, "", school)
        if (school ~ /Barrackpore.*HS/) school = "Barrackpore High School"
        else if (school ~ /BP HS/) school = "Barrackpore High School"
        else if (school ~ /Shyamnagar/) school = "Shyamnagar Public School"
        else if (school ~ /Naihati/) school = "Naihati Academy"
        
        # Transformation 3: Calculate grade if missing but marks present
        gsub(/"/, "", marks)
        gsub(/"/, "", grade)
        
        if (marks != "" && grade == "") {
            marks_num = marks + 0
            if (marks_num >= 90) grade = "A"
            else if (marks_num >= 75) grade = "B"
            else if (marks_num >= 50) grade = "C"
            else grade = "D"
        }
        
        # Transformation 4: Capitalize first letter of each name word
        gsub(/"/, "", name)
        split(name, name_parts, " ")
        result_name = ""
        for (i in name_parts) {
            first = substr(name_parts[i], 1, 1)
            rest = substr(name_parts[i], 2)
            result_name = result_name toupper(first) tolower(rest) " "
        }
        gsub(/ $/, "", result_name)
        
        # Output transformed record
        print id, "\"" result_name "\"", "\"" std_date "\"", "\"" school "\"", marks, "\"" grade "\""
    }' >> "$OUTPUT_FILE"
done

echo "Transformations completed!"
echo "Original records: $(wc -l < "$INPUT_FILE")"
echo "Transformed records: $(wc -l < "$OUTPUT_FILE")"
echo "Check $TRANSFORM_LOG for any warnings"