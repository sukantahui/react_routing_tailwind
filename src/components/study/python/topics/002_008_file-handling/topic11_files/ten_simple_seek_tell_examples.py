"""
================================================================================
10 SIMPLE FILE POINTER MANIPULATION EXAMPLES IN PYTHON: tell() & seek()
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

import os
import struct

# ==============================================================================
# EXAMPLE 1: tell() Basics & Rewinding to Start with seek(0)
# ==============================================================================
def example_1_tell_and_rewind():
    """Demonstrates checking pointer position and rewinding to re-read."""
    with open("demo_ex1.txt", "w", encoding="utf-8") as f:
        f.write("Line 1: Mamata (Barrackpore)\nLine 2: Debangshu (Jadavpur)\n")

    with open("demo_ex1.txt", "r", encoding="utf-8") as f:
        print("[Ex 1] Initial pointer position:", f.tell())  # Position 0
        line1 = f.readline()
        print(f"[Ex 1] Read Line 1: {line1.strip()} | Pointer now at:", f.tell())
        
        # Rewind back to offset 0 (start of file)
        f.seek(0)
        print("[Ex 1] After f.seek(0), pointer reset to:", f.tell())
        line1_again = f.readline()
        print(f"[Ex 1] Re-read after rewind: {line1_again.strip()}")


# ==============================================================================
# EXAMPLE 2: Measuring Exact File Size using seek(0, 2) & tell()
# ==============================================================================
def example_2_measure_filesize():
    """Moves pointer to EOF (whence=2) to get total byte size, then restores pointer."""
    with open("demo_ex2.txt", "w", encoding="utf-8") as f:
        f.write("Coder & AccoTax - Python Training Hub at Barrackpore\nFee: Rs.4500\n")

    with open("demo_ex2.txt", "rb") as f:
        # Move pointer 0 bytes from the END of the file (os.SEEK_END = 2)
        f.seek(0, os.SEEK_END)
        file_size_bytes = f.tell()
        print(f"[Ex 2] Exact file size calculated via pointer: {file_size_bytes} bytes")
        
        # Restore pointer to start
        f.seek(0)
        print("[Ex 2] Pointer restored to offset:", f.tell())


# ==============================================================================
# EXAMPLE 3: Skipping File Header / Metadata Banner
# ==============================================================================
def example_3_skip_header():
    """Skips past the header metadata block directly to the data records."""
    content = """### HEADER METADATA START ###
Author: Sukanta Hui
Institute: Coder & AccoTax
### HEADER METADATA END ###
101,Mamata,Barrackpore,4500
102,Debangshu,Jadavpur,5200
"""
    with open("demo_ex3.txt", "w", encoding="utf-8") as f:
        f.write(content)

    with open("demo_ex3.txt", "r", encoding="utf-8") as f:
        # Seek past 4 header lines by reading them
        for _ in range(4):
            f.readline()
        data_start_offset = f.tell()
        print(f"[Ex 3] Header skipped. Data rows start at byte offset: {data_start_offset}")
        
        # Now read data directly
        first_data_line = f.readline()
        print(f"[Ex 3] First data row: {first_data_line.strip()}")


# ==============================================================================
# EXAMPLE 4: In-Place File Update using Mode 'r+'
# ==============================================================================
def example_4_inplace_update():
    """Overwrites specific bytes in an existing file without rewriting the entire file."""
    with open("demo_ex4.txt", "w", encoding="utf-8") as f:
        f.write("STATUS: [PENDING ] | Student: Mamata | Center: Barrackpore\n")

    # Open in 'r+' mode (Read and Write in-place)
    with open("demo_ex4.txt", "r+", encoding="utf-8") as f:
        # Seek directly to byte 9 (where 'PENDING ' is located)
        f.seek(9)
        f.write("APPROVED")
        
    with open("demo_ex4.txt", "r", encoding="utf-8") as f:
        print("[Ex 4] In-place updated content:\n", f.read().strip())


# ==============================================================================
# EXAMPLE 5: Multi-Pass Processing on a Single File Descriptor
# ==============================================================================
def example_5_multipass_reading():
    """Performs 2 analytical passes (Count & Average) without re-opening the file."""
    scores = "Mamata,95\nDebangshu,90\nSusmita,98\nMahima,92\n"
    with open("demo_ex5.txt", "w", encoding="utf-8") as f:
        f.write(scores)

    with open("demo_ex5.txt", "r", encoding="utf-8") as f:
        # Pass 1: Count students
        total_students = sum(1 for _ in f)
        print(f"[Ex 5] Pass 1 completed: {total_students} students found.")
        
        # Rewind pointer for Pass 2
        f.seek(0)
        
        # Pass 2: Calculate average marks
        total_marks = 0
        for line in f:
            name, mark_str = line.strip().split(",")
            total_marks += int(mark_str)
            
        avg = total_marks / total_students
        print(f"[Ex 5] Pass 2 completed: Average Score = {avg:.1f}%")


# ==============================================================================
# EXAMPLE 6: Binary Mode Relative Seeking (whence=1, os.SEEK_CUR)
# ==============================================================================
def example_6_binary_relative_seeking():
    """In binary mode ('rb'), relative offsets from current position are valid."""
    raw_bytes = b"HEADER_16_BYTES_RECORD_001_DATA_RECORD_002_DATA_"
    with open("demo_ex6.bin", "wb") as f:
        f.write(raw_bytes)

    with open("demo_ex6.bin", "rb") as f:
        # Skip 16-byte header
        f.seek(16, os.SEEK_SET)
        print("[Ex 6] After skipping header, pointer at:", f.tell())
        
        # Read Record 1 (16 bytes)
        rec1 = f.read(16)
        print("[Ex 6] Read Record 1:", rec1)
        
        # Relative seek: Skip 4 bytes forward from current pointer (whence=1)
        f.seek(4, os.SEEK_CUR)
        print("[Ex 6] After seeking +4 bytes from current, pointer at:", f.tell())


# ==============================================================================
# EXAMPLE 7: Reading the Last N Bytes from EOF (whence=2, os.SEEK_END)
# ==============================================================================
def example_7_read_from_eof():
    """Seeks backwards from end of file in binary mode to fetch the latest log entry."""
    with open("demo_ex7.log", "w", encoding="utf-8") as f:
        f.write("09:00 - Server Started\n09:15 - User Logged In\n09:30 - CRITICAL ALERT ERROR 500\n")

    with open("demo_ex7.log", "rb") as f:
        # Seek 30 bytes before EOF (negative offset with whence=2)
        f.seek(-30, os.SEEK_END)
        last_bytes = f.read()
        print("[Ex 7] Last 30 bytes of log:\n", last_bytes.decode("utf-8").strip())


# ==============================================================================
# EXAMPLE 8: Building a Byte Offset Index for O(1) Fast Line Jumping
# ==============================================================================
def example_8_byte_offset_indexing():
    """Builds a lookup dictionary of line offsets for instant random access."""
    data = ["Line 0: Header\n", "Line 1: Mamata Data\n", "Line 2: Debangshu Data\n", "Line 3: Susmita Data\n"]
    with open("demo_ex8.txt", "w", encoding="utf-8") as f:
        f.writelines(data)

    line_index = {}
    with open("demo_ex8.txt", "r", encoding="utf-8") as f:
        # Build index table
        while True:
            pos = f.tell()
            line = f.readline()
            if not line:
                break
            line_idx = len(line_index)
            line_index[line_idx] = pos

    print("[Ex 8] Generated Line Offset Index:", line_index)
    
    # Jump directly to Line 2 without reading Line 0 or 1
    with open("demo_ex8.txt", "r", encoding="utf-8") as f:
        f.seek(line_index[2])
        print(f"[Ex 8] Direct jump to Line 2 (Offset {line_index[2]}):", f.readline().strip())


# ==============================================================================
# EXAMPLE 9: UTF-8 Multi-Byte Pitfall & Safe tell()/seek() Pattern
# ==============================================================================
def example_9_unicode_multibyte_gotcha():
    """Shows that in UTF-8, characters take multiple bytes. Seeking mid-character breaks encoding."""
    # Unicode text: 'Namaste' with an Indian Rupee symbol 'Rs.' / '₹' (3 bytes in UTF-8)
    sample_text = "Student: Mamata | Fee: ₹4500"
    with open("demo_ex9.txt", "w", encoding="utf-8") as f:
        f.write(sample_text)

    with open("demo_ex9.txt", "rb") as f:
        raw_bytes = f.read()
        print(f"[Ex 9] String character count = {len(sample_text)}, UTF-8 Byte count = {len(raw_bytes)}")

    with open("demo_ex9.txt", "r", encoding="utf-8") as f:
        # Safe practice in text mode: only use offsets returned by tell() or 0
        pos_before = f.tell()
        first_segment = f.read(17) # Reads "Student: Mamata |"
        pos_after = f.tell()
        print(f"[Ex 9] Read 17 chars: '{first_segment}' -> Pointer offset moved from {pos_before} to {pos_after}")


# ==============================================================================
# EXAMPLE 10: Fixed-Width Binary Record Random Access Engine
# ==============================================================================
def example_10_fixed_width_binary_records():
    """Directly accesses student record #2 using arithmetic: seek(record_id * RECORD_SIZE)."""
    # Struct: ID (int: 4 bytes), Name (string: 10 bytes), Score (int: 4 bytes) -> Total 18 bytes
    RECORD_FORMAT = "i10si"
    RECORD_SIZE = struct.calcsize(RECORD_FORMAT)

    students = [
        (101, b"Mamata    ", 96),
        (102, b"Debangshu ", 94),
        (103, b"Susmita   ", 98)
    ]

    with open("demo_ex10.bin", "wb") as f:
        for st in students:
            f.write(struct.pack(RECORD_FORMAT, *st))

    # Instant access to Student index 1 (Debangshu) without reading Student 0
    target_index = 1
    with open("demo_ex10.bin", "rb") as f:
        f.seek(target_index * RECORD_SIZE)
        packed_data = f.read(RECORD_SIZE)
        sid, sname, sscore = struct.unpack(RECORD_FORMAT, packed_data)
        print(f"[Ex 10] Direct binary jump -> ID: {sid}, Name: {sname.decode().strip()}, Score: {sscore}%")


if __name__ == "__main__":
    print("Executing all 10 simple tell() and seek() examples...\n")
    example_1_tell_and_rewind()
    print("-" * 50)
    example_2_measure_filesize()
    print("-" * 50)
    example_3_skip_header()
    print("-" * 50)
    example_4_inplace_update()
    print("-" * 50)
    example_5_multipass_reading()
    print("-" * 50)
    example_6_binary_relative_seeking()
    print("-" * 50)
    example_7_read_from_eof()
    print("-" * 50)
    example_8_byte_offset_indexing()
    print("-" * 50)
    example_9_unicode_multibyte_gotcha()
    print("-" * 50)
    example_10_fixed_width_binary_records()
    print("\nAll 10 pointer examples completed successfully!")
