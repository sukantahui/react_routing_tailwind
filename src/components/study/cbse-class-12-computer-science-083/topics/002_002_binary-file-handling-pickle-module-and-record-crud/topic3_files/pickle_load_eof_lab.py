"""
CBSE Class XII Computer Science (Code 083)
Topic 3: Reading Binary Records and EOFError Handling Laboratory
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def setup_binary_data(filename="student_records.dat"):
    students = [
        {"roll": 1, "name": "Mamata", "city": "Barrackpore", "marks": 96.5},
        {"roll": 2, "name": "Mahima", "city": "Shyamnagar", "marks": 94.0},
        {"roll": 3, "name": "Susmita", "city": "Ichapur", "marks": 97.0},
        {"roll": 4, "name": "Debangshu", "city": "Barrackpore", "marks": 91.5}
    ]
    with open(filename, "wb") as f:
        for s in students:
            pickle.dump(s, f)
    print(f"[+] Prepared binary test file '{filename}' with {len(students)} records.\n")

def display_all_records(filename="student_records.dat"):
    print("=" * 65)
    print("READING ALL RECORDS VIA CANONICAL try...except EOFError PATTERN")
    print("=" * 65)
    
    record_count = 0
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                record_count += 1
                print(f"[{record_count}] Roll {rec['roll']:<3} | {rec['name']:<12} | {rec['city']:<14} | Marks: {rec['marks']}")
        except EOFError:
            print(f"\n[+] EOF reached cleanly. Successfully processed {record_count} records.")

def filter_top_students(filename="student_records.dat", threshold=95.0):
    print("\n" + "=" * 65)
    print(f"FILTERING RECORDS: Students scoring >= {threshold}%")
    print("=" * 65)
    
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                if rec["marks"] >= threshold:
                    print(f"  ★ Top Performer: {rec['name']} ({rec['marks']}%) from {rec['city']}")
        except EOFError:
            pass

if __name__ == "__main__":
    setup_binary_data()
    display_all_records()
    filter_top_students()
