"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT II
MODULE 004_001: PROBLEM SOLVING & ALGORITHM TRACING LABORATORY
Topic: Algorithm Implementation with Automated Trace Tables (Euclid GCD, Prime, Factorial)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

import math
from typing import List, Dict, Tuple


def trace_euclidean_gcd(a: int, b: int) -> Tuple[int, List[Dict]]:
    """Traces Euclid's Algorithm step-by-step for Greatest Common Divisor (GCD)."""
    steps = []
    step_num = 1
    num1, num2 = a, b

    while num2 != 0:
        quotient = num1 // num2
        remainder = num1 % num2
        steps.append({
            "step": step_num,
            "a": num1,
            "b": num2,
            "quotient": quotient,
            "remainder": remainder,
            "next_a": num2,
            "next_b": remainder
        })
        num1, num2 = num2, remainder
        step_num += 1

    return num1, steps


def trace_factorial(n: int) -> Tuple[int, List[Dict]]:
    """Generates an iterative trace table for factorial calculation."""
    steps = []
    fact = 1
    for i in range(1, n + 1):
        prev_fact = fact
        fact *= i
        steps.append({
            "step": i,
            "i": i,
            "prev_fact": prev_fact,
            "fact": fact,
            "condition": f"{i} <= {n} (True)"
        })
    return fact, steps


def is_prime_optimized(n: int) -> Tuple[bool, List[str]]:
    """Checks prime number property by testing factors up to sqrt(N)."""
    logs = []
    if n <= 1:
        return False, [f"N = {n} is <= 1, therefore NOT PRIME."]

    limit = int(math.isqrt(n))
    logs.append(f"Testing divisors from 2 up to sqrt({n}) ≈ {limit}")

    for d in range(2, limit + 1):
        if n % d == 0:
            logs.append(f"Found divisor: {n} % {d} == 0 -> COMPOSITE (Not Prime)")
            return False, logs
        else:
            logs.append(f"{n} % {d} != 0 (No remainder)")

    logs.append(f"No divisors found in [2, {limit}] -> PRIME NUMBER!")
    return True, logs


if __name__ == "__main__":
    print("=" * 70)
    print("ALGORITHM 1: EUCLID'S GREATEST COMMON DIVISOR (GCD)")
    print("=" * 70)
    num_a, num_b = 48, 18
    gcd_res, gcd_steps = trace_euclidean_gcd(num_a, num_b)

    print(f"{'Step':^6} | {'A':^6} | {'B':^6} | {'Quotient':^10} | {'Remainder':^10} | {'Next (A, B)':^14}")
    print("-" * 70)
    for s in gcd_steps:
        print(f"{s['step']:^6d} | {s['a']:^6d} | {s['b']:^6d} | {s['quotient']:^10d} | {s['remainder']:^10d} | ({s['next_a']}, {s['next_b']})")
    print(f"\nFinal GCD({num_a}, {num_b}) = {gcd_res}")

    print("\n" + "=" * 70)
    print("ALGORITHM 2: FACTORIAL TRACE TABLE (N = 5)")
    print("=" * 70)
    f_res, f_steps = trace_factorial(5)
    for s in f_steps:
        print(f"Step {s['step']}: I = {s['i']} | Calculation: {s['prev_fact']} * {s['i']} = {s['fact']}")
    print(f"Final 5! = {f_res}")
