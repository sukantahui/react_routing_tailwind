# topic6_files/performance_and_memory_architecture.py
# Module: 002_007_string-processing
# Topic: Joining Lists of Strings with join()
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 6 - File 3: CPython Memory Architecture & O(N) vs O(N^2) Performance Benchmark
Demonstrates:
  1. Internal CPython string allocation mechanics (Two-pass join algorithm)
  2. Why string += in loops leads to catastrophic O(N^2) quadratic reallocation
  3. Why join() achieves O(N) linear time with a single heap allocation
  4. Empirical benchmark: += vs join() vs StringIO across 20,000 strings
"""

import time
import io
import sys

def explain_cpython_two_pass_algorithm():
    print("=" * 70)
    print("1. CPYTHON INTERNAL MEMORY ARCHITECTURE: TWO-PASS join()")
    print("=" * 70)
    print("""
When you call `separator.join(list_of_strings)`, CPython executes a 2-Pass C function:
  Pass 1 (Size Calculation):
    Iterates through the list in C, sums up the exact byte length of every string 
    plus (N - 1) * len(separator), and determines the unified Unicode character width (PEP 393).
  Memory Allocation:
    Allocates EXACTLY ONE contiguous memory block on the heap with the pre-calculated size.
  Pass 2 (Memory Copy):
    Copies the byte contents of each string and separator directly into the single buffer 
    using native C memcpy() without any intermediate object creation!

Contrast with '+=' Loop Concatenation (Quadratic O(N^2) Nightmare):
  On every single iteration 's += word', Python must:
    1. Allocate a brand-new memory block for (len(s) + len(word)).
    2. Copy all previous characters from 's' into the new block.
    3. Copy 'word' into the new block.
    4. Deallocate the old 's' object.
  For N strings of length L, copying 1L + 2L + 3L + ... + NL bytes = O(N^2) operations!
""")


def run_empirical_benchmark():
    print("=" * 70)
    print("2. EMPIRICAL BENCHMARK: join() VS += LOOP VS StringIO")
    print("=" * 70)

    num_items = 20000
    token_list = [f"Token_{i:05d}" for i in range(num_items)]

    print(f"Dataset Size : {num_items:,} strings (approx {num_items * 11 / 1024:.1f} KB)\n")

    # Method 1: List append + ''.join() (Idiomatic Pythonic approach)
    t0 = time.perf_counter()
    res_join = ",".join(token_list)
    time_join = time.perf_counter() - t0

    # Method 2: map(str, ...) + ''.join()
    t0 = time.perf_counter()
    res_map = ",".join(map(str, token_list))
    time_map = time.perf_counter() - t0

    # Method 3: io.StringIO stream buffer
    t0 = time.perf_counter()
    sio = io.StringIO()
    for i, tok in enumerate(token_list):
        if i > 0:
            sio.write(",")
        sio.write(tok)
    res_sio = sio.getvalue()
    time_sio = time.perf_counter() - t0

    # Method 4: += loop concatenation (O(N^2) - Warning: slow!)
    t0 = time.perf_counter()
    res_concat = ""
    for i, tok in enumerate(token_list):
        if i > 0:
            res_concat += ","
        res_concat += tok
    time_concat = time.perf_counter() - t0

    # Verify all outputs match identically
    assert res_join == res_map == res_sio == res_concat
    print("[Assertion Passed] All 4 methods produced 100% identical output strings!\n")

    # Output Benchmark Results Table
    header = f"{'METHOD':<30} | {'EXECUTION TIME':<16} | {'RELATIVE SPEED'}"
    print(header)
    print("-" * len(header))
    print(f"{'1. delimiter.join(list)':<30} | {time_join * 1000:>10.2f} ms     | {'1.00x (FASTEST)'}")
    print(f"{'2. delimiter.join(map)':<30} | {time_map * 1000:>10.2f} ms     | {f'{time_map / time_join:.2f}x'}")
    print(f"{'3. io.StringIO buffer':<30} | {time_sio * 1000:>10.2f} ms     | {f'{time_sio / time_join:.2f}x slower'}")
    print(f"{'4. str += in loop [O(N^2)]':<30} | {time_concat * 1000:>10.2f} ms     | {f'{time_concat / time_join:.2f}x SLOWER (AVOID!)'}")
    print("-" * len(header))


if __name__ == "__main__":
    explain_cpython_two_pass_algorithm()
    run_empirical_benchmark()
