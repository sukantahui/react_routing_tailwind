"""
================================================================================
Topic 11 - Example 3: In-Place File Updates with Mode 'r+' & seek()
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Mode 'r+' allows both Reading and Writing without wiping the file.
2. seek(offset) moves the write head to the exact byte position.
3. In-place writing overwrites existing bytes from that position forward.
4. Essential requirement: Field replacement lengths must match fixed offsets or padded buffers.
"""

def demonstrate_inplace_update():
    filename = "student_attendance_ledger.txt"
    
    # 1. Create fixed-width record ledger
    records = [
        "101 | Mamata    | STATUS: [PENDING ] | Barrackpore\n",
        "102 | Debangshu | STATUS: [PENDING ] | Jadavpur   \n",
        "103 | Susmita   | STATUS: [PENDING ] | Kolkata    \n"
    ]
    with open(filename, "w", encoding="utf-8") as f:
        f.writelines(records)
        
    print(f"[*] Initial ledger created at '{filename}':")
    with open(filename, "r", encoding="utf-8") as f:
        print(f.read())

    # 2. In-place update: Change Mamata's status to 'APPROVED' and Debangshu's to 'REJECTED'
    print("\n[*] Updating Mamata (ID 101) & Debangshu (ID 102) in-place...")
    with open(filename, "r+", encoding="utf-8") as f:
        # Mamata's status tag is located at offset 26
        # Find offset of Mamata's line
        f.seek(0)
        line1 = f.readline()
        status_offset_1 = line1.index("PENDING ")
        
        # Seek to exact position and overwrite with 8-character string
        f.seek(status_offset_1)
        f.write("APPROVED")
        print(f"    -> Updated Mamata status at offset {status_offset_1} to 'APPROVED'")
        
        # Move to line 2 for Debangshu
        line2_start = f.tell() # Start of line 2
        f.seek(0)
        f.readline() # pass line 1
        pos_line2 = f.tell()
        line2 = f.readline()
        status_offset_2 = pos_line2 + line2.index("PENDING ")
        
        f.seek(status_offset_2)
        f.write("REJECTED")
        print(f"    -> Updated Debangshu status at offset {status_offset_2} to 'REJECTED'")

    # 3. Verify final ledger from disk
    print("\n--- Final Ledger on Disk After In-Place Update ---")
    with open(filename, "r", encoding="utf-8") as f:
        print(f.read())

if __name__ == "__main__":
    demonstrate_inplace_update()
