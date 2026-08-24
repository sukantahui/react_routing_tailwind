# readline_loop.py
# Demonstrates different ways to read lines in a loop

import os

def create_test_file():
    """Create a test file with numbered lines."""
    filename = "test.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(1, 11):
            f.write(f"Line {i}: Some content here.\n")
    print(f"✅ Created test file with 10 lines: {filename}")
    return filename

def while_loop_method(filename):
    """Read lines using while True with break."""
    print("\n🔹 Method 1: while True with break")
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            line = f.readline()
            if not line:
                break
            count += 1
            # In a real app, process the line here
    print(f"   Read {count} lines")

def walrus_method(filename):
    """Read lines using walrus operator (Python 3.8+)."""
    print("\n🔹 Method 2: while line := f.readline()")
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while line := f.readline():
            count += 1
    print(f"   Read {count} lines")

def for_loop_method(filename):
    """Read lines using for loop (most Pythonic)."""
    print("\n🔹 Method 3: for line in f")
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            count += 1
    print(f"   Read {count} lines")

if __name__ == "__main__":
    filename = create_test_file()
    while_loop_method(filename)
    walrus_method(filename)
    for_loop_method(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")