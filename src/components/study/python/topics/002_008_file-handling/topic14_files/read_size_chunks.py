# read_size_chunks.py
# Demonstrates the chunked reading pattern

import os
import time

def create_large_file(filename="large.txt", size_mb=1):
    """Create a text file of approximately size_mb MB."""
    with open(filename, 'w', encoding='utf-8') as f:
        # Write a line of 80 chars repeated
        line = "a" * 80 + "\n"
        lines = (size_mb * 1024 * 1024) // len(line)
        for _ in range(lines):
            f.write(line)
    print(f"✅ Created {size_mb}MB file: {filename}")

def process_chunk(chunk):
    """Simulate processing a chunk (e.g., counting characters)."""
    return len(chunk)

def read_in_chunks(filename, chunk_size):
    """Read the file in chunks and count total characters."""
    total = 0
    chunks = 0
    start = time.perf_counter()

    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            total += process_chunk(chunk)
            chunks += 1

    elapsed = time.perf_counter() - start
    return total, chunks, elapsed

if __name__ == "__main__":
    # Create a 1MB file (adjust if needed)
    create_large_file("chunk_test.txt", 1)

    # Try different chunk sizes
    sizes = [1024, 4096, 8192, 16384, 65536]
    print("\n📊 Performance comparison:")
    for size in sizes:
        total, chunks, elapsed = read_in_chunks("chunk_test.txt", size)
        print(f"  Chunk size {size:6d}: {chunks:4d} chunks, {elapsed:.4f}s, {total} chars")

    os.remove("chunk_test.txt")
    print("🧹 Cleaned up.")