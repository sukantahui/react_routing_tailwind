"""
CBSE Class XII Computer Science (Code 083)
Topic 5: Complex Records Storage Laboratory - Lists of Dictionaries
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def demo_pattern_a_sequential_dumps(filename="students_seq.dat"):
    print("=" * 65)
    print("PATTERN A: SEQUENTIAL INDIVIDUAL DICTIONARY DUMPS")
    print("=" * 65)
    
    records = [
        {"roll": 101, "name": "Mamata", "marks": [96, 98, 92], "stream": "Science"},
        {"roll": 102, "name": "Mahima", "marks": [90, 94, 88], "stream": "Commerce"},
        {"roll": 103, "name": "Susmita", "marks": [95, 96, 97], "stream": "Science"}
    ]
    
    with open(filename, "wb") as f:
        for r in records:
            pickle.dump(r, f)
    print(f"[+] Dumped {len(records)} sequential records to '{filename}'.")
    
    print("[*] Reading back using try...except EOFError:")
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                avg = sum(rec["marks"]) / len(rec["marks"])
                print(f"  Roll {rec['roll']} | {rec['name']:<10} | Stream: {rec['stream']:<9} | Avg: {avg:.2f}%")
        except EOFError:
            pass

def demo_pattern_b_container_list(filename="students_container.dat"):
    print("\n" + "=" * 65)
    print("PATTERN B: CONTAINER LIST DUMP IN A SINGLE CALL")
    print("=" * 65)
    
    students_list = [
        {"roll": 201, "name": "Debangshu", "marks": 92.5, "stream": "Science"},
        {"roll": 202, "name": "Sachin", "marks": 89.0, "stream": "Humanities"},
        {"roll": 203, "name": "Swadeep", "marks": 95.0, "stream": "Science"}
    ]
    
    # Single dump call for the entire collection!
    with open(filename, "wb") as f:
        pickle.dump(students_list, f)
    print(f"[+] Dumped full container list to '{filename}'. Size: {os.path.getsize(filename)} bytes.")
    
    # Single load call retrieves the entire list!
    with open(filename, "rb") as f:
        loaded_list = pickle.load(f)
    print(f"[+] Retrieved list in ONE call. Type: {type(loaded_list)}, Total: {len(loaded_list)}")
    for s in loaded_list:
        print(f"  Loaded Student: {s['name']} (Roll {s['roll']}) -> {s['marks']}%")

if __name__ == "__main__":
    demo_pattern_a_sequential_dumps()
    demo_pattern_b_container_list()
