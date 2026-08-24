# binary_read_mode.py
# Demonstrates reading binary files with 'rb' mode

import os

def read_binary_file(filename):
    """Read a binary file and display its bytes."""
    try:
        with open(filename, 'rb') as f:
            data = f.read()
        print(f"📖 Read {len(data)} bytes from '{filename}'")
        print(f"   First 20 bytes (hex): {data[:20].hex()}")
        print(f"   First 20 bytes (repr): {data[:20]}")
        return data
    except FileNotFoundError:
        print(f"❌ File '{filename}' not found.")
        return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def create_sample_binary():
    """Create a sample binary file for demonstration."""
    filename = "sample.bin"
    with open(filename, 'wb') as f:
        f.write(b'\x48\x65\x6C\x6C\x6F')  # "Hello"
        f.write(b'\x00\x01\x02\x03\xFF')
        f.write(b'\xAB\xCD\xEF')
    print(f"✅ Created sample binary file: {filename}")
    return filename

if __name__ == "__main__":
    # Create a sample file
    sample = create_sample_binary()

    # Read it
    read_binary_file(sample)

    # Clean up
    os.remove(sample)
    print("🧹 Cleaned up.")