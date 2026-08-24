# read_binary.py
# Demonstrates reading binary files

import os
import struct

def create_binary_file(filename="data.bin"):
    """Create a simple binary file with structured data."""
    with open(filename, 'wb') as f:
        # Write some bytes
        f.write(b'\x00\x01\x02\x03\x04\x05')
        # Write an integer (4 bytes)
        f.write(struct.pack('i', 42))
        # Write a float (4 bytes)
        f.write(struct.pack('f', 3.14159))
        # Write a string as bytes
        f.write(b'Hello\x00World')
    print(f"✅ Created binary file: {filename}")

def read_binary_file(filename):
    """Read the entire binary file and display its contents."""
    with open(filename, 'rb') as f:
        data = f.read()
    print(f"📄 Binary content of '{filename}' ({len(data)} bytes):")
    print(f"   Hex: {data.hex()}")
    print(f"   Repr: {data[:20]}...")

def read_binary_chunks(filename, chunk_size=8):
    """Read a binary file in chunks and show each chunk."""
    print(f"\n📖 Reading binary in {chunk_size}-byte chunks:")
    with open(filename, 'rb') as f:
        chunk_num = 0
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            chunk_num += 1
            print(f"   Chunk {chunk_num}: {chunk.hex()}")

if __name__ == "__main__":
    create_binary_file()
    read_binary_file("data.bin")
    read_binary_chunks("data.bin")
    os.remove("data.bin")
    print("🧹 Cleaned up.")