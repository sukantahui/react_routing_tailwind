# demorgan_verifier.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: De Morgan's Laws (Algebraic & Truth Table Proofs)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module proves and validates De Morgan's Laws:
1. De Morgan's First Law:  (A + B)' = A' · B'   (NOR is equivalent to Bubbled AND)
2. De Morgan's Second Law: (A · B)' = A' + B'   (NAND is equivalent to Bubbled OR)
Supports 2-variable, 3-variable, and n-variable generalizations.
"""

from typing import List, Tuple

def verify_demorgan_first_law():
    """Proves (A + B)' = A' · B' via Truth Table (Perfect Induction)"""
    print("=" * 70)
    print(" DE MORGAN'S FIRST LAW: (A + B)' = A' · B'")
    print(" Mnemonic: 'The complement of a sum equals the product of complements'")
    print("=" * 70)
    print(f"{'A':<4} {'B':<4} | {'A+B':<8} {'(A+B)\' (LHS)':<15} | {'A\'':<4} {'B\'':<4} {'A\'.B\' (RHS)':<15} | {'Result'}")
    print("-" * 70)
    for a in [0, 1]:
        for b in [0, 1]:
            lhs_or = a | b
            lhs = 1 - lhs_or
            na = 1 - a
            nb = 1 - b
            rhs = na & nb
            status = "EQUAL (Valid)" if lhs == rhs else "ERROR"
            print(f"{a:<4} {b:<4} | {lhs_or:<8} {lhs:<15} | {na:<4} {nb:<4} {rhs:<15} | {status}")

def verify_demorgan_second_law():
    """Proves (A · B)' = A' + B' via Truth Table (Perfect Induction)"""
    print("\n" + "=" * 70)
    print(" DE MORGAN'S SECOND LAW: (A · B)' = A' + B'")
    print(" Mnemonic: 'The complement of a product equals the sum of complements'")
    print("=" * 70)
    print(f"{'A':<4} {'B':<4} | {'A·B':<8} {'(A·B)\' (LHS)':<15} | {'A\'':<4} {'B\'':<4} {'A\'+B\' (RHS)':<15} | {'Result'}")
    print("-" * 70)
    for a in [0, 1]:
        for b in [0, 1]:
            lhs_and = a & b
            lhs = 1 - lhs_and
            na = 1 - a
            nb = 1 - b
            rhs = na | nb
            status = "EQUAL (Valid)" if lhs == rhs else "ERROR"
            print(f"{a:<4} {b:<4} | {lhs_and:<8} {lhs:<15} | {na:<4} {nb:<4} {rhs:<15} | {status}")

def multi_variable_demorgan(inputs: List[int]) -> Tuple[int, int, int, int]:
    """Generalization for n variables"""
    # 1st Law: (X1 + X2 + ... + Xn)' == X1' · X2' · ... · Xn'
    lhs_1 = 1 - (1 if any(x == 1 for x in inputs) else 0)
    rhs_1 = 1 if all((1 - x) == 1 for x in inputs) else 0

    # 2nd Law: (X1 · X2 · ... · Xn)' == X1' + X2' + ... + Xn'
    lhs_2 = 1 - (1 if all(x == 1 for x in inputs) else 0)
    rhs_2 = 1 if any((1 - x) == 1 for x in inputs) else 0

    return lhs_1, rhs_1, lhs_2, rhs_2

if __name__ == "__main__":
    verify_demorgan_first_law()
    verify_demorgan_second_law()
