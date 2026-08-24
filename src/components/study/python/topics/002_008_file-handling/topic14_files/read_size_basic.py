# read_size_basic.py
# Demonstrates basic usage of read(size)

import os

def create_sample_file():
    """Create a sample file with known content."""
    filename = "sample.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("0123456789\n")
        f.write("ABCDEFGHIJ\n")
        f.write("abcdefghij\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def read_size_examples(filename):
    """Show various read(size) calls."""
    with open(filename, 'r', encoding='utf-8') as f:
        # Read 5 characters
        chunk1 = f.read(5)
        print(f"📖 read(5): '{chunk1}' (length {len(chunk1)})")

        # Read 10 characters
        chunk2 = f.read(10)
        print(f"📖 read(10): '{chunk2}' (length {len(chunk2)})")

        # Read the rest
        chunk3 = f.read()
        print(f"📖 read(): '{chunk3}' (length {len(chunk3)})")

        # Now at EOF, read(5) returns ''
        chunk4 = f.read(5)
        print(f"📖 read(5) at EOF: '{chunk4}' (length {len(chunk4)})")

def read_size_zero():
    """Demonstrate read(0) behavior."""
    with open("sample.txt", 'r', encoding='utf-8') as f:
        chunk = f.read(0)
        print(f"\n📖 read(0): '{chunk}' (length {len(chunk)})")
        # Pointer does not move
        pos = f.tell()
        print(f"   File pointer after read(0): {pos}")

if __name__ == "__main__":
    filename = create_sample_file()
    read_size_examples(filename)
    read_size_zero()
    os.remove(filename)
    print("🧹 Cleaned up.")