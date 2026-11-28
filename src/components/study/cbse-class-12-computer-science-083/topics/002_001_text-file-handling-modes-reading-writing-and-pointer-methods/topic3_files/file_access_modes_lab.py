"""
CBSE Class XII Computer Science (Code 083)
Topic 3: File Access Modes Mechanics - 'r', 'w', 'a', 'r+', 'w+', 'a+'
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import os

def demo_modes():
    filename = "modes_lab.txt"
    
    print("=" * 65)
    print("1. DEMONSTRATING MODE 'w' (CREATION & TRUNCATION)")
    print("=" * 65)
    with open(filename, "w", encoding="utf-8") as f:
        f.write("Initial Line: Hello World\n")
    print(f"[+] Written via 'w'. Size: {os.path.getsize(filename)} bytes.")

    print("\n" + "=" * 65)
    print("2. DEMONSTRATING MODE 'a' (APPENDING AT END)")
    print("=" * 65)
    with open(filename, "a", encoding="utf-8") as f:
        f.write("Appended Line: Mamata from Barrackpore\n")
    print(f"[+] Appended via 'a'. Size: {os.path.getsize(filename)} bytes.")

    print("\n" + "=" * 65)
    print("3. DEMONSTRATING MODE 'r' (READ-ONLY)")
    print("=" * 65)
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
        print("[Content Read from 'r']:\n" + content)

    print("=" * 65)
    print("4. DEMONSTRATING MODE 'r+' (READ + WRITE IN-PLACE OVERWRITE)")
    print("=" * 65)
    with open(filename, "r+", encoding="utf-8") as f:
        # File pointer starts at 0; overwrite first 7 chars
        f.write("UPDATED")
    with open(filename, "r", encoding="utf-8") as f:
        print("[Content after 'r+' overwrite at byte 0]:\n" + f.read())

if __name__ == "__main__":
    demo_modes()
