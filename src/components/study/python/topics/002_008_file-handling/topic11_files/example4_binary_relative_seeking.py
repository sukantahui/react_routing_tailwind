"""
================================================================================
Topic 11 - Example 4: Binary Mode Relative Seeking (whence=1 and whence=2)
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. In text mode ('r'), seek() only allows relative offsets when offset is 0.
2. In binary mode ('rb', 'rb+'), full byte arithmetic is supported:
   - whence = 0 (os.SEEK_SET): Absolute from start.
   - whence = 1 (os.SEEK_CUR): Relative forward (+) or backward (-) from current position.
   - whence = 2 (os.SEEK_END): Relative backwards (-) from end of file.
"""

import os
import struct

def demonstrate_binary_seeking():
    filename = "student_records.dat"
    
    # 1. Structure: 3 binary student records (4-byte ID, 12-byte Name, 4-byte Fee)
    # Total record size = 20 bytes
    RECORD_FORMAT = ">i12si"  # Big-endian: integer, 12-char string, integer
    RECORD_SIZE = struct.calcsize(RECORD_FORMAT)
    
    students = [
        (101, b"Mamata      ", 4500),
        (102, b"Debangshu   ", 5200),
        (103, b"Susmita     ", 6000),
        (104, b"Mahima      ", 5500)
    ]
    
    with open(filename, "wb") as f:
        for st in students:
            f.write(struct.pack(RECORD_FORMAT, *st))
            
    print(f"[*] Created binary file with 4 records ({4 * RECORD_SIZE} bytes total).")

    with open(filename, "rb") as f:
        # Seek whence=0 (Absolute): Read Record 0
        f.seek(0, os.SEEK_SET)
        r0 = struct.unpack(RECORD_FORMAT, f.read(RECORD_SIZE))
        print(f"\n[+] Read Record 0 at offset 0: ID={r0[0]}, Name={r0[1].decode().strip()}, Fee=Rs.{r0[2]}")
        print(f"    Current pointer: {f.tell()} bytes")
        
        # Seek whence=1 (Relative from current): Skip Record 1 to jump directly to Record 2
        # Current pointer is at byte 20. Skipping 20 bytes lands at byte 40 (Record 2).
        f.seek(RECORD_SIZE, os.SEEK_CUR)
        print(f"[+] After relative seek(+{RECORD_SIZE}, SEEK_CUR), pointer at: {f.tell()} bytes")
        r2 = struct.unpack(RECORD_FORMAT, f.read(RECORD_SIZE))
        print(f"    Read Record 2: ID={r2[0]}, Name={r2[1].decode().strip()}, Fee=Rs.{r2[2]}")
        
        # Seek whence=2 (Relative from EOF): Read the very last record (Record 3)
        f.seek(-RECORD_SIZE, os.SEEK_END)
        print(f"\n[+] After seek(-{RECORD_SIZE}, SEEK_END), pointer at: {f.tell()} bytes")
        r3 = struct.unpack(RECORD_FORMAT, f.read(RECORD_SIZE))
        print(f"    Read Last Record (Mahima): ID={r3[0]}, Name={r3[1].decode().strip()}, Fee=Rs.{r3[2]}")

if __name__ == "__main__":
    demonstrate_binary_seeking()
