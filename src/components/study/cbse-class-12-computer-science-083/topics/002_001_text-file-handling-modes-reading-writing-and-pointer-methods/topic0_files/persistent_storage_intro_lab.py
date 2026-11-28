"""
CBSE Class XII Computer Science (Code 083)
Topic 0: Persistent Storage Mechanics & Volatile RAM Demonstration
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import os
import sys

def demonstrate_volatility():
    print("=" * 65)
    print("DEMONSTRATION 1: VOLATILITY OF RAM VARIABLES")
    print("=" * 65)
    
    # In-memory variable residing in volatile RAM
    session_data = ["Mamata", "Mahima", "Abhronila", "Susmita"]
    print(f"[RAM State] Current volatile list: {session_data}")
    print("Note: If Python exits now, session_data is wiped from memory.\n")

def demonstrate_persistence(filename="student_ledger.txt"):
    print("=" * 65)
    print("DEMONSTRATION 2: PERSISTENCE VIA SECONDARY STORAGE FILE")
    print("=" * 65)
    
    records = [
        "Roll 101 | Debangshu | 94.5%\n",
        "Roll 102 | Sachin    | 91.0%\n",
        "Roll 103 | Swadeep   | 88.5%\n",
        "Roll 104 | Tuhina    | 96.0%\n"
    ]
    
    # Writing to persistent secondary storage
    print(f"[*] Writing {len(records)} records to secondary storage file '{filename}'...")
    with open(filename, "w", encoding="utf-8") as f:
        f.writelines(records)
    print(f"[+] File '{filename}' successfully committed to disk.")
    
    # Verifying file existence on disk
    if os.path.exists(filename):
        size_bytes = os.path.getsize(filename)
        print(f"[+] Verified file on disk. Physical size: {size_bytes} bytes.\n")
        
    # Reading back the persistent data in a new logical context
    print("[*] Re-reading persisted data from disk:")
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
        print(content)

if __name__ == "__main__":
    demonstrate_volatility()
    demonstrate_persistence()
