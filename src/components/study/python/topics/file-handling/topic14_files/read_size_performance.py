# read_size_performance.py
# Compares performance of different chunk sizes

import os
import time
import random

def create_file_with_random_data(filename, size_mb=1):
    """Create a binary file with random data."""
    mb = size_mb * 1024 * 1024
    data = bytes(random.getrandbits(8) for _ in range(mb))
    with open(filename, 'wb') as f:
        f.write(data)
    print(f"✅ Created {size_mb}MB binary file: {filename}")

def read_whole_file(filename):
    """Read entire file at once."""
    start = time.perf_counter()
    with open(filename, 'rb') as f:
        data = f.read()
    elapsed = time.perf_counter() - start
    return len(data), elapsed

def read_in_chunks(filename, chunk_size):
    """Read file in chunks of given size."""
    start = time.perf_counter()
    total = 0
    with open(filename, 'rb') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            total += len(chunk)
    elapsed = time.perf_counter() - start
    return total, elapsed

if __name__ == "__main__":
    # Create a 2MB file for testing (adjust if needed)
    create_file_with_random_data("perf_test.bin", 2)

    # Test different sizes
    sizes = [1024, 4096, 8192, 16384, 65536, 1048576]
    print("\n⏱️ Performance (reading 2MB file):")
    print(f"  {'Chunk size':<12} {'Time (s)':<12} {'Chunks':<8}")

    for size in sizes:
        total, elapsed = read_in_chunks("perf_test.bin", size)
        chunks = total // size if size <= total else 1
        print(f"  {size:<12} {elapsed:<12.4f} {chunks:<8}")

    # Compare with whole file read
    total, elapsed = read_whole_file("perf_test.bin")
    print(f"  {'whole':<12} {elapsed:<12.4f} {'1':<8}")

    os.remove("perf_test.bin")
    print("🧹 Cleaned up.")