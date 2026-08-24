# topic4_files/unit_testing_and_benchmarking_guard.py
# Module: 002_009_modules-packages
# Topic: The __name__ == '__main__' idiom explained with practical use cases
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: Unit Testing & Performance Benchmarking Inside Main Guard
Demonstrates:
  1. Embedding self-testing test assertions inside if __name__ == '__main__':
  2. Execution micro-benchmarks with time.perf_counter()
  3. Guaranteeing zero testing performance overhead when imported
"""

import time
from typing import List

def is_prime_number(n: int) -> bool:
    """Returns True if n is prime, False otherwise."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def run_unit_tests():
    """Executes embedded test suite."""
    print("Running Module Unit Tests:")
    assert is_prime_number(2) is True, "Test Failed: 2 is prime"
    assert is_prime_number(17) is True, "Test Failed: 17 is prime"
    assert is_prime_number(4) is False, "Test Failed: 4 is composite"
    assert is_prime_number(1) is False, "Test Failed: 1 is not prime"
    assert is_prime_number(97) is True, "Test Failed: 97 is prime"
    print("  [PASSED] All 5 Unit Test Assertions Passed Successfully!\n")


def run_micro_benchmark():
    """Benchmarks finding primes under 100,000."""
    print("Running Algorithm Performance Benchmark:")
    t_start = time.perf_counter()

    primes_count = sum(1 for i in range(100_000) if is_prime_number(i))

    t_end = time.perf_counter()
    duration_ms = (t_end - t_start) * 1000

    print(f"  Total Primes < 100,000 : {primes_count}")
    print(f"  Execution Duration     : {duration_ms:.2f} ms")


if __name__ == "__main__":
    print("=" * 65)
    print("MODULE VERIFICATION & BENCHMARK SUITE")
    print("=" * 65)
    run_unit_tests()
    run_micro_benchmark()
