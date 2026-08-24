# basic_open.py
# Demonstrates the simplest usage of open()

import os

def basic_open_example():
    """Create a file, write to it, then read it back."""
    filename = "example.txt"

    # Write to file (creates or overwrites)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Hello, Swadeep!\n")
        f.write("This is a basic open() example.\n")

    # Read the file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    print("📄 Content of 'example.txt':")
    print(content)

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    basic_open_example()