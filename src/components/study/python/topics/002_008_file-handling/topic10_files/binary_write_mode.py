# binary_write_mode.py
# Demonstrates writing binary files with 'wb' mode

import os

def write_binary_file(filename, data):
    """Write bytes to a binary file using 'wb' mode."""
    with open(filename, 'wb') as f:
        f.write(data)
    print(f"✅ Wrote {len(data)} bytes to '{filename}'")
    print(f"   Data hex: {data.hex()}")

def show_file_content(filename):
    """Show the binary content of a file."""
    with open(filename, 'rb') as f:
        data = f.read()
    print(f"📄 Content of '{filename}' ({len(data)} bytes):")
    print(f"   Hex: {data.hex()}")
    print(f"   Repr: {data}")

if __name__ == "__main__":
    filename = "output.bin"

    # Different types of binary data
    data1 = b'Hello\x00World'
    data2 = bytes([0, 1, 2, 3, 4, 5])
    data3 = b'\xFF\xFE\xFD\xFC'

    # Write first data
    write_binary_file(filename, data1)
    show_file_content(filename)

    # Write second data (overwrites)
    write_binary_file(filename, data2)
    show_file_content(filename)

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")