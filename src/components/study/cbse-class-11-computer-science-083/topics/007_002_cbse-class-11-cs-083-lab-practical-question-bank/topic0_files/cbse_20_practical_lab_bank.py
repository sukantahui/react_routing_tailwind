"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (SUBJECT CODE: 083)
SPECIAL PRACTICAL LAB REPOSITORY: 20-PROGRAM CURATED REPOSITORY ALIGNED WITH CBSE SUGGESTIONS
Educator: Sukanta Hui | Institute: Coder & AccoTax | Location: Barrackpore, Kolkata
================================================================================
"""

import math
import random
import statistics


# ------------------------------------------------------------------------------
# PROGRAM 1: Input two numbers and perform all fundamental arithmetic calculations
# ------------------------------------------------------------------------------
def program_01_arithmetic_calculator(a: float, b: float) -> dict:
    """Performs addition, subtraction, multiplication, true division, floor division, modulo, and power."""
    return {
        "addition": a + b,
        "subtraction": a - b,
        "multiplication": a * b,
        "true_division": a / b if b != 0 else "Undefined (ZeroDivision)",
        "floor_division": a // b if b != 0 else "Undefined",
        "modulo": a % b if b != 0 else "Undefined",
        "exponentiation": a ** b
    }


# ------------------------------------------------------------------------------
# PROGRAM 2: Determine the largest and smallest among three numbers
# ------------------------------------------------------------------------------
def program_02_largest_smallest_three(x: float, y: float, z: float) -> tuple:
    """Finds largest and smallest using nested conditionals."""
    # Finding largest
    if x >= y and x >= z:
        largest = x
    elif y >= x and y >= z:
        largest = y
    else:
        largest = z

    # Finding smallest
    if x <= y and x <= z:
        smallest = x
    elif y <= x and y <= z:
        smallest = y
    else:
        smallest = z

    return largest, smallest


# ------------------------------------------------------------------------------
# PROGRAM 3: Quadratic Equation Solver with Discriminant Analysis (ax^2 + bx + c = 0)
# ------------------------------------------------------------------------------
def program_03_quadratic_roots(a: float, b: float, c: float) -> dict:
    """Computes discriminant D = b^2 - 4ac and resolves real or complex roots."""
    if a == 0:
        return {"type": "Linear Equation", "root": -c / b if b != 0 else None}

    d = (b ** 2) - (4 * a * c)
    if d > 0:
        r1 = (-b + math.sqrt(d)) / (2 * a)
        r2 = (-b - math.sqrt(d)) / (2 * a)
        return {"nature": "Real and Distinct", "d": d, "roots": (r1, r2)}
    elif d == 0:
        r = -b / (2 * a)
        return {"nature": "Real and Equal", "d": d, "roots": (r, r)}
    else:
        real_part = -b / (2 * a)
        imag_part = math.sqrt(abs(d)) / (2 * a)
        return {"nature": "Complex Conjugates", "d": d, "roots": (f"{real_part} + {imag_part}j", f"{real_part} - {imag_part}j")}


# ------------------------------------------------------------------------------
# PROGRAM 4: Prime Number Verification and Range Generator [start, end]
# ------------------------------------------------------------------------------
def program_04_is_prime(n: int) -> bool:
    if n <= 1:
        return False
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0:
            return False
    return True


def program_04_primes_in_range(start: int, end: int) -> list:
    return [num for num in range(start, end + 1) if program_04_is_prime(num)]


# ------------------------------------------------------------------------------
# PROGRAM 5: Fibonacci Sequence Generator up to N terms
# ------------------------------------------------------------------------------
def program_05_fibonacci_series(n_terms: int) -> list:
    """Generates Fibonacci terms: 0, 1, 1, 2, 3, 5, 8, 13, ..."""
    if n_terms <= 0:
        return []
    elif n_terms == 1:
        return [0]
    series = [0, 1]
    while len(series) < n_terms:
        series.append(series[-1] + series[-2])
    return series


# ------------------------------------------------------------------------------
# PROGRAM 6: Armstrong Number Checker and 3-digit Armstrong numbers
# ------------------------------------------------------------------------------
def program_06_is_armstrong(n: int) -> bool:
    """A number equals sum of its digits raised to power of total digits."""
    s = str(n)
    power = len(s)
    return sum(int(digit) ** power for digit in s) == n


# ------------------------------------------------------------------------------
# PROGRAM 7: Palindrome String and Number Verification
# ------------------------------------------------------------------------------
def program_07_is_palindrome(val) -> bool:
    s = str(val).lower()
    return s == s[::-1]


# ------------------------------------------------------------------------------
# PROGRAM 8: GCD (HCF) and LCM computation using Euclid's Algorithm
# ------------------------------------------------------------------------------
def program_08_gcd_and_lcm(a: int, b: int) -> tuple:
    x, y = a, b
    while y != 0:
        x, y = y, x % y
    gcd_val = x
    lcm_val = abs(a * b) // gcd_val if gcd_val != 0 else 0
    return gcd_val, lcm_val


# ------------------------------------------------------------------------------
# PROGRAM 9: Sum of Geometric Series: 1 + x + x^2 + x^3 + ... + x^n
# ------------------------------------------------------------------------------
def program_09_sum_series_geometric(x: float, n: int) -> float:
    return sum(x ** i for i in range(n + 1))


# ------------------------------------------------------------------------------
# PROGRAM 10: Sum of Alternating Series: 1 - x + x^2 - x^3 + ... + (-1)^n * x^n
# ------------------------------------------------------------------------------
def program_10_sum_alternating_series(x: float, n: int) -> float:
    return sum(((-1) ** i) * (x ** i) for i in range(n + 1))


# ------------------------------------------------------------------------------
# PROGRAM 11: Factorial Calculation (Iterative)
# ------------------------------------------------------------------------------
def program_11_factorial(n: int) -> int:
    fact = 1
    for i in range(1, n + 1):
        fact *= i
    return fact


# ------------------------------------------------------------------------------
# PROGRAM 12: Perfect Number Verifier (Sum of proper divisors == Number)
# ------------------------------------------------------------------------------
def program_12_is_perfect_number(n: int) -> bool:
    if n <= 1:
        return False
    divisors = [i for i in range(1, n) if n % i == 0]
    return sum(divisors) == n


# ------------------------------------------------------------------------------
# PROGRAM 13: String Character Case and Glyphs Counter
# ------------------------------------------------------------------------------
def program_13_count_character_types(text: str) -> dict:
    counts = {"uppercase": 0, "lowercase": 0, "vowels": 0, "consonants": 0, "digits": 0, "spaces": 0, "specials": 0}
    for ch in text:
        if ch.isupper():
            counts["uppercase"] += 1
        elif ch.islower():
            counts["lowercase"] += 1
        if ch.isalpha():
            if ch.lower() in "aeiou":
                counts["vowels"] += 1
            else:
                counts["consonants"] += 1
        elif ch.isdigit():
            counts["digits"] += 1
        elif ch.isspace():
            counts["spaces"] += 1
        else:
            counts["specials"] += 1
    return counts


# ------------------------------------------------------------------------------
# PROGRAM 14: Pattern Generation (Right Triangle & Centered Pyramid)
# ------------------------------------------------------------------------------
def program_14_triangle_pattern(rows: int) -> list:
    return ["* " * i for i in range(1, rows + 1)]


# ------------------------------------------------------------------------------
# PROGRAM 15: List Statistics: Max, Min, Mean, Median, and Second Largest
# ------------------------------------------------------------------------------
def program_15_list_statistics(numbers: list) -> dict:
    unique_nums = sorted(list(set(numbers)))
    second_largest = unique_nums[-2] if len(unique_nums) >= 2 else None
    return {
        "max": max(numbers),
        "min": min(numbers),
        "mean": statistics.mean(numbers),
        "median": statistics.median(numbers),
        "second_largest": second_largest
    }


# ------------------------------------------------------------------------------
# PROGRAM 16: Linear Search Algorithm on List
# ------------------------------------------------------------------------------
def program_16_linear_search(lst: list, target) -> int:
    for idx, val in enumerate(lst):
        if val == target:
            return idx
    return -1


# ------------------------------------------------------------------------------
# PROGRAM 17: List Element Frequency Counter using Dictionary
# ------------------------------------------------------------------------------
def program_17_frequency_counter(elements: list) -> dict:
    freq = {}
    for item in elements:
        freq[item] = freq.get(item, 0) + 1
    return freq


# ------------------------------------------------------------------------------
# PROGRAM 18: Tuple Swapping, Slicing, and Min-Max Extraction
# ------------------------------------------------------------------------------
def program_18_tuple_operations(t1: tuple, t2: tuple) -> dict:
    swapped_t1, swapped_t2 = t2, t1
    combined = t1 + t2
    return {
        "swapped": (swapped_t1, swapped_t2),
        "concatenated": combined,
        "slice_first_three": combined[:3],
        "max": max(combined) if all(isinstance(x, (int, float)) for x in combined) else None
    }


# ------------------------------------------------------------------------------
# PROGRAM 19: Student Record Manager using Nested Dictionary
# ------------------------------------------------------------------------------
def program_19_student_records() -> dict:
    students = {
        101: {"name": "Mamata", "stream": "Science", "marks": 98.0},
        102: {"name": "Susmita", "stream": "Science", "marks": 95.5},
        103: {"name": "Abhronila", "stream": "Computer Science", "marks": 99.0},
        104: {"name": "Debangshu", "stream": "Commerce", "marks": 91.0}
    }
    return students


# ------------------------------------------------------------------------------
# PROGRAM 20: Random Number Simulation (6-Sided Dice Roll & Lottery)
# ------------------------------------------------------------------------------
def program_20_random_simulation(rolls: int = 10) -> list:
    return [random.randint(1, 6) for _ in range(rolls)]


if __name__ == "__main__":
    print("=" * 70)
    print("CBSE CLASS XI COMPUTER SCIENCE (083) - 20 PRACTICAL PROGRAMS AUDIT")
    print("=" * 70)
    print("1. Arithmetic Calculator (10, 4) ->", program_01_arithmetic_calculator(10, 4))
    print("2. Largest & Smallest (45, 89, 12) ->", program_02_largest_smallest_three(45, 89, 12))
    print("3. Quadratic Roots (1, -5, 6) ->", program_03_quadratic_roots(1, -5, 6))
    print("4. Primes in [10, 30] ->", program_04_primes_in_range(10, 30))
    print("5. Fibonacci (7 terms) ->", program_05_fibonacci_series(7))
    print("6. Is Armstrong (153) ->", program_06_is_armstrong(153))
    print("7. Is Palindrome ('Racecar') ->", program_07_is_palindrome("Racecar"))
    print("8. GCD & LCM (48, 18) ->", program_08_gcd_and_lcm(48, 18))
    print("9. Factorial (5!) ->", program_11_factorial(5))
    print("10. Perfect Number (28) ->", program_12_is_perfect_number(28))
    print("=" * 70)
