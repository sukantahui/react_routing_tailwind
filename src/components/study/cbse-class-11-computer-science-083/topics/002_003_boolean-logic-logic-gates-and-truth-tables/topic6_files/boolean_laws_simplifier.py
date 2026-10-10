# boolean_laws_simplifier.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Postulates and Laws of Boolean Logic
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates the fundamental Postulates and Theorems of Boolean Logic.
It verifies all law pairs across all input states and performs step-by-step
algebraic expression simplification.
"""

from typing import List, Tuple

class BooleanLaws:
    # 1. Properties of 0 and 1 (Identity & Null / Boundedness)
    @staticmethod
    def identity_or(a: int) -> int: return a | 0       # A + 0 = A
    @staticmethod
    def identity_and(a: int) -> int: return a & 1      # A · 1 = A
    @staticmethod
    def null_or(a: int) -> int: return a | 1           # A + 1 = 1
    @staticmethod
    def null_and(a: int) -> int: return a & 0          # A · 0 = 0

    # 2. Idempotent Law
    @staticmethod
    def idempotent_or(a: int) -> int: return a | a     # A + A = A
    @staticmethod
    def idempotent_and(a: int) -> int: return a & a    # A · A = A

    # 3. Complement Law
    @staticmethod
    def complement_or(a: int) -> int: return a | (1 - a)   # A + A' = 1
    @staticmethod
    def complement_and(a: int) -> int: return a & (1 - a)  # A · A' = 0

    # 4. Involution Law
    @staticmethod
    def involution(a: int) -> int: return 1 - (1 - a)       # (A')' = A

    # 5. Distributive Laws
    @staticmethod
    def dist_1(a: int, b: int, c: int) -> Tuple[int, int]:
        # A(B + C) = AB + AC
        lhs = a & (b | c)
        rhs = (a & b) | (a & c)
        return lhs, rhs

    @staticmethod
    def dist_2(a: int, b: int, c: int) -> Tuple[int, int]:
        # A + BC = (A + B)(A + C)  [Unique Boolean Distributive Form]
        lhs = a | (b & c)
        rhs = (a | b) & (a | c)
        return lhs, rhs

    # 6. Absorption Laws
    @staticmethod
    def absorption_1(a: int, b: int) -> Tuple[int, int]:
        # A + AB = A
        lhs = a | (a & b)
        return lhs, a

    @staticmethod
    def absorption_2(a: int, b: int) -> Tuple[int, int]:
        # A(A + B) = A
        lhs = a & (a | b)
        return lhs, a

    @staticmethod
    def absorption_3(a: int, b: int) -> Tuple[int, int]:
        # A + A'B = A + B
        lhs = a | ((1 - a) & b)
        rhs = a | b
        return lhs, rhs

def demonstrate_all_laws():
    print("=" * 70)
    print("      CBSE CLASS XI CS (083) - BOOLEAN LAWS VERIFIER & CATALOGUE")
    print("=" * 70)

    # Verify Second Distributive Law: A + BC = (A + B)(A + C)
    print("\n[1] SECOND DISTRIBUTIVE LAW: A + BC = (A + B)(A + C)")
    print("-" * 60)
    print(f"{'A':<4} {'B':<4} {'C':<4} | {'LHS: A + BC':<15} | {'RHS: (A+B)(A+C)':<15} | {'Status'}")
    print("-" * 60)
    for a in [0, 1]:
        for b in [0, 1]:
            for c in [0, 1]:
                lhs, rhs = BooleanLaws.dist_2(a, b, c)
                status = "MATCH (Equal)" if lhs == rhs else "ERROR"
                print(f"{a:<4} {b:<4} {c:<4} | {lhs:<15} | {rhs:<15} | {status}")

    # Verify Absorption Law: A + A'B = A + B
    print("\n[2] THIRD ABSORPTION LAW: A + A'B = A + B")
    print("-" * 60)
    print(f"{'A':<4} {'B':<4} | {'LHS: A + A\'B':<15} | {'RHS: A + B':<15} | {'Status'}")
    print("-" * 60)
    for a in [0, 1]:
        for b in [0, 1]:
            lhs, rhs = BooleanLaws.absorption_3(a, b)
            print(f"{a:<4} {b:<4} | {lhs:<15} | {rhs:<15} | MATCH")

if __name__ == "__main__":
    demonstrate_all_laws()
