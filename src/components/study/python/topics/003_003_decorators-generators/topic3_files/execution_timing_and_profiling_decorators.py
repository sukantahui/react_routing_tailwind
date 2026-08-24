# topic3_files/execution_timing_and_profiling_decorators.py
# Module: 003_003_decorators-generators
# Topic: Writing custom decorators (logging, timing execution, authentication)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: Execution Timing & Slow-Query Alerting Decorators
Demonstrates:
  1. High-precision execution profiling using `time.perf_counter()`
  2. Emitting warning alerts when execution exceeds latency thresholds
  3. Tracking statistical min/max/average execution times inside closures
"""

import functools
import time

def slow_execution_alert(threshold_ms: float = 15.0):
    """Decorator factory that warns when a function exceeds latency threshold."""
    def decorator(func):
        history = []

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            result = func(*args, **kwargs)
            elapsed_ms = (time.perf_counter() - start) * 1000.0

            history.append(elapsed_ms)
            avg_ms = sum(history) / len(history)

            if elapsed_ms > threshold_ms:
                print(f"  [SLOW EXECUTION ALERT] `{func.__name__}` took {elapsed_ms:.2f} ms (Threshold: {threshold_ms} ms)!")
            else:
                print(f"  [PERFORMANCE OK] `{func.__name__}` executed in {elapsed_ms:.2f} ms (Avg: {avg_ms:.2f} ms)")

            return result

        wrapper.history = history
        return wrapper
    return decorator


@slow_execution_alert(threshold_ms=10.0)
def fast_student_lookup(student_id: str) -> dict:
    """Simulates fast in-memory hash cache lookup."""
    time.sleep(0.003)  # 3ms
    return {"id": student_id, "name": "Sourav Mukherjee", "status": "ACTIVE"}


@slow_execution_alert(threshold_ms=10.0)
def slow_database_batch_sync(batch_size: int) -> int:
    """Simulates heavy database disk I/O and batch calculation."""
    time.sleep(0.015)  # 15ms (Triggers slow warning!)
    return batch_size


def demonstrate_timing_decorators():
    print("=" * 70)
    print("CODER & ACCOTAX - EXECUTION TIMING & SLOW ALERTING DECORATORS")
    print("=" * 70)

    # 1. Fast operation (Under 10ms threshold):
    print("1. Executing Fast Cached Operation (3ms):")
    res1 = fast_student_lookup("STU-101")
    print(f"   Result: {res1}\n")

    # 2. Slow operation (Exceeds 10ms threshold):
    print("2. Executing Slow Database Batch Operation (15ms):")
    res2 = slow_database_batch_sync(500)
    print(f"   Processed Records: {res2}")

    print("\n[PASSED] Execution Timing & Profiling Decorators Verified.")


if __name__ == "__main__":
    demonstrate_timing_decorators()
