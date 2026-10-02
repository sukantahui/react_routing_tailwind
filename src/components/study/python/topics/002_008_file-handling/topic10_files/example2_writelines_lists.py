"""
Topic 10 - Example 2: Batch Writing with writelines() & Generator Expressions
Module: 002_008_file-handling
Institute: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui

Key Concepts Covered:
1. file.writelines(iterable) takes any iterable of strings (list, tuple, generator).
2. writelines() returns None (unlike write() which returns character count).
3. The "No Automatic Newline" Gotcha: writelines() does NOT add '\n' between items!
4. Using List Comprehensions and Generator Expressions to format lines efficiently.
5. Memory efficiency: writing large collections with generators vs storing all in RAM.
"""

def batch_write_student_roster():
    filename = "kolkata_batch_roster.txt"
    
    # Raw data lists
    student_names = ["Mamata", "Debangshu", "Susmita", "Mahima", "Abhronila"]
    centers = ["Barrackpore", "Jadavpur", "Kolkata", "Ichapur", "Shyamnagar"]
    grades = ["Grade A+", "Grade A+", "Grade A", "Grade A+", "Grade A"]
    
    print(f"[*] Preparing batch writing with writelines() to '{filename}'...")
    
    # -------------------------------------------------------------
    # 1. THE COMMON MISTAKE: Passing raw list without newlines
    # If we pass ["Mamata", "Debangshu", "Susmita"], it writes: "MamataDebangshuSusmita"
    # -------------------------------------------------------------
    
    # CORRECT WAY 1: Pre-formatting lines using List Comprehension with '\n'
    formatted_lines = [
        f"ID: 2026-WB-{i+1:03d} | Student: {name:<12} | Hub: {center:<12} | Result: {grade}\n"
        for i, (name, center, grade) in enumerate(zip(student_names, centers, grades))
    ]
    
    # Writing to file using writelines()
    with open(filename, mode="w", encoding="utf-8") as file:
        file.write("=== CODER & ACCOTAX - BATCH MERIT ROSTER ===\n\n")
        
        # writelines() writes all items in sequence in a single call
        result = file.writelines(formatted_lines)
        print(f"    [+] writelines() executed. Return value: {result} (Always None in Python)")
        
        file.write("\n=== Additional Generated Notes ===\n")
        
        # CORRECT WAY 2: Using a Memory-Efficient Generator Expression
        # Perfect for writing thousands of rows without allocating huge intermediate lists in memory!
        def log_generator(count):
            for n in range(1, count + 1):
                yield f"[AUDIT LOG {n}] Verified student record #{n} at {centers[(n-1)%len(centers)]}\n"
                
        file.writelines(log_generator(5))

    print(f"\n[✓] Roster written successfully to '{filename}'!")
    
    # Verification
    print("\n--- Reading Created File ---")
    with open(filename, mode="r", encoding="utf-8") as file:
        print(file.read())

if __name__ == "__main__":
    batch_write_student_roster()
