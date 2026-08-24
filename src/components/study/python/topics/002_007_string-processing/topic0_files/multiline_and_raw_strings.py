# ====================================================================
# Module: 002_007_string-processing
# Topic 0: String creation, multiline strings & escape sequences
# File: multiline_and_raw_strings.py
# Description: Triple quotes multiline strings, docstrings, and raw strings (r"")
# ====================================================================

# 1. Triple Quotes (''' or """) preserve exact newlines, whitespace, and formatting
student_notice = """===================================================
CODER & ACCOTAX • BARRACKPORE CENTER
Student Admission Notice
===================================================
Candidate: Susmita Roy
Course: Fullstack Python & Fast-API
Batch Time: 10:00 AM - 1:00 PM (Saturday)
Tuition Fee: ₹4,500
==================================================="""

print("--- Multiline String Output ---")
print(student_notice)

# 2. Raw Strings (prefix 'r' or 'R'): Backslashes are treated as literal characters!
# Essential for Windows file paths and Regular Expressions
standard_path = "C:\\Users\\susmita\\Documents\\python_notes.txt"
raw_path = r"C:\Users\susmita\Documents\python_notes.txt"

print("\n--- Raw String vs Standard String ---")
print("Standard Escaped Path:", standard_path)
print("Raw String Path (r''):", raw_path)
print("Are both paths identical in memory? ->", standard_path == raw_path)

# 3. Multiline with backslash line continuation (Single Logical Line)
single_logical_line = "Python was created by Guido van Rossum " \
                      "in the late 1980s at CWI " \
                      "in the Netherlands."
print("\nLine Continuation Output:", single_logical_line)
