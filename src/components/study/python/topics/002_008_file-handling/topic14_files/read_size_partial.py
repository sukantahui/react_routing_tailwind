# read_size_partial.py
# Demonstrates handling partial reads (when file ends before chunk size)

import os

def create_file_with_content(filename="partial.txt"):
    """Create a small file."""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Short file.")
    print(f"✅ Created: {filename}")

def partial_read_example(filename, chunk_size=10):
    """Read the file with chunk_size larger than file size."""
    print(f"\n📖 Reading file with chunk_size={chunk_size} (file size < chunk_size):")
    with open(filename, 'r', encoding='utf-8') as f:
        chunk = f.read(chunk_size)
        print(f"   Read '{chunk}' (length {len(chunk)})")
        # Next read returns ''
        next_chunk = f.read(chunk_size)
        print(f"   Next read: '{next_chunk}' (EOF detected)")

def robust_chunked_reading(filename, chunk_size=4):
    """Robust chunked reading that handles partial final chunks."""
    print(f"\n🔄 Robust chunked reading (chunk_size={chunk_size}):")
    total = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            total += len(chunk)
            print(f"   Chunk: '{chunk}' (len {len(chunk)})")
    print(f"   Total characters: {total}")

if __name__ == "__main__":
    filename = "partial.txt"
    create_file_with_content(filename)
    partial_read_example(filename, 10)
    robust_chunked_reading(filename, 3)
    os.remove(filename)
    print("🧹 Cleaned up.")