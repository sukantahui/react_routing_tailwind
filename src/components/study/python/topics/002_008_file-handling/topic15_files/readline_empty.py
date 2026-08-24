# readline_empty.py
# Demonstrates handling empty lines and EOF

import os

def create_file_with_empty_lines():
    """Create a file with some empty lines."""
    filename = "empty_lines.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("First line\n")
        f.write("\n")           # Empty line
        f.write("Third line\n")
        f.write("\n")           # Empty line
        f.write("\n")           # Another empty line
        f.write("Last line\n")
    print(f"✅ Created file with empty lines: {filename}")
    return filename

def read_empty_lines(filename):
    """Read and identify empty lines vs EOF."""
    print("\n🔍 Reading file with empty lines:")
    with open(filename, 'r', encoding='utf-8') as f:
        line_num = 0
        while True:
            line = f.readline()
            line_num += 1
            if line == '':
                print(f"   Line {line_num}: EOF reached")
                break
            elif line == '\n':
                print(f"   Line {line_num}: Empty line (only newline)")
            else:
                print(f"   Line {line_num}: {repr(line.strip())}")

def process_non_empty_lines(filename):
    """Process only non-empty lines."""
    print("\n🔍 Processing non-empty lines:")
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():  # Skip empty lines
                print(f"   {repr(line.strip())}")

if __name__ == "__main__":
    filename = create_file_with_empty_lines()
    read_empty_lines(filename)
    process_non_empty_lines(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")