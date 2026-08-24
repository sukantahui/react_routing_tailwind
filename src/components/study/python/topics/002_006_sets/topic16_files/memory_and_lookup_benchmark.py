# ====================================================================
# Topic 16: Sets vs Lists vs Tuples
# File: memory_and_lookup_benchmark.py
# Description: Memory footprint and membership lookup benchmarking
# ====================================================================

import sys
import time

sample_data = list(range(100000))
sample_tuple = tuple(sample_data)
sample_set = set(sample_data)

# 1. Memory Overhead Comparison (in bytes)
list_bytes = sys.getsizeof(sample_data)
tuple_bytes = sys.getsizeof(sample_tuple)
set_bytes = sys.getsizeof(sample_set)

print("--- Memory Footprint for 100,000 Integers ---")
print(f"Tuple Size: {tuple_bytes:,} bytes (Most Compact)")
print(f"List Size:  {list_bytes:,} bytes (~{list_bytes/tuple_bytes:.2f}x tuple)")
print(f"Set Size:   {set_bytes:,} bytes (~{set_bytes/tuple_bytes:.2f}x tuple - Hash Table Overhead)")

# 2. Membership Testing Benchmark ('in' operator)
target_value = 99999

# List Lookup
start = time.perf_counter()
for _ in range(1000):
    _ = target_value in sample_data
list_time = time.perf_counter() - start

# Set Lookup
start = time.perf_counter()
for _ in range(1000):
    _ = target_value in sample_set
set_time = time.perf_counter() - start

print(f"\n--- 1,000 Membership Lookups Time ---")
print(f"List Lookup Time (O(N)): {list_time:.6f} seconds")
print(f"Set Lookup Time (O(1)):  {set_time:.6f} seconds")
print(f"Speedup Factor:          {list_time / set_time:.1f}x FASTER with Sets!")
