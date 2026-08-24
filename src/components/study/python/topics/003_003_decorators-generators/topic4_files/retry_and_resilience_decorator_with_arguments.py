# topic4_files/retry_and_resilience_decorator_with_arguments.py
# Module: 003_003_decorators-generators
# Topic: Decorators with arguments & functools.wraps preservation
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: Parameterized Retry Decorator with Exponential Backoff
Demonstrates:
  1. Writing a configurable `@retry_with_backoff` decorator taking custom parameters
  2. Dynamic exception type filtering (only retrying specified exception classes)
  3. Exponential delay backoff calculations for distributed systems resilience
"""

import functools
import time
from typing import Tuple, Type

def retry_with_backoff(
    max_retries: int = 3,
    initial_delay_sec: float = 0.01,
    backoff_factor: float = 2.0,
    retryable_exceptions: Tuple[Type[Exception], ...] = (ConnectionError, TimeoutError)
):
    """Decorator factory that retries failing functions with exponential delay."""

    def decorator(func):

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            current_delay = initial_delay_sec

            for attempt in range(1, max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except retryable_exceptions as exc:
                    if attempt == max_retries:
                        print(f"  [RETRY EXHAUSTED] `{func.__name__}` failed after {max_retries} attempts: {exc}")
                        raise

                    print(
                        f"  [RETRY ATTEMPT #{attempt}/{max_retries}] `{func.__name__}` caught {exc.__class__.__name__}. "
                        f"Backing off for {current_delay*1000:.1f} ms..."
                    )
                    time.sleep(current_delay)
                    current_delay *= backoff_factor

        return wrapper

    return decorator


# Simulated flaky database connection for test:
_connection_attempts = 0

@retry_with_backoff(
    max_retries=4,
    initial_delay_sec=0.005,
    backoff_factor=2.0,
    retryable_exceptions=(ConnectionError,)
)
def query_central_tuition_database(student_id: str) -> dict:
    """Queries student fee record from central remote server (simulates 2 network dropouts)."""
    global _connection_attempts
    _connection_attempts += 1

    if _connection_attempts < 3:
        raise ConnectionError(f"Network glitch on port 5432 (Simulated attempt #{_connection_attempts})")

    return {"student_id": student_id, "name": "Sourav Mukherjee", "fee_status": "PAID"}


def demonstrate_retry_decorator():
    print("=" * 70)
    print("CODER & ACCOTAX - RETRY DECORATOR WITH EXPONENTIAL BACKOFF")
    print("=" * 70)

    print("1. Invoking Flaky Database Query with `@retry_with_backoff`:")
    res = query_central_tuition_database("STU-101")
    print(f"\n   Final Successful Query Result: {res}")
    print(f"   Total Attempts Required      : {_connection_attempts}")

    print("\n[PASSED] Parameterized Retry Decorator Verified.")


if __name__ == "__main__":
    demonstrate_retry_decorator()
