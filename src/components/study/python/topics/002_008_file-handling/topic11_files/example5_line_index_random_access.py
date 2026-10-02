"""
================================================================================
Topic 11 - Example 5: Building a Fast Byte Offset Index for O(1) Random Access
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Sequentially scanning a 1GB file to find line #50,000 is slow (O(N)).
2. An in-memory index table of byte offsets maps {line_number: byte_offset}.
3. Using f.seek(offset) provides instant O(1) random line access.
"""

def demonstrate_line_indexing():
    filename = "large_student_directory.txt"
    
    # 1. Generate 10 sample student lines
    sample_names = ["Mamata", "Debangshu", "Susmita", "Mahima", "Abhronila", 
                    "Rohan", "Ananya", "Sourav", "Priyanka", "Tanmoy"]
    
    with open(filename, "w", encoding="utf-8") as f:
        for idx, name in enumerate(sample_names, start=1):
            f.write(f"Record {idx:02d}: Name={name:<10} | Center=Barrackpore Hub | Registered=YES\n")
            
    print(f"[*] Generated dataset with {len(sample_names)} lines.")

    # 2. Build the Byte Offset Index Table in Pass 1
    line_offset_index = {}
    with open(filename, "r", encoding="utf-8") as f:
        line_num = 1
        while True:
            offset = f.tell()
            line = f.readline()
            if not line:
                break
            line_offset_index[line_num] = offset
            line_num += 1
            
    print(f"[+] Index Table generated ({len(line_offset_index)} entries):")
    for l_num in [1, 3, 5, 8, 10]:
        print(f"    Line {l_num:02d} -> Byte Offset {line_offset_index[l_num]}")

    # 3. Direct O(1) Random Line Jumps
    print("\n--- Instant Direct Access Demonstrations ---")
    with open(filename, "r", encoding="utf-8") as f:
        # Jump directly to line 5 (Mahima)
        target_line = 5
        f.seek(line_offset_index[target_line])
        print(f"[+] Jumped to Line {target_line}: {f.readline().strip()}")
        
        # Jump directly to line 2 (Debangshu)
        target_line = 2
        f.seek(line_offset_index[target_line])
        print(f"[+] Jumped to Line {target_line}: {f.readline().strip()}")
        
        # Jump directly to line 9 (Priyanka)
        target_line = 9
        f.seek(line_offset_index[target_line])
        print(f"[+] Jumped to Line {target_line}: {f.readline().strip()}")

if __name__ == "__main__":
    demonstrate_line_indexing()
