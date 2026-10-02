"""
================================================================================
10 SIMPLE BYTES & BYTEARRAY BINARY FILE EXAMPLES IN PYTHON
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

import os

# ==============================================================================
# EXAMPLE 1: Creating Bytes Literals and Writing to a Binary File ('wb')
# ==============================================================================
def example_1_write_bytes():
    """Writing immutable bytes literals directly to disk."""
    raw_payload = b"Coder & AccoTax\x00\x01\x02\xFFBarrackpore"
    with open("demo_ex1.bin", "wb") as f:
        bytes_written = f.write(raw_payload)
        print(f"[Ex 1] Wrote {bytes_written} raw bytes to 'demo_ex1.bin'.")


# ==============================================================================
# EXAMPLE 2: Reading Binary Data & Inspecting Integer Byte Values ('rb')
# ==============================================================================
def example_2_read_bytes_indexing():
    """Demonstrates that indexing bytes data[0] returns an integer (0-255)."""
    with open("demo_ex1.bin", "rb") as f:
        data = f.read()
        print(f"[Ex 2] Read {len(data)} bytes. Type: {type(data)}")
        print(f"    First byte integer value: {data[0]} (ASCII '{chr(data[0])}')")
        print(f"    Slice data[0:5]: {data[0:5]} (Type: {type(data[0:5])})")


# ==============================================================================
# EXAMPLE 3: String to Bytes Encoding & Decoding (UTF-8)
# ==============================================================================
def example_3_encode_decode():
    """Encoding Unicode text into bytes and decoding back safely."""
    student_record = "Student: Mamata | Center: Barrackpore | Fee: Rs.4500"
    
    # 1. Encode string to bytes
    encoded_bytes = student_record.encode("utf-8")
    with open("demo_ex3.dat", "wb") as f:
        f.write(encoded_bytes)
        
    # 2. Read bytes and decode back to string
    with open("demo_ex3.dat", "rb") as f:
        raw = f.read()
        decoded_text = raw.decode("utf-8")
        print("[Ex 3] Decoded string from binary file:\n   ", decoded_text)


# ==============================================================================
# EXAMPLE 4: In-Place Mutation with Mutable bytearray
# ==============================================================================
def example_4_bytearray_mutation():
    """Mutating binary bytes in-place using bytearray without creating new copies."""
    header = bytearray(b"STATUS:[PENDING ]-ID:101-NAME:MAMATA")
    print("[Ex 4] Original bytearray:", header.decode("latin1"))
    
    # In-place replace 'PENDING ' (offset 8) with 'APPROVED'
    header[8:16] = b"APPROVED"
    print("[Ex 4] Mutated bytearray :", header.decode("latin1"))
    
    with open("demo_ex4.bin", "wb") as f:
        f.write(header)


# ==============================================================================
# EXAMPLE 5: Hexadecimal Representation (hex() and fromhex())
# ==============================================================================
def example_5_hex_representation():
    """Converting between human-readable hex strings and raw bytes."""
    hex_string = "48656c6c6f204261727261636b706f7265"  # 'Hello Barrackpore' in Hex
    binary_data = bytes.fromhex(hex_string)
    
    with open("demo_ex5.bin", "wb") as f:
        f.write(binary_data)
        
    with open("demo_ex5.bin", "rb") as f:
        read_bytes = f.read()
        print(f"[Ex 5] Raw bytes read: {read_bytes}")
        print(f"    Hex format: {read_bytes.hex()}")
        print(f"    Decoded: {read_bytes.decode('utf-8')}")


# ==============================================================================
# EXAMPLE 6: Magic Number / File Signature Identification
# ==============================================================================
def example_6_magic_numbers():
    """Identifying file formats by inspecting the first 4-8 header bytes."""
    # Common Magic Numbers:
    # PNG  -> 89 50 4E 47 0D 0A 1A 0A
    # JPEG -> FF D8 FF
    # PDF  -> 25 50 44 46 (%PDF)
    # ZIP  -> 50 4B 03 04 (PK..)
    
    # Create mock PNG file
    png_header = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR"
    with open("mock_image.png", "wb") as f:
        f.write(png_header)
        
    with open("mock_image.png", "rb") as f:
        sig = f.read(8)
        if sig == b"\x89PNG\r\n\x1a\n":
            print("[Ex 6] File Signature Verified: Valid PNG Image File!")
        else:
            print("[Ex 6] Unknown file format.")


# ==============================================================================
# EXAMPLE 7: High-Speed Chunked Binary File Cloning
# ==============================================================================
def example_7_chunked_file_cloning():
    """Copying arbitrary binary files in 64KB chunks with O(1) memory."""
    source_payload = b"STUDENT_DATA_PAYLOAD_" * 1000
    with open("source_large.dat", "wb") as f:
        f.write(source_payload)
        
    CHUNK_SIZE = 4096
    total_copied = 0
    
    with open("source_large.dat", "rb") as src, open("clone_large.dat", "wb") as dst:
        while True:
            chunk = src.read(CHUNK_SIZE)
            if not chunk:
                break
            dst.write(chunk)
            total_copied += len(chunk)
            
    print(f"[Ex 7] Cloned {total_copied} bytes safely using {CHUNK_SIZE}-byte chunks.")


# ==============================================================================
# EXAMPLE 8: In-Place XOR Encryption & Decryption on bytearray
# ==============================================================================
def example_8_xor_encryption():
    """Simple reversible binary XOR obfuscation on a bytearray buffer."""
    KEY = 0x5A  # Symmetric XOR key
    original_data = bytearray(b"Confidential Barrackpore Exam Questions 2026")
    
    # Encrypt
    encrypted_data = bytearray(b ^ KEY for b in original_data)
    with open("encrypted.bin", "wb") as f:
        f.write(encrypted_data)
        
    print(f"[Ex 8] Encrypted Hex: {encrypted_data.hex()[:40]}...")
    
    # Decrypt
    with open("encrypted.bin", "rb") as f:
        cipher_bytes = f.read()
        decrypted_data = bytearray(b ^ KEY for b in cipher_bytes)
        print(f"[Ex 8] Decrypted Text: {decrypted_data.decode('utf-8')}")


# ==============================================================================
# EXAMPLE 9: Generating a Raw Minimal BMP Binary Image File
# ==============================================================================
def example_9_generate_minimal_bmp():
    """Constructing a valid 2x2 pixel 24-bit RGB BMP file from raw bytes."""
    # BMP Header for 2x2 RGB Image (54 bytes header + 16 bytes pixel data with padding)
    # Header: 'BM' signature (2 bytes) + File size (54+16=70 bytes) + DIB header
    bmp_header = bytes.fromhex(
        "424d46000000000000003600000028000000"
        "020000000200000001001800000000001000"
        "0000130b0000130b00000000000000000000"
    )
    # Pixels: Row 1 (Blue, Red + 2 pad bytes), Row 2 (Green, White + 2 pad bytes)
    # Format: B G R (in hex)
    pixel_data = bytes.fromhex(
        "ff00000000ff0000"  # Blue, Red, 2 bytes padding
        "00ff00ffffff0000"  # Green, White, 2 bytes padding
    )
    
    with open("sample_2x2.bmp", "wb") as f:
        f.write(bmp_header + pixel_data)
        
    print(f"[Ex 9] Created valid BMP image 'sample_2x2.bmp' ({len(bmp_header + pixel_data)} bytes).")


# ==============================================================================
# EXAMPLE 10: Zero-Copy Binary Slicing with memoryview
# ==============================================================================
def example_10_memoryview_zerocopy():
    """Modifying binary buffer segments without RAM reallocation using memoryview."""
    large_buffer = bytearray(b"HEADER_V1.0_STUDENT_DEBANGSHU_COURSE_PYTHON")
    
    # Create zero-copy memory view
    mv = memoryview(large_buffer)
    
    # Modify "V1.0" (offset 7..11) to "V2.5" through the memoryview slice
    mv[7:11] = b"V2.5"
    
    print("[Ex 10] Modified buffer via zero-copy memoryview:")
    print("   ", large_buffer.decode("latin1"))


if __name__ == "__main__":
    print("Executing all 10 simple bytes & bytearray examples...\n")
    example_1_write_bytes()
    print("-" * 50)
    example_2_read_bytes_indexing()
    print("-" * 50)
    example_3_encode_decode()
    print("-" * 50)
    example_4_bytearray_mutation()
    print("-" * 50)
    example_5_hex_representation()
    print("-" * 50)
    example_6_magic_numbers()
    print("-" * 50)
    example_7_chunked_file_cloning()
    print("-" * 50)
    example_8_xor_encryption()
    print("-" * 50)
    example_9_generate_minimal_bmp()
    print("-" * 50)
    example_10_memoryview_zerocopy()
    print("\nAll 10 binary examples completed successfully!")
