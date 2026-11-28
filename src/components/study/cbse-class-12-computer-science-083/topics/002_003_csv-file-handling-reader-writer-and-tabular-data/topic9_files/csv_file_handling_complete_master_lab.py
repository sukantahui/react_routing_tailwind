"""
CBSE Class 12 Computer Science (Code 083) - Unit I: File Handling
Module: CSV File Handling - Complete Master Lab Script
Author: Sukanta Hui, Senior CS Educator, Coder & AccoTax, Barrackpore
"""

import csv
import os

DB_FILE = "master_students.csv"

def init_db():
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["RollNo", "Name", "Stream", "Marks"])
            writer.writerows([
                ["101", "Aarav Sharma", "Science", "96.5"],
                ["102", "Pooja Roy", "Commerce", "88.0"],
                ["103", "Tanmay Sen", "Science", "92.0"],
                ["104", "Rohan Verma", "Humanities", "84.5"],
                ["105", "Diya Mukherjee", "Science", "97.0"]
            ])
        print(f"Initialized '{DB_FILE}' with sample records.")

def display_all():
    print("\n--- ALL STUDENTS IN CSV ---")
    with open(DB_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        print(f"{header[0]:<10} {header[1]:<20} {header[2]:<15} {header[3]:<8}")
        print("-" * 55)
        for row in reader:
            if not row: continue
            print(f"{row[0]:<10} {row[1]:<20} {row[2]:<15} {row[3]:<8}")

def perform_aggregations():
    print("\n--- CALCULATING STATISTICAL AGGREGATIONS ---")
    total = 0.0
    count = 0
    highest = -1.0
    lowest = float("inf")
    topper = ""
    
    with open(DB_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            if not row: continue
            score = float(row[3])
            total += score
            count += 1
            if score > highest:
                highest = score
                topper = row[1]
            if score < lowest:
                lowest = score
                
    if count > 0:
        print(f"Total Students: {count}")
        print(f"Average Marks : {total/count:.2f}")
        print(f"Top Scorer    : {topper} ({highest} marks)")
        print(f"Lowest Score  : {lowest} marks")

if __name__ == "__main__":
    init_db()
    display_all()
    perform_aggregations()