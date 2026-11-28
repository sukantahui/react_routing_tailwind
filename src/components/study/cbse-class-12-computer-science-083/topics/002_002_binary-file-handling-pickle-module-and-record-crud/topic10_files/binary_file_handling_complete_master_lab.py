"""
======================================================================
CBSE CLASS XII COMPUTER SCIENCE (CODE: 083)
MASTER LABORATORY SCRIPT: COMPLETE BINARY FILE CRUD OPERATIONS
Author: Sukanta Hui, Coder & AccoTax, Barrackpore, West Bengal
Target Students: Mamata, Mahima, Susmita, Debangshu, Sachin, Swadeep
======================================================================
"""

import pickle
import os

DB_NAME = "cbse_student_master.dat"

# 1. CREATE / APPEND RECORD
def add_student(roll, name, marks, city, filename=DB_NAME):
    rec = {"roll": roll, "name": name, "marks": marks, "city": city}
    with open(filename, "ab") as f:
        pickle.dump(rec, f)
    print(f"[+] Record dumped for: {name} (Roll {roll})")

# 2. READ / DISPLAY ALL RECORDS
def display_all(filename=DB_NAME):
    if not os.path.exists(filename):
        print("[!] Database not found.")
        return
    print(f"\n{'ROLL':<6} | {'NAME':<14} | {'MARKS':<7} | {'CITY':<14}")
    print("-" * 48)
    with open(filename, "rb") as f:
        try:
            while True:
                r = pickle.load(f)
                print(f"{r['roll']:<6} | {r['name']:<14} | {r['marks']:<7.2f} | {r['city']:<14}")
        except EOFError:
            pass
    print("-" * 48)

# 3. SEARCH RECORD
def search_student(target_roll, filename=DB_NAME):
    found = False
    with open(filename, "rb") as f:
        try:
            while True:
                r = pickle.load(f)
                if r["roll"] == target_roll:
                    print(f"[+] FOUND: Roll {r['roll']} | {r['name']} | Marks: {r['marks']} | City: {r['city']}")
                    found = True
                    break
        except EOFError:
            pass
    if not found:
        print(f"[-] Roll {target_roll} not found.")

# 4. UPDATE RECORD
def update_marks(target_roll, new_marks, filename=DB_NAME):
    temp = "temp_" + filename
    found = False
    with open(filename, "rb") as fin, open(temp, "wb") as fout:
        try:
            while True:
                r = pickle.load(fin)
                if r["roll"] == target_roll:
                    r["marks"] = new_marks
                    found = True
                pickle.dump(r, fout)
        except EOFError:
            pass
    if found:
        os.remove(filename)
        os.rename(temp, filename)
        print(f"[+] Marks updated for Roll {target_roll} to {new_marks}!")
    else:
        if os.path.exists(temp): os.remove(temp)
        print(f"[-] Roll {target_roll} not found.")

# 5. DELETE RECORD
def delete_student(target_roll, filename=DB_NAME):
    temp = "temp_" + filename
    deleted = False
    with open(filename, "rb") as fin, open(temp, "wb") as fout:
        try:
            while True:
                r = pickle.load(fin)
                if r["roll"] == target_roll:
                    deleted = True
                else:
                    pickle.dump(r, fout)
        except EOFError:
            pass
    if deleted:
        os.remove(filename)
        os.rename(temp, filename)
        print(f"[+] Record for Roll {target_roll} successfully deleted!")
    else:
        if os.path.exists(temp): os.remove(temp)
        print(f"[-] Roll {target_roll} not found.")

if __name__ == "__main__":
    # Clean previous run
    if os.path.exists(DB_NAME): os.remove(DB_NAME)
    print("=== CBSE CLASS 12 BINARY FILE MASTER TEST PIPELINE ===")
    add_student(101, "Mamata", 96.0, "Barrackpore")
    add_student(102, "Mahima", 94.5, "Shyamnagar")
    add_student(103, "Susmita", 97.0, "Ichapur")
    display_all()
    search_student(102)
    update_marks(102, 98.0)
    delete_student(101)
    display_all()
    print("\n[+] All master binary operations executed successfully!")
