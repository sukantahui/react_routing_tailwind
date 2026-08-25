"""
# Module: 004_002_performance-optimization
# Topic 5: Optimizing loops, lookups, and eliminating algorithmic bottlenecks
# File: string_concatenation_and_itertools_pipelines.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Benchmarking string concatenation methods (+= vs str.join) and building
#              memory-efficient streaming generator pipelines with itertools.
"""

import time
import io
from itertools import islice, chain, groupby, accumulate

# Generate 30,000 log lines or text fragments
FRAGMENTS = [
    f"[AUDIT LOG {i:06d}] Student: Mamata | Campus: Barrackpore | Event: LOGIN_SUCCESS\n"
    for i in range(30000)
]

def benchmark_plus_equals_string_concat(fragments):
    """Approach 1: O(N^2) String Concatenation with +="""
    start = time.perf_counter()
    report = ""
    # Each += creates a brand new string and reallocates memory
    for fragment in fragments:
        report += fragment
    elapsed = time.perf_counter() - start
    return len(report), elapsed

def benchmark_str_join_concat(fragments):
    """Approach 2: O(N) Pre-allocated str.join()"""
    start = time.perf_counter()
    # Calculates total memory length in 1st pass, then copies characters in 2nd pass
    report = "".join(fragments)
    elapsed = time.perf_counter() - start
    return len(report), elapsed

def benchmark_stringio_concat(fragments):
    """Approach 3: io.StringIO in-memory buffer"""
    start = time.perf_counter()
    buffer = io.StringIO()
    for fragment in fragments:
        buffer.write(fragment)
    report = buffer.getvalue()
    elapsed = time.perf_counter() - start
    return len(report), elapsed

def demonstrate_itertools_streaming_pipeline():
    """Approach 4: Memory-safe zero-copy generator pipeline using itertools."""
    print("\n[ITERTOOLS] Demonstrating itertools Streaming Pipeline:")
    
    # 1. itertools.chain - Zero-copy sequence merging
    barrackpore_stream = (f"BP_STU_{i}" for i in range(1000))
    kolkata_stream = (f"KOL_STU_{i}" for i in range(1000))
    merged_stream = chain(barrackpore_stream, kolkata_stream)
    
    # 2. itertools.islice - Lazy slicing without creating intermediate lists
    first_five = list(islice(merged_stream, 5))
    print(f"   * islice(chain(...), 5) sample: {first_five}")
    
    # 3. itertools.accumulate - High-speed running totals in C
    monthly_fees = [5000, 7500, 6200, 8900, 9500]
    running_totals = list(accumulate(monthly_fees))
    print(f"   * Running fee totals: {running_totals}")
    
    # 4. itertools.groupby - Streaming data grouping
    students_by_campus = [
        ("Barrackpore", "Mamata"),
        ("Barrackpore", "Debangshu"),
        ("Ichapur", "Abhronila"),
        ("Kolkata", "Mahima"),
        ("Kolkata", "Susmita")
    ]
    # Note: data must be sorted by key for groupby
    print("   * Grouping by campus:")
    for campus, group in groupby(students_by_campus, key=lambda x: x[0]):
        names = [name for _, name in group]
        print(f"     - {campus}: {names}")

def main():
    print("=" * 75)
    print("[BENCHMARK] String Concatenation & itertools Pipeline")
    print("=" * 75)
    print(f"Workload: Concatenating {len(FRAGMENTS):,} log lines")

    _, t_plus = benchmark_plus_equals_string_concat(FRAGMENTS)
    print(f"[1] Loop '+=' Concatenation (O(N^2)) : {t_plus:.4f} sec (1.00x Baseline)")

    _, t_join = benchmark_str_join_concat(FRAGMENTS)
    speedup_join = t_plus / t_join if t_join > 0 else 1.0
    print(f"[2] 'str.join()' Pre-allocated (O(N)) : {t_join:.4f} sec ({speedup_join:.1f}x Faster)")

    _, t_sio = benchmark_stringio_concat(FRAGMENTS)
    speedup_sio = t_plus / t_sio if t_sio > 0 else 1.0
    print(f"[3] 'io.StringIO' In-Memory Buffer   : {t_sio:.4f} sec ({speedup_sio:.1f}x Faster)")

    demonstrate_itertools_streaming_pipeline()

    print("=" * 75)
    print("[TAKEAWAY] Always use ''.join(chunks) or io.StringIO for building strings.")
    print("           Use itertools for lazy, zero-copy streaming pipelines.")
    print("=" * 75)

if __name__ == "__main__":
    main()
