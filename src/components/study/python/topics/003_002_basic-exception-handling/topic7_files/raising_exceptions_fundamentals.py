# topic7_files/raising_exceptions_fundamentals.py
# Module: 003_002_basic-exception-handling
# Topic: Raising exceptions intentionally using raise keyword
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Raising Exceptions Intentionally (`raise` statement)
Demonstrates:
  1. Syntax and semantics of the `raise` keyword
  2. Raising exceptions with descriptive error messages
  3. Precondition enforcement: Validating function inputs fail-fast
"""

def enroll_student(full_name: str, age: int, initial_fee_inr: float):
    """Enforces institutional enrollment invariants using `raise`."""
    # 1. Type Validation Guard
    if not isinstance(full_name, str) or not full_name.strip():
        raise TypeError(f"Student name must be a non-empty string, got {type(full_name).__name__}!")

    # 2. Age Constraint Guard
    if not isinstance(age, int):
        raise TypeError(f"Age must be an integer, got {type(age).__name__}!")
    if not (14 <= age <= 80):
        raise ValueError(f"Student age {age} is outside eligible institutional criteria (14 - 80 years)!")

    # 3. Financial Invariant Guard
    if initial_fee_inr < 0:
        raise ValueError(f"Initial fee cannot be negative: INR {initial_fee_inr:,.2f}")

    print(f"  [ENROLLMENT SUCCESSFUL] Student: {full_name.strip()} (Age: {age}) | Fee: INR {initial_fee_inr:,.2f}")


def demonstrate_raising_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - RAISING EXCEPTIONS FUNDAMENTALS")
    print("=" * 70)

    # 1. Valid Enrollment
    print("1. Valid Student Enrollment:")
    enroll_student("Sourav Mukherjee", 21, 18000.0)

    # 2. Triggering Type Guard
    print("\n2. Triggering Type Guard (Passing empty name):")
    try:
        enroll_student("", 22, 18000.0)
    except TypeError as err:
        print(f"   [CAUGHT] TypeError: {err}")

    # 3. Triggering Age Constraint Guard
    print("\n3. Triggering Age Guard (Passing age 10):")
    try:
        enroll_student("Arijit Roy", 10, 18000.0)
    except ValueError as err:
        print(f"   [CAUGHT] ValueError: {err}")

    # 4. Triggering Financial Invariant Guard
    print("\n4. Triggering Fee Guard (Passing negative fee):")
    try:
        enroll_student("Priyanka Sen", 24, -5000.0)
    except ValueError as err:
        print(f"   [CAUGHT] ValueError: {err}")

    print("\n[PASSED] Raising Exceptions Fundamentals Verified.")


if __name__ == "__main__":
    demonstrate_raising_fundamentals()
