# while_readline.py
# Demonstrates the while True with readline() approach

import os

def create_sample_file():
    """Create a sample file."""
    filename = "sample.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(1, 11):
            f.write(f"Line {i:02d}: Sample content for while loop.\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def read_with_while_readline(filename):
    """Read a file using while True with readline()."""
    print("\n🔹 Reading with 'while True: line = f.readline()':")
    line_count = 0

    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            line = f.readline()
            if not line:  # EOF
                break
            line_count += 1
            if line_count <= 3:
                print(f"   {line.strip()}")

    print(f"   Total lines: {line_count}")

def read_with_while_readline_size(filename):
    """Use size parameter with readline()."""
    print("\n🔹 Reading with 'readline(size)' (partial lines):")
    with open(filename, 'r', encoding='utf-8') as f:
        # Read first line partially
        first_part = f.readline(10)
        print(f"   First 10 chars of line 1: '{first_part}'")
        # Read rest of first line
        rest = f.readline()
        print(f"   Rest of line 1: '{rest.strip()}'")

if __name__ == "__main__":
    filename = create_sample_file()
    read_with_while_readline(filename)
    read_with_while_readline_size(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")