"""
# Module: 004_002_performance-optimization
# Topic 7: Best practices for high-throughput Python applications
# File: cpu_multiprocessing_vs_io_threading.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating GIL constraints: CPU-bound multi-core ProcessPool
#              vs I/O-bound ThreadPool concurrency.
"""

import time
import math
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

# Sample student examination datasets across campuses
STUDENT_DATA_CHUNKS = [
    [(f"STU_{c}_{i}", (i * 31) % 1000) for i in range(15000)]
    for c in ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"]
]

# ------------------------------------------------------------------------------
# 1. CPU-BOUND WORKLOAD (Heavy Mathematical Calculation)
# ------------------------------------------------------------------------------
def heavy_cpu_task(chunk):
    """CPU-bound task: Mathematical scoring normalization."""
    total = 0.0
    for sid, val in chunk:
        # Intense mathematical loop (constrained by GIL in threads)
        for step in range(50):
            total += math.sqrt(val + step) * math.sin(step)
    return total

def benchmark_cpu_sequential():
    start = time.perf_counter()
    results = [heavy_cpu_task(chunk) for chunk in STUDENT_DATA_CHUNKS]
    elapsed = time.perf_counter() - start
    return results, elapsed

def benchmark_cpu_threading():
    start = time.perf_counter()
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(heavy_cpu_task, STUDENT_DATA_CHUNKS))
    elapsed = time.perf_counter() - start
    return results, elapsed

def benchmark_cpu_multiprocessing():
    start = time.perf_counter()
    # ProcessPoolExecutor spawns separate Python processes (Bypasses the GIL!)
    with ProcessPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(heavy_cpu_task, STUDENT_DATA_CHUNKS))
    elapsed = time.perf_counter() - start
    return results, elapsed

# ------------------------------------------------------------------------------
# 2. I/O-BOUND WORKLOAD (Simulated Network API / DB Call)
# ------------------------------------------------------------------------------
def simulated_io_task(task_id):
    """I/O-bound task: Network latency (Releases the GIL during sleep)."""
    time.sleep(0.05) # 50ms simulated DB network call
    return f"DB_RESULT_{task_id}"

def benchmark_io_sequential():
    start = time.perf_counter()
    results = [simulated_io_task(i) for i in range(20)]
    elapsed = time.perf_counter() - start
    return results, elapsed

def benchmark_io_threading():
    start = time.perf_counter()
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(simulated_io_task, range(20)))
    elapsed = time.perf_counter() - start
    return results, elapsed

def main():
    print("=" * 75)
    print("[BENCHMARK] Concurrency Models: CPU-Bound vs I/O-Bound Execution")
    print("=" * 75)

    # 1. CPU-Bound Benchmark
    print("\n--- 1. CPU-BOUND WORKLOAD (60,000 Complex Calculations) ---")
    _, t_cpu_seq = benchmark_cpu_sequential()
    print(f"[A] Sequential Execution     : {t_cpu_seq:.4f} sec (1.00x Baseline)")

    _, t_cpu_thread = benchmark_cpu_threading()
    print(f"[B] ThreadPool (4 Threads)   : {t_cpu_thread:.4f} sec (No speedup due to GIL contention!)")

    _, t_cpu_proc = benchmark_cpu_multiprocessing()
    speedup_proc = t_cpu_seq / t_cpu_proc if t_cpu_proc > 0 else 1.0
    print(f"[C] ProcessPool (4 Processes): {t_cpu_proc:.4f} sec ({speedup_proc:.2f}x Faster Multi-Core Parallelism)")

    # 2. I/O-Bound Benchmark
    print("\n--- 2. I/O-BOUND WORKLOAD (20 Network / Database API Calls) ---")
    _, t_io_seq = benchmark_io_sequential()
    print(f"[A] Sequential I/O Calls     : {t_io_seq:.4f} sec (1.00x Baseline)")

    _, t_io_thread = benchmark_io_threading()
    speedup_io = t_io_seq / t_io_thread if t_io_thread > 0 else 1.0
    print(f"[B] ThreadPool (10 Workers)  : {t_io_thread:.4f} sec ({speedup_io:.2f}x Faster Concurrent I/O)")

    print("\n" + "=" * 75)
    print("[TAKEAWAY] CPU-bound: Use ProcessPoolExecutor to bypass the GIL.")
    print("           I/O-bound: Use ThreadPoolExecutor or asyncio to interleave latency.")
    print("=" * 75)

if __name__ == "__main__":
    main()
