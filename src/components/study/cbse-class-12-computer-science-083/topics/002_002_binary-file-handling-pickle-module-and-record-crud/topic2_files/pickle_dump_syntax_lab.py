"""
CBSE Class XII Computer Science (Code 083)
Topic 2: Writing Binary Records via pickle.dump() Laboratory
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def demo_dump_single_records(filename="students_batch.dat"):
    print("=" * 65)
    print("1. WRITING SEQUENTIAL RECORDS VIA pickle.dump() IN 'wb' MODE")
    print("=" * 65)
    
    records = [
        {"roll": 101, "name": "Mamata", "city": "Barrackpore", "marks": 96.5},
        {"roll": 102, "name": "Mahima", "city": "Shyamnagar", "marks": 94.0},
        {"roll": 103, "name": "Susmita", "city": "Ichapur", "marks": 95.5},
        {"roll": 104, "name": "Debangshu", "city": "Barrackpore", "marks": 92.0}
    ]
    
    with open(filename, "wb") as f:
        for rec in records:
            pickle.dump(rec, f)
            print(f"[+] Dumped record for: {rec['name']} (Roll {rec['roll']})")
            
    print(f"[+] Successfully wrote {len(records)} records. File size: {os.path.getsize(filename)} bytes.\n")

def demo_append_record(filename="students_batch.dat"):
    print("=" * 65)
    print("2. APPENDING A NEW RECORD IN 'ab' MODE")
    print("=" * 65)
    
    new_student = {"roll": 105, "name": "Swadeep", "city": "Naihati", "marks": 89.5}
    with open(filename, "ab") as f:
        pickle.dump(new_student, f)
        print(f"[+] Appended record: {new_student['name']} (Roll {new_student['roll']})")
        
    print(f"[+] Updated file size: {os.path.getsize(filename)} bytes.\n")

if __name__ == "__main__":
    demo_dump_single_records()
    demo_append_record()
