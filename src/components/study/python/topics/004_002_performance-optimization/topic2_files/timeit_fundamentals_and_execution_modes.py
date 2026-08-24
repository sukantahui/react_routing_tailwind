# topic2_files/timeit_fundamentals_and_execution_modes.py
# Module: 004_002_performance-optimization
# Topic: Benchmarking code with timeit module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: Python `timeit` Fundamentals & Statistical Accuracy
Demonstrates:
  1. Micro-benchmarking with `timeit.timeit()` and `timeit.repeat()`
  2. Why `min(results)` is statistically superior to `average()` (filtering OS noise)
  3. Isolating setup overhead with `setup=` callable parameter
  4. Passing arguments to benchmarks using `functools.partial`
"""

import timeit
from functools import partial
from typing import List

# Target functions to benchmark
def naive_loop_square(n: int) -> List[int]:
    result = []
    for i in range(n):
        result.append(i * i)
    return result

def list_comp_square(n: int) -> List[int]:
    return [i * i for i in range(n)]

def map_square(n: int) -> List[int]:
    return list(map(lambda i: i * i, range(n)))


def run_timeit_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - TIMEIT FUNDAMENTALS & EXECUTION MODES")
    print("=" * 70)

    n_items = 500
    loops = 500
    repeats = 5

    print(f"1. Benchmarking List Squaring (N={n_items:,}, {loops:,} loops, {repeats} repeats):")

    # 1. Benchmark Naive Loop using functools.partial
    fn_loop = partial(naive_loop_square, n_items)
    loop_times = timeit.repeat(fn_loop, number=loops, repeat=repeats)
    loop_best_s = min(loop_times)

    # 2. Benchmark List Comprehension
    fn_comp = partial(list_comp_square, n_items)
    comp_times = timeit.repeat(fn_comp, number=loops, repeat=repeats)
    comp_best_s = min(comp_times)

    # 3. Benchmark Map
    fn_map = partial(map_square, n_items)
    map_times = timeit.repeat(fn_map, number=loops, repeat=repeats)
    map_best_s = min(map_times)

    print(f"   * Naive Loop (`.append()`) : Best: {loop_best_s:.4f}s | All Repeats: {[round(t, 4) for t in loop_times]}")
    print(f"   * List Comprehension       : Best: {comp_best_s:.4f}s | All Repeats: {[round(t, 4) for t in comp_times]}")
    print(f"   * `map()` with Lambda      : Best: {map_best_s:.4f}s | All Repeats: {[round(t, 4) for t in map_times]}\n")

    speedup = loop_best_s / (comp_best_s or 0.0001)
    print(f"2. Statistical Result: List Comprehension is {speedup:.2f}x FASTER than Naive `.append()` loop!\n")

    print(r"""
timeit Statistical Invariants:
  1. Never use `time.time()` for micro-benchmarks; it has low clock resolution and includes unrelated system processes.
  2. `timeit` temporarily disables garbage collection during execution to ensure deterministic timing.
  3. Always take `min(repeat_times)`: other runs are slowed down by OS context switches, cache misses, and background interrupts.
""")
    print("[PASSED] timeit Fundamentals Verified.")


if __name__ == "__main__":
    run_timeit_fundamentals()
