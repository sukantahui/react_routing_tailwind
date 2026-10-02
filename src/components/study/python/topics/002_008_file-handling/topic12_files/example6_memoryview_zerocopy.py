"""
================================================================================
Topic 12 - Example 6: Zero-Copy Binary Buffer Slicing with memoryview
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Standard slicing on bytes (b[10:50]) allocates a new bytes object in RAM (copying data).
2. memoryview wraps an existing buffer (like bytearray or mmap) and provides zero-copy slices.
3. Modifying a memoryview slice directly alters the underlying buffer without memory allocation.
"""

def demonstrate_memoryview_zerocopy():
    filename = "shared_packet_buffer.dat"
    
    # 1. Create a large simulated binary packet (50 bytes)
    packet_buffer = bytearray(b"\xAA" * 10 + b"STUDENT_MAMATA_BARRACKPORE" + b"\xBB" * 14)
    print(f"[*] Initial buffer (Length: {len(packet_buffer)} bytes):")
    print(f"    Hex: {packet_buffer.hex()[:40]}...")

    # 2. Wrap in zero-copy memoryview
    mv = memoryview(packet_buffer)
    print(f"\n[+] Created memoryview on bytearray (Itemsize: {mv.itemsize}, Readonly: {mv.readonly})")

    # 3. Slice and mutate a sub-range (offset 10 to 36) without copying
    student_section = mv[10:36]
    print(f"    Current slice content: {bytes(student_section).decode('latin1')}")
    
    # Update slice to new student
    student_section[0:26] = b"STUDENT_DEBANGSHU_JADAVPUR"
    print(f"    Updated slice content: {bytes(student_section).decode('latin1')}")

    # 4. Verify that underlying packet_buffer was modified in-place
    print("\n[+] Verification of original packet_buffer after zero-copy mutation:")
    print(f"    Buffer: {packet_buffer.decode('latin1', errors='replace')}")

    with open(filename, "wb") as f:
        f.write(packet_buffer)
        
    print(f"\n[✓] Binary payload persisted to '{filename}'.")

if __name__ == "__main__":
    demonstrate_memoryview_zerocopy()
