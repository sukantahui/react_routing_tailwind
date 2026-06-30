# binary_append_mode.py
# Demonstrates appending to binary files with 'ab' mode

import os
import struct

def append_binary(filename, data):
    """Append bytes to a binary file using 'ab' mode."""
    with open(filename, 'ab') as f:
        f.write(data)
    print(f"✅ Appended {len(data)} bytes to '{filename}'")

def read_binary(filename):
    """Read and display the entire binary file."""
    with open(filename, 'rb') as f:
        data = f.read()
    print(f"📄 Content ({len(data)} bytes): {data.hex()}")
    return data

if __name__ == "__main__":
    filename = "appended.bin"

    # Start with some data
    with open(filename, 'wb') as f:
        f.write(b'\x01\x02\x03')

    print("📄 Initial file:")
    read_binary(filename)

    # Append some more data
    append_binary(filename, b'\x04\x05\x06')
    print("📄 After first append:")
    read_binary(filename)

    # Append structured data (integers)
    data = struct.pack('i', 42)  # 4-byte integer
    append_binary(filename, data)
    print("📄 After appending integer 42:")
    read_binary(filename)

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")