"""
================================================================================
Topic 12 - Example 2: In-Place Binary Mutation with bytearray
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. 'bytes' is immutable (cannot modify individual bytes without full copy).
2. 'bytearray' is mutable (allows in-place element assignment and slicing replacements).
3. Ideal for modifying headers, packet checksums, and image metadata in memory.
"""

def demonstrate_bytearray_mutation():
    filename = "student_packet.bin"
    
    # 1. Initialize a mutable bytearray buffer
    packet = bytearray(b"HEADER:V1.0|ID:101|NAME:DEBANGSHU |STATUS:PENDING |CRC:0000")
    print(f"[*] Initial Packet ({len(packet)} bytes):")
    print(f"    Raw: {packet.decode('latin1')}")

    # 2. In-place modification of single byte: Upgrade version '1' (ASCII 49) to '2' (ASCII 50)
    version_offset = packet.index(b"V1.0") + 1
    packet[version_offset] = ord("2")  # Direct integer assignment (0..255)
    print(f"\n[+] Upgraded version byte at index {version_offset}: {packet[version_offset-1:version_offset+3]}")

    # 3. In-place slice replacement: Change status 'PENDING ' to 'APPROVED'
    status_offset = packet.index(b"PENDING ")
    packet[status_offset : status_offset + 8] = b"APPROVED"
    print(f"[+] Updated status slice to 'APPROVED'")

    # 4. Compute simple XOR checksum and inject into CRC field
    checksum = 0
    for b in packet[:-4]:
        checksum ^= b
    crc_hex = f"{checksum:04X}".encode("ascii")
    packet[-4:] = crc_hex
    print(f"[+] Computed & injected CRC checksum: {crc_hex.decode('ascii')}")

    # 5. Persist updated packet to binary file
    with open(filename, "wb") as f:
        f.write(packet)
        
    print(f"\n[✓] Mutated packet successfully persisted to '{filename}'.")

if __name__ == "__main__":
    demonstrate_bytearray_mutation()
