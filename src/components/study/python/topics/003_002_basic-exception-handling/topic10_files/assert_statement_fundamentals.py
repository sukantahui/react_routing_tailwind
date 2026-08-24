# topic10_files/assert_statement_fundamentals.py
# Module: 003_002_basic-exception-handling
# Topic: Using assertions with assert for internal invariant checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 1: Assert Statement Fundamentals (`assert`)
Demonstrates:
  1. Syntax and semantics of `assert <condition>, <optional_message>`
  2. How `assert` raises `AssertionError` when the condition is False
  3. Proper use of assertions to catch internal programmer bugs early
"""

def compute_tuition_discount(gross_fee: float, discount_percentage: float) -> float:
    """Computes discounted fee using assert to verify internal calculation integrity."""
    # 1. Production Input Validation (Using `raise`, NOT `assert`!)
    if not isinstance(gross_fee, (int, float)) or gross_fee < 0:
        raise ValueError(f"Invalid gross fee: INR {gross_fee}")
    if not isinstance(discount_percentage, (int, float)) or not (0.0 <= discount_percentage <= 1.0):
        raise ValueError(f"Discount percentage must be between 0.0 and 1.0, got {discount_percentage}")

    # Calculate discount:
    discount_amount = gross_fee * discount_percentage
    net_fee = gross_fee - discount_amount

    # 2. Internal Invariant Assertion (Guarantees our math algorithm didn't produce an impossible state)
    assert 0.0 <= net_fee <= gross_fee, f"Internal Math Invariant Violated! Net fee {net_fee} is outside bounds [0, {gross_fee}]"
    assert discount_amount >= 0.0, "Internal Invariant: Discount amount cannot be negative!"

    return net_fee


def demonstrate_assert_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - ASSERT STATEMENT FUNDAMENTALS")
    print("=" * 70)

    # 1. Valid Calculation
    print("1. Calculating Normal Discount (INR 20,000 with 15% discount):")
    net = compute_tuition_discount(20000.0, 0.15)
    print(f"   Calculated Net Fee: INR {net:,.2f} (Assertions passed cleanly!)\n")

    # 2. Testing Input Validation Guard (Raises ValueError)
    print("2. Testing Input Validation Guard (Passing invalid percentage 1.5):")
    try:
        compute_tuition_discount(20000.0, 1.5)
    except ValueError as err:
        print(f"   [CAUGHT INPUT VALIDATION ERROR] ValueError: {err}\n")

    # 3. Triggering an AssertionError directly:
    print("3. Demonstrating Raw AssertionError Triggering:")
    try:
        current_students = -5
        assert current_students >= 0, f"Classroom student count cannot be negative: {current_students}"
    except AssertionError as err:
        print(f"   [CAUGHT INTERNAL ASSERTION ERROR] AssertionError: {err}")

    print("\n[PASSED] Assert Statement Fundamentals Verified.")


if __name__ == "__main__":
    demonstrate_assert_fundamentals()
