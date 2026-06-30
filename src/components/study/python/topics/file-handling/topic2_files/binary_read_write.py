# binary_read_write.py
# Demonstrates reading from and writing to a binary file

import struct

def write_binary():
    """Write binary data (a few integers and a float) to a file."""
    with open('data.bin', 'wb') as f:
        # Pack some data into bytes (integers and a float)
        data = struct.pack('iif', 42, 100, 3.14)
        f.write(data)
    print("✅ Binary file 'data.bin' written.")

def read_binary():
    """Read and unpack binary data from a file."""
    try:
        with open('data.bin', 'rb') as f:
            raw = f.read()
        # Unpack the bytes into integers and a float
        a, b, c = struct.unpack('iif', raw)
        print(f"📦 Binary data: a={a}, b={b}, c={c}")
    except FileNotFoundError:
        print("❌ File not found. Run write_binary() first.")

if __name__ == "__main__":
    write_binary()
    read_binary()