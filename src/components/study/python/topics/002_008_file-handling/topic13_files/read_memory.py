# read_memory.py
# Demonstrates memory considerations when reading files

import os
import time

def create_test_file(filename, size_mb=2):
    """Create a file of approximately size_mb MB."""
    mb = size_mb * 1024 * 1024
    with open(filename, 'w', encoding='utf-8') as f:
        line = "a" * 80 + "\n"  # 80 chars + newline
        lines = mb // len(line)
        for _ in range(lines):
            f.write(line)
    print(f"✅ Created {size_mb}MB test file: {filename}")

def read_all_at_once(filename):
    """Read the entire file at once and measure time/memory."""
    start = time.perf_counter()
    with open(filename, 'r', encoding='utf-8') as f:
        data = f.read()
    elapsed = time.perf_counter() - start
    print(f"📖 Read all at once: {len(data)} chars, time: {elapsed:.4f}s")

def read_in_chunks(filename, chunk_size=8192):
    """Read the file in chunks and measure time."""
    start = time.perf_counter()
    total = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            total += len(chunk)
    elapsed = time.perf_counter() - start
    print(f"📖 Read in chunks: {total} chars, time: {elapsed:.4f}s")

if __name__ == "__main__":
    # Create a 2MB file for demonstration (adjust if needed)
    create_test_file("mem_test.txt", 2)
    read_all_at_once("mem_test.txt")
    read_in_chunks("mem_test.txt")
    os.remove("mem_test.txt")
    print("🧹 Cleaned up.")