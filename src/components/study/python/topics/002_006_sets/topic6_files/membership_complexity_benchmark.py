# ====================================================================
# Topic 6: Membership Testing Using 'in' and 'not in'
# File: membership_complexity_benchmark.py
# Description: Demonstrating O(1) Set Lookup vs O(N) List Lookup Benchmark
# ====================================================================

import time

# Create a large dataset of 1,000,000 student enrollment records
N = 1_000_000
raw_list = list(range(N))
fast_set = set(raw_list)

search_target = N - 1  # Worst-case item (at the very end of the list)

# 1. Benchmarking List Search (O(N) Linear Scan)
start_list = time.perf_counter()
found_in_list = search_target in raw_list
end_list = time.perf_counter()
list_time = (end_list - start_list) * 1000  # in milliseconds

# 2. Benchmarking Set Search (O(1) Instant Hash Jump)
start_set = time.perf_counter()
found_in_set = search_target in fast_set
end_set = time.perf_counter()
set_time = (end_set - start_set) * 1000  # in milliseconds

print(f"Dataset Size: {N:,} elements")
print(f"Target Searched: {search_target:,}")
print(f"\nList Lookup Time (O(N)): {list_time:.4f} ms")
print(f"Set Lookup Time  (O(1)): {set_time:.4f} ms")

if set_time > 0:
    speedup = list_time / max(set_time, 0.00001)
    print(f"\n⚡ Set is approximately {speedup:.1f}x FASTER than List for membership testing!")
