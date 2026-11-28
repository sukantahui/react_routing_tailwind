"""
CBSE Class XII Computer Science (Code 083)
Topic 9: Complete Menu-Driven Binary File Management System (CRUD)
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

DB_FILE = "student_master_db.dat"

def add_record(filename=DB_FILE):
    print("\n--- [1] ADD STUDENT RECORD ---")
    with open(filename, "ab") as f:
        while True:
            try:
                roll = int(input("Enter Roll Number: "))
                name = input("Enter Student Name: ").strip()
                marks = float(input("Enter Marks (0-100): "))
                city = input("Enter City: ").strip()
                
                rec = {"roll": roll, "name": name, "marks": marks, "city": city}
                pickle.dump(rec, f)
                print(f"[+] Record added for {name} (Roll {roll}).")
            except ValueError:
                print("[!] Invalid input! Roll must be integer, Marks must be numeric.")
                
            more = input("Add another student (y/n)? ").strip().lower()
            if more != 'y':
                break

def display_all(filename=DB_FILE):
    print("\n--- [2] ALL STUDENT RECORDS ---")
    if not os.path.exists(filename):
        print("[!] Database is empty or does not exist yet.")
        return
        
    print(f"{'ROLL':<6} | {'NAME':<15} | {'MARKS':<7} | {'CITY':<15}")
    print("-" * 50)
    count = 0
    with open(filename, "rb") as f:
        try:
            while True:
                r = pickle.load(f)
                count += 1
                print(f"{r['roll']:<6} | {r['name']:<15} | {r['marks']:<7.2f} | {r['city']:<15}")
        except EOFError:
            pass
    print("-" * 50)
    print(f"Total Records: {count}")

def search_record(filename=DB_FILE):
    print("\n--- [3] SEARCH STUDENT BY ROLL NUMBER ---")
    if not os.path.exists(filename):
        print("[!] Database does not exist yet.")
        return
    try:
        target = int(input("Enter Roll Number to search: "))
    except ValueError:
        print("[!] Invalid Roll Number!")
        return
        
    found = False
    with open(filename, "rb") as f:
        try:
            while True:
                r = pickle.load(f)
                if r["roll"] == target:
                    print(f"[+] MATCH FOUND: Roll {r['roll']} | {r['name']} | Marks: {r['marks']}% | City: {r['city']}")
                    found = True
                    break
        except EOFError:
            pass
    if not found:
        print(f"[-] Student with Roll Number {target} not found.")

def update_marks(filename=DB_FILE):
    print("\n--- [4] UPDATE STUDENT MARKS ---")
    if not os.path.exists(filename):
        print("[!] Database does not exist yet.")
        return
    try:
        target = int(input("Enter Roll Number to update: "))
        new_marks = float(input("Enter New Marks: "))
    except ValueError:
        print("[!] Invalid numerical input!")
        return
        
    temp_file = "temp_" + filename
    found = False
    with open(filename, "rb") as fin, open(temp_file, "wb") as fout:
        try:
            while True:
                r = pickle.load(fin)
                if r["roll"] == target:
                    r["marks"] = new_marks
                    found = True
                pickle.dump(r, fout)
        except EOFError:
            pass
            
    if found:
        os.remove(filename)
        os.rename(temp_file, filename)
        print(f"[+] Marks updated successfully for Roll {target}!")
    else:
        if os.path.exists(temp_file):
            os.remove(temp_file)
        print(f"[-] Student with Roll {target} not found.")

def delete_record(filename=DB_FILE):
    print("\n--- [5] DELETE STUDENT RECORD ---")
    if not os.path.exists(filename):
        print("[!] Database does not exist yet.")
        return
    try:
        target = int(input("Enter Roll Number to delete: "))
    except ValueError:
        print("[!] Invalid Roll Number!")
        return
        
    temp_file = "temp_" + filename
    deleted = False
    with open(filename, "rb") as fin, open(temp_file, "wb") as fout:
        try:
            while True:
                r = pickle.load(fin)
                if r["roll"] == target:
                    deleted = True
                else:
                    pickle.dump(r, fout)
        except EOFError:
            pass
            
    if deleted:
        os.remove(filename)
        os.rename(temp_file, filename)
        print(f"[+] Record for Roll {target} deleted successfully!")
    else:
        if os.path.exists(temp_file):
            os.remove(temp_file)
        print(f"[-] Student with Roll {target} not found.")

if __name__ == "__main__":
    # Demonstration pipeline
    demo_db = "demo_student_system.dat"
    # Seed data
    with open(demo_db, "wb") as f:
        pickle.dump({"roll": 101, "name": "Mamata", "marks": 96.0, "city": "Barrackpore"}, f)
        pickle.dump({"roll": 102, "name": "Mahima", "marks": 94.0, "city": "Shyamnagar"}, f)
    print("Database initialized for demo.")
    display_all(demo_db)
