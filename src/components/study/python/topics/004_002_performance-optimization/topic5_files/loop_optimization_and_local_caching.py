"""
# Module: 004_002_performance-optimization
# Topic 5: Optimizing loops, lookups, and eliminating algorithmic bottlenecks
# File: loop_optimization_and_local_caching.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating CPython loop mechanics, list comprehension speedups,
#              local variable and method reference caching, and loop-invariant hoisting.
"""

import time
import math

# Sample institutional student test score records
STUDENTS = [
    {"id": f"STU_{i:05d}", "name": name, "campus": campus, "raw_score": (i * 17) % 100}
    for i, (name, campus) in enumerate(
        zip(
            ["Mamata", "Mahima", "Abhronila", "Susmita", "Debangshu"] * 20000,
            ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur", "Barrackpore"] * 20000
        )
    )
]

def benchmark_standard_for_loop(data):
    """Approach 1: Standard for-loop with dynamic attribute resolution and method dispatch."""
    start = time.perf_counter()
    results = []
    for item in data:
        # Dynamic lookup on 'results' and '.append' on every single iteration
        score = item["raw_score"]
        curve = math.sqrt(score) * 10.0
        results.append((item["id"], item["name"], curve))
    elapsed = time.perf_counter() - start
    return results, elapsed

def benchmark_local_cached_loop(data):
    """Approach 2: Local method caching (hoisting .append and math.sqrt to local frame)."""
    start = time.perf_counter()
    results = []
    # Cache method reference and function into local variables (LOAD_FAST vs LOAD_GLOBAL/LOAD_ATTR)
    append = results.append
    sqrt = math.sqrt
    for item in data:
        score = item["raw_score"]
        curve = sqrt(score) * 10.0
        append((item["id"], item["name"], curve))
    elapsed = time.perf_counter() - start
    return results, elapsed

def benchmark_list_comprehension(data):
    """Approach 3: List comprehension executed in optimized C-level bytecode loop."""
    start = time.perf_counter()
    sqrt = math.sqrt
    # Comprehensions use specialized LIST_APPEND opcode in C
    results = [
        (item["id"], item["name"], sqrt(item["raw_score"]) * 10.0)
        for item in data
    ]
    elapsed = time.perf_counter() - start
    return results, elapsed

def benchmark_loop_invariant_hoisting(data):
    """Approach 4: Demonstrating loop-invariant calculation hoisting."""
    # Suppose we compute an institutional normalization factor based on campus policy
    campus_policy_weight = 1.05
    regional_tax_factor = 0.18
    
    start = time.perf_counter()
    # BAD: Calculating invariant (campus_policy_weight * (1.0 + regional_tax_factor)) inside loop
    # GOOD: Hoist invariant multiplier outside the loop!
    combined_multiplier = campus_policy_weight * (1.0 + regional_tax_factor) * 10.0
    sqrt = math.sqrt
    
    results = [
        (item["id"], item["name"], sqrt(item["raw_score"]) * combined_multiplier)
        for item in data
    ]
    elapsed = time.perf_counter() - start
    return results, elapsed

def main():
    dataset_size = len(STUDENTS)
    print("=" * 75)
    print(f"[BENCHMARK] CPython Loop Optimization & Local Caching (N = {dataset_size:,})")
    print("=" * 75)

    _, t_std = benchmark_standard_for_loop(STUDENTS)
    print(f"[1] Standard for-loop + list.append() : {t_std:.4f} sec (1.00x Baseline)")

    _, t_cached = benchmark_local_cached_loop(STUDENTS)
    speedup_cached = t_std / t_cached if t_cached > 0 else 1.0
    print(f"[2] Local Method Caching (append=res)  : {t_cached:.4f} sec ({speedup_cached:.2f}x Faster)")

    _, t_comp = benchmark_list_comprehension(STUDENTS)
    speedup_comp = t_std / t_comp if t_comp > 0 else 1.0
    print(f"[3] List Comprehension (C LIST_APPEND) : {t_comp:.4f} sec ({speedup_comp:.2f}x Faster)")

    _, t_hoisted = benchmark_loop_invariant_hoisting(STUDENTS)
    speedup_hoist = t_std / t_hoisted if t_hoisted > 0 else 1.0
    print(f"[4] Invariant Hoisting + Comprehension : {t_hoisted:.4f} sec ({speedup_hoist:.2f}x Faster)")

    print("=" * 75)
    print("[TAKEAWAY] Using list comprehensions and caching method references")
    print("           avoids expensive Python interpreter opcode dispatch & lookups.")
    print("=" * 75)

if __name__ == "__main__":
    main()
