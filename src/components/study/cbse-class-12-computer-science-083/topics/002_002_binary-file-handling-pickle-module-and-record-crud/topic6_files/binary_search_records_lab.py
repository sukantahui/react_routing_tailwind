"""
CBSE Class XII Computer Science (Code 083)
Topic 6: Binary Record Search Laboratory (Unique & Non-Unique Keys)
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def setup_search_database(filename="students_search.dat"):
    records = [
        {"roll": 101, "name": "Mamata", "city": "Barrackpore", "marks": 96.5},
        {"roll": 102, "name": "Mahima", "city": "Shyamnagar", "marks": 94.0},
        {"roll": 103, "name": "Susmita", "city": "Ichapur", "marks": 97.0},
        {"roll": 104, "name": "Debangshu", "city": "Barrackpore", "marks": 91.5},
        {"roll": 105, "name": "Sachin", "city": "Barrackpore", "marks": 89.0}
    ]
    with open(filename, "wb") as f:
        for r in records:
            pickle.dump(r, f)
    print(f"[+] Database initialized with {len(records)} student records.\n")

def search_unique_roll(filename, target_roll):
    print("=" * 65)
    print(f"SEARCH 1: UNIQUE KEY SEARCH (Roll Number = {target_roll})")
    print("=" * 65)
    found = False
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                if rec["roll"] == target_roll:
                    print(f"[+] MATCH FOUND: Roll {rec['roll']} -> {rec['name']} from {rec['city']} (Marks: {rec['marks']})")
                    found = True
                    break # Unique key, stop searching!
        except EOFError:
            pass
            
    if not found:
        print(f"[-] Record with Roll {target_roll} not found in database.")

def search_non_unique_city(filename, target_city):
    print("\n" + "=" * 65)
    print(f"SEARCH 2: NON-UNIQUE QUERY (Students from '{target_city}')")
    print("=" * 65)
    matches = 0
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                if rec["city"].lower() == target_city.lower():
                    matches += 1
                    print(f"  [{matches}] Roll {rec['roll']} | {rec['name']:<12} | Marks: {rec['marks']}")
        except EOFError:
            pass
            
    if matches == 0:
        print(f"[-] No students found from {target_city}.")
    else:
        print(f"[+] Total students found from {target_city}: {matches}")

if __name__ == "__main__":
    db = "students_search.dat"
    setup_search_database(db)
    search_unique_roll(db, 103) # Found
    search_unique_roll(db, 999) # Not found
    search_non_unique_city(db, "Barrackpore") # Multiple matches
