# append_large.py
# Demonstrates efficient appending for large data

import os
import time

def append_in_chunks(filename, num_lines=10000):
    """Append many lines efficiently."""
    print(f"🔹 Appending {num_lines} lines in chunks...")
    start = time.perf_counter()

    chunk_size = 1000
    for i in range(0, num_lines, chunk_size):
        lines = [f"Line {j:05d}\n" for j in range(i, min(i + chunk_size, num_lines))]
        with open(filename, 'a', encoding='utf-8') as f:
            f.writelines(lines)

    elapsed = time.perf_counter() - start
    print(f"   Completed in {elapsed:.4f}s")

def stream_append(filename, generator):
    """Append from a generator (memory efficient)."""
    print(f"🔹 Appending from generator...")
    start = time.perf_counter()

    with open(filename, 'a', encoding='utf-8') as f:
        for line in generator:
            f.write(line)

    elapsed = time.perf_counter() - start
    print(f"   Completed in {elapsed:.4f}s")

def generate_lines(n):
    """Generator that yields lines."""
    for i in range(n):
        yield f"Generated line {i:06d}\n"

if __name__ == "__main__":
    filename = "large_append.txt"

    # Clean start
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Initial header\n")
    print("✅ Starting fresh file")

    # Append with chunks
    append_in_chunks(filename, 10000)

    # Check size
    size = os.path.getsize(filename)
    print(f"📊 File size: {size:,} bytes")

    # Append using generator
    stream_append(filename, generate_lines(5000))

    # Final size
    size = os.path.getsize(filename)
    print(f"📊 Final file size: {size:,} bytes")

    os.remove(filename)
    print("🧹 Cleaned up.")