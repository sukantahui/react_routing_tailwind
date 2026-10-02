"""
================================================================================
Topic 11 - Example 2: File Size Measurement and Skipping Metadata Banners
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Moving cursor to EOF with f.seek(0, 2) and capturing f.tell() measures exact file size.
2. Skipping structured header lines by advancing the pointer before processing rows.
3. Restoring pointer position to offset 0 or any saved bookmark offset.
"""

import os

def demonstrate_filesize_and_skipping():
    filename = "kolkata_hub_export.csv"
    
    # 1. Create file with 3 lines of metadata header + student rows
    content = """# CODER & ACCOTAX EXPORT FORMAT v2.4
# Timestamp: 2026-10-02 10:00:00 IST
# Location: Barrackpore Central Hub
ID,Name,Center,Course,Fee
101,Mamata,Barrackpore,Python Masterclass,4500
102,Debangshu,Jadavpur,Data Analytics,5200
103,Susmita,Kolkata,Full Stack Python,6000
"""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"[*] Generated CSV export with header metadata: '{filename}'")

    # 2. Measure exact file size using seek(0, os.SEEK_END) in binary mode
    with open(filename, "rb") as f:
        f.seek(0, os.SEEK_END)
        total_bytes = f.tell()
        print(f"\n[+] Measured Total File Size: {total_bytes} bytes")
        
        # Reset back to start
        f.seek(0)
        print(f"[+] Pointer reset to offset {f.tell()} for reading.")

    # 3. Skip 3 comment lines and process only student records
    print("\n--- Processing Data Rows after Skipping 3 Header Lines ---")
    with open(filename, "r", encoding="utf-8") as f:
        # Skip comments
        while True:
            bookmark = f.tell()
            line = f.readline()
            if not line.startswith("#"):
                # Rewind 1 line back to the column header
                f.seek(bookmark)
                break
                
        data_start_offset = f.tell()
        print(f"[+] Data section starts at byte offset: {data_start_offset}")
        
        header_cols = f.readline().strip().split(",")
        print(f"[+] CSV Columns: {header_cols}")
        
        print("\nStudent Records:")
        for line in f:
            row = line.strip().split(",")
            print(f"    - ID: {row[0]} | Name: {row[1]:<10} | Center: {row[2]:<12} | Fee: Rs.{row[4]}")

if __name__ == "__main__":
    demonstrate_filesize_and_skipping()
