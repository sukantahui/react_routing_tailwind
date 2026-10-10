# module_002_boolean_logic_master_lab.py
# CBSE Class XI Computer Science (Subject Code: 083)
# Unit 1: Computer Systems and Organisation (CSO) - Module 002: Boolean Logic & Gates
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore, West Bengal, India)

"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - MASTER BOOLEAN LOGIC LABORATORY SUITE
================================================================================
Comprehensive Python digital logic laboratory suite implementing:
1. Primary Logic Gates (NOT, AND, OR)
2. Universal Logic Realizations (NAND and NOR Gate Universality)
3. Exclusive Logic Gates (XOR and XNOR & Parity Bit Generators)
4. Multi-Variable Truth Table Generator with Tautology/Fallacy Detection
5. Algebraic Laws & De Morgan's Theorem Verifier
6. Arithmetic Digital Circuits: Half Adder & Full Adder Simulation
================================================================================
"""

import itertools
from typing import Callable, Dict, List, Tuple

class MasterLogicLab:
    # -------------------------------------------------------------
    # 1. PRIMARY LOGIC GATES (IC 7404, 7408, 7432)
    # -------------------------------------------------------------
    @staticmethod
    def not_gate(a: int) -> int:
        """NOT Gate (Inverter): Y = A' (IC 7404)"""
        return 1 - a

    @staticmethod
    def and_gate(a: int, b: int) -> int:
        """2-Input AND Gate: Y = A · B (IC 7408)"""
        return a & b

    @staticmethod
    def or_gate(a: int, b: int) -> int:
        """2-Input OR Gate: Y = A + B (IC 7432)"""
        return a | b

    # -------------------------------------------------------------
    # 2. UNIVERSAL LOGIC GATES (IC 7400, 7402)
    # -------------------------------------------------------------
    @staticmethod
    def nand_gate(a: int, b: int) -> int:
        """NAND Gate: Y = (A · B)' (IC 7400)"""
        return 0 if (a == 1 and b == 1) else 1

    @staticmethod
    def nor_gate(a: int, b: int) -> int:
        """NOR Gate: Y = (A + B)' (IC 7402)"""
        return 1 if (a == 0 and b == 0) else 0

    # NAND Universal Realizations
    @classmethod
    def not_via_nand(cls, a: int) -> int:
        return cls.nand_gate(a, a)

    @classmethod
    def and_via_nand(cls, a: int, b: int) -> int:
        return cls.nand_gate(cls.nand_gate(a, b), cls.nand_gate(a, b))

    @classmethod
    def or_via_nand(cls, a: int, b: int) -> int:
        return cls.nand_gate(cls.nand_gate(a, a), cls.nand_gate(b, b))

    # -------------------------------------------------------------
    # 3. EXCLUSIVE LOGIC GATES (IC 7486, 74266)
    # -------------------------------------------------------------
    @staticmethod
    def xor_gate(a: int, b: int) -> int:
        """XOR Gate: Y = A ⊕ B = A'B + AB' (IC 7486)"""
        return a ^ b

    @staticmethod
    def xnor_gate(a: int, b: int) -> int:
        """XNOR Gate: Y = (A ⊕ B)' = AB + A'B' (IC 74266)"""
        return 1 if (a == b) else 0

    # -------------------------------------------------------------
    # 4. DIGITAL ARITHMETIC CIRCUITS (HALF & FULL ADDER)
    # -------------------------------------------------------------
    @classmethod
    def half_adder(cls, a: int, b: int) -> Tuple[int, int]:
        """Half Adder: Sum = A ⊕ B, Carry = A · B"""
        sum_bit = cls.xor_gate(a, b)
        carry_bit = cls.and_gate(a, b)
        return sum_bit, carry_bit

    @classmethod
    def full_adder(cls, a: int, b: int, cin: int) -> Tuple[int, int]:
        """Full Adder: Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B)"""
        xor1 = cls.xor_gate(a, b)
        sum_bit = cls.xor_gate(xor1, cin)
        and1 = cls.and_gate(a, b)
        and2 = cls.and_gate(cin, xor1)
        cout = cls.or_gate(and1, and2)
        return sum_bit, cout

    # -------------------------------------------------------------
    # 5. AUTOMATED TRUTH TABLE GENERATOR & CLASSIFIER
    # -------------------------------------------------------------
    @classmethod
    def evaluate_truth_table(cls, title: str, var_names: List[str], eval_func: Callable):
        num_vars = len(var_names)
        total_rows = 1 << num_vars
        print("\n" + "=" * 65)
        print(f" TRUTH TABLE: {title}")
        print("=" * 65)
        header = " | ".join(f"{v:^3}" for v in var_names) + " | Output Y"
        print(f"Row | {header}")
        print("-" * 65)

        outputs = []
        for i, inputs in enumerate(itertools.product([0, 1], repeat=num_vars)):
            y = eval_func(*inputs)
            outputs.append(y)
            row_str = " | ".join(f"{val:^3}" for val in inputs)
            print(f"m{i:<2} | {row_str} |   {y}")

        if all(y == 1 for y in outputs):
            print(">> Classification: TAUTOLOGY (Universally True)")
        elif all(y == 0 for y in outputs):
            print(">> Classification: FALLACY / CONTRADICTION (Universally False)")
        else:
            print(f">> Classification: CONTINGENCY ({sum(outputs)} ONES, {total_rows - sum(outputs)} ZEROS)")

def run_all_laboratory_experiments():
    print("=" * 70)
    print("  CBSE CLASS XI CS (083) - MASTER DIGITAL LOGIC EXPERIMENT SUITE")
    print("  Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)")
    print("=" * 70)

    # Exp 1: De Morgan's 1st Law Table
    MasterLogicLab.evaluate_truth_table(
        "De Morgan's 1st Law: (A + B)' == A' · B'",
        ["A", "B"],
        lambda a, b: 1 if (1 - (a | b)) == ((1 - a) & (1 - b)) else 0
    )

    # Exp 2: 3-Variable Majority Circuit Y = AB + BC + CA
    MasterLogicLab.evaluate_truth_table(
        "3-Variable Majority Voter: Y = AB + BC + CA",
        ["A", "B", "C"],
        lambda a, b, c: (a & b) | (b & c) | (c & a)
    )

    # Exp 3: Full Adder Simulation
    print("\n" + "=" * 65)
    print(" FULL ADDER 3-BIT BINARY ADDITION TRACE")
    print("=" * 65)
    print(f"{'A':<3} {'B':<3} {'Cin':<4} | {'Sum':<5} {'Cout':<5} | {'Decimal Addition'}")
    print("-" * 65)
    for a in [0, 1]:
        for b in [0, 1]:
            for cin in [0, 1]:
                s, cout = MasterLogicLab.full_adder(a, b, cin)
                print(f"{a:<3} {b:<3} {cin:<4} | {s:<5} {cout:<5} | {a} + {b} + {cin} = {a + b + cin} ({cout}{s}_2)")

if __name__ == "__main__":
    run_all_laboratory_experiments()
