"""
================================================================================
Topic 12 - Example 1: Working with Raw Bytes Literals & Hex Formatting
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. 'bytes' is an immutable sequence of integers in the range 0 to 255.
2. Indexing a bytes object (b[0]) returns an integer, while slicing (b[0:1]) returns bytes.
3. Binary mode ('wb' / 'rb') bypasses text encoding and OS newline translation.
"""

def demonstrate_bytes_basics():
    filename = "student_binary_card.dat"
    
    # 1. Create a binary payload containing ASCII, control bytes, and high bytes
    # \x00 = NULL byte, \xFF = 255, \x0A = Linefeed
    raw_card = b"CODER_ACCOTAX\x00STUDENT:MAMATA\x00FEE:\x00\x00\x11\x94\xFF"
    
    print(f"[*] Step 1: Writing {len(raw_card)} raw bytes to '{filename}'...")
    with open(filename, "wb") as f:
        f.write(raw_card)

    # 2. Read back from disk in binary mode
    print("\n[*] Step 2: Reading binary file and inspecting byte integers:")
    with open(filename, "rb") as f:
        disk_data = f.read()
        print(f"    Total Bytes Read: {len(disk_data)}")
        print(f"    Raw bytes representation: {disk_data}")
        print(f"    Hexadecimal string: {disk_data.hex()}")
        
        # Demonstrating integer indexing vs slice
        first_byte_int = disk_data[0]
        print(f"\n    disk_data[0] -> Integer: {first_byte_int} (Binary: {bin(first_byte_int)}, Char: '{chr(first_byte_int)}')")
        
        slice_bytes = disk_data[0:5]
        print(f"    disk_data[0:5] -> Bytes slice: {slice_bytes} (Type: {type(slice_bytes)})")

if __name__ == "__main__":
    demonstrate_bytes_basics()
