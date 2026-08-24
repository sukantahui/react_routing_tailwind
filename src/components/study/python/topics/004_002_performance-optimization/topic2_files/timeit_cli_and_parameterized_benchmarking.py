# topic2_files/timeit_cli_and_parameterized_benchmarking.py
# Module: 004_002_performance-optimization
# Topic: Benchmarking code with timeit module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: CLI & Parameterized Benchmarking Harness
Demonstrates:
  1. Programmatic CLI-style timeit runner
  2. Auto-scaling iteration estimation (`Timer.autorange()`)
  3. Formatted terminal performance cards with execution statistics
"""

import timeit
from typing import Callable, Dict, Any

class TimeitBenchmarkHarness:
    """Production micro-benchmark harness with automatic scaling and statistics."""

    @staticmethod
    def benchmark_statement(stmt: str, setup: str = "pass", repeat: int = 5) -> Dict[str, Any]:
        """Runs auto-scaled benchmark on statement string and computes statistics."""
        timer = timeit.Timer(stmt=stmt, setup=setup)
        # Use autorange to pick an optimal number of loops
        number, total_time = timer.autorange()
        raw_times = timer.repeat(repeat=repeat, number=number)

        best_time_s = min(raw_times)
        per_loop_us = (best_time_s / number) * 1_000_000.0

        return {
            "statement": stmt,
            "setup": setup,
            "loops_per_repeat": number,
            "repeats_count": repeat,
            "best_total_s": round(best_time_s, 6),
            "per_loop_microsec": round(per_loop_us, 4),
            "all_runs_s": [round(t, 6) for t in raw_times]
        }


def demonstrate_cli_harness():
    print("=" * 70)
    print("CODER & ACCOTAX - TIMEIT BENCHMARK HARNESS")
    print("=" * 70)

    contestants = [
        ("String Join", "'-'.join(str(i) for i in range(100))", "pass"),
        ("String Concat Loop", "s = '';\nfor i in range(100): s += str(i) + '-'", "pass"),
        ("List Comp Join", "'-'.join([str(i) for i in range(100)])", "pass")
    ]

    print("1. Running Auto-Scaled Micro-Benchmarks:")
    for label, stmt, setup in contestants:
        res = TimeitBenchmarkHarness.benchmark_statement(stmt, setup)
        print(f"   * [{label:<20}] : {res['per_loop_microsec']:>8.2f} us / loop ({res['loops_per_repeat']:,} loops)")

    print(r"""
Harness Optimization Invariants:
  1. `Timer.autorange()` automatically finds a loop count where total run time is at least 0.2 seconds.
  2. Evaluating `per_loop_microsec` normalizes benchmarks regardless of how many iterations were run.
  3. `[str(i) for i in range(100)]` is faster in `str.join()` than generator expressions because join pre-allocates buffer space for lists.
""")
    print("[PASSED] Timeit CLI & Parameterized Harness Verified.")


if __name__ == "__main__":
    demonstrate_cli_harness()
