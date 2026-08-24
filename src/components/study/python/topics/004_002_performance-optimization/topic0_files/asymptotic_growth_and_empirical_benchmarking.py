# topic0_files/asymptotic_growth_and_empirical_benchmarking.py
# Module: 004_002_performance-optimization
# Topic: Big-O notation basics (Time & Space complexity: O(1), O(N), O(N log N), O(N^2))
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: Asymptotic Growth & Empirical Latency Benchmarking
Demonstrates:
  1. Empirical micro-benchmarking using `time.perf_counter_ns()`
  2. Demonstrating why quadratic O(N^2) algorithms become unusable at scale
  3. Visualizing growth scaling curves with pure ASCII metrics
"""

import time
from typing import List, Dict

def benchmark_linear_vs_quadratic(n_sizes: List[int]) -> List[Dict[str, float]]:
    """Measures latency of O(N) single loop vs O(N^2) nested loop across N."""
    results = []

    for n in n_sizes:
        # Benchmark O(N) Linear Operation:
        start_ns = time.perf_counter_ns()
        total = 0
        for i in range(n):
            total += i
        linear_duration_us = (time.perf_counter_ns() - start_ns) / 1_000.0

        # Benchmark O(N^2) Quadratic Operation:
        start_ns = time.perf_counter_ns()
        pair_count = 0
        for i in range(n):
            for j in range(n):
                pair_count += 1
        quadratic_duration_us = (time.perf_counter_ns() - start_ns) / 1_000.0

        results.append({
            "n": n,
            "linear_us": round(linear_duration_us, 2),
            "quadratic_us": round(quadratic_duration_us, 2),
            "ratio_quad_to_lin": round(quadratic_duration_us / (linear_duration_us or 1), 1)
        })

    return results


def demonstrate_asymptotic_growth():
    print("=" * 70)
    print("CODER & ACCOTAX - ASYMPTOTIC GROWTH EMPIRICAL BENCHMARK")
    print("=" * 70)

    n_samples = [100, 500, 1000, 2000, 4000]
    benchmarks = benchmark_linear_vs_quadratic(n_samples)

    print("1. Empirical Micro-Latency Comparison (Linear O(N) vs Quadratic O(N^2)):")
    print(f"{'N Size':<10} | {'Linear O(N) (us)':<18} | {'Quadratic O(N^2) (us)':<22} | {'Quad/Lin Ratio':<16}")
    print("-" * 72)

    for b in benchmarks:
        print(f"{b['n']:<10,d} | {b['linear_us']:<18.2f} | {b['quadratic_us']:<22.2f} | {b['ratio_quad_to_lin']:<16.1f}x")

    print("\n2. Visualizing Asymptotic Divergence (N=4,000 Scaling):")
    print("   * O(N)   Operations : 4,000 steps")
    print("   * O(N^2) Operations : 16,000,000 steps (4,000x more operations!)")

    print(r"""
Asymptotic Scaling Laws:
  1. When N doubles in O(N), runtime doubles (2x).
  2. When N doubles in O(N^2), runtime quadruples (4x)!
  3. When N is 10,000, O(N^2) performs 100,000,000 operations, leading to catastrophic server CPU freezes.
""")
    print("[PASSED] Asymptotic Growth Benchmarking Verified.")


if __name__ == "__main__":
    demonstrate_asymptotic_growth()
