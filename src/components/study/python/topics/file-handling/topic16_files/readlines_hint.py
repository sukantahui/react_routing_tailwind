# readlines_hint.py
# Demonstrates the sizehint parameter

import os

def create_file_with_lines(filename="data.txt", num_lines=100):
    """Create a file with many lines."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:03d}: " + "x" * 50 + "\n")
    print(f"✅ Created file with {num_lines} lines: {filename}")
    return filename

def readlines_without_hint(filename):
    """Read all lines at once (no hint)."""
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print(f"📚 Without hint: {len(lines)} lines read, {len(lines[0])} chars per line avg")

def readlines_with_hint(filename, hint=1024):
    """Read lines with sizehint."""
    total_lines = 0
    batch_num = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            lines = f.readlines(hint)
            if not lines:
                break
            batch_num += 1
            total_lines += len(lines)
            print(f"   Batch {batch_num}: {len(lines)} lines, total {total_lines}")
    print(f"📚 With hint ({hint}): {total_lines} lines total")

def compare_hints(filename):
    """Compare different hint sizes."""
    print("\n📊 Comparison of different hint sizes:")
    for hint in [512, 1024, 4096, 16384]:
        total_lines = 0
        with open(filename, 'r', encoding='utf-8') as f:
            while True:
                lines = f.readlines(hint)
                if not lines:
                    break
                total_lines += len(lines)
        print(f"   hint={hint:6d}: {total_lines} lines")

if __name__ == "__main__":
    filename = create_file_with_lines(200)
    readlines_without_hint(filename)
    readlines_with_hint(filename, 1024)
    compare_hints(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")