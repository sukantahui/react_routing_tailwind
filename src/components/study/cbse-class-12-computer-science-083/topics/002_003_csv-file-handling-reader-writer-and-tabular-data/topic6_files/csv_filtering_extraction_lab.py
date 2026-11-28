"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 6: Filtering and Column Extraction from CSV Records
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def setup_sample_student_data():
    filename = "board_students.csv"
    data = [
        ["RollNo", "Name", "Stream", "Marks", "City"],
        ["101", "Aarav Sharma", "Science", "96.5", "Kolkata"],
        ["102", "Pooja Roy", "Commerce", "88.0", "Barrackpore"],
        ["103", "Tanmay Sen", "Science", "91.5", "Kolkata"],
        ["104", "Rohan Verma", "Humanities", "84.0", "Delhi"],
        ["105", "Diya Mukherjee", "Science", "97.0", "Kolkata"],
        ["106", "Aniket Das", "Commerce", "93.0", "Mumbai"]
    ]
    with open(filename, "w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerows(data)
    return filename

def filter_by_stream_and_marks(filename, target_stream, min_marks):
    print(f"--- FILTERING: Stream='{target_stream}' & Marks >= {min_marks} ---")
    with open(filename, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        
        matches = 0
        for row in reader:
            if not row: continue
            stream = row[2]
            marks = float(row[3])
            
            if stream.lower() == target_stream.lower() and marks >= min_marks:
                matches += 1
                # Projecting only Name, Stream, and Marks
                print(f"[{matches}] Name: {row[1]:<16} | Stream: {stream:<10} | Marks: {marks}")
                
        if matches == 0:
            print("No matching records found.")
        else:
            print(f"Total matching records: {matches}")

def search_by_rollno(filename, target_roll):
    print(f"\n--- SEARCHING FOR ROLL NO: {target_roll} ---")
    with open(filename, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        
        found = False
        for row in reader:
            if not row: continue
            if row[0] == str(target_roll):
                print(f"SUCCESS: Found Record -> Name: {row[1]}, Stream: {row[2]}, Marks: {row[3]}, City: {row[4]}")
                found = True
                break
                
        if not found:
            print(f"Search Failure: Roll No '{target_roll}' does not exist.")

if __name__ == "__main__":
    db_file = setup_sample_student_data()
    filter_by_stream_and_marks(db_file, "Science", 95.0)
    search_by_rollno(db_file, "105")
    search_by_rollno(db_file, "999")