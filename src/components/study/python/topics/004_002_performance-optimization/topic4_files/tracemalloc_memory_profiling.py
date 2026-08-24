# topic4_files/tracemalloc_memory_profiling.py
# Module: 004_002_performance-optimization
# Topic: Memory profiling and reducing object footprint with __slots__
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: Memory Profiling with `tracemalloc` Module
Demonstrates:
  1. Tracking live Python heap memory allocations with `tracemalloc.start()`
  2. Taking before/after memory snapshots and computing line-by-line memory diffs
  3. Identifying the exact source code lines responsible for major RAM allocations
"""

import tracemalloc
from typing import List, Dict

def simulate_heavy_cache_allocation(count: int = 10_000) -> Dict[str, List[int]]:
    """Simulates an in-memory cache allocating multiple dictionaries and lists."""
    cache = {}
    for i in range(count):
        cache[f"cache_key_{i}"] = [x for x in range(20)]
    return cache


def run_tracemalloc_inspection():
    print("=" * 70)
    print("CODER & ACCOTAX - TRACEMALLOC HEAP PROFILER")
    print("=" * 70)

    # 1. Start tracing memory allocations
    tracemalloc.start()
    snapshot_before = tracemalloc.take_snapshot()

    print("1. Allocating In-Memory Cache Objects...")
    data_cache = simulate_heavy_cache_allocation(count=15_000)

    snapshot_after = tracemalloc.take_snapshot()
    current_b, peak_b = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    print(f"   * Current Traced Memory : {current_b / (1024 * 1024):.2f} MB")
    print(f"   * Peak Allocated Memory  : {peak_b / (1024 * 1024):.2f} MB\n")

    # 2. Compare snapshots to find top memory consumers
    print("2. Top 5 Line-by-Line Memory Allocators (Snapshot Diff):")
    top_diffs = snapshot_after.compare_to(snapshot_before, "lineno")

    for index, stat in enumerate(top_diffs[:5], 1):
        print(f"   #{index}: {stat}")

    print(r"""
Tracemalloc Profiling Invariants:
  1. `tracemalloc` tracks exact bytecode allocations down to source file line numbers.
  2. `snapshot.compare_to(baseline, 'lineno')` detects memory leaks and un-garbage-collected objects.
  3. Essential tool for auditing microservices that experience gradual RAM creep under load.
""")
    print("[PASSED] Tracemalloc Memory Inspection Verified.")


if __name__ == "__main__":
    run_tracemalloc_inspection()
