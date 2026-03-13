#!/bin/bash
# Here document with command substitution
# Generate a student report
student_count=25
average_score=78.5

cat <<REPORT
================================
    STUDENT PERFORMANCE REPORT
================================
Generated: $(date)
School: Naihati High School
--------------------------------
Total Students: $student_count
Average Score: $average_score
--------------------------------
Top Performers:
1. Tuhina - 95%
2. Debangshu - 92%
3. Abhronila - 89%
================================
REPORT