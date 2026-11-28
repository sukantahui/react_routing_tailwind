"""
CBSE Class XII Computer Science (Code 083)
Topic 8: Binary Record Deletion Laboratory (Temporary File Pattern)
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def setup_delete_database(filename="students_delete.dat"):
    records = [
        {"roll": 101, "name": "Mamata", "marks": 96.0},
        {"roll": 102, "name": "Mahima", "marks": 94.0},
        {"roll": 103, "name": "Susmita", "marks": 95.5},
        {"roll": 104, "name": "Debangshu", "city": "Barrackpore", "marks": 92.0}
    ]
    with open(filename, "wb") as f:
        for r in records:
            pickle.dump(r, f)
    print(f"[+] Initialized '{filename}' with {len(records)} records.\n")

def delete_student_record(filename, target_roll):
    print("=" * 65)
    print(f"DELETING RECORD: Roll Number = {target_roll}")
    print("=" * 65)
    
    temp_filename = "temp_" + filename
    deleted = False
    
    with open(filename, "rb") as fin, open(temp_filename, "wb") as fout:
        try:
            while True:
                rec = pickle.load(fin)
                if rec["roll"] == target_roll:
                    deleted = True
                    print(f"[+] Omitting Roll {rec['roll']} ({rec['name']}) from new file...")
                else:
                    # Write all non-matching records to temp file
                    pickle.dump(rec, fout)
        except EOFError:
            pass
            
    # File replacement outside with block
    if deleted:
        os.remove(filename)
        os.rename(temp_filename, filename)
        print(f"[+] Record with Roll {target_roll} deleted successfully!")
    else:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        print(f"[-] Record with Roll {target_roll} not found. No records deleted.")

def display_records(filename):
    print("\n[*] CURRENT DATABASE RECORDS:")
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                print(f"    Roll {rec['roll']} | {rec['name']:<12} | Marks: {rec['marks']}")
        except EOFError:
            pass

if __name__ == "__main__":
    db = "students_delete.dat"
    setup_delete_database(db)
    display_records(db)
    
    # Delete student with Roll 102
    delete_student_record(db, 102)
    display_records(db)
    
    # Attempt delete on non-existent roll
    delete_student_record(db, 999)
