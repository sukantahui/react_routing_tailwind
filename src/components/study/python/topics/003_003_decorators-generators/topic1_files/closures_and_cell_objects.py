# topic1_files/closures_and_cell_objects.py
# Module: 003_003_decorators-generators
# Topic: Inner functions and variable scope closures
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: Closures Anatomy & CPython Cell Objects
Demonstrates:
  1. The 3 criteria required to form a Closure in Python
  2. Persistent state retention after outer function termination
  3. Inspecting `__closure__` and `cell_contents` at runtime
"""

def make_tuition_discount_closure(discount_percentage: float):
    """Enclosing function returning an inner closure."""
    # Variable in enclosing scope:
    multiplier = 1.0 - (discount_percentage / 100.0)

    # Inner function referencing enclosing variable `multiplier`:
    def apply_discount(base_tuition: float) -> float:
        return base_tuition * multiplier

    # Return the inner function object:
    return apply_discount


def demonstrate_closure_anatomy():
    print("=" * 70)
    print("CODER & ACCOTAX - CLOSURES & CPYTHON CELL OBJECTS")
    print("=" * 70)

    # 1. Create two distinct closure instances:
    print("1. Instantiating Closures with Enclosed Multipliers:")
    scholarship_closure = make_tuition_discount_closure(20.0)  # 20% discount (0.80x)
    concession_closure = make_tuition_discount_closure(10.0)   # 10% discount (0.90x)

    # Outer function `make_tuition_discount_closure` has ALREADY returned and finished!
    # Yet the inner functions still retain access to their respective `multiplier` values.

    print(f"   Scholarship Closure Result (INR 25,000): INR {scholarship_closure(25000):,.2f}")
    print(f"   Concession Closure Result  (INR 25,000): INR {concession_closure(25000):,.2f}\n")

    # 2. Inspecting CPython `__closure__` and cell objects:
    print("2. Inspecting `__closure__` Introspection Attributes:")
    print(f"   Closure Object Tuple : {scholarship_closure.__closure__}")
    print(f"   Cell Object Type     : {type(scholarship_closure.__closure__[0])}")
    print(f"   Enclosed Value (Cell): {scholarship_closure.__closure__[0].cell_contents}")

    print(f"\n   Concession Enclosed Cell: {concession_closure.__closure__[0].cell_contents}")

    print(r"""
The 3 Strict Criteria for a Python Closure:
  1. We must have a nested inner function (`def apply_discount`).
  2. The inner function must refer to a value in its enclosing scope (`multiplier`).
  3. The enclosing function must return the nested function object (`return apply_discount`).
""")
    print("[PASSED] Closures & Cell Objects Verified.")


if __name__ == "__main__":
    demonstrate_closure_anatomy()
