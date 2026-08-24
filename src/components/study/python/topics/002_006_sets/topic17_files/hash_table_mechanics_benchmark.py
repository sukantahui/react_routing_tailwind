# ====================================================================
# Topic 17: Performance Benefits of Sets
# File: hash_table_mechanics_benchmark.py
# Description: Demonstrating O(1) hash table lookup vs O(N) linear array scan
# ====================================================================

import time

# Creating a dataset of 500,000 student enrollment records in West Bengal
ELEMENT_COUNT = 500000
raw_list = list(range(ELEMENT_COUNT))
raw_set = set(raw_list)

# Target element located at the very end of the collection (Worst case for list)
target_key = ELEMENT_COUNT - 1

# 1. Benchmarking List Membership Testing ('in' operator)
start_list = time.perf_counter()
for _ in range(100):
    _ = target_key in raw_list
time_list = time.perf_counter() - start_list

# 2. Benchmarking Set Membership Testing ('in' operator)
start_set = time.perf_counter()
for _ in range(100):
    _ = target_key in raw_set
time_set = time.perf_counter() - start_set

print(f"--- Benchmark Results (N = {ELEMENT_COUNT:,} elements, 100 queries) ---")
print(f"List Search Time (O(N)): {time_list:.6f} seconds")
print(f"Set Search Time (O(1)):  {time_set:.6f} seconds")
print(f"Performance Speedup:     {time_list / time_set:,.1f}x FASTER with Sets!")
