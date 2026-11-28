"""
CBSE Class XII Computer Science (Code 083)
Topic 4: Binary Access Modes Laboratory - 'rb', 'wb', 'ab', 'rb+'
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import pickle
import os

def demo_binary_modes():
    filename = "binary_modes_demo.dat"
    
    print("=" * 65)
    print("1. DEMONSTRATING 'wb' (CREATION & INITIAL DUMP)")
    print("=" * 65)
    with open(filename, "wb") as f:
        pickle.dump({"roll": 101, "name": "Mamata", "marks": 96.0}, f)
    print(f"[+] Written via 'wb'. File size: {os.path.getsize(filename)} bytes.")

    print("\n" + "=" * 65)
    print("2. DEMONSTRATING 'ab' (APPENDING WITHOUT TRUNCATION)")
    print("=" * 65)
    with open(filename, "ab") as f:
        pickle.dump({"roll": 102, "name": "Mahima", "marks": 94.5}, f)
    print(f"[+] Appended via 'ab'. File size: {os.path.getsize(filename)} bytes.")

    print("\n" + "=" * 65)
    print("3. DEMONSTRATING 'rb' (READ-ONLY TRAVERSAL)")
    print("=" * 65)
    with open(filename, "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                print(f"  Record: Roll {rec['roll']} | {rec['name']} | Marks: {rec['marks']}")
        except EOFError:
            print("[+] Finished reading via 'rb'.")

    print("\n" + "=" * 65)
    print("4. DEMONSTRATING 'rb+' (IN-PLACE REWRITE & SEEK)")
    print("=" * 65)
    with open(filename, "rb+") as f:
        # Seek back to start and overwrite first record with updated marks
        f.seek(0)
        updated_rec = {"roll": 101, "name": "Mamata", "marks": 99.0}
        pickle.dump(updated_rec, f)
        print("[+] First record overwritten in-place with 99.0 marks.")

if __name__ == "__main__":
    demo_binary_modes()
