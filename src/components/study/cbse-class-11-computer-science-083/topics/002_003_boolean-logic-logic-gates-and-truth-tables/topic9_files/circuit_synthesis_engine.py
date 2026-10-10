# circuit_synthesis_engine.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Logic Circuit Synthesis & Analysis
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates digital logic circuit synthesis and analysis.
Given an algebraic Boolean expression, it computes signal propagation through
intermediate gate nodes and evaluates the final circuit output.
"""

from typing import Dict, Tuple

class CircuitSimulator:
    @staticmethod
    def circuit_1(a: int, b: int, c: int) -> Tuple[Dict[str, int], int]:
        """
        Synthesizes circuit for: Y = A'B + B'C + AC
        Gate Level 1: Inverters (NOT A -> N1, NOT B -> N2)
        Gate Level 2: 2-Input ANDs (G1 = N1 · B, G2 = N2 · C, G3 = A · C)
        Gate Level 3: 3-Input OR  (Y = G1 + G2 + G3)
        """
        n1 = 1 - a  # A'
        n2 = 1 - b  # B'
        g1 = n1 & b # A'B
        g2 = n2 & c # B'C
        g3 = a & c  # AC
        y = g1 | g2 | g3
        nodes = {"A": a, "B": b, "C": c, "N1(A')": n1, "N2(B')": n2, "G1(A'B)": g1, "G2(B'C)": g2, "G3(AC)": g3}
        return nodes, y

    @staticmethod
    def full_adder_circuit(a: int, b: int, cin: int) -> Tuple[int, int]:
        """
        Full Adder Circuit Synthesis:
        Sum   = A ⊕ B ⊕ Cin
        Cout  = AB + Cin(A ⊕ B)
        """
        xor1 = a ^ b
        sum_bit = xor1 ^ cin
        and1 = a & b
        and2 = cin & xor1
        cout = and1 | and2
        return sum_bit, cout

def trace_circuit_synthesis():
    print("=" * 80)
    print(" CBSE CLASS XI CS (083) - LOGIC CIRCUIT SYNTHESIS TRACE")
    print(" Expression: Y = A'B + B'C + AC (Two-Level AND-OR Circuit)")
    print("=" * 80)
    print(f"{'A':<3} {'B':<3} {'C':<3} | {'A\'':<4} {'B\'':<4} | {'G1=A\'B':<8} {'G2=B\'C':<8} {'G3=AC':<8} | {'Final Output Y':<15}")
    print("-" * 80)
    for a in [0, 1]:
        for b in [0, 1]:
            for c in [0, 1]:
                nodes, y = CircuitSimulator.circuit_1(a, b, c)
                print(f"{a:<3} {b:<3} {c:<3} | {nodes['N1(A\')']:<4} {nodes['N2(B\')']:<4} | {nodes['G1(A\'B)']:<8} {nodes['G2(B\'C)']:<8} {nodes['G3(AC)']:<8} | {y:<15}")

    print("\n" + "=" * 80)
    print(" FULL ADDER CIRCUIT TRACE (Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B))")
    print("=" * 80)
    print(f"{'A':<4} {'B':<4} {'Cin':<4} | {'Sum Bit':<10} | {'Carry Out (Cout)':<18} | {'Decimal Addition'}")
    print("-" * 80)
    for a in [0, 1]:
        for b in [0, 1]:
            for cin in [0, 1]:
                s, cout = CircuitSimulator.full_adder_circuit(a, b, cin)
                total = a + b + cin
                print(f"{a:<4} {b:<4} {cin:<4} | {s:<10} | {cout:<18} | {a}+{b}+{cin} = {total} (Binary {cout}{s}_2)")

if __name__ == "__main__":
    trace_circuit_synthesis()
