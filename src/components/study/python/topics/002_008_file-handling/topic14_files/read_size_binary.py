# read_size_binary.py
# Demonstrates read(size) in binary mode

import os
import struct

def create_binary_file(filename="data.bin"):
    """Create a binary file with known content."""
    with open(filename, 'wb') as f:
        # Write some bytes
        f.write(b'\x00\x01\x02\x03\x04\x05')
        # Write an integer (4 bytes)
        f.write(struct.pack('i', 12345))
        # Write a float (4 bytes)
        f.write(struct.pack('f', 3.14159))
        # Write a string as bytes
        f.write(b'Hello\x00World')
    print(f"✅ Created binary file: {filename}")

def read_binary_chunks(filename, chunk_size=4):
    """Read binary file in byte chunks."""
    print(f"\n📖 Reading binary in {chunk_size}-byte chunks:")
    with open(filename, 'rb') as f:
        chunk_num = 0
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            chunk_num += 1
            print(f"   Chunk {chunk_num}: {chunk.hex()} ({len(chunk)} bytes)")

def read_binary_structured(filename):
    """Read structured binary data using chunks."""
    print("\n🔍 Reading structured binary data:")
    with open(filename, 'rb') as f:
        # Read first 6 bytes
        bytes1 = f.read(6)
        print(f"   First 6 bytes: {bytes1.hex()}")

        # Read next 4 bytes as an integer
        int_bytes = f.read(4)
        if len(int_bytes) == 4:
            value = struct.unpack('i', int_bytes)[0]
            print(f"   Integer: {value}")

        # Read next 4 bytes as a float
        float_bytes = f.read(4)
        if len(float_bytes) == 4:
            value = struct.unpack('f', float_bytes)[0]
            print(f"   Float: {value:.5f}")

        # Read the rest as bytes
        rest = f.read()
        print(f"   Remaining bytes: {rest}")

if __name__ == "__main__":
    filename = create_binary_file()
    read_binary_chunks(filename, 4)
    read_binary_structured(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")