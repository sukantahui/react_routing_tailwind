# readlines_vs_iteration.py
# Compares readlines() with iteration

import os
import time

def create_test_file(filename="compare.txt", num_lines=10000):
    """Create a test file with many lines."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:05d}: " + "abcdefghijklmnopqrstuvwxyz" * 5 + "\n")
    print(f"✅ Created file with {num_lines:,} lines: {filename}")
    return filename

def process_with_readlines(filename):
    """Process using readlines()."""
    start = time.perf_counter()
    total = 0
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            total += len(line)
    elapsed = time.perf_counter() - start
    return total, elapsed, len(lines)

def process_with_iteration(filename):
    """Process using iteration (for line in f)."""
    start = time.perf_counter()
    total = 0
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            total += len(line)
            count += 1
    elapsed = time.perf_counter() - start
    return total, elapsed, count

def process_with_readline(filename):
    """Process using readline() in a loop."""
    start = time.perf_counter()
    total = 0
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            line = f.readline()
            if not line:
                break
            total += len(line)
            count += 1
    elapsed = time.perf_counter() - start
    return total, elapsed, count

if __name__ == "__main__":
    filename = create_test_file(10000)

    print("\n⏱️ Performance Comparison (10,000 lines):")

    total, elapsed, count = process_with_readlines(filename)
    print(f"  readlines():      {count:,} lines, {elapsed:.4f}s")

    total, elapsed, count = process_with_iteration(filename)
    print(f"  for line in f:    {count:,} lines, {elapsed:.4f}s")

    total, elapsed, count = process_with_readline(filename)
    print(f"  readline() loop:  {count:,} lines, {elapsed:.4f}s")

    # Check memory implication
    import tracemalloc
    tracemalloc.start()
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    current1, peak1 = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    tracemalloc.start()
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            pass
    current2, peak2 = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    print(f"\n💾 Memory usage (approx):")
    print(f"  readlines(): {current1/1024:.2f} KB")
    print(f"  iteration:   {current2/1024:.2f} KB")

    os.remove(filename)
    print("🧹 Cleaned up.")