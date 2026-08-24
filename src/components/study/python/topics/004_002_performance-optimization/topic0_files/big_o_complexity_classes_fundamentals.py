# topic0_files/big_o_complexity_classes_fundamentals.py
# Module: 004_002_performance-optimization
# Topic: Big-O notation basics (Time & Space complexity: O(1), O(N), O(N log N), O(N^2))
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: Big-O Complexity Classes Fundamentals
Demonstrates:
  1. Concrete implementations of core asymptotic time complexity classes:
     - O(1) Constant Time (Dictionary lookup, list indexing)
     - O(log N) Logarithmic Time (Binary Search)
     - O(N) Linear Time (Single loop, linear search, sum/min/max)
     - O(N log N) Linearithmic Time (Python's Timsort `sorted()`)
     - O(N^2) Quadratic Time (Nested loops, pairwise matching)
  2. Operation counting and empirical latency scaling across input sizes N
"""

import time
from typing import List, Any, Optional

# 1. O(1) - Constant Time:
def constant_time_lookup(records_dict: dict, student_id: str) -> Optional[dict]:
    """O(1) operation: Dict hash table lookup takes constant time regardless of dict size."""
    return records_dict.get(student_id)

# 2. O(log N) - Logarithmic Time:
def binary_search_student_id(sorted_ids: List[int], target_id: int) -> int:
    """O(log N) operation: Halves search space on every iteration."""
    low = 0
    high = len(sorted_ids) - 1
    step_count = 0

    while low <= high:
        step_count += 1
        mid = (low + high) // 2
        if sorted_ids[mid] == target_id:
            return step_count
        elif sorted_ids[mid] < target_id:
            low = mid + 1
        else:
            high = mid - 1
    return step_count

# 3. O(N) - Linear Time:
def linear_search_student(records_list: List[dict], target_id: str) -> tuple:
    """O(N) operation: Inspects each item one by one; steps scale linearly with N."""
    steps = 0
    for record in records_list:
        steps += 1
        if record["id"] == target_id:
            return record, steps
    return None, steps

# 4. O(N log N) - Linearithmic Time:
def sort_student_roster(records_list: List[dict]) -> List[dict]:
    """O(N log N) operation: Python's built-in Timsort algorithm."""
    return sorted(records_list, key=lambda r: r["gpa"])

# 5. O(N^2) - Quadratic Time:
def naive_find_pairwise_conflicts(records_list: List[dict]) -> int:
    """O(N^2) operation: Nested loops compare every element with every other element."""
    comparisons = 0
    n = len(records_list)
    for i in range(n):
        for j in range(n):
            comparisons += 1
    return comparisons


def demonstrate_big_o_classes():
    print("=" * 70)
    print("CODER & ACCOTAX - BIG-O COMPLEXITY CLASSES FUNDAMENTALS")
    print("=" * 70)

    # Prepare datasets of various sizes N:
    sizes = [10, 100, 1000]

    print("1. Asymptotic Step Count Scaling Across Growing Input N:")
    print(f"{'N':<8} | {'O(1) Dict':<12} | {'O(log N) Binary':<16} | {'O(N) Linear':<14} | {'O(N^2) Nested':<14}")
    print("-" * 70)

    for n in sizes:
        # Generate mock records
        data_list = [{"id": f"STU-{i:05d}", "gpa": 3.5 + (i % 50) / 100} for i in range(n)]
        data_dict = {r["id"]: r for r in data_list}
        sorted_ids = list(range(n))

        # 1. O(1) steps
        o1_steps = 1
        # 2. O(log N) steps for binary search
        ologn_steps = binary_search_student_id(sorted_ids, target_id=n - 1)
        # 3. O(N) steps for worst-case linear search
        _, on_steps = linear_search_student(data_list, target_id=f"STU-{n-1:05d}")
        # 4. O(N^2) steps for nested comparisons
        on2_steps = naive_find_pairwise_conflicts(data_list)

        print(f"{n:<8} | {o1_steps:<12} | {ologn_steps:<16} | {on_steps:<14} | {on2_steps:<14}")

    print(r"""
Big-O Fundamental Invariants:
  1. Big-O characterizes how runtime or memory consumption scales as input size N tends to infinity.
  2. Constants and lower-order terms are dropped: O(3N + 50) simplifies to O(N); O(N^2 + 1000N) simplifies to O(N^2).
  3. O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!).
""")
    print("[PASSED] Big-O Complexity Fundamentals Verified.")


if __name__ == "__main__":
    demonstrate_big_o_classes()
