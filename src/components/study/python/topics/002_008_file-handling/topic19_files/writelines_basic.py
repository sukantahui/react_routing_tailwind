# writelines_basic.py
# Demonstrates basic usage of writelines()

import os

def basic_writelines():
    """Write a list of lines to a file."""
    filename = "writelines_demo.txt"

    lines = [
        "Line 1: Hello Swadeep\n",
        "Line 2: Hello Tuhina\n",
        "Line 3: Hello Abhronila\n",
        "Line 4: Hello Debangshu\n",
    ]

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print(f"✅ File written: {filename}")

    # Read and display
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n📄 File content:\n{content}")

    os.remove(filename)
    print("🧹 Cleaned up.")

def writelines_with_tuple():
    """Write from a tuple."""
    filename = "tuple_output.txt"
    lines = ("First line\n", "Second line\n", "Third line\n")

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print(f"✅ Tuple written to {filename}")

    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    basic_writelines()
    writelines_with_tuple()