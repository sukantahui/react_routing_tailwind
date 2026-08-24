# readlines_basic.py
# Demonstrates basic usage of readlines()

import os

def create_sample_file():
    """Create a sample file with multiple lines."""
    filename = "sample.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line 1: Hello Swadeep\n")
        f.write("Line 2: Hello Tuhina\n")
        f.write("Line 3: Hello Abhronila\n")
        f.write("Line 4: Hello Debangshu\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def readlines_example(filename):
    """Show basic readlines() usage."""
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        print(f"📚 readlines() returned {len(lines)} lines:")
        for i, line in enumerate(lines, 1):
            print(f"   Line {i}: {repr(line)}")

def readlines_with_strip(filename):
    """Read lines and strip newlines using list comprehension."""
    with open(filename, 'r', encoding='utf-8') as f:
        # Strip newlines while reading
        lines = [line.rstrip('\n') for line in f.readlines()]
        print(f"\n📚 Stripped lines ({len(lines)}):")
        for i, line in enumerate(lines, 1):
            print(f"   Line {i}: {repr(line)}")

if __name__ == "__main__":
    filename = create_sample_file()
    readlines_example(filename)
    readlines_with_strip(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")