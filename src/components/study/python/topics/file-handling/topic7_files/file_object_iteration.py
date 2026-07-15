# file_object_iteration.py
# Compares different ways to read lines

import os
import time

def create_large_file(size_mb=1):
    """Create a dummy text file of given size (approx)."""
    filename = "large_demo.txt"
    line = "This is a line with some content. " * 20 + "\n"
    with open(filename, 'w', encoding='utf-8') as f:
        # Write enough lines to reach ~size_mb MB
        target_bytes = size_mb * 1024 * 1024
        written = 0
        while written < target_bytes:
            f.write(line)
            written += len(line.encode('utf-8'))
    return filename

def read_all_vs_iterate(filename):
    """Compare reading all lines vs iterating."""
    # Method 1: readlines() (all in memory)
    start = time.perf_counter()
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        count1 = len(lines)
    t1 = time.perf_counter() - start
    print(f"📊 readlines(): {count1} lines, time: {t1:.4f}s")

    # Method 2: iterate (lazy)
    start = time.perf_counter()
    count2 = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            count2 += 1
    t2 = time.perf_counter() - start
    print(f"📊 Iteration:  {count2} lines, time: {t2:.4f}s")

    # Method 3: while readline()
    start = time.perf_counter()
    count3 = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            line = f.readline()
            if not line:
                break
            count3 += 1
    t3 = time.perf_counter() - start
    print(f"📊 readline() loop: {count3} lines, time: {t3:.4f}s")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.\n")

if __name__ == "__main__":
    print("Creating a ~1MB dummy file...")
    fname = create_large_file(1)
    read_all_vs_iterate(fname)