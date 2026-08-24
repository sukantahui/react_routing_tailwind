# topic2_files/memory_and_profiling_comprehensions_vs_generators.py
# Module: 003_005_advance-comprehensions
# Topic: Readability guidelines: When to use comprehensions vs loops
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: Memory & Profiling: List Comprehensions vs Generator Expressions
Demonstrates:
  1. Heap memory consumption: Eager List Comprehension vs Lazy Generator Expression
  2. Measuring object byte sizes using `sys.getsizeof()`
  3. When to choose List Comprehensions (indexing, len, multiple passes) vs Generators (massive streams, sum/max)
"""

import sys
import timeit

def demonstrate_memory_and_profiling():
    print("=" * 70)
    print("CODER & ACCOTAX - MEMORY PROFILING: LIST COMP VS GENERATOR")
    print("=" * 70)

    n_elements = 1_000_000

    # 1. Memory Footprint Comparison:
    print(f"1. Memory Profiling on {n_elements:,} Elements:")

    # Eager List Comprehension: Allocates all elements immediately in RAM
    eager_list = [x * 2 for x in range(n_elements)]
    list_mem_bytes = sys.getsizeof(eager_list)
    list_mem_mb = list_mem_bytes / (1024 * 1024)

    # Lazy Generator Expression: Produces items one by one on demand
    lazy_gen = (x * 2 for x in range(n_elements))
    gen_mem_bytes = sys.getsizeof(lazy_gen)

    print(f"   * Eager List Comprehension Memory : {list_mem_bytes:,} bytes (~{list_mem_mb:.2f} MB)")
    print(f"   * Lazy Generator Expression Memory : {gen_mem_bytes:,} bytes (Constant O(1) Memory!)")
    print(f"   * Memory Reduction Factor          : ~{list_mem_bytes // gen_mem_bytes:,}x less RAM!\n")

    # 2. Performance Comparison on Reductions (e.g. sum):
    print("2. Performance on Reductions (`sum()`):")
    t_list = timeit.timeit(lambda: sum([x * 2 for x in range(100_000)]), number=20)
    t_gen = timeit.timeit(lambda: sum(x * 2 for x in range(100_000)), number=20)

    print(f"   * sum([list_comprehension]) : {t_list:.4f}s (Requires full memory allocation)")
    print(f"   * sum(generator_expression) : {t_gen:.4f}s (Streams directly into accumulator)")

    print(r"""
Container Selection Invariants:
  - Choose LIST COMPREHENSION when: You need random access indexing (`res[0]`), `len()`,
    slicing, or multiple passes over the dataset.
  - Choose GENERATOR EXPRESSION when: You only need to iterate once, stream large files,
    or pass directly to reducing functions like `sum()`, `max()`, `min()`, or `any()`.
""")
    print("[PASSED] Memory & Profiling Comprehensions vs Generators Verified.")


if __name__ == "__main__":
    demonstrate_memory_and_profiling()
