"""
================================================================================
Topic 11 - Example 1: Basic File Pointer Mechanics with tell() & seek(0)
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Every opened file maintain an internal cursor / byte offset.
2. file.tell() returns the current zero-based byte position.
3. file.seek(0) rewinds the cursor back to the start of the file.
4. Consecutive read() or readline() calls advance the pointer forward.
"""

def demonstrate_pointer_basics():
    filename = "admission_records.txt"
    
    # Step 1: Create a sample file with student records
    with open(filename, "w", encoding="utf-8") as f:
        f.write("Mamata,Python Masterclass,4500\n")
        f.write("Debangshu,Data Analytics,5200\n")
        f.write("Susmita,Full Stack Python,6000\n")
    print(f"[*] Sample file '{filename}' created.")

    # Step 2: Open and inspect pointer motion
    print("\n--- Inspecting File Pointer Cursor with tell() & seek() ---")
    with open(filename, "r", encoding="utf-8") as f:
        print(f"1. Initial pointer position: {f.tell()} (Offset 0 = Start of File)")
        
        # Read first line
        line1 = f.readline()
        print(f"2. Read Line 1: '{line1.strip()}'")
        print(f"   -> Pointer position after Line 1: {f.tell()} bytes")
        
        # Read second line
        line2 = f.readline()
        print(f"3. Read Line 2: '{line2.strip()}'")
        print(f"   -> Pointer position after Line 2: {f.tell()} bytes")
        
        # Rewind to start using seek(0)
        print("\n[*] Calling f.seek(0) to rewind pointer...")
        f.seek(0)
        print(f"4. Pointer position after f.seek(0): {f.tell()} bytes")
        
        # Re-read line 1 to prove rewind
        line1_again = f.readline()
        print(f"5. Re-reading line from offset 0: '{line1_again.strip()}'")

if __name__ == "__main__":
    demonstrate_pointer_basics()
