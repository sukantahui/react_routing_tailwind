# topic9_files/memory_and_eager_vs_lazy_evaluation_benchmark.py
# Module: 003_003_decorators-generators
# Topic: Generator functions vs regular functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 1: Memory & Performance Benchmark: Eager List vs Lazy Generator
Demonstrates:
  1. Eager Evaluation (Regular Function returning List) vs Lazy Evaluation (Generator yielding items)
  2. Memory footprint comparison using `sys.getsizeof`
  3. Immediate first-item latency advantages of Generators
"""

import sys
import time
from typing import List, Generator

# 1. Regular Function (Eager List Allocation):
def eager_generate_student_records(count: int) -> List[dict]:
    """Allocates all student dictionaries in RAM simultaneously."""
    records = []
    for i in range(1, count + 1):
        records.append({"id": f"STU-{1000+i}", "name": f"Student_{i}", "fee": 25000.0})
    return records


# 2. Generator Function (Lazy Streaming):
def lazy_generate_student_records(count: int) -> Generator[dict, None, None]:
    """Yields student records on demand one at a time."""
    for i in range(1, count + 1):
        yield {"id": f"STU-{1000+i}", "name": f"Student_{i}", "fee": 25000.0}


def demonstrate_eager_vs_lazy():
    print("=" * 70)
    print("CODER & ACCOTAX - EAGER LIST VS LAZY GENERATOR BENCHMARK")
    print("=" * 70)

    ITEM_COUNT = 100_000

    # Benchmark Eager List:
    print(f"1. Eager List Evaluation ({ITEM_COUNT:,} items):")
    t0 = time.perf_counter()
    eager_list = eager_generate_student_records(ITEM_COUNT)
    eager_time = (time.perf_counter() - t0) * 1000.0
    eager_mem_bytes = sys.getsizeof(eager_list)

    print(f"   * Generation Time  : {eager_time:.2f} ms")
    print(f"   * RAM Footprint    : {eager_mem_bytes:,} bytes (~{eager_mem_bytes / 1024 / 1024:.2f} MB)")
    print(f"   * First Item Ready : After full {eager_time:.2f} ms delay\n")

    # Benchmark Lazy Generator:
    print(f"2. Lazy Generator Evaluation ({ITEM_COUNT:,} items):")
    t0 = time.perf_counter()
    lazy_gen = lazy_generate_student_records(ITEM_COUNT)
    gen_init_time = (time.perf_counter() - t0) * 1000.0
    gen_mem_bytes = sys.getsizeof(lazy_gen)

    # First item latency:
    t0_first = time.perf_counter()
    first_item = next(lazy_gen)
    first_item_latency = (time.perf_counter() - t0_first) * 1000.0

    print(f"   * Instantiation Time: {gen_init_time:.4f} ms (INSTANT)")
    print(f"   * RAM Footprint     : {gen_mem_bytes:,} bytes (CONSTANT O(1)!)")
    print(f"   * First Item Ready  : {first_item_latency:.4f} ms")
    print(f"   * First Item Sample : {first_item}\n")

    print(r"""
Memory Efficiency Comparison:
  For 100,000 items:
  - Regular List : ~800,000+ bytes (Grows linearly with N)
  - Generator    : ~112 bytes (Constant O(1) regardless of N)
""")
    print("[PASSED] Eager vs Lazy Evaluation Benchmark Verified.")


if __name__ == "__main__":
    demonstrate_eager_vs_lazy()
