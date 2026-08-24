# for_loop.py
# Demonstrates the for loop approach (recommended)

import os

def create_sample_file():
    """Create a sample file with numbered lines."""
    filename = "sample.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(1, 11):
            f.write(f"Line {i:02d}: This is some sample content.\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def read_with_for_loop(filename):
    """Read a file using for loop (most Pythonic)."""
    print("\n🔹 Reading with 'for line in f':")
    line_count = 0
    char_count = 0

    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line_count += 1
            char_count += len(line)
            # Show first few lines
            if line_count <= 3:
                print(f"   {line.strip()}")

    print(f"   Total lines: {line_count}")
    print(f"   Total characters: {char_count}")

def read_with_enumerate(filename):
    """Read a file with line numbers using enumerate."""
    print("\n🔹 Reading with 'enumerate(f)':")
    with open(filename, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            if line_num <= 3:
                print(f"   Line {line_num}: {line.strip()}")

if __name__ == "__main__":
    filename = create_sample_file()
    read_with_for_loop(filename)
    read_with_enumerate(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")