# topic2_files/decorating_functions_with_arguments.py
# Module: 003_003_decorators-generators
# Topic: Understanding Decorators: Concept and @decorator syntax
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: Universal Decorators with `*args` and `**kwargs`
Demonstrates:
  1. Wrapping functions that accept arbitrary positional and keyword arguments
  2. Always capturing and returning the wrapped function's return value
  3. High-precision performance timing with `time.perf_counter()`
"""

import time

def performance_timer_decorator(original_func):
    """Decorator that measures and logs the high-precision execution duration of any function."""

    # Universal Wrapper Envelope (*args, **kwargs):
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()

        # Invoking original function with forwarded arguments:
        result = original_func(*args, **kwargs)

        end_time = time.perf_counter()
        elapsed_ms = (end_time - start_time) * 1000.0

        print(f"  [TIMER LOG] `{original_func.__name__}` executed in {elapsed_ms:.4f} ms")

        # Crucial: Always return the original result!
        return result

    return wrapper


@performance_timer_decorator
def calculate_single_student_discount(base_fee: float, scholarship_rate: float) -> float:
    """Calculates discounted fee for a single student."""
    time.sleep(0.005)  # Simulate brief processing latency
    return base_fee * (1.0 - scholarship_rate)


@performance_timer_decorator
def process_batch_student_records(records: list, campus_tax: float = 0.18) -> float:
    """Calculates total revenue across an entire batch of students."""
    time.sleep(0.010)  # Simulate batch processing latency
    total_raw = sum(r["fee"] for r in records)
    return total_raw * (1.0 + campus_tax)


def demonstrate_parameterized_decorating():
    print("=" * 70)
    print("CODER & ACCOTAX - DECORATING FUNCTIONS WITH ARGUMENTS (*args, **kwargs)")
    print("=" * 70)

    # 1. Calling function with 2 positional arguments:
    print("1. Calling Parameterized Function `calculate_single_student_discount(20000, 0.15)`:")
    net_fee = calculate_single_student_discount(20000.0, 0.15)
    print(f"   Returned Net Payable: INR {net_fee:,.2f}\n")

    # 2. Calling function with list argument and keyword argument:
    print("2. Calling Batch Function with Keyword Argument:")
    batch = [
        {"id": "STU-101", "fee": 18000.0},
        {"id": "STU-102", "fee": 22000.0},
        {"id": "STU-103", "fee": 25000.0}
    ]
    total_rev = process_batch_student_records(batch, campus_tax=0.18)
    print(f"   Returned Total Batch Revenue: INR {total_rev:,.2f}")

    print("\n[PASSED] Parameterized Decorators Verified.")


if __name__ == "__main__":
    demonstrate_parameterized_decorating()
