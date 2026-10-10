# primary_logic_gates_engine.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Primary Logic Gates (NOT, AND, OR)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This module simulates the three primary digital logic gates:
1. NOT Gate (Hex Inverter - IC 7404)
2. AND Gate (Quad 2-Input AND Gate - IC 7408)
3. OR Gate  (Quad 2-Input OR Gate - IC 7432)
Supports 2-input and 3-input extensions with comprehensive truth tables.
"""

from typing import List, Tuple

class PrimaryLogicGates:
    @staticmethod
    def not_gate(a: int) -> int:
        """NOT Gate (Inverter): Y = A'"""
        return 1 if a == 0 else 0

    @staticmethod
    def and_gate(*inputs: int) -> int:
        """Multi-input AND Gate: Y = A · B · C... (1 only if all inputs are 1)"""
        return 1 if all(x == 1 for x in inputs) else 0

    @staticmethod
    def or_gate(*inputs: int) -> int:
        """Multi-input OR Gate: Y = A + B + C... (1 if at least one input is 1)"""
        return 1 if any(x == 1 for x in inputs) else 0

def display_gate_catalogue():
    print("=" * 70)
    print("      CBSE CLASS XI CS (083) - PRIMARY LOGIC GATES ENGINE")
    print("=" * 70)

    # 1. NOT Gate (IC 7404)
    print("\n[1] NOT GATE (INVERTER) - IC 7404")
    print("Equation: Y = A'")
    print("Symbol  : Triangle with Inversion Bubble at output")
    print("-" * 35)
    print(f"{'Input A':<10} | {'Output Y':<10} | {'Voltage State'}")
    print("-" * 35)
    for a in [0, 1]:
        y = PrimaryLogicGates.not_gate(a)
        v = "5V (HIGH)" if y == 1 else "0V (LOW)"
        print(f"{a:<10} | {y:<10} | {v}")

    # 2. 2-Input AND Gate (IC 7408)
    print("\n[2] 2-INPUT AND GATE - IC 7408")
    print("Equation: Y = A · B")
    print("Symbol  : Flat back, straight top/bottom, curved front")
    print("-" * 45)
    print(f"{'Input A':<10} | {'Input B':<10} | {'Output Y':<10} | {'State'}")
    print("-" * 45)
    for a in [0, 1]:
        for b in [0, 1]:
            y = PrimaryLogicGates.and_gate(a, b)
            st = "HIGH (1)" if y == 1 else "LOW (0)"
            print(f"{a:<10} | {b:<10} | {y:<10} | {st}")

    # 3. 2-Input OR Gate (IC 7432)
    print("\n[3] 2-INPUT OR GATE - IC 7432")
    print("Equation: Y = A + B")
    print("Symbol  : Curved back, pointed front")
    print("-" * 45)
    print(f"{'Input A':<10} | {'Input B':<10} | {'Output Y':<10} | {'State'}")
    print("-" * 45)
    for a in [0, 1]:
        for b in [0, 1]:
            y = PrimaryLogicGates.or_gate(a, b)
            st = "HIGH (1)" if y == 1 else "LOW (0)"
            print(f"{a:<10} | {b:<10} | {y:<10} | {st}")

    # 4. 3-Input AND & OR Extension
    print("\n[4] 3-INPUT EXTENSION TRUTH TABLE (A, B, C)")
    print("-" * 55)
    print(f"{'A':<4} {'B':<4} {'C':<4} | {'Y_AND = A·B·C':<15} | {'Y_OR = A+B+C':<15}")
    print("-" * 55)
    for a in [0, 1]:
        for b in [0, 1]:
            for c in [0, 1]:
                y_and = PrimaryLogicGates.and_gate(a, b, c)
                y_or = PrimaryLogicGates.or_gate(a, b, c)
                print(f"{a:<4} {b:<4} {c:<4} | {y_and:<15} | {y_or:<15}")

if __name__ == "__main__":
    display_gate_catalogue()
