# duality_principle_engine.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Duality Principle in Boolean Algebra
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates the Duality Principle in Boolean Algebra.
It provides automatic dual generation for expressions, contrasts Dual (F*) with
Complement (F'), and proves that if an algebraic identity is valid, its dual
is also guaranteed to be mathematically valid.
"""

from typing import Tuple

class DualityEngine:
    @staticmethod
    def get_dual_rules():
        return [
            "Rule 1: Replace every '+' (Logical OR) with '·' (Logical AND)",
            "Rule 2: Replace every '·' (Logical AND) with '+' (Logical OR)",
            "Rule 3: Replace every '1' (Constant True) with '0' (Constant False)",
            "Rule 4: Replace every '0' (Constant False) with '1' (Constant True)",
            "CRITICAL: Keep literal variables UNCHANGED (do NOT complement A to A')!"
        ]

    @staticmethod
    def demonstrate_duals():
        examples = [
            ("Identity Law for OR", "A + 0 = A", "A · 1 = A"),
            ("Identity Law for AND", "A · 1 = A", "A + 0 = A"),
            ("Boundedness Law for OR", "A + 1 = 1", "A · 0 = 0"),
            ("Distributive Law", "A · (B + C) = A·B + A·C", "A + (B · C) = (A + B) · (A + C)"),
            ("Absorption Law 1", "A + A·B = A", "A · (A + B) = A"),
            ("Absorption Law 2", "A + A'·B = A + B", "A · (A' + B) = A · B"),
            ("De Morgan's 1st Law", "(A + B)' = A' · B'", "(A · B)' = A' + B'")
        ]

        print("=" * 75)
        print("     CBSE CLASS XI CS (083) - DUALITY PRINCIPLE THEOREM CATALOGUE")
        print("=" * 75)
        print(f"{'Law Name':<25} | {'Original Equation':<25} | {'Dual Equation'}")
        print("-" * 75)
        for name, orig, dual in examples:
            print(f"{name:<25} | {orig:<25} | {dual}")

    @staticmethod
    def contrast_dual_vs_complement(a: int, b: int):
        """
        Original Expression: F = A + B'
        Dual (F*):           F* = A · B'   (Swap + to ·, variables unchanged)
        Complement (F'):     F' = A' · B   (Apply De Morgan: (A + B')' = A' · (B')' = A' · B)
        """
        f = a | (1 - b)
        f_dual = a & (1 - b)
        f_comp = (1 - a) & b
        return f, f_dual, f_comp

def verify_dual_vs_complement():
    print("\n" + "=" * 75)
    print(" CRUCIAL DISTINCTION: DUAL (F*) vs COMPLEMENT (F') for F = A + B'")
    print("=" * 75)
    print(f"{'A':<4} {'B':<4} | {'F = A + B\'':<15} | {'Dual F* = A · B\'':<20} | {'Complement F\' = A\' · B'}")
    print("-" * 75)
    for a in [0, 1]:
        for b in [0, 1]:
            f, fd, fc = DualityEngine.contrast_dual_vs_complement(a, b)
            print(f"{a:<4} {b:<4} | {f:<15} | {fd:<20} | {fc}")

if __name__ == "__main__":
    DualityEngine.demonstrate_duals()
    verify_dual_vs_complement()
