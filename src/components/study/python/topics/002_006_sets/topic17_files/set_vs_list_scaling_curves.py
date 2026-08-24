# ====================================================================
# Topic 17: Performance Benefits of Sets
# File: set_vs_list_scaling_curves.py
# Description: Demonstrating how list lookup time scales linearly while set time stays flat
# ====================================================================

import time

sizes = [1000, 10000, 100000, 500000]

print(f"{'Size (N)':<12} | {'List Lookup (s)':<18} | {'Set Lookup (s)':<18} | {'Speedup Factor'}")
print("-" * 65)

for n in sizes:
    test_list = list(range(n))
    test_set = set(test_list)
    search_target = -1  # Not present -> Forces full worst-case scan

    # Time List
    start = time.perf_counter()
    for _ in range(50):
        _ = search_target in test_list
    l_time = time.perf_counter() - start

    # Time Set
    start = time.perf_counter()
    for _ in range(50):
        _ = search_target in test_set
    s_time = time.perf_counter() - start

    speedup = l_time / s_time if s_time > 0 else 0
    print(f"{n:<12,d} | {l_time:<18.6f} | {s_time:<18.6f} | {speedup:,.0f}x faster")
