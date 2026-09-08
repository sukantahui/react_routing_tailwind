"""
================================================================================
Topic 10 - Script 01: Vectorized Element-Wise Arithmetic Operations
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Standard arithmetic operators: +, -, *, /, //, %, **
- Array-Array and Array-Scalar vectorized arithmetic
- Performance comparison: Vectorized C loops vs Python list comprehensions
================================================================================
"""

import time
import numpy as np

def demonstrate_elementwise_arithmetic():
    print("=" * 65)
    print("1. BASIC ELEMENT-WISE OPERATIONS")
    print("=" * 65)

    a = np.array([10, 20, 30, 40], dtype=np.float64)
    b = np.array([2,   4,  5,  8], dtype=np.float64)

    print("Array a:", a)
    print("Array b:", b)
    print("-" * 40)
    print("Addition       (a + b) :", a + b)
    print("Subtraction    (a - b) :", a - b)
    print("Multiplication (a * b) :", a * b)
    print("Division       (a / b) :", a / b)
    print("Power          (a ** 2):", a ** 2)
    print("Modulus        (a % b) :", a % b)

    print("\n" + "=" * 65)
    print("2. SPEED BENCHMARK: 1,000,000 ELEMENTS ADDITION")
    print("=" * 65)
    
    n = 1_000_000
    py_a = list(range(n))
    py_b = list(range(n))
    np_a = np.arange(n)
    np_b = np.arange(n)

    # Pure Python loop
    t0 = time.perf_counter()
    py_res = [x + y for x, y in zip(py_a, py_b)]
    t_py = (time.perf_counter() - t0) * 1000

    # NumPy SIMD Vectorized addition
    t0 = time.perf_counter()
    np_res = np_a + np_b
    t_np = (time.perf_counter() - t0) * 1000

    print(f"Pure Python loop time : {t_py:.2f} ms")
    print(f"NumPy vectorized time : {t_np:.2f} ms")
    print(f"Speedup Factor        : {t_py / t_np:.1f}x faster!")

if __name__ == "__main__":
    demonstrate_elementwise_arithmetic()
