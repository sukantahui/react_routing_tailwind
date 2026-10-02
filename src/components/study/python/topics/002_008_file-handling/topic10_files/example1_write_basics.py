"""
================================================================================
Topic 10 - Example 1: write() Basics & Character Counting
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Core Concepts Demonstrated:
1. Opening a file in 'w' mode (Creates a new file or overwrites existing content).
2. Explicit '\\n' newline management (f.write does NOT add newlines automatically).
3. Capturing the integer character count returned by f.write().
4. Converting numbers to strings using f-strings before writing.
"""

def simple_write_basics_demo():
    filename = "student_records.txt"
    
    print(f"[*] Step 1: Opening '{filename}' in write mode ('w')...")
    
    # Using 'with open' guarantees the file is automatically saved & closed
    with open(filename, mode="w", encoding="utf-8") as f:
        
        # 1. Write the title line and capture character count
        count1 = f.write("=== CODER & ACCOTAX - BARRACKPORE ===\n")
        print(f"    Line 1 written -> {count1} characters")
        
        # 2. Write student records with explicit '\n'
        # Notice: fee must be converted to string (f-strings handle this smoothly)
        student_name = "Mamata"
        course = "Python Masterclass"
        fee_paid = 4500
        
        line_student1 = f"Student: {student_name} | Course: {course} | Fee: Rs.{fee_paid}\n"
        count2 = f.write(line_student1)
        print(f"    Line 2 written -> {count2} characters")
        
        # 3. Write another student line
        line_student2 = "Student: Debangshu | Course: Data Science | Fee: Rs.5200\n"
        count3 = f.write(line_student2)
        print(f"    Line 3 written -> {count3} characters")
        
        # Total characters calculated from return values
        total_chars_written = count1 + count2 + count3
        print(f"\n[OK] Total characters written to stream: {total_chars_written}")

    # Step 2: Read back from the disk to verify what was saved
    print(f"\n[*] Step 2: Reading back '{filename}' to verify file on disk:")
    print("-" * 50)
    with open(filename, mode="r", encoding="utf-8") as f:
        saved_content = f.read()
        print(saved_content, end="")
    print("-" * 50)


if __name__ == "__main__":
    simple_write_basics_demo()
