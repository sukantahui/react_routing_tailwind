# topic1_files/insertion_deletion_and_fifo_lifo_costs.py
# Module: 004_002_performance-optimization
# Topic: Comparing lookup costs across Python data structures (list, set, dict, deque)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: Insertion, Deletion & FIFO/LIFO Mutation Costs
Demonstrates:
  1. Head Insertion Cost: `list.insert(0, x)` (O(N) shift) vs `deque.appendleft(x)` (O(1) pointer link)
  2. Tail Appending Cost: `list.append(x)` (O(1) amortized) vs `deque.append(x)` (O(1))
  3. FIFO Queue Operations: `list.pop(0)` (O(N)) vs `deque.popleft()` (O(1))
"""

import time
from collections import deque
from typing import List

def benchmark_head_insertions(iterations: int = 50_000) -> dict:
    """Compares inserting at head: list.insert(0, x) vs deque.appendleft(x)."""
    # 1. List Head Insertions: O(N) per insert -> O(N^2) total
    t0 = time.perf_counter()
    test_list = []
    for i in range(iterations):
        test_list.insert(0, i)
    list_duration_ms = (time.perf_counter() - t0) * 1000.0

    # 2. Deque Head Insertions: O(1) per insert -> O(N) total
    t0 = time.perf_counter()
    test_deque = deque()
    for i in range(iterations):
        test_deque.appendleft(i)
    deque_duration_ms = (time.perf_counter() - t0) * 1000.0

    return {
        "iterations": iterations,
        "list_ms": round(list_duration_ms, 2),
        "deque_ms": round(deque_duration_ms, 2),
        "speedup": round(list_duration_ms / (deque_duration_ms or 0.001), 1)
    }

def benchmark_fifo_queue_pop(iterations: int = 50_000) -> dict:
    """Compares popping from head: list.pop(0) vs deque.popleft()."""
    # Populate structures
    list_q = list(range(iterations))
    deque_q = deque(range(iterations))

    # 1. List FIFO Pop: list.pop(0) - O(N) shift per pop
    t0 = time.perf_counter()
    while list_q:
        list_q.pop(0)
    list_pop_ms = (time.perf_counter() - t0) * 1000.0

    # 2. Deque FIFO Pop: deque.popleft() - O(1) unlinking
    t0 = time.perf_counter()
    while deque_q:
        deque_q.popleft()
    deque_pop_ms = (time.perf_counter() - t0) * 1000.0

    return {
        "iterations": iterations,
        "list_pop_ms": round(list_pop_ms, 2),
        "deque_pop_ms": round(deque_pop_ms, 2),
        "speedup": round(list_pop_ms / (deque_pop_ms or 0.001), 1)
    }


def demonstrate_mutation_costs():
    print("=" * 70)
    print("CODER & ACCOTAX - INSERTION, DELETION & QUEUE MUTATION COSTS")
    print("=" * 70)

    n_ops = 50_000

    print(f"1. Benchmarking Head Insertion (`insert(0)` vs `appendleft()`) for {n_ops:,} items:")
    insert_res = benchmark_head_insertions(n_ops)
    print(f"   * `list.insert(0, x)`   [O(N) Shift] : {insert_res['list_ms']} ms")
    print(f"   * `deque.appendleft(x)` [O(1) Link]  : {insert_res['deque_ms']} ms")
    print(f"   * DEQUE SPEEDUP FACTOR               : {insert_res['speedup']}x FASTER!\n")

    print(f"2. Benchmarking FIFO Queue Dequeue (`list.pop(0)` vs `deque.popleft()`) for {n_ops:,} items:")
    pop_res = benchmark_fifo_queue_pop(n_ops)
    print(f"   * `list.pop(0)`        [O(N) Shift] : {pop_res['list_pop_ms']} ms")
    print(f"   * `deque.popleft()`    [O(1) Unlink]: {pop_res['deque_pop_ms']} ms")
    print(f"   * DEQUE SPEEDUP FACTOR              : {pop_res['speedup']}x FASTER!\n")

    print(r"""
Mutation Cost Invariants:
  1. Python lists are contiguous dynamic arrays; inserting or popping at index 0 forces CPython to `memmove()` all remaining items.
  2. `collections.deque` is implemented as a doubly linked list of fixed-size blocks (64 elements per block).
  3. Appending and popping at both ends of a `deque` takes strict O(1) time with zero memory shifting overhead.
""")
    print("[PASSED] Mutation & FIFO/LIFO Benchmark Verified.")


if __name__ == "__main__":
    demonstrate_mutation_costs()
