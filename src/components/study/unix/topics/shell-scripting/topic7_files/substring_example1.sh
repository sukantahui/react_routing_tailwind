#!/bin/bash
# Substring Extraction Examples
# Topic 7: String Manipulation

echo "=== SUBSTRING EXTRACTION EXAMPLES ==="
echo

# Example 1: Extract from position to end
text="Hello from Ichapur"
echo "Example 1: Extract from position 6 to end"
echo "Original: $text"
echo "Substring: ${text:6}"
echo

# Example 2: Extract with specific length
echo "Example 2: Extract 4 characters from position 7"
echo "Original: $text"
echo "Substring: ${text:7:4}"
echo

# Example 3: Extract last characters (using negative position)
filename="assignment_final_v2.pdf"
echo "Example 3: Extract file extension"
echo "Filename: $filename"
extension="${filename: -3}"  # Note: space before negative
echo "Extension: $extension"
echo

# Example 4: Extract middle portion
student_id="S2023001_CS101_A+"
echo "Example 4: Extract course code"
echo "Student ID: $student_id"
course_code="${student_id:8:5}"
echo "Course Code: $course_code"
echo

# Example 5: Extract using variable positions
path="/home/tuhina/documents/report_2024.txt"
echo "Example 5: Extract filename without extension"
echo "Path: $path"

# Find last slash position (simulated)
filename_with_ext="${path##*/}"
echo "Filename with ext: $filename_with_ext"

# Extract without extension
filename_no_ext="${filename_with_ext%.*}"
echo "Filename without ext: $filename_no_ext"
echo

# Example 6: Practical - Extract date components
date_string="2024-12-15"
echo "Example 6: Extract date components"
echo "Date: $date_string"
year="${date_string:0:4}"
month="${date_string:5:2}"
day="${date_string:8:2}"
echo "Year: $year, Month: $month, Day: $day"