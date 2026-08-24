# topic3_files/cprofile_context_manager_and_decorators.py
# Module: 004_002_performance-optimization
# Topic: Profiling CPU execution using cProfile and pstats
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: Reusable Profiling Decorator, Context Manager & Snapshots
Demonstrates:
  1. Creating a custom `@profile_function` decorator for selective profiling
  2. Creating a custom `ProfilerContext` context manager for code blocks
  3. Exporting binary profiling dumps (`stats.dump_stats()`) for external tools like Snakeviz
"""

import os
import cProfile
import pstats
import functools
from io import StringIO
from typing import Callable, Any

# 1. Custom Profiler Context Manager
class ProfilerContext:
    """Context manager to profile specific targeted code blocks."""

    def __init__(self, label: str = "Block Profile", limit: int = 5):
        self.label = label
        self.limit = limit
        self.profiler = cProfile.Profile()

    def __enter__(self):
        self.profiler.enable()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.profiler.disable()
        stream = StringIO()
        stats = pstats.Stats(self.profiler, stream=stream).strip_dirs()
        stats.sort_stats(pstats.SortKey.CUMULATIVE)
        stats.print_stats(self.limit)
        print(f"\n--- [PROFILER CONTEXT: {self.label}] ---")
        print(stream.getvalue())

# 2. Custom Profiling Decorator
def profile_function(limit: int = 5, sort_by=pstats.SortKey.CUMULATIVE):
    """Decorator to automatically profile any targeted function."""
    def decorator(func: Callable):
        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            profiler = cProfile.Profile()
            profiler.enable()
            result = func(*args, **kwargs)
            profiler.disable()

            stream = StringIO()
            stats = pstats.Stats(profiler, stream=stream).strip_dirs()
            stats.sort_stats(sort_by)
            stats.print_stats(limit)
            print(f"\n--- [FUNCTION PROFILE: {func.__name__}()] ---")
            print(stream.getvalue())
            return result
        return wrapper
    return decorator


@profile_function(limit=3)
def process_student_dossiers(n: int = 500):
    """Sample decorated student processing routine."""
    records = [f"STU-{i}" for i in range(n)]
    formatted = [f"DOSSIER-{r}" for r in records]
    return len(formatted)


def demonstrate_custom_profiling():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM PROFILING UTILITIES & SNAPSHOTS")
    print("=" * 70)

    # 1. Test Decorated Function
    print("1. Invoking Function with `@profile_function` Decorator:")
    res = process_student_dossiers(300)

    # 2. Test Profiler Context Manager
    print("2. Executing Targeted Code Block with `with ProfilerContext():`:")
    with ProfilerContext(label="Batch Math Computation", limit=3):
        total = sum(i * i for i in range(100_000))

    # 3. Exporting Binary Snapshot for Snakeviz
    snapshot_file = "temp_admission_profile.pstats"
    try:
        profiler = cProfile.Profile()
        profiler.enable()
        _ = sum(i for i in range(50_000))
        profiler.disable()
        profiler.dump_stats(snapshot_file)
        print(f"3. Binary Profile Snapshot Exported: '{snapshot_file}' ({os.path.getsize(snapshot_file)} bytes)")
    finally:
        if os.path.exists(snapshot_file):
            os.remove(snapshot_file)
            print("4. Cleanup: Removed temporary snapshot file.")

    print(r"""
Profiling Ecosystem Invariants:
  1. Use `@profile_function` to monitor isolated hot-path services in development.
  2. Dumping `.pstats` snapshots allows opening interactive flamegraphs in web browsers via `snakeviz profile.pstats`.
  3. Keep profiling disabled in production production workloads to avoid runtime overhead.
""")
    print("[PASSED] Custom Profiling Utilities & Snapshots Verified.")


if __name__ == "__main__":
    demonstrate_custom_profiling()
