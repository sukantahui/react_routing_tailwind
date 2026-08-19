# large_file_processing.py
# Demonstrates processing large files efficiently

import os
import time

def create_large_file(filename="large.txt", num_lines=100000):
    """Create a moderately large file."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:06d}: " + "abcdefghijklmnopqrstuvwxyz" * 4 + "\n")
    print(f"✅ Created file with {num_lines:,} lines: {filename}")
    return filename

def process_large_file(filename):
    """Process a large file line by line."""
    print(f"\n📊 Processing large file: {filename}")
    start = time.perf_counter()

    line_count = 0
    total_chars = 0
    startswith_a_count = 0

    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line_count += 1
            total_chars += len(line)
            if line.startswith('Line'):
                startswith_a_count += 1

    elapsed = time.perf_counter() - start
    print(f"   Lines: {line_count:,}")
    print(f"   Total chars: {total_chars:,}")
    print(f"   Lines starting with 'Line': {startswith_a_count:,}")
    print(f"   Time: {elapsed:.4f}s")
    print(f"   Memory: Low (only one line at a time)")

def process_with_batch(filename, batch_size=1000):
    """Process in batches (for batching operations)."""
    print(f"\n📦 Processing in batches of {batch_size}:")
    start = time.perf_counter()

    batch_count = 0
    total_lines = 0

    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            lines = []
            for _ in range(batch_size):
                line = f.readline()
                if not line:
                    break
                lines.append(line)
            if not lines:
                break
            batch_count += 1
            total_lines += len(lines)
            # Process batch here (e.g., database insert)

    elapsed = time.perf_counter() - start
    print(f"   Batches: {batch_count}")
    print(f"   Total lines: {total_lines:,}")
    print(f"   Time: {elapsed:.4f}s")

if __name__ == "__main__":
    # Create a file with 100,000 lines (adjust if needed)
    filename = create_large_file(100000)
    process_large_file(filename)
    process_with_batch(filename, 1000)
    os.remove(filename)
    print("🧹 Cleaned up.")