"""
CBSE Class XII Computer Science (Code 083)
Topic 7: Safe Resource Management Laboratory - The 'with' Statement
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def demo_with_statement():
    filename = "with_demo.txt"
    
    print("=" * 65)
    print("1. WRITING USING THE 'with' CONTEXT MANAGER")
    print("=" * 65)
    with open(filename, "w", encoding="utf-8") as f:
        f.write("CBSE Class 12 CS (083) Practice File\n")
        f.write("Students: Mamata, Mahima, Susmita, Debangshu\n")
        print(f"[*] Inside with block: f.closed == {f.closed}") # False
        
    print(f"[+] Outside with block: f.closed == {f.closed}") # True!
    
    print("\n" + "=" * 65)
    print("2. GUARANTEED CLOSURE DURING EXCEPTIONS")
    print("=" * 65)
    file_ref = None
    try:
        with open(filename, "r", encoding="utf-8") as f:
            file_ref = f
            print(f"[*] File opened. Reading line: {f.readline().strip()}")
            print("[*] Triggering an intentional ZeroDivisionError...")
            crash = 10 / 0
    except ZeroDivisionError:
        print("[!] Exception caught safely outside with block.")
        
    print(f"[+] Verified: File closed despite crash? -> {file_ref.closed}") # True!

    print("\n" + "=" * 65)
    print("3. SIMULTANEOUS DUAL FILE CONTEXT MANAGERS")
    print("=" * 65)
    source = filename
    destination = "with_copy.txt"
    with open(source, "r", encoding="utf-8") as src, open(destination, "w", encoding="utf-8") as dst:
        for line in src:
            dst.write("COPY >> " + line)
    print(f"[+] Dual file copy completed: {destination}")

if __name__ == "__main__":
    demo_with_statement()
