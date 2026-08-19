# readlines_memory.py
# Demonstrates memory usage of readlines()

import os
import sys

def create_file_with_lines(filename="mem_test.txt", num_lines=5000):
    """Create a moderately large file."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:04d}: " + "abcdefghijklmnopqrstuvwxyz" * 4 + "\n")
    print(f"✅ Created file with {num_lines} lines: {filename}")
    return filename

def estimate_memory_usage(filename):
    """Estimate memory usage of readlines() vs iteration."""
    file_size = os.path.getsize(filename)
    print(f"\n📊 File size: {file_size:,} bytes ({file_size/1024:.2f} KB)")

    # Read with readlines()
    import tracemalloc
    tracemalloc.start()
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    print(f"📚 readlines() memory: {current/1024:.2f} KB (peak: {peak/1024:.2f} KB)")
    print(f"   Lines: {len(lines)}, approx {len(lines) * len(lines[0]) / 1024:.2f} KB for string data")

    # Read with iteration (memory should be much lower)
    tracemalloc.start()
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            count += 1
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    print(f"🔁 Iteration memory: {current/1024:.2f} KB (peak: {peak/1024:.2f} KB)")
    print(f"   Lines counted: {count}")

    # Show that memory difference grows with file size
    print("\n💡 Note: For larger files, the memory difference becomes more significant.")

if __name__ == "__main__":
    filename = create_file_with_lines(5000)
    estimate_memory_usage(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")