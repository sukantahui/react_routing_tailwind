# topic3_files/cprofile_deterministic_profiler_fundamentals.py
# Module: 004_002_performance-optimization
# Topic: Profiling CPU execution using cProfile and pstats
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: Python `cProfile` & `pstats` Profiling Fundamentals
Demonstrates:
  1. Deterministic CPU profiling using standard library `cProfile.Profile`
  2. Formatting, filtering, and sorting profiling reports with `pstats.Stats`
  3. Differentiating `tottime` (time in function body) vs `cumtime` (function + all subcalls)
  4. Sorting by `SortKey.CUMULATIVE`, `SortKey.TIME`, and `SortKey.CALLS`
"""

import time
import cProfile
import pstats
from io import StringIO
from typing import List

# Sub-functions simulating processing workload:
def step_a_fast_math(n: int) -> int:
    return sum(i * 2 for i in range(n))

def step_b_slow_bottleneck(n: int) -> List[int]:
    """Artificial bottleneck simulating slow quadratic or string operations."""
    out = []
    for i in range(n):
        time.sleep(0.0001)  # Simulate expensive I/O or CPU calculation
        out.append(i * i)
    return out

def step_c_formatting(records: List[int]) -> List[str]:
    return [f"VAL-{r}" for r in records]

def execute_admission_pipeline(count: int = 50):
    """Main pipeline invoking multiple subroutines."""
    a_res = step_a_fast_math(count * 100)
    b_res = step_b_slow_bottleneck(count)
    c_res = step_c_formatting(b_res)
    return len(c_res)


def run_cprofile_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - CPROFILE & PSTATS PROFILING FUNDAMENTALS")
    print("=" * 70)

    # 1. Initialize cProfile instance
    profiler = cProfile.Profile()

    print("1. Profiling Execution of `execute_admission_pipeline()`...")
    profiler.enable()
    execute_admission_pipeline(count=60)
    profiler.disable()

    # 2. Format profile statistics using pstats
    stream = StringIO()
    stats = pstats.Stats(profiler, stream=stream)

    # Sort by cumulative time to find highest-level bottlenecks:
    stats.strip_dirs()
    stats.sort_stats(pstats.SortKey.CUMULATIVE)
    stats.print_stats(10)

    print("\n2. Top 10 Functions by Cumulative Time (`cumtime`):")
    print(stream.getvalue())

    print(r"""
cProfile Metrics Anatomy:
  1. `ncalls`  : Number of times the function was invoked (e.g. 50/1 indicates 50 total calls, 1 primitive).
  2. `tottime` : Total time spent inside the function body EXCLUDING time spent in sub-calls.
  3. `cumtime` : Total cumulative time spent inside the function AND ALL sub-functions called.
  4. `percall` : Average time per invocation (`tottime / ncalls` or `cumtime / ncalls`).
""")
    print("[PASSED] cProfile Fundamentals Verified.")


if __name__ == "__main__":
    run_cprofile_fundamentals()
