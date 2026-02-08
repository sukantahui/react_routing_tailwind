#!/bin/bash
# Student Marks Processing Script
# Step 1: Clean and process the raw data files

echo "=== Step 1: Data Cleaning and Processing ==="
echo ""

echo "1.1 Standardizing Mathematics marks file:"
echo "Original file has issues: extra spaces, NA values, invalid marks"
echo ""
echo "Cleaning steps:"
cat > /tmp/clean_math.sh << 'EOF'
#!/bin/bash
input="/tmp/student_lab_data/math_marks.txt"
output="/tmp/student_lab_data/math_cleaned.txt"

echo "Step 1: Remove extra spaces around commas"
echo "Step 2: Replace NA with 0"
echo "Step 3: Cap marks at 100 (fix 105 -> 100)"
echo "Step 4: Remove empty lines"
echo ""

# Process the file
sed 's/ *, */,/g' "$input" | \
    sed 's/,NA,/,0,/g' | \
    awk -F, '{
        if ($3 > 100) $3 = 100
        if ($1 != "" && $2 != "") print $1 "," $2 "," $3
    }' > "$output"

echo "Before cleaning:"
head -n 5 "$input"
echo ""
echo "After cleaning:"
head -n 5 "$output"
EOF

chmod +x /tmp/clean_math.sh
/tmp/clean_math.sh
echo ""

echo "1.2 Processing Science marks (different delimiter):"
cat > /tmp/clean_science.sh << 'EOF'
#!/bin/bash
input="/tmp/student_lab_data/science_marks.txt"
output="/tmp/student_lab_data/science_cleaned.txt"

echo "Converting from ; delimiter to , delimiter"
echo "Also standardizing column names"

# Convert delimiter and clean
sed 's/;/,/g' "$input" | \
    sed 's/RollNo,Name,Science/RollNo,Name,Science/' > "$output"

echo "Original (first 3 lines):"
head -n 3 "$input"
echo ""
echo "Cleaned (first 3 lines):"
head -n 3 "$output"
EOF

chmod +x /tmp/clean_science.sh
/tmp/clean_science.sh
echo ""

echo "1.3 Processing English marks (space delimited):"
cat > /tmp/clean_english.sh << 'EOF'
#!/bin/bash
input="/tmp/student_lab_data/english_marks.txt"
output="/tmp/student_lab_data/english_cleaned.txt"

echo "Converting space-delimited to CSV"
echo "Handling variable spaces between columns"

# Convert spaces to commas, handling multiple spaces
awk '{
    # Skip header
    if (NR == 1) {
        print "RollNo,Name,English"
        next
    }
    # For data lines, fields are separated by 2+ spaces
    rollno = $1
    name = $2 " " $3
    marks = $4
    print rollno "," name "," marks
}' "$input" > "$output"

echo "Original (first 3 lines):"
head -n 3 "$input"
echo ""
echo "Cleaned (first 3 lines):"
head -n 3 "$output"
EOF

chmod +x /tmp/clean_english.sh
/tmp/clean_english.sh
echo ""

echo "1.4 Creating unified student database:"
cat > /tmp/create_unified_db.sh << 'EOF'
#!/bin/bash
echo "Creating unified student database from all cleaned files"
echo ""

# Create temporary files for each subject
math_file="/tmp/student_lab_data/math_cleaned.txt"
science_file="/tmp/student_lab_data/science_cleaned.txt"
english_file="/tmp/student_lab_data/english_cleaned.txt"
history_file="/tmp/student_lab_data/history_marks.txt"  # Already clean
cs_file="/tmp/student_lab_data/cs_marks.txt"

# Convert CS marks from | to , delimiter
awk -F'|' 'OFS="," {print $1, $2, $3}' "$cs_file" > /tmp/cs_cleaned.txt

# Extract just RollNo and marks for each subject
awk -F, 'NR>1 {print $1 "," $3}' "$math_file" > /tmp/math_scores.txt
awk -F, 'NR>1 {print $1 "," $3}' "$science_file" > /tmp/science_scores.txt
awk -F, 'NR>1 {print $1 "," $3}' "$english_file" > /tmp/english_scores.txt
awk -F, 'NR>1 {print $1 "," $3}' "$history_file" > /tmp/history_scores.txt
awk -F, 'NR>1 {print $1 "," $3}' /tmp/cs_cleaned.txt > /tmp/cs_scores.txt

echo "Sample of extracted scores:"
echo "Math:"
head -n 3 /tmp/math_scores.txt
echo ""
echo "Science:"
head -n 3 /tmp/science_scores.txt
echo ""

# Merge all scores by RollNo
echo "Merging all scores by RollNo..."
awk -F, '
BEGIN {
    # Initialize arrays
    OFS = ","
    print "RollNo,Math,Science,English,History,Computer"
}
{
    rollno = $1
    score = $2
    
    if (FILENAME == "/tmp/math_scores.txt") math[rollno] = score
    if (FILENAME == "/tmp/science_scores.txt") science[rollno] = score
    if (FILENAME == "/tmp/english_scores.txt") english[rollno] = score
    if (FILENAME == "/tmp/history_scores.txt") history[rollno] = score
    if (FILENAME == "/tmp/cs_scores.txt") computer[rollno] = score
}
END {
    # Print all students
    for (rollno = 101; rollno <= 110; rollno++) {
        m = (rollno in math) ? math[rollno] : "NA"
        s = (rollno in science) ? science[rollno] : "NA"
        e = (rollno in english) ? english[rollno] : "NA"
        h = (rollno in history) ? history[rollno] : "NA"
        c = (rollno in computer) ? computer[rollno] : "NA"
        print rollno, m, s, e, h, c
    }
}
' /tmp/math_scores.txt /tmp/science_scores.txt /tmp/english_scores.txt /tmp/history_scores.txt /tmp/cs_scores.txt > /tmp/student_lab_data/unified_scores.csv

echo "Unified scores database:"
cat /tmp/student_lab_data/unified_scores.csv
EOF

chmod +x /tmp/create_unified_db.sh
/tmp/create_unified_db.sh
echo ""

echo "=== Processing Complete ==="
echo ""
echo "Files created:"
ls -la /tmp/student_lab_data/*cleaned* /tmp/student_lab_data/*.csv 2>/dev/null
echo ""
echo "Next step: Calculate averages and assign grades"