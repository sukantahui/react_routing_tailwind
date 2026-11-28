"""
CBSE Class XII Computer Science (Code 083)
Topic 0: Binary File Mechanics - Byte-Level Storage Demonstration
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import os

def demo_raw_byte_storage():
    filename = "raw_bytes_demo.dat"
    
    print("=" * 65)
    print("DEMONSTRATION 1: WRITING RAW BYTES IN 'wb' MODE")
    print("=" * 65)
    
    # Raw byte sequence (Hexadecimal values)
    raw_data = bytes([65, 66, 67, 10, 68, 69, 70, 0, 255])
    print(f"[*] Raw bytes to write : {raw_data}")
    print(f"[*] Decimal byte values: {[b for b in raw_data]}")
    
    with open(filename, "wb") as f:
        bytes_written = f.write(raw_data)
        print(f"[+] Total bytes written to disk: {bytes_written}")

    # Inspect physical disk size
    disk_size = os.path.getsize(filename)
    print(f"[+] Verified disk file size: {disk_size} bytes (Exact 1:1 match!)\n")

    print("=" * 65)
    print("DEMONSTRATION 2: READING RAW BYTES IN 'rb' MODE")
    print("=" * 65)
    
    with open(filename, "rb") as f:
        read_bytes = f.read()
        print(f"[*] Bytes read back: {read_bytes}")
        print(f"[*] Type of data read: {type(read_bytes)}")
        print(f"[*] First byte value (65 = 'A'): {read_bytes[0]}")
        print(f"[*] Last byte value (255 = 0xFF): {read_bytes[-1]}")

if __name__ == "__main__":
    demo_raw_byte_storage()
