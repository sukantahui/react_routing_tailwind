# struct_binary_example.py
# Demonstrates working with structured binary data using struct

import os
import struct

def write_structured_data(filename):
    """Write structured binary data (integers and floats)."""
    # Pack data: 2 integers (i) and 1 float (f)
    data = struct.pack('iif', 42, 100, 3.14159)

    with open(filename, 'wb') as f:
        f.write(data)

    print(f"✅ Wrote structured data to '{filename}'")
    print(f"   Data bytes: {data.hex()}")

def read_structured_data(filename):
    """Read and unpack structured binary data."""
    with open(filename, 'rb') as f:
        data = f.read()

    # Unpack: 2 integers and 1 float
    a, b, c = struct.unpack('iif', data)
    print(f"📄 Unpacked data from '{filename}':")
    print(f"   Integer 1: {a}")
    print(f"   Integer 2: {b}")
    print(f"   Float: {c:.5f}")

def write_array_of_integers(filename, count=10):
    """Write an array of integers as binary."""
    import array
    arr = array.array('i', range(count))
    with open(filename, 'wb') as f:
        arr.tofile(f)
    print(f"✅ Wrote {count} integers to '{filename}'")
    return arr

def read_array_of_integers(filename):
    """Read an array of integers from binary."""
    import array
    with open(filename, 'rb') as f:
        data = f.read()
    # Guess the number of integers
    count = len(data) // 4  # 4 bytes per int
    arr = array.array('i')
    arr.frombytes(data)
    print(f"📄 Read {len(arr)} integers from '{filename}'")
    print(f"   First 5: {arr[:5].tolist()}")
    return arr

if __name__ == "__main__":
    filename = "structured.bin"

    # Write and read structured data
    write_structured_data(filename)
    read_structured_data(filename)

    print()

    # Write and read array of integers
    arr_filename = "array.bin"
    write_array_of_integers(arr_filename, 20)
    read_array_of_integers(arr_filename)

    # Clean up
    for f in [filename, arr_filename]:
        if os.path.exists(f):
            os.remove(f)
    print("🧹 Cleaned up.")