"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 2: Demonstrating the newline='' Parameter and Blank Line Prevention
Author: Sukanta Hui, Coder & AccoTax
"""

import csv
import os

def demonstrate_newline_impact():
    flawed_file = "flawed_records.csv"
    correct_file = "correct_records.csv"
    
    data = [
        ["RollNo", "Name", "Marks"],
        ["101", "Tanmay Sen", "92"],
        ["102", "Pooja Roy", "95"],
        ["103", "Aniket Das", "89"]
    ]
    
    # 1. Writing WITHOUT newline='' (May introduce blank lines on Windows)
    with open(flawed_file, "w") as f:
        writer = csv.writer(f)
        for row in data:
            writer.writerow(row)
            
    # 2. Writing WITH newline='' (Recommended standard practice)
    with open(correct_file, "w", newline="") as f:
        writer = csv.writer(f)
        for row in data:
            writer.writerow(row)
            
    print("--- INSPECTING RAW BYTES OF FLAWED FILE ---")
    with open(flawed_file, "rb") as f:
        raw_bytes = f.read()
        print(raw_bytes)
        has_double_cr = b"\r\r\n" in raw_bytes
        print(f"Contains \\r\\r\\n blank line sequence? -> {has_double_cr}")
        
    print("\n--- INSPECTING RAW BYTES OF CORRECT FILE ---")
    with open(correct_file, "rb") as f:
        raw_bytes = f.read()
        print(raw_bytes)
        has_clean_eol = b"\r\n" in raw_bytes and b"\r\r\n" not in raw_bytes
        print(f"Contains clean, single \\r\\n line ending? -> {has_clean_eol}")

if __name__ == "__main__":
    demonstrate_newline_impact()