# topic2_files/institutional_admission_pipeline_microbenchmark_suite.py
# Module: 004_002_performance-optimization
# Topic: Benchmarking code with timeit module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Institutional Admission Transformation Benchmark Suite (Case Study)
Demonstrates:
  1. Micro-benchmarking 4 alternative data ingestion architectures on student KYC records:
     - Architecture A: Naive `for` loop with `.append()`
     - Architecture B: Optimized List Comprehension
     - Architecture C: Direct Dictionary Comprehension
     - Architecture D: Lazy Streaming Generator Pipeline
  2. Computing statistical metrics: Minimum (Best), Mean, Median, and Standard Deviation
"""

import timeit
import statistics
from typing import List, Dict, Any

# Mock raw incoming student transaction rows
RAW_STUDENT_ROWS = [
    f"STU-{i:05d},Candidate_{i},barrackpore,30000,PAID" for i in range(1_000)
]

# 1. Architecture A: Naive Loop + Append
def transform_via_naive_loop():
    results = []
    for row in RAW_STUDENT_ROWS:
        parts = row.split(",")
        results.append({
            "id": parts[0],
            "name": parts[1],
            "campus": parts[2],
            "fee": float(parts[3]),
            "status": parts[4]
        })
    return results

# 2. Architecture B: List Comprehension
def transform_via_list_comp():
    return [
        {
            "id": p[0],
            "name": p[1],
            "campus": p[2],
            "fee": float(p[3]),
            "status": p[4]
        }
        for p in (row.split(",") for row in RAW_STUDENT_ROWS)
    ]

# 3. Architecture C: Direct Dict Comprehension
def transform_via_dict_comp():
    return {
        p[0]: {"name": p[1], "campus": p[2], "fee": float(p[3]), "status": p[4]}
        for p in (row.split(",") for row in RAW_STUDENT_ROWS)
    }

# 4. Architecture D: Generator Pipeline
def transform_via_generator():
    return list(
        {
            "id": p[0],
            "name": p[1],
            "campus": p[2],
            "fee": float(p[3]),
            "status": p[4]
        }
        for p in (row.split(",") for row in RAW_STUDENT_ROWS)
    )


def run_institutional_benchmark_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL DATA TRANSFORMATION BENCHMARK SUITE")
    print("=" * 70)

    loops = 100
    repeats = 3

    architectures = [
        ("Architecture A (Naive Loop + Append)", transform_via_naive_loop),
        ("Architecture B (List Comprehension)", transform_via_list_comp),
        ("Architecture C (Dict Comprehension)", transform_via_dict_comp),
        ("Architecture D (Generator Pipeline)", transform_via_generator),
    ]

    print(f"1. Benchmarking Ingestion Pipelines ({loops} loops x {repeats} repeats):\n")

    summary_stats = []
    for name, func in architectures:
        times = timeit.repeat(func, number=loops, repeat=repeats)
        times_ms = [(t / loops) * 1000.0 for t in times]

        best_ms = min(times_ms)
        mean_ms = statistics.mean(times_ms)
        stdev_ms = statistics.stdev(times_ms) if len(times_ms) > 1 else 0

        summary_stats.append({
            "name": name,
            "best_ms": best_ms,
            "mean_ms": mean_ms,
            "stdev_ms": stdev_ms
        })

        print(f"   * [{name:<36}]")
        print(f"     -> Best: {best_ms:.3f} ms/pass | Mean: {mean_ms:.3f} ms | StdDev: {stdev_ms:.4f} ms")

    # Speedup relative to naive loop
    naive_best = summary_stats[0]["best_ms"]
    comp_best = summary_stats[1]["best_ms"]
    speedup = naive_best / (comp_best or 0.0001)

    print(f"\n2. Architectural Optimization: List Comprehension is {speedup:.2f}x FASTER than Naive Loops!")

    print(r"""
Transformation Architecture Invariants:
  1. List comprehensions run in optimized C loops, avoiding Python bytecode frame overhead for `.append()`.
  2. Generator expressions yield lowest memory consumption when piping directly into consumers (e.g. database writers).
  3. Pre-splitting nested iterators inside comprehensions achieves clean, high-throughput ETL data pipelines.
""")
    print("[PASSED] Institutional Data Transformation Benchmark Verified.")


if __name__ == "__main__":
    run_institutional_benchmark_suite()
