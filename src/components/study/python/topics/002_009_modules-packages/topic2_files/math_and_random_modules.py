# topic2_files/math_and_random_modules.py
# Module: 002_009_modules-packages
# Topic: Built-in standard library modules: math, random, datetime, sys, os
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: Python math, random & secrets Standard Library Modules
Demonstrates:
  1. math module functions: sqrt, ceil, floor, gcd, isclose, pi, e
  2. random module: randint, choice, shuffle, sample, seed
  3. secrets module: Cryptographically secure random tokens for auth and security
"""

import math
import random
import secrets

def demonstrate_math_module():
    print("=" * 65)
    print("1. math MODULE: HIGH-PRECISION MATHEMATICAL FUNCTIONS")
    print("=" * 65)

    # Basic Constants
    print(f"math.pi             : {math.pi:.6f}")
    print(f"math.e              : {math.e:.6f}\n")

    # Rounding & Roots
    val = 14.337
    print(f"math.ceil({val})      : {math.ceil(val)} (Round up)")
    print(f"math.floor({val})     : {math.floor(val)} (Round down)")
    print(f"math.sqrt(225)      : {math.sqrt(225)}")
    print(f"math.pow(2, 8)      : {math.pow(2, 8)} (2^8 as float)\n")

    # Number Theory & Comparisons
    print(f"math.gcd(48, 180)   : {math.gcd(48, 180)} (Greatest Common Divisor)")
    print(f"math.factorial(6)   : {math.factorial(6)} (6!)")
    
    # Float precision comparison: math.isclose()
    f1 = 0.1 + 0.2
    f2 = 0.3
    print(f"0.1 + 0.2 == 0.3    : {f1 == f2} (False due to float binary representation!)")
    print(f"math.isclose(f1, f2): {math.isclose(f1, f2)} (True - safe float comparison!)")


def demonstrate_random_module():
    print("\n" + "=" * 65)
    print("2. random MODULE: PSEUDO-RANDOM NUMBER GENERATION")
    print("=" * 65)

    # Set seed for reproducible experiments
    random.seed(42)

    students = ["Susmita", "Rahul", "Priya", "Anirban", "Sneha", "Debjit"]
    print(f"Student Pool        : {students}")

    # Random selection
    lucky_winner = random.choice(students)
    print(f"random.choice()     : '{lucky_winner}' selected as batch representative")

    # Random sampling without replacement
    committee = random.sample(students, k=3)
    print(f"random.sample(k=3)  : {committee}")

    # Random integers & floats
    roll_num = random.randint(1001, 1099)
    discount = round(random.uniform(5.0, 15.0), 1)
    print(f"random.randint()    : Roll #{roll_num}")
    print(f"random.uniform()    : {discount}% Scholarship discount")

    # In-place shuffling
    deck = [1, 2, 3, 4, 5]
    random.shuffle(deck)
    print(f"random.shuffle()    : {deck}")


def demonstrate_secrets_module():
    print("\n" + "=" * 65)
    print("3. secrets MODULE: CRYPTOGRAPHICALLY SECURE RANDOM GENERATION")
    print("=" * 65)

    # secrets is designed for passwords, security tokens, and OTPs
    auth_token = secrets.token_hex(16)
    url_safe_token = secrets.token_urlsafe(16)
    otp_code = secrets.randbelow(900000) + 100000  # 6-digit OTP

    print(f"Auth Hex Token (32-char) : {auth_token}")
    print(f"URL-Safe Token           : {url_safe_token}")
    print(f"Secure 6-Digit SMS OTP   : {otp_code}")


if __name__ == "__main__":
    demonstrate_math_module()
    demonstrate_random_module()
    demonstrate_secrets_module()
