# write_basic.py
# Demonstrates basic usage of write()

import os

def basic_write_example():
    """Write basic text to a file."""
    filename = "output.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Hello, Swadeep!\n")
        f.write("Welcome to file writing.\n")
        f.write("This is the third line.")

    print(f"✅ File written: {filename}")

    # Read and display the content
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n📄 File content:\n{content}")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

def write_multiple_calls():
    """Show that multiple write() calls write sequentially."""
    filename = "sequential.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        f.write("First part")
        f.write(" Second part")
        f.write(" Third part\n")
        f.write("New line")

    print("\n📄 Sequential writes (without newlines):")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    basic_write_example()
    write_multiple_calls()