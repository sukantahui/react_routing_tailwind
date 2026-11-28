"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 3: Writing to CSV Files using writerow() and writerows()
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def demonstrate_csv_writing():
    filename = "students_database.csv"
    
    # 1. Opening file with write mode and newline=''
    with open(filename, "w", newline="", encoding="utf-8") as f:
        csv_writer = csv.writer(f)
        
        # Writing header using writerow()
        header = ["RollNo", "StudentName", "Stream", "Percentage"]
        csv_writer.writerow(header)
        print("Header written successfully.")
        
        # Writing a single record using writerow()
        single_record = [101, "Suman Ghosh", "Science", 94.5]
        csv_writer.writerow(single_record)
        print("Single record written with writerow().")
        
        # Writing multiple records at once using writerows()
        batch_records = [
            [102, "Kavita Reddy", "Commerce", 91.0],
            [103, "Aditya Nair", "Humanities", 88.5],
            [104, "Debanjan Paul", "Science", 96.0]
        ]
        csv_writer.writerows(batch_records)
        print(f"Batch of {len(batch_records)} records written with writerows().")
        
    print(f"\n--- VERIFYING FILE CONTENTS ({filename}) ---")
    with open(filename, "r", newline="", encoding="utf-8") as f:
        print(f.read())

if __name__ == "__main__":
    demonstrate_csv_writing()