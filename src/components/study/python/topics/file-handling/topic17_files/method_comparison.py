# method_comparison.py
# Compares different line-by-line reading methods

import os
import time

def create_test_file(filename="test.txt", num_lines=10000):
    """Create a test file."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:05d}: " + "abcdefghijklmnopqrstuvwxyz" * 3 + "\n")
    print(f"✅ Created test file with {num_lines:,} lines")
    return filename

def method_for_loop(filename):
    """Method 1: for loop."""
    start = time.perf_counter()
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            count += 1
    elapsed = time.perf_counter() - start
    return count, elapsed

def method_while_readline(filename):
    """Method 2: while True with readline()."""
    start = time.perf_counter()
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            line = f.readline()
            if not line:
                break
            count += 1
    elapsed = time.perf_counter() - start
    return count, elapsed

def method_walrus(filename):
    """Method 3: walrus operator (Python 3.8+)."""
    start = time.perf_counter()
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while line := f.readline():
            count += 1
    elapsed = time.perf_counter() - start
    return count, elapsed

def method_readlines(filename):
    """Method 4: readlines() (not recommended for large files)."""
    start = time.perf_counter()
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        count = len(lines)
    elapsed = time.perf_counter() - start
    return count, elapsed

def measure_memory(filename):
    """Measure memory usage of different methods."""
    print("\n💾 Memory usage comparison:")

    import tracemalloc

    # for loop
    tracemalloc.start()
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            pass
    current1, peak1 = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    # readlines()
    tracemalloc.start()
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    current2, peak2 = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    print(f"  for loop:     {current1/1024:.2f} KB (peak: {peak1/1024:.2f} KB)")
    print(f"  readlines():  {current2/1024:.2f} KB (peak: {peak2/1024:.2f} KB)")

if __name__ == "__main__":
    filename = create_test_file(10000)

    print("\n⏱️ Performance Comparison (10,000 lines):")

    count, elapsed = method_for_loop(filename)
    print(f"  for loop:         {count:,} lines, {elapsed:.4f}s")

    count, elapsed = method_while_readline(filename)
    print(f"  while readline(): {count:,} lines, {elapsed:.4f}s")

    count, elapsed = method_walrus(filename)
    print(f"  walrus:           {count:,} lines, {elapsed:.4f}s")

    count, elapsed = method_readlines(filename)
    print(f"  readlines():      {count:,} lines, {elapsed:.4f}s")

    measure_memory(filename)

    os.remove(filename)
    print("🧹 Cleaned up.")