# topic10_files/mro_inconsistent_hierarchy_and_errors.py
# Module: 003_001_object-oriented-python
# Topic: Method Resolution Order (MRO)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 2: Inconsistent MRO & TypeError Diagnosis
Demonstrates:
  1. What causes `TypeError: Cannot create a consistent method resolution order (MRO)`
  2. How contradictory parent ordering violates the Monotonicity constraint
  3. Diagnosing and refactoring invalid class definitions
"""

class BaseA:
    pass

class BaseB(BaseA):
    pass

def demonstrate_inconsistent_mro_trap():
    print("=" * 70)
    print("CODER & ACCOTAX - INCONSISTENT MRO CONFLICT DIAGNOSIS")
    print("=" * 70)

    print(r"""
The Conflict Scenario:
  - BaseB inherits from BaseA (So in MRO: BaseB MUST precede BaseA)
  - If a child defines: `class InvalidChild(BaseA, BaseB):`
    * The declaration header demands: BaseA comes before BaseB
    * But BaseB's definition demands: BaseB comes before BaseA
  - These two constraints are mutually contradictory! C3 linearization FAILS!
""")

    print("Attempting to declare: `class InvalidChild(BaseA, BaseB):`")
    try:
        # Dynamically create the contradictory class to catch TypeError at runtime:
        type("InvalidChild", (BaseA, BaseB), {})
    except TypeError as err:
        print(f"  [PYTHON BLOCKED COMPILATION] TypeError: {err}")

    # Canonical Fix:
    print("\nCanonical Solution: List more specialized classes before general base classes:")
    print("  `class ValidChild(BaseB, BaseA): pass`")
    ValidChild = type("ValidChild", (BaseB, BaseA), {})
    print(f"  Valid MRO: {[c.__name__ for c in ValidChild.__mro__]}")

    print("\n[PASSED] Inconsistent MRO Diagnosis Complete.")


if __name__ == "__main__":
    demonstrate_inconsistent_mro_trap()
