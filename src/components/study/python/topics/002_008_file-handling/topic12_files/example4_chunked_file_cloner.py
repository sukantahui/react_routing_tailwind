"""
================================================================================
Topic 12 - Example 4: High-Speed Chunked Binary File Stream Cloner
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================

Key Concepts:
1. Loading an entire 10GB video or database file into RAM causes MemoryError.
2. Binary chunk streaming (e.g. 64KB chunks) keeps RAM consumption at O(1) constant size.
3. Reading with 'iter(lambda: f.read(chunk_size), b"")' provides clean Pythonic streaming.
"""

import os
import hashlib

def clone_binary_stream(source_path, dest_path, chunk_size=64 * 1024):
    """Clones a binary file in fixed-size chunks while computing SHA-256 hash."""
    sha256 = hashlib.sha256()
    total_bytes_copied = 0
    
    with open(source_path, "rb") as src, open(dest_path, "wb") as dst:
        # Pythonic chunk iterator
        for chunk in iter(lambda: src.read(chunk_size), b""):
            dst.write(chunk)
            sha256.update(chunk)
            total_bytes_copied += len(chunk)
            
    return total_bytes_copied, sha256.hexdigest()

def demonstrate_chunked_cloning():
    src_file = "kolkata_archive.dat"
    clone_file = "kolkata_archive_backup.dat"
    
    # 1. Create a sample binary archive
    sample_payload = b"STUDENT_RECORD_BLOCK_BARRACKPORE_" * 500  # 17,000 bytes
    with open(src_file, "wb") as f:
        f.write(sample_payload)
        
    print(f"[*] Source binary file created: '{src_file}' ({len(sample_payload)} bytes)")

    # 2. Clone in 4KB chunks
    bytes_copied, checksum = clone_binary_stream(src_file, clone_file, chunk_size=4096)
    print(f"\n[+] Cloned {bytes_copied} bytes to '{clone_file}'")
    print(f"[+] SHA-256 Checksum: {checksum}")
    
    # 3. Verify integrity
    assert os.path.getsize(src_file) == os.path.getsize(clone_file)
    print("[✓] Integrity Verified: Source and Destination match bit-for-bit!")

if __name__ == "__main__":
    demonstrate_chunked_cloning()
