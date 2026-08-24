# writelines_performance.py
# Compares performance of writelines vs multiple write calls

import os
import time

def write_with_write(num_lines=10000):
    """Write many lines using write() in a loop."""
    filename = "write_perf.txt"
    start = time.perf_counter()

    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(num_lines):
            f.write(f"Line {i:05d}\n")

    elapsed = time.perf_counter() - start
    os.remove(filename)
    return elapsed

def write_with_writelines(num_lines=10000):
    """Write many lines using writelines with a list."""
    filename = "writelines_perf.txt"
    start = time.perf_counter()

    lines = [f"Line {i:05d}\n" for i in range(num_lines)]

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    elapsed = time.perf_counter() - start
    os.remove(filename)
    return elapsed

def write_with_writelines_generator(num_lines=10000):
    """Write many lines using writelines with a generator."""
    filename = "writelines_gen_perf.txt"
    start = time.perf_counter()

    def gen_lines(n):
        for i in range(n):
            yield f"Line {i:05d}\n"

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(gen_lines(num_lines))

    elapsed = time.perf_counter() - start
    os.remove(filename)
    return elapsed

if __name__ == "__main__":
    num_lines = 50000
    print(f"⏱️ Performance test: writing {num_lines:,} lines")

    t1 = write_with_write(num_lines)
    print(f"  write() in loop:   {t1:.4f}s")

    t2 = write_with_writelines(num_lines)
    print(f"  writelines(list):  {t2:.4f}s")

    t3 = write_with_writelines_generator(num_lines)
    print(f"  writelines(gen):   {t3:.4f}s")

    print("\n💡 writelines() is faster because it reduces Python-level calls.")