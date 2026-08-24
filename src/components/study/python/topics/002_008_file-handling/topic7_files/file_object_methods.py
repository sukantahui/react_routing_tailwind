# file_object_methods.py
# Demonstrates common file object methods

import os

def demo_methods():
    """Show read, write, seek, tell, and close."""
    filename = "methods_demo.txt"

    # Write some data
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line 1: Hello Swadeep\n")
        f.write("Line 2: Hello Tuhina\n")
        f.write("Line 3: Hello Abhronila\n")

    # Read with different methods
    with open(filename, 'r', encoding='utf-8') as f:
        # tell() - initial position
        print(f"📌 Initial position: {f.tell()}")

        # readline()
        line1 = f.readline()
        print(f"📖 readline(): {line1.strip()}")
        print(f"   Position after readline: {f.tell()}")

        # readlines()
        f.seek(0)  # go back to start
        all_lines = f.readlines()
        print(f"\n📖 readlines() returned {len(all_lines)} lines.")

        # read(size)
        f.seek(0)
        chunk = f.read(10)
        print(f"\n📖 read(10): '{chunk}'")

        # Iteration (most Pythonic)
        print("\n📖 Iterating over lines:")
        f.seek(0)
        for i, line in enumerate(f, 1):
            print(f"   Line {i}: {line.strip()}")

    # Cleaning up
    os.remove(filename)
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    demo_methods()