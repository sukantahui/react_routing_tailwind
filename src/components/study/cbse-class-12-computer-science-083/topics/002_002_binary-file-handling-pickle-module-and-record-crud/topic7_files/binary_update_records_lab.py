"""
CBSE Class XII Computer Science (Code 083)
Topic 7: Binary File Record Updating Laboratory (Temporary File Pattern)
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def setup_update_database(filename="students_update.dat"):
    records = [
        {"roll": 101, "name": "Mamata", "marks": 91.0},
        {"roll": 102, "name": "Mahima", "marks": 88.5},
        {"roll": 103, "name": "Susmita", "marks": 94.0}
    ]
    with open(filename, "wb") as f:
        for r in records:
            pickle.dump(r, f)
    print(f"[+] Initialized '{filename}' with records: {records}\n")

def update_student_marks(filename, target_roll, new_marks):
    print("=" * 65)
    print(f"UPDATING RECORD: Roll {target_roll} -> New Marks: {new_marks}")
    print("=" * 65)
    
    temp_filename = "temp_" + filename
    found = False
    
    # Step 1 & 2: Process through temporary staging file
    with open(filename, "rb") as fin, open(temp_filename, "wb") as fout:
        try:
            while True:
                rec = pickle.load(fin)
                if rec["roll"] == target_roll:
                    old_marks = rec["marks"]
                    rec["marks"] = new_marks
                    found = True
                    print(f"[+] Updated Roll {target_roll} ({rec['name']}): {old_marks} -> {new_marks}")
                # Dump every record (modified or unmodified) to temp file
                pickle.dump(rec, fout)
        except EOFError:
            pass
            
    # Step 3: Atomic file replacement OUTSIDE with block
    if found:
        os.remove(filename)
        os.rename(temp_filename, filename)
        print(f"[+] Database '{filename}' updated successfully!")
    else:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        print(f"[-] Record with Roll {target_roll} not found. No changes made.")

def display_database(filename):
    print("\n[*] CURRENT DATABASE CONTENTS:")
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                print(f"    Roll {rec['roll']} | {rec['name']:<10} | Marks: {rec['marks']}")
        except EOFError:
            pass

if __name__ == "__main__":
    db = "students_update.dat"
    setup_update_database(db)
    display_database(db)
    
    # Successful update
    update_student_marks(db, 102, 95.0)
    display_database(db)
    
    # Attempt update on missing record
    update_student_marks(db, 999, 100.0)
