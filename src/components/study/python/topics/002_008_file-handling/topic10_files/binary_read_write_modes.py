# binary_read_write_modes.py
# Compares rb+, wb+, and ab+ modes

import os

def demo_rbplus():
    """Demonstrate 'rb+' mode: read and write without truncation."""
    filename = "rbplus_demo.bin"

    # Create initial binary file
    with open(filename, 'wb') as f:
        f.write(b'\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09')

    print("🔹 'rb+' – Read and Write Binary (no truncate)")
    with open(filename, 'rb+') as f:
        # Read first 4 bytes
        first = f.read(4)
        print(f"   Read first 4 bytes: {first.hex()}")

        # Write at position 2 (overwrite bytes 2-3)
        f.seek(2)
        f.write(b'\xFF\xFF')

        # Read all from start
        f.seek(0)
        content = f.read()
        print(f"   After modification: {content.hex()}")

    os.remove(filename)

def demo_wbplus():
    """Demonstrate 'wb+' mode: write and read with truncation."""
    filename = "wbplus_demo.bin"

    # File doesn't exist yet
    print("🔹 'wb+' – Write and Read Binary (truncate)")
    with open(filename, 'wb+') as f:
        # Write some data
        f.write(b'\xAA\xBB\xCC\xDD')

        # Read back (need to seek to start)
        f.seek(0)
        data = f.read()
        print(f"   Wrote and read: {data.hex()}")

        # Write more (at end, after reading)
        f.write(b'\xEE\xFF')
        f.seek(0)
        final = f.read()
        print(f"   After adding more: {final.hex()}")

    os.remove(filename)

def demo_abplus():
    """Demonstrate 'ab+' mode: append and read."""
    filename = "abplus_demo.bin"

    # Create initial file
    with open(filename, 'wb') as f:
        f.write(b'\x10\x20\x30')

    print("🔹 'ab+' – Append and Read Binary")
    with open(filename, 'ab+') as f:
        # Read existing (pointer at start)
        existing = f.read()
        print(f"   Existing content: {existing.hex()}")

        # Append new data (always at end)
        f.write(b'\x40\x50\x60')

        # Read entire file (need to seek to start)
        f.seek(0)
        all_data = f.read()
        print(f"   After append: {all_data.hex()}")

    os.remove(filename)

if __name__ == "__main__":
    demo_rbplus()
    print()
    demo_wbplus()
    print()
    demo_abplus()
    print("🧹 All cleaned up.")