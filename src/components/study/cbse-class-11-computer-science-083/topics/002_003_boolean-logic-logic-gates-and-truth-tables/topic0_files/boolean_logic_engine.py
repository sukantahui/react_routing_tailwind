"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT I
MODULE 002_003: BOOLEAN LOGIC & TRUTH TABLE LABORATORY
Topic: Automated Logic Gate Evaluator & De Morgan's Law Verifier
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

from typing import List, Dict


def generate_truth_table_all_gates() -> None:
    """Generates complete truth tables for all primary, universal, and exclusive logic gates."""
    print("=" * 75)
    print("COMPLETE TRUTH TABLE FOR STANDARD DIGITAL LOGIC GATES")
    print("=" * 75)
    print(f"{'A':^4} | {'B':^4} | {'NOT A':^6} | {'AND':^5} | {'OR':^4} | {'NAND':^6} | {'NOR':^5} | {'XOR':^5} | {'XNOR':^6}")
    print("-" * 75)

    inputs = [(0, 0), (0, 1), (1, 0), (1, 1)]

    for a, b in inputs:
        not_a = 1 - a
        and_val = a & b
        or_val = a | b
        nand_val = 1 - (a & b)
        nor_val = 1 - (a | b)
        xor_val = a ^ b
        xnor_val = 1 - (a ^ b)

        print(f"{a:^4d} | {b:^4d} | {not_a:^6d} | {and_val:^5d} | {or_val:^4d} | {nand_val:^6d} | {nor_val:^5d} | {xor_val:^5d} | {xnor_val:^6d}")
    print("=" * 75)


def verify_demorgan_laws() -> None:
    """Rigorously proves De Morgan's First and Second Laws across all truth table states."""
    print("\n" + "=" * 75)
    print("RIGOROUS PROOF OF DE MORGAN'S LAWS")
    print("=" * 75)

    # First Law: (A . B)' == A' + B'
    print("Law 1: (A . B)' = A' + B'")
    print(f"{'A':^4} | {'B':^4} | {'A.B':^5} | {'(A.B)´':^7} | {'A´':^4} | {'B´':^4} | {'A´ + B´':^7} | {'LHS == RHS':^10}")
    print("-" * 75)

    for a, b in [(0, 0), (0, 1), (1, 0), (1, 1)]:
        ab = a & b
        lhs1 = 1 - ab
        not_a = 1 - a
        not_b = 1 - b
        rhs1 = not_a | not_b
        match1 = "VERIFIED" if lhs1 == rhs1 else "FAILED"
        print(f"{a:^4d} | {b:^4d} | {ab:^5d} | {lhs1:^7d} | {not_a:^4d} | {not_b:^4d} | {rhs1:^7d} | {match1:^10}")

    print("\nLaw 2: (A + B)' = A' . B'")
    print(f"{'A':^4} | {'B':^4} | {'A+B':^5} | {'(A+B)´':^7} | {'A´':^4} | {'B´':^4} | {'A´ . B´':^7} | {'LHS == RHS':^10}")
    print("-" * 75)

    for a, b in [(0, 0), (0, 1), (1, 0), (1, 1)]:
        a_or_b = a | b
        lhs2 = 1 - a_or_b
        not_a = 1 - a
        not_b = 1 - b
        rhs2 = not_a & not_b
        match2 = "VERIFIED" if lhs2 == rhs2 else "FAILED"
        print(f"{a:^4d} | {b:^4d} | {a_or_b:^5d} | {lhs2:^7d} | {not_a:^4d} | {not_b:^4d} | {rhs2:^7d} | {match2:^10}")
    print("=" * 75)


if __name__ == "__main__":
    generate_truth_table_all_gates()
    verify_demorgan_laws()
