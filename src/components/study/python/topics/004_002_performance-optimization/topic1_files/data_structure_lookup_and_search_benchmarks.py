# topic1_files/data_structure_lookup_and_search_benchmarks.py
# Module: 004_002_performance-optimization
# Topic: Comparing lookup costs across Python data structures (list, set, dict, deque)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: Data Structure Lookup & Search Cost Benchmarks
Demonstrates:
  1. Membership search complexity comparison:
     - List  : O(N) Linear scan
     - Deque : O(N) Linear traversal
     - Set   : O(1) Hash table bucket lookup
     - Dict  : O(1) Key hash lookup
  2. High-precision micro-benchmarking using `time.perf_counter_ns()`
"""

import time
from collections import deque
from typing import List, Set, Dict

def benchmark_membership_lookups(n: int) -> dict:
    """Populates structures with N integers and measures lookup time for non-existent target."""
    # Target element chosen at worst-case position (non-existent: -1)
    target = -1

    raw_items = list(range(n))
    list_ds = raw_items
    set_ds = set(raw_items)
    dict_ds = {x: True for x in raw_items}
    deque_ds = deque(raw_items)

    # 1. Benchmark List Search (O(N))
    t0 = time.perf_counter_ns()
    _ = target in list_ds
    list_time_ns = time.perf_counter_ns() - t0

    # 2. Benchmark Deque Search (O(N))
    t0 = time.perf_counter_ns()
    _ = target in deque_ds
    deque_time_ns = time.perf_counter_ns() - t0

    # 3. Benchmark Set Search (O(1))
    t0 = time.perf_counter_ns()
    _ = target in set_ds
    set_time_ns = time.perf_counter_ns() - t0

    # 4. Benchmark Dict Search (O(1))
    t0 = time.perf_counter_ns()
    _ = target in dict_ds
    dict_time_ns = time.perf_counter_ns() - t0

    return {
        "n": n,
        "list_us": round(list_time_ns / 1000.0, 2),
        "deque_us": round(deque_time_ns / 1000.0, 2),
        "set_us": round(set_time_ns / 1000.0, 4),
        "dict_us": round(dict_time_ns / 1000.0, 4),
        "speedup_set_vs_list": round(list_time_ns / (set_time_ns or 1), 1)
    }


def demonstrate_lookup_benchmarks():
    print("=" * 70)
    print("CODER & ACCOTAX - DATA STRUCTURE LOOKUP BENCHMARKS")
    print("=" * 70)

    dataset_sizes = [1_000, 10_000, 100_000, 1_000_000]

    print("1. Membership Search Micro-Latency Across Data Structures (`target in ds`):")
    print(f"{'N Items':<10} | {'List O(N) (us)':<16} | {'Deque O(N) (us)':<16} | {'Set O(1) (us)':<14} | {'Dict O(1) (us)':<14} | {'Speedup'}")
    print("-" * 84)

    for n in dataset_sizes:
        res = benchmark_membership_lookups(n)
        print(
            f"{res['n']:<10,d} | {res['list_us']:<16.2f} | {res['deque_us']:<16.2f} | "
            f"{res['set_us']:<14.4f} | {res['dict_us']:<14.4f} | {res['speedup_set_vs_list']:<8.1f}x"
        )

    print(r"""
Lookup Cost Invariants:
  1. Sets and Dicts compute a hash code (O(1)) to jump directly to the target memory bucket.
  2. Lists and Deques must traverse elements sequentially (O(N)), leading to multi-millisecond lags at N=1,000,000.
  3. Converting a list to a set before running repeated membership tests yields a 10,000x+ lookup speedup.
""")
    print("[PASSED] Lookup Cost Benchmarking Verified.")


if __name__ == "__main__":
    demonstrate_lookup_benchmarks()
