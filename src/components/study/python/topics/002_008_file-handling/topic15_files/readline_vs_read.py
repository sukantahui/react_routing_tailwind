# readline_vs_read.py
# Compares readline() with read() for different use cases

import os
import time

def create_file_with_lines(filename="lines.txt", num_lines=1000):
    """Create a file with many lines."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:04d}: Some interesting content for testing.\n")
    print(f"✅ Created file with {num_lines} lines: {filename}")

def read_with_readline(filename):
    """Read lines one by one using readline() in a loop."""
    start = time.perf_counter()
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while line := f.readline():
            count += 1
    elapsed = time.perf_counter() - start
    return count, elapsed

def read_with_for_loop(filename):
    """Read lines using for loop (most Pythonic)."""
    start = time.perf_counter()
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            count += 1
    elapsed = time.perf_counter() - start
    return count, elapsed

def read_with_readlines(filename):
    """Read all lines at once using readlines()."""
    start = time.perf_counter()
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    elapsed = time.perf_counter() - start
    return len(lines), elapsed

def read_with_read_all(filename):
    """Read entire file and split lines."""
    start = time.perf_counter()
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.splitlines()
    elapsed = time.perf_counter() - start
    return len(lines), elapsed

if __name__ == "__main__":
    filename = "perf_lines.txt"
    create_file_with_lines(filename, 1000)

    print("\n⏱️ Performance comparison (1000 lines):")
    count, elapsed = read_with_readline(filename)
    print(f"  readline() loop:  {count} lines, {elapsed:.4f}s")

    count, elapsed = read_with_for_loop(filename)
    print(f"  for loop:         {count} lines, {elapsed:.4f}s")

    count, elapsed = read_with_readlines(filename)
    print(f"  readlines():      {count} lines, {elapsed:.4f}s")

    count, elapsed = read_with_read_all(filename)
    print(f"  read() + split:   {count} lines, {elapsed:.4f}s")

    os.remove(filename)
    print("🧹 Cleaned up.")