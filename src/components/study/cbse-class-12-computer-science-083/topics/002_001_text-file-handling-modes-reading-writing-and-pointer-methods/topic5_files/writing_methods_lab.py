"""
CBSE Class XII Computer Science (Code 083)
Topic 5: Text File Writing Demonstration - write() vs writelines()
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def demo_writing_methods():
    filename = "barrackpore_batch.txt"
    
    print("=" * 65)
    print("1. DEMONSTRATING f.write() WITH EXPLICIT NEWLINES")
    print("=" * 65)
    with open(filename, "w", encoding="utf-8") as f:
        # write returns character count
        c1 = f.write("Student 1: Mamata (Barrackpore)\n")
        c2 = f.write("Student 2: Mahima (Shyamnagar)\n")
        print(f"[+] Written line 1 ({c1} chars) and line 2 ({c2} chars).")
        
        # Writing numeric data requires str() conversion
        roll_no = 101
        score = 98.5
        f.write(f"Record: Roll {roll_no} -> Marks {score}\n")

    print("\n" + "=" * 65)
    print("2. DEMONSTRATING f.writelines() COMMON TRAP VS FIX")
    print("=" * 65)
    bad_list = ["Alpha", "Beta", "Gamma"]
    good_list = ["Alpha\n", "Beta\n", "Gamma\n"]
    
    trap_file = "trap_demo.txt"
    with open(trap_file, "w", encoding="utf-8") as f:
        f.writelines(bad_list)
    print(f"[*] Trap file output (no newlines): {open(trap_file).read()}")
    
    fixed_file = "fixed_demo.txt"
    with open(fixed_file, "w", encoding="utf-8") as f:
        f.writelines(good_list)
    print("[*] Fixed file output (with newlines):")
    print(open(fixed_file).read())

    print("=" * 65)
    print("3. WRITING VIA print(..., file=f)")
    print("=" * 65)
    with open("print_demo.txt", "w", encoding="utf-8") as f:
        # print automatically converts types and appends newline
        print("Debangshu", 94, "Computer Science", file=f)
        print("Susmita", 96, "Computer Science", file=f)
    print("[+] Output from print(file=f):")
    print(open("print_demo.txt").read())

if __name__ == "__main__":
    demo_writing_methods()
