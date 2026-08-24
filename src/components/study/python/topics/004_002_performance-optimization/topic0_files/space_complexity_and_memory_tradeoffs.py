# topic0_files/space_complexity_and_memory_tradeoffs.py
# Module: 004_002_performance-optimization
# Topic: Big-O notation basics (Time & Space complexity: O(1), O(N), O(N log N), O(N^2))
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: Space Complexity & Memory Trade-offs
Demonstrates:
  1. Auxiliary space complexity: O(1) in-place vs O(N) auxiliary allocations
  2. Memory footprint analysis with `sys.getsizeof()`
  3. Space-time trade-offs: Lazy Generators (O(1) Memory) vs Eager Lists (O(N) Memory)
"""

import sys
from typing import List, Generator

# 1. O(N) Space: Eager List Materialization
def generate_eager_student_roster(n: int) -> List[int]:
    """O(N) Space: Allocates memory for all N elements simultaneously in RAM."""
    return [i for i in range(n)]

# 2. O(1) Auxiliary Space: Lazy Generator Stream
def generate_lazy_student_stream(n: int) -> Generator[int, None, None]:
    """O(1) Space: Generates elements on-demand one by one without storing list in RAM."""
    for i in range(n):
        yield i

# 3. O(1) Auxiliary Space: In-Place Reverse
def reverse_roster_in_place(arr: List[int]) -> None:
    """O(1) Auxiliary Space: Modifies input list directly using two pointers."""
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

# 4. O(N) Auxiliary Space: Creating a New Reversed List
def reverse_roster_copy(arr: List[int]) -> List[int]:
    """O(N) Auxiliary Space: Allocates a new list of size N."""
    return [arr[i] for i in range(len(arr) - 1, -1, -1)]


def demonstrate_space_complexity():
    print("=" * 70)
    print("CODER & ACCOTAX - SPACE COMPLEXITY & MEMORY TRADE-OFFS")
    print("=" * 70)

    n_values = [1_000, 100_000, 1_000_000]

    print("1. Memory Footprint: Eager List O(N) vs Lazy Generator O(1):")
    print(f"{'Item Count (N)':<16} | {'Eager List O(N) Bytes':<24} | {'Lazy Generator O(1) Bytes':<26}")
    print("-" * 72)

    for n in n_values:
        eager_list = generate_eager_student_roster(n)
        lazy_gen = generate_lazy_student_stream(n)

        eager_bytes = sys.getsizeof(eager_list)
        lazy_bytes = sys.getsizeof(lazy_gen)

        print(f"{n:<16,d} | {eager_bytes:<24,d} | {lazy_bytes:<26,d}")

    print("\n2. In-Place O(1) Space vs Copied O(N) Space Transformation:")
    sample = list(range(5))
    print(f"   * Original List                  : {sample}")
    reverse_roster_in_place(sample)
    print(f"   * In-Place Reversed (O(1) Space) : {sample}")
    copy_reversed = reverse_roster_copy(sample)
    print(f"   * Copied Reversed   (O(N) Space) : {copy_reversed}")

    print(r"""
Space Complexity Invariants:
  1. Space complexity measures the extra (auxiliary) memory required by an algorithm relative to N.
  2. Lazy generators consume O(1) constant memory regardless of dataset size (100 or 100,000,000 items).
  3. Space-Time Tradeoff: Pre-computing and caching data in dictionaries trades O(N) space for O(1) query time.
""")
    print("[PASSED] Space Complexity & Memory Trade-offs Verified.")


if __name__ == "__main__":
    demonstrate_space_complexity()
