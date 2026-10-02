"""
================================================================================
Topic 12 - Example 3: File Format Magic Number & Signature Validator
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. File extensions (.png, .pdf) can be spoofed; real formats are identified by magic bytes.
2. Magic numbers are fixed byte sequences placed at the very start of binary files (offset 0).
3. Using binary mode 'rb' with f.read(8) enables instant file validation without parsing the whole file.
"""

# Common standard file signatures
MAGIC_SIGNATURES = {
    b"\x89PNG\r\n\x1a\n": "PNG Image",
    b"\xff\xd8\xff": "JPEG Image",
    b"%PDF": "PDF Document",
    b"PK\x03\x04": "ZIP Archive / DOCX / XLSX",
    b"GIF89a": "GIF89a Animated Image",
    b"GIF87a": "GIF87a Image",
    b"\x7fELF": "Linux ELF Executable",
    b"MZ": "Windows PE / EXE Executable"
}

def identify_binary_format(file_path):
    """Inspects the leading bytes of a file to determine its real file type."""
    with open(file_path, "rb") as f:
        # Read the first 16 bytes for signature inspection
        header = f.read(16)
        
    for magic_bytes, description in MAGIC_SIGNATURES.items():
        if header.startswith(magic_bytes):
            return description, header[:len(magic_bytes)].hex()
            
    return "Unknown / Generic Binary Data", header[:4].hex()

def demonstrate_magic_number_validation():
    # 1. Create simulated PNG, PDF, and ZIP files
    test_files = [
        ("report.pdf", b"%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\n"),
        ("student_avatar.png", b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR"),
        ("backup.zip", b"PK\x03\x04\x14\x00\x00\x00\x08\x00"),
        ("mystery_data.bin", b"\xDE\xAD\xBE\xEF\xCA\xFE\xBA\xBE")
    ]
    
    print("--- Binary File Signature Verification ---")
    for filename, payload in test_files:
        with open(filename, "wb") as f:
            f.write(payload)
            
        detected_type, hex_sig = identify_binary_format(filename)
        print(f"File: '{filename:<18}' | Magic Hex: {hex_sig:<16} | Identified: {detected_type}")

if __name__ == "__main__":
    demonstrate_magic_number_validation()
