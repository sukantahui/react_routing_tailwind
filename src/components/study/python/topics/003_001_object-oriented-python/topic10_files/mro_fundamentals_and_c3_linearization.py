# topic10_files/mro_fundamentals_and_c3_linearization.py
# Module: 003_001_object-oriented-python
# Topic: Method Resolution Order (MRO)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 1: Method Resolution Order (MRO) & C3 Linearization Fundamentals
Demonstrates:
  1. What is MRO: The deterministic order in which Python searches classes for attributes/methods
  2. Inspecting MRO using `ClassName.__mro__` and `ClassName.mro()`
  3. Method lookup in classic diamond hierarchies
"""

# =====================================================================
# DIAMOND HIERARCHY SETUP
# =====================================================================
class RootEntity:
    def identify(self) -> str:
        return "Identity from RootEntity"


class BranchA(RootEntity):
    def identify(self) -> str:
        return "Identity from BranchA (Left)"


class BranchB(RootEntity):
    def identify(self) -> str:
        return "Identity from BranchB (Right)"


class CompositeDiamond(BranchA, BranchB):
    """Inherits from BranchA first, then BranchB."""
    pass


class InvertedDiamond(BranchB, BranchA):
    """Inherits from BranchB first, then BranchA."""
    pass


def demonstrate_mro_inspection():
    print("=" * 70)
    print("CODER & ACCOTAX - METHOD RESOLUTION ORDER (MRO) FUNDAMENTALS")
    print("=" * 70)

    # 1. Inspect CompositeDiamond MRO
    print("1. MRO for CompositeDiamond(BranchA, BranchB):")
    for idx, cls in enumerate(CompositeDiamond.__mro__):
        print(f"   [{idx}] {cls.__name__}")

    cd = CompositeDiamond()
    print(f"\n   Calling cd.identify() -> '{cd.identify()}' (Resolved from BranchA first!)\n")

    # 2. Inspect InvertedDiamond MRO
    print("2. MRO for InvertedDiamond(BranchB, BranchA):")
    for idx, cls in enumerate(InvertedDiamond.mro()):
        print(f"   [{idx}] {cls.__name__}")

    inv = InvertedDiamond()
    print(f"\n   Calling inv.identify() -> '{inv.identify()}' (Resolved from BranchB first!)")

    print("\n[PASSED] MRO Fundamentals & Inspection Verified.")


if __name__ == "__main__":
    demonstrate_mro_inspection()
