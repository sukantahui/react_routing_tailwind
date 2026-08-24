# topic9_files/string_compression_and_transformation.py
# Module: 002_007_string-processing
# Topic: Common String Processing Algorithms (palindromes, anagrams, word counts)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 3: Run-Length Encoding (RLE), Case Converters & Caesar Cipher
Demonstrates:
  1. Run-Length Encoding (RLE) lossless string compression & decompression
  2. Case transformation algorithms: snake_case <-> camelCase <-> PascalCase
  3. Caesar cipher & ROT13 character encryption / decryption using ord() and chr()
"""

import re

def compress_run_length(s: str) -> str:
    """
    Compresses consecutive duplicate characters using Run-Length Encoding.
    Example: 'AAABBBCCDAA' -> 'A3B3C2D1A2'
    """
    if not s:
        return ""

    encoded_chunks = []
    current_char = s[0]
    count = 1

    for char in s[1:]:
        if char == current_char:
            count += 1
        else:
            encoded_chunks.append(f"{current_char}{count}")
            current_char = char
            count = 1

    encoded_chunks.append(f"{current_char}{count}")
    return "".join(encoded_chunks)


def decompress_run_length(s: str) -> str:
    """Decompresses an RLE string back to original format."""
    # Find all pairs of (char, count)
    matches = re.findall(r"([A-Za-z])(\d+)", s)
    return "".join(char * int(count) for char, count in matches)


def snake_to_camel_case(s: str) -> str:
    """Converts 'student_enrollment_id' to 'studentEnrollmentId'."""
    components = s.split("_")
    return components[0].lower() + "".join(x.capitalize() for x in components[1:])


def camel_to_snake_case(s: str) -> str:
    """Converts 'studentEnrollmentId' to 'student_enrollment_id'."""
    return re.sub(r"(?<!^)(?=[A-Z])", "_", s).lower()


def caesar_cipher(text: str, shift: int = 13) -> str:
    """Encodes/decodes text using Caesar Cipher (shift 13 = ROT13)."""
    result = []
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            shifted = chr((ord(ch) - base + shift) % 26 + base)
            result.append(shifted)
        else:
            result.append(ch)
    return "".join(result)


def run_demo():
    print("=" * 65)
    print("1. RUN-LENGTH ENCODING (RLE) COMPRESSION")
    print("=" * 65)

    original_sequence = "AAAAABBBCCCCCCDDDDDEEEEEEE"
    compressed = compress_run_length(original_sequence)
    decompressed = decompress_run_length(compressed)

    print(f"Original String     : '{original_sequence}' (Length: {len(original_sequence)})")
    print(f"Compressed (RLE)    : '{compressed}' (Length: {len(compressed)})")
    print(f"Decompressed String : '{decompressed}'")
    print(f"Lossless Match Check: {original_sequence == decompressed}\n")

    print("=" * 65)
    print("2. CASE CONVERSION ALGORITHMS")
    print("=" * 65)

    snake_samples = ["student_first_name", "batch_enrollment_count", "total_fee_payable"]
    for sn in snake_samples:
        camel = snake_to_camel_case(sn)
        reverted = camel_to_snake_case(camel)
        print(f"Snake: '{sn:<24}' -> Camel: '{camel:<22}' -> Reverted: '{reverted}'")

    print("\n" + "=" * 65)
    print("3. CAESAR CIPHER & ROT13 ENCRYPTION")
    print("=" * 65)

    secret = "Coder & AccoTax Barrackpore: Python 2026 Batch"
    encrypted = caesar_cipher(secret, shift=13)  # ROT13
    decrypted = caesar_cipher(encrypted, shift=13)  # Applying ROT13 twice decrypts!

    print(f"Original  : '{secret}'")
    print(f"Encrypted : '{encrypted}'")
    print(f"Decrypted : '{decrypted}'")


if __name__ == "__main__":
    run_demo()
