# performance_compare.py
# Compares the speed of writing/reading text vs binary for numeric data

import time
import struct
import array

def write_text_numbers(n=100000):
    """Write numbers as text (one per line)."""
    start = time.perf_counter()
    with open('numbers_text.txt', 'w') as f:
        for i in range(n):
            f.write(f"{i}\n")
    elapsed = time.perf_counter() - start
    return elapsed

def write_binary_numbers(n=100000):
    """Write numbers as binary using struct (4 bytes each)."""
    start = time.perf_counter()
    with open('numbers_binary.bin', 'wb') as f:
        for i in range(n):
            f.write(struct.pack('i', i))
    elapsed = time.perf_counter() - start
    return elapsed

def read_text_numbers():
    """Read numbers from text file."""
    start = time.perf_counter()
    with open('numbers_text.txt', 'r') as f:
        data = [int(line.strip()) for line in f]
    elapsed = time.perf_counter() - start
    return elapsed, len(data)

def read_binary_numbers():
    """Read numbers from binary file using struct."""
    start = time.perf_counter()
    with open('numbers_binary.bin', 'rb') as f:
        raw = f.read()
        data = list(struct.unpack(f'{len(raw)//4}i', raw))
    elapsed = time.perf_counter() - start
    return elapsed, len(data)

if __name__ == "__main__":
    N = 100000
    print(f"⏱️ Performance test with {N} numbers:")
    
    t_text_write = write_text_numbers(N)
    t_bin_write = write_binary_numbers(N)
    print(f"✍️ Write: Text {t_text_write:.4f}s, Binary {t_bin_write:.4f}s")
    
    t_text_read, count = read_text_numbers()
    t_bin_read, count2 = read_binary_numbers()
    print(f"📖 Read:  Text {t_text_read:.4f}s, Binary {t_bin_read:.4f}s")
    
    # File sizes
    import os
    size_text = os.path.getsize('numbers_text.txt')
    size_bin = os.path.getsize('numbers_binary.bin')
    print(f"📦 Size:  Text {size_text} bytes, Binary {size_bin} bytes")