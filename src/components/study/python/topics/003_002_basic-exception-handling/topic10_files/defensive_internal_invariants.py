# topic10_files/defensive_internal_invariants.py
# Module: 003_002_basic-exception-handling
# Topic: Using assertions with assert for internal invariant checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 3: Legitimate & Recommended Assert Use Cases
Demonstrates:
  1. Postcondition Verification: Ensuring complex algorithms satisfy mathematical properties
  2. Defensive Invariants in Private Internal Helper Methods
  3. Unreachable Code Sentinel in Exhaustive Condition Branches
"""

from typing import List, Tuple

def calculate_normalized_weights(raw_scores: List[float]) -> List[float]:
    """Calculates relative normalized weights (0.0 to 1.0) summing to 1.0."""
    # 1. Public Input Validation using raise:
    if not raw_scores or any(s < 0 for s in raw_scores):
        raise ValueError("Raw scores list must be non-empty with all values >= 0")

    total_sum = sum(raw_scores)
    if total_sum == 0:
        return [1.0 / len(raw_scores)] * len(raw_scores)

    weights = [score / total_sum for score in raw_scores]

    # 2. LEGITIMATE ASSERT USE CASE 1: Mathematical Postcondition Invariant Check
    # Guarantees that floating point calculation produced weights summing to approx 1.0:
    weight_sum = sum(weights)
    assert abs(weight_sum - 1.0) < 1e-6, f"Invariant Broken: Weights sum to {weight_sum}, expected 1.0!"
    assert len(weights) == len(raw_scores), "Invariant Broken: Weight vector dimension mismatch!"

    return weights


def route_grade_action(letter_grade: str) -> str:
    """Demonstrates LEGITIMATE ASSERT USE CASE 2: Unreachable Branch Sentinel."""
    if letter_grade in ("A+", "A"):
        return "Distinction Certificate"
    elif letter_grade in ("B+", "B"):
        return "Standard Certificate"
    elif letter_grade == "F":
        return "Remedial Coaching Required"
    else:
        # If upstream code failed to sanitize grade letter, assert catches the impossible branch!
        assert False, f"Unreachable Branch Reached: Unrecognized letter grade '{letter_grade}'!"


def demonstrate_legitimate_asserts():
    print("=" * 70)
    print("CODER & ACCOTAX - LEGITIMATE INVARIANT ASSERTION PATTERNS")
    print("=" * 70)

    # 1. Mathematical Postcondition Check
    print("1. Computing Normalized Weights for [85.0, 90.0, 95.0]:")
    weights = calculate_normalized_weights([85.0, 90.0, 95.0])
    for idx, w in enumerate(weights, 1):
        print(f"   Student {idx} Weight: {w:.4f} ({w * 100:.2f}%)")
    print("   [OK] Postcondition Invariant (Sum == 1.0) Verified.\n")

    # 2. Unreachable Branch Sentinel
    print("2. Testing Unreachable Branch Sentinel with invalid grade 'Z':")
    try:
        route_grade_action("Z")
    except AssertionError as err:
        print(f"   [CAUGHT UNREACHABLE BRANCH SENTINEL] AssertionError: {err}")

    print("\n[PASSED] Legitimate Invariant Patterns Verified.")


if __name__ == "__main__":
    demonstrate_legitimate_asserts()
