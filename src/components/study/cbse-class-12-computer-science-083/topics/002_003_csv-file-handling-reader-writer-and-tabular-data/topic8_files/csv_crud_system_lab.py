"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 8: Full Menu-Driven CSV Student Management System
Author: Sukanta Hui, Coder & AccoTax
"""

import csv
import os

CSV_FILE = "school_records.csv"

def initialize_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["RollNo", "Name", "Stream", "Marks"])

def add_record():
    print("\n--- ADD STUDENT RECORD ---")
    roll = input("Enter Roll Number: ").strip()
    name = input("Enter Student Name: ").strip()
    stream = input("Enter Stream (Science/Commerce/Humanities): ").strip()
    marks = float(input("Enter Marks: "))
    
    with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([roll, name, stream, marks])
    print("Record added successfully!")

def display_all():
    print("\n--- ALL REGISTERED STUDENTS ---")
    if not os.path.exists(CSV_FILE):
        print("Database file does not exist.")
        return
        
    with open(CSV_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        try:
            header = next(reader)
        except StopIteration:
            print("File is empty.")
            return
            
        print(f"{header[0]:<10} {header[1]:<20} {header[2]:<15} {header[3]:<8}")
        print("-" * 55)
        count = 0
        for row in reader:
            if not row: continue
            count += 1
            print(f"{row[0]:<10} {row[1]:<20} {row[2]:<15} {row[3]:<8}")
        print("-" * 55)
        print(f"Total students: {count}")

def search_record():
    print("\n--- SEARCH RECORD ---")
    target_roll = input("Enter Roll Number to search: ").strip()
    with open(CSV_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        found = False
        for row in reader:
            if not row: continue
            if row[0] == target_roll:
                print(f"FOUND: Roll={row[0]} | Name={row[1]} | Stream={row[2]} | Marks={row[3]}")
                found = True
                break
        if not found:
            print(f"Record with Roll No '{target_roll}' not found.")

def update_record():
    print("\n--- UPDATE RECORD MARKS ---")
    target_roll = input("Enter Roll Number to update: ").strip()
    records = []
    found = False
    
    with open(CSV_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if not row: continue
            if row[0] == target_roll:
                new_marks = float(input(f"Enter new marks for {row[1]} (Old: {row[3]}): "))
                row[3] = str(new_marks)
                found = True
            records.append(row)
            
    if found:
        with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
            csv.writer(f).writerows(records)
        print("Record updated successfully!")
    else:
        print("Record not found. Update aborted.")

def delete_record():
    print("\n--- DELETE RECORD ---")
    target_roll = input("Enter Roll Number to delete: ").strip()
    records = []
    found = False
    
    with open(CSV_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if not row: continue
            if row[0] == target_roll:
                found = True
                print(f"Removing record: {row[1]}...")
                continue  # Skip this record to delete it
            records.append(row)
            
    if found:
        with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
            csv.writer(f).writerows(records)
        print("Record deleted successfully!")
    else:
        print("Record not found.")

def menu():
    initialize_csv()
    while True:
        print("\n====================================")
        print("   STUDENT CSV MANAGEMENT SYSTEM    ")
        print("====================================")
        print("1. Add Student Record")
        print("2. Display All Records")
        print("3. Search Record by Roll No")
        print("4. Update Student Marks")
        print("5. Delete Student Record")
        print("6. Exit")
        choice = input("Enter your choice (1-6): ").strip()
        
        if choice == "1": add_record()
        elif choice == "2": display_all()
        elif choice == "3": search_record()
        elif choice == "4": update_record()
        elif choice == "5": delete_record()
        elif choice == "6":
            print("Exiting program. Goodbye!")
            break
        else:
            print("Invalid choice! Please select 1 to 6.")

if __name__ == "__main__":
    menu()