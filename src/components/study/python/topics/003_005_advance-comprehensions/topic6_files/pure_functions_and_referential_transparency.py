# topic6_files/pure_functions_and_referential_transparency.py
# Module: 003_005_advance-comprehensions
# Topic: Pure functions & immutable programming principles in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 1: Pure Functions, Side-Effects & Referential Transparency
Demonstrates:
  1. The formal definition of Pure Functions: Determinism + Zero Side-Effects
  2. Referential Transparency: replacing function calls with return values safely
  3. The dangers of Impure Functions (global state mutation, mutating input arguments)
"""

from typing import List, Dict, Any

# GLOBAL STATE (FOR DEMONSTRATING IMPURE ANTI-PATTERNS)
_global_audit_counter = 0

# ----------------------------------------------------------------------
# 1. IMPURE FUNCTIONS (ANTI-PATTERNS)
# ----------------------------------------------------------------------
def impure_apply_discount(student_record: Dict[str, Any], discount: float) -> Dict[str, Any]:
    """IMPURE: Mutates the incoming input dictionary in-place and modifies global state!"""
    global _global_audit_counter
    _global_audit_counter += 1
    # IN-PLACE MUTATION (Dangerous side-effect! Destroys original caller's data!)
    student_record["fee"] = student_record["fee"] - discount
    return student_record


# ----------------------------------------------------------------------
# 2. PURE FUNCTIONS (FUNCTIONAL BEST PRACTICE)
# ----------------------------------------------------------------------
def pure_apply_discount(student_record: Dict[str, Any], discount: float) -> Dict[str, Any]:
    """PURE: Deterministic, zero side-effects, returns a brand new dictionary copy."""
    return {
        **student_record,
        "fee": student_record["fee"] - discount,
        "discount_applied": discount
    }


def demonstrate_pure_functions():
    print("=" * 70)
    print("CODER & ACCOTAX - PURE FUNCTIONS & REFERENTIAL TRANSPARENCY")
    print("=" * 70)

    original_student = {"id": "STU-101", "name": "Sourav Mukherjee", "fee": 30000.0}

    # 1. Demonstrating Pure Function Execution (Leaves original intact):
    print("1. Executing Pure Function `pure_apply_discount()`:")
    discounted_copy = pure_apply_discount(original_student, 5000.0)

    print(f"   * Original Record (Intact & Unmutated) : {original_student}")
    print(f"   * Returned New Record Copy (Pure State): {discounted_copy}\n")

    # 2. Demonstrating Referential Transparency:
    # `pure_apply_discount(record, 5000)` can be replaced with its value anywhere in the code!
    print("2. Referential Transparency Invariant:")
    val1 = pure_apply_discount(original_student, 5000.0)
    val2 = pure_apply_discount(original_student, 5000.0)
    print(f"   * Call 1 == Call 2 (100% Deterministic): {val1 == val2}")
    print("   -> Function can be safely memoized, parallelized, or cached without concurrency locks!\n")

    # 3. Demonstrating Impure Function Mutation:
    print("3. Demonstrating Impure Function Side-Effects (In-Place Mutation):")
    impure_student = {"id": "STU-102", "name": "Priyanka Sen", "fee": 35000.0}
    print(f"   * Before Impure Call: {impure_student}")
    impure_apply_discount(impure_student, 5000.0)
    print(f"   * After Impure Call : {impure_student} (Original data was destroyed!)")

    print(r"""
Pure Function Invariants:
  1. Given the same inputs, a pure function ALWAYS returns the exact same output.
  2. A pure function NEVER modifies input arguments, globals, or external filesystem/I/O state.
  3. Pure functions eliminate race conditions in multi-threaded concurrent pipelines.
""")
    print("[PASSED] Pure Functions and Referential Transparency Verified.")


if __name__ == "__main__":
    demonstrate_pure_functions()
