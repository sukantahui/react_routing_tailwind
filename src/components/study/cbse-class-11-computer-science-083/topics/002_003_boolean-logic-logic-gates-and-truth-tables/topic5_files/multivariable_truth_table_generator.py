# multivariable_truth_table_generator.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Truth Table Construction for Multi-Variable Boolean Expressions
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module provides an automated truth table generator for 2, 3, and 4-variable
Boolean expressions. It calculates intermediate sub-terms, prints formatted tables,
identifies Minterms (SOP), and determines if the expression is a Tautology, Fallacy,
or Contingency.
"""

import itertools
from typing import Callable, List, Dict

class TruthTableGenerator:
    @staticmethod
    def generate_table_3var(expression_name: str, eval_func: Callable):
        """Generates an 8-row truth table for 3 variables (A, B, C) with step-by-step trace."""
        print("=" * 75)
        print(f" TRUTH TABLE GENERATION: {expression_name}")
        print(" Total Rows: 2^3 = 8 Combinations (000 to 111)")
        print("=" * 75)
        print(f"{'Row':<4} | {'A':<3} {'B':<3} {'C':<3} | {'Intermediate Terms':<30} | {'Output Y':<10}")
        print("-" * 75)

        outputs = []
        for i, (a, b, c) in enumerate(itertools.product([0, 1], repeat=3)):
            inter, y = eval_func(a, b, c)
            outputs.append(y)
            print(f"m{i:<3} | {a:<3} {b:<3} {c:<3} | {inter:<30} | {y:<10}")

        # Classify the Boolean expression
        if all(y == 1 for y in outputs):
            classification = "TAUTOLOGY (Universally True / 1 for all inputs)"
        elif all(y == 0 for y in outputs):
            classification = "FALLACY / CONTRADICTION (Universally False / 0 for all inputs)"
        else:
            ones = sum(outputs)
            classification = f"CONTINGENCY (Satisfiable: {ones} ONES, {8 - ones} ZEROS)"

        print("-" * 75)
        print(f"Classification: {classification}\n")

# Example 1: Y = A'B + AC'
def expr_example1(a: int, b: int, c: int):
    not_a = 1 - a
    not_c = 1 - c
    term1 = not_a & b
    term2 = a & not_c
    y = term1 | term2
    inter = f"A'={not_a}, C'={not_c}, T1={term1}, T2={term2}"
    return inter, y

# Example 2: De Morgan's Proof: (A + B)' == A' · B'
def demorgan_table():
    print("=" * 70)
    print(" TRUTH TABLE PROOF: DE MORGAN'S FIRST LAW: (A + B)' = A' · B'")
    print("=" * 70)
    print(f"{'A':<4} {'B':<4} | {'A+B':<8} {'(A+B)\' (LHS)':<15} | {'A\'':<4} {'B\'':<4} {'A\'.B\' (RHS)':<15} | {'Match?'}")
    print("-" * 70)
    for a, b in itertools.product([0, 1], repeat=2):
        lhs_or = a | b
        lhs_nor = 1 - lhs_or
        na = 1 - a
        nb = 1 - b
        rhs = na & nb
        match = "TRUE / EQUAL" if lhs_nor == rhs else "MISMATCH"
        print(f"{a:<4} {b:<4} | {lhs_or:<8} {lhs_nor:<15} | {na:<4} {nb:<4} {rhs:<15} | {match}")

if __name__ == "__main__":
    TruthTableGenerator.generate_table_3var("Y = A'B + AC'", expr_example1)
    demorgan_table()
