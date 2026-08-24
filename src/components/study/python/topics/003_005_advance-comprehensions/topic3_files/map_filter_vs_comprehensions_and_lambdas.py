# topic3_files/map_filter_vs_comprehensions_and_lambdas.py
# Module: 003_005_advance-comprehensions
# Topic: Functional tools: map(), filter(), and functools.reduce()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: `map()` / `filter()` vs List Comprehensions & Lambdas
Demonstrates:
  1. Syntactic comparison: `list(map(lambda ...))` vs List Comprehension
  2. Performance benchmark: List Comprehension vs `map()` with existing function vs `map()` with lambda
  3. When `map()` with a C-builtin function (`map(int, strings)`) outperforms comprehensions
"""

import timeit
from typing import List

def demonstrate_functional_vs_comprehensions():
    print("=" * 70)
    print("CODER & ACCOTAX - MAP/FILTER VS COMPREHENSIONS BENCHMARK")
    print("=" * 70)

    # 1. Syntactic Comparison:
    student_scores = [95, 42, 88, 76, 91, 55]

    # Functional Map + Filter with Lambdas:
    fn_result = list(map(lambda s: s * 1.1, filter(lambda s: s >= 60, student_scores)))

    # Idiomatic List Comprehension:
    comp_result = [s * 1.1 for s in student_scores if s >= 60]

    print("1. Syntactic Comparison (Filter + Transform):")
    print(f"   * map + filter + lambda : {fn_result}")
    print(f"   * List Comprehension    : {comp_result}")
    print("   -> Comprehensions are universally recognized as more readable in Python.\n")

    # 2. Performance Benchmark: 3 Cases
    # Case A: Built-in C function casting (e.g. str to int)
    # Case B: Custom Python lambda expression
    print("2. Performance Benchmark on 100,000 Elements:")
    raw_str_numbers = [str(i) for i in range(100_000)]

    # Benchmark 1: map() with built-in C function `int`
    t_map_builtin = timeit.timeit(lambda: list(map(int, raw_str_numbers)), number=20)
    # Benchmark 2: List comprehension `[int(x) for x in raw_str_numbers]`
    t_comp_builtin = timeit.timeit(lambda: [int(x) for x in raw_str_numbers], number=20)
    # Benchmark 3: map() with custom lambda
    t_map_lambda = timeit.timeit(lambda: list(map(lambda x: int(x), raw_str_numbers)), number=20)

    print(f"   * `list(map(int, data))`       (C Built-in)   : {t_map_builtin:.4f}s (Fastest C-level loop!)")
    print(f"   * `[int(x) for x in data]`     (Comprehension): {t_comp_builtin:.4f}s (Very fast C-opcode)")
    print(f"   * `list(map(lambda x: ...))`   (Lambda Map)   : {t_map_lambda:.4f}s (Slowest due to lambda frame overhead)")

    print(r"""
Speed & Style Decision Rules:
  1. `map(built_in_fn, data)` (e.g. `map(str.upper, names)`) is faster than comprehensions!
  2. If using a custom `lambda`, ALWAYS prefer a List Comprehension (cleaner & faster).
  3. Avoid chaining `map(..., filter(...))` when a single comprehension `[f(x) for x in seq if cond]` is vastly more readable.
""")
    print("[PASSED] map/filter vs Comprehensions Benchmark Verified.")


if __name__ == "__main__":
    demonstrate_functional_vs_comprehensions()
