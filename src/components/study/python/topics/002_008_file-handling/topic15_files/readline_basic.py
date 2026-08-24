# readline_basic.py
# Demonstrates basic usage of readline()

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

def readline_examples(filename):
    """Show basic readline() usage."""
    with open(filename, 'r', encoding='utf-8') as f:
        # Read first line
        line1 = f.readline()
        print(f"📖 Line 1: {repr(line1)}")

        # Read second line
        line2 = f.readline()
        print(f"📖 Line 2: {repr(line2)}")

        # Read third line (including the newline)
        line3 = f.readline()
        print(f"📖 Line 3: {repr(line3)}")

        # Read remaining lines (line 4 only)
        line4 = f.readline()
        print(f"📖 Line 4: {repr(line4)}")

        # Try reading beyond EOF
        line5 = f.readline()
        print(f"📖 Line 5 (EOF): {repr(line5)}")

def readline_with_strip(filename):
    """Demonstrate stripping newlines."""
    with open(filename, 'r', encoding='utf-8') as f:
        line = f.readline()
        print(f"\n🔍 Raw line: {repr(line)}")
        print(f"   Without newline: {repr(line.rstrip('\n'))}")
        print(f"   Stripped: {repr(line.strip())}")

if __name__ == "__main__":
    filename = create_sample_file()
    readline_examples(filename)
    readline_with_strip(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")