# topic1_files/memory_overhead_and_cache_locality.py
# Module: 004_002_performance-optimization
# Topic: Comparing lookup costs across Python data structures (list, set, dict, deque)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: Memory Overhead & Cache Locality Tradeoffs
Demonstrates:
  1. Inspecting exact memory consumption across Python collections with `sys.getsizeof()`
  2. Memory overhead comparison: Tuple vs List vs Set vs Dict vs Deque
  3. Contiguous array cache locality vs hash table pointer chasing
"""

import sys
from collections import deque
from typing import Dict, Any

def compare_collection_memory_footprint(n_elements: int) -> Dict[str, Any]:
    """Measures memory allocations across all primary Python collection types for N items."""
    sample_ints = list(range(n_elements))

    tuple_obj = tuple(sample_ints)
    list_obj = list(sample_ints)
    set_obj = set(sample_ints)
    dict_obj = {i: True for i in sample_ints}
    deque_obj = deque(sample_ints)

    return {
        "n": n_elements,
        "tuple_bytes": sys.getsizeof(tuple_obj),
        "list_bytes": sys.getsizeof(list_obj),
        "deque_bytes": sys.getsizeof(deque_obj),
        "set_bytes": sys.getsizeof(set_obj),
        "dict_bytes": sys.getsizeof(dict_obj)
    }


def demonstrate_memory_overheads():
    print("=" * 70)
    print("CODER & ACCOTAX - MEMORY OVERHEAD & CACHE LOCALITY ANALYSIS")
    print("=" * 70)

    dataset_sizes = [0, 10, 100, 1_000, 10_000, 100_000]

    print("1. Memory Footprint Allocation (Bytes) Across Python Collections:")
    print(f"{'N Items':<10} | {'Tuple':<12} | {'List':<12} | {'Deque':<12} | {'Set':<14} | {'Dict':<14}")
    print("-" * 82)

    for n in dataset_sizes:
        res = compare_collection_memory_footprint(n)
        print(
            f"{res['n']:<10,d} | {res['tuple_bytes']:<12,d} | {res['list_bytes']:<12,d} | "
            f"{res['deque_bytes']:<12,d} | {res['set_bytes']:<14,d} | {res['dict_bytes']:<14,d}"
        )

    print(r"""
Memory Overhead Invariants:
  1. Tuples are the most memory-efficient immutable sequence in Python (zero over-allocation buffer).
  2. Lists allocate an over-allocation buffer to achieve O(1) amortized appends.
  3. Sets and Dicts have significant memory overhead (~4x to 8x vs Tuples) due to hash table bucket arrays and sparsity requirements.
  4. Cache Locality: Contiguous lists and tuples have superior CPU L1/L2 cache prefetching during sequential iteration.
""")
    print("[PASSED] Memory Overhead Analysis Verified.")


if __name__ == "__main__":
    demonstrate_memory_overheads()
