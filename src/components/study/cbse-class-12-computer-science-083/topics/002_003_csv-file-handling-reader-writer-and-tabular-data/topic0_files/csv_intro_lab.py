"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 0: Demonstration of CSV Structure, Manual Creation & Inspection
Author: Sukanta Hui, Coder & AccoTax
"""

import os

def demonstrate_csv_structure():
    filename = "student_records.csv"
    
    # Writing CSV as plain text to show its internal structure
    with open(filename, "w", encoding="utf-8") as f:
        # Header record
        f.write("RollNo,Name,Stream,Score\n")
        # Data records
        f.write("101,Aarav Sharma,Science,96.5\n")
        f.write("102,Diya Sen,Commerce,94.0\n")
        f.write("103,Rohan Verma,Humanities,91.0\n")
        # Record with quoted field containing a comma
        f.write('104,"Patel, Ananya",Science,98.0\n')
    
    print(f"File '{filename}' created successfully!\n")
    
    # Reading and displaying exact raw content
    print("--- RAW CONTENT OF CSV FILE ---")
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
        print(content)
        
    print("--- PARSING MANUALLY LINE BY LINE ---")
    with open(filename, "r", encoding="utf-8") as f:
        lines = f.readlines()
        for idx, line in enumerate(lines):
            line = line.strip()
            tokens = line.split(",")
            print(f"Line {idx} -> Raw: {line} | Tokens count: {len(tokens)}")

if __name__ == "__main__":
    demonstrate_csv_structure()