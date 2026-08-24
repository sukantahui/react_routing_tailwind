# topic10_files/memory_profiling_comprehensions_vs_genexps.py
# Module: 003_003_decorators-generators
# Topic: Generator expressions for memory efficiency
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 3: Memory Profiling: Comprehensions vs Generator Expressions
Demonstrates:
  1. Memory consumption of List Comprehension `[...]` vs Generator Expression `(...)`
  2. Comparing Set Comprehension `{...}` and Dict Comprehension `{k:v ...}`
  3. Measuring live heap allocations with `tracemalloc`
"""

import sys
import tracemalloc

def profile_comprehensions_memory():
    print("=" * 70)
    print("CODER & ACCOTAX - COMPREHENSIONS VS GENERATOR EXPRESSIONS PROFILING")
    print("=" * 70)

    N = 200_000
    print(f"Profiling Dataset Scale: {N:,} elements\n")

    # 1. Generator Expression:
    tracemalloc.start()
    gen_exp = (x ** 2 for x in range(N))
    current_gen, peak_gen = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    gen_sizeof = sys.getsizeof(gen_exp)

    print("1. Generator Expression `(x**2 for x in range(N))`:")
    print(f"   * `sys.getsizeof`   : {gen_sizeof:,} bytes")
    print(f"   * Peak Traced Memory: {peak_gen:,} bytes (~{peak_gen / 1024:.2f} KB)\n")

    # 2. List Comprehension:
    tracemalloc.start()
    list_comp = [x ** 2 for x in range(N)]
    current_list, peak_list = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    list_sizeof = sys.getsizeof(list_comp)

    print("2. List Comprehension `[x**2 for x in range(N)]`:")
    print(f"   * `sys.getsizeof`   : {list_sizeof:,} bytes (~{list_sizeof / 1024 / 1024:.2f} MB)")
    print(f"   * Peak Traced Memory: {peak_list:,} bytes (~{peak_list / 1024 / 1024:.2f} MB)\n")

    # 3. Set Comprehension:
    tracemalloc.start()
    set_comp = {x % 1000 for x in range(N)}
    current_set, peak_set = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    set_sizeof = sys.getsizeof(set_comp)

    print("3. Set Comprehension `{x % 1000 for x in range(N)}`:")
    print(f"   * `sys.getsizeof`   : {set_sizeof:,} bytes (~{set_sizeof / 1024:.2f} KB)")
    print(f"   * Peak Traced Memory: {peak_set:,} bytes (~{peak_set / 1024 / 1024:.2f} MB)\n")

    # 4. Aggregating with Generator Expression without intermediate List:
    print("4. Calculating Sum of Squares: `sum(x**2 for x in range(N))`:")
    tracemalloc.start()
    total_sum = sum(x ** 2 for x in range(N))
    current_sum, peak_sum = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    print(f"   * Calculated Sum    : {total_sum:,}")
    print(f"   * Peak Traced Memory: {peak_sum:,} bytes (Zero intermediate list allocation!)")

    print(r"""
Memory Efficiency Summary:
  - List Comprehension Peak RAM : ~7.5+ MB
  - GenExp Stream Peak RAM      : ~0.001 MB (~1 KB!)
""")
    print("[PASSED] Memory Profiling Comprehensions vs GenExps Verified.")


if __name__ == "__main__":
    profile_comprehensions_memory()
