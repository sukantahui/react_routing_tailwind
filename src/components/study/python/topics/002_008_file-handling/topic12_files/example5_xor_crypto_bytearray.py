"""
================================================================================
Topic 12 - Example 5: In-Place XOR Binary Stream Encryption Engine
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Symmetric XOR encryption: (A ^ K) ^ K = A.
2. In-place bitwise operations on bytearray avoid memory reallocation.
3. Useful for encrypting student exam papers and sensitive database payloads.
"""

def xor_crypt_file(input_path, output_path, key_bytes):
    """Encrypts or decrypts a binary file using a repeating multi-byte XOR key."""
    key_len = len(key_bytes)
    
    with open(input_path, "rb") as f_in:
        raw_data = bytearray(f_in.read())
        
    # In-place multi-byte XOR
    for i in range(len(raw_data)):
        raw_data[i] ^= key_bytes[i % key_len]
        
    with open(output_path, "wb") as f_out:
        f_out.write(raw_data)
        
    return len(raw_data)

def demonstrate_xor_crypto():
    KEY = b"SukantaBarrackpore2026"
    plain_file = "student_marks_confidential.txt"
    cipher_file = "student_marks.enc"
    restored_file = "student_marks_restored.txt"
    
    # 1. Plain text student data
    content = "Mamata: 98/100 | Debangshu: 95/100 | Susmita: 99/100"
    with open(plain_file, "wb") as f:
        f.write(content.encode("utf-8"))
        
    print(f"[*] Plaintext: '{content}'")

    # 2. Encrypt
    xor_crypt_file(plain_file, cipher_file, KEY)
    with open(cipher_file, "rb") as f:
        encrypted_raw = f.read()
    print(f"[+] Encrypted File Hex: {encrypted_raw.hex()[:40]}... (Total {len(encrypted_raw)} bytes)")

    # 3. Decrypt
    xor_crypt_file(cipher_file, restored_file, KEY)
    with open(restored_file, "rb") as f:
        decrypted_text = f.read().decode("utf-8")
        
    print(f"[✓] Decrypted Text: '{decrypted_text}'")
    assert content == decrypted_text
    print("[✓] Perfect Bidirectional XOR Match Confirmed!")

if __name__ == "__main__":
    demonstrate_xor_crypto()
