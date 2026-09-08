# 01_speed_benchmark_python_vs_numpy.py
# NumPy Essentials — Topic 0: Introduction to NumPy (Part 1)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Compares the execution speed of pure Python lists vs vectorized NumPy ndarrays:
  - Multiplies 1,000,000 numbers by 2
  - Measures execution time in milliseconds using time.perf_counter()
  - Explains why NumPy is 50x-100x faster (contiguous C buffers & SIMD)
"""

import numpy as np
import time

print("=" * 68)
print("  PART 1: Python List vs NumPy Array Speed Benchmark")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

N = 1_000_000

# 1. Pure Python List with List Comprehension
py_list = list(range(N))
start = time.perf_counter()
py_result = [x * 2 for x in py_list]
py_time = (time.perf_counter() - start) * 1000.0

print(f"\n[1] Python List Comprehension (N={N:,} elements):")
print(f"    Execution Time : {py_time:.2f} ms")

# 2. Vectorized NumPy Array
np_array = np.arange(N)
start = time.perf_counter()
np_result = np_array * 2
np_time = (time.perf_counter() - start) * 1000.0

print(f"\n[2] Vectorized NumPy Array (N={N:,} elements):")
print(f"    Execution Time : {np_time:.2f} ms")

speedup = py_time / np_time if np_time > 0 else 0
print(f"\n[3] Result: NumPy is {speedup:.1f}x FASTER than Python list!")
print("    -> Reason: Contiguous C-array memory and compiled CPU SIMD instructions.")
