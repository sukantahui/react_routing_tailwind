# xor_xnor_gate_simulator.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Special Logic Gates (XOR and XNOR Gates & Parity Generators)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates the Exclusive Logic Gates:
1. XOR Gate (Exclusive-OR / Inequality Detector / Odd Parity Detector) - IC 7486
   Equation: Y = A ⊕ B = A'B + AB'
2. XNOR Gate (Exclusive-NOR / Equivalence / Coincidence Detector) - IC 74266
   Equation: Y = (A ⊕ B)' = AB + A'B'
Includes Parity Bit Generation and Half Adder Sum simulation.
"""

def xor_gate(a: int, b: int) -> int:
    """XOR Gate: 1 if inputs are DIFFERENT (odd number of 1s)."""
    return a ^ b

def xnor_gate(a: int, b: int) -> int:
    """XNOR Gate: 1 if inputs are IDENTICAL (even number of 1s)."""
    return 1 if (a == b) else 0

def multi_input_xor(*inputs: int) -> int:
    """Multi-variable XOR: Returns 1 if total count of 1s is ODD (Odd Parity)."""
    ones_count = sum(inputs)
    return 1 if (ones_count % 2 != 0) else 0

def half_adder(a: int, b: int):
    """Half Adder circuit: Sum = A ⊕ B, Carry = A · B"""
    sum_bit = xor_gate(a, b)
    carry_bit = a & b
    return sum_bit, carry_bit

def print_xor_xnor_tables():
    print("=" * 70)
    print("       CBSE CLASS XI CS (083) - XOR AND XNOR LOGIC ENGINE")
    print("=" * 70)

    print("\n[1] 2-INPUT XOR AND XNOR TRUTH TABLE")
    print("-" * 55)
    print(f"{'A':<5} {'B':<5} | {'XOR (A ⊕ B)':<15} | {'XNOR (A ⊙ B)':<15} | {'Behavior'}")
    print("-" * 55)
    for a in [0, 1]:
        for b in [0, 1]:
            x = xor_gate(a, b)
            xn = xnor_gate(a, b)
            desc = "DIFFERENT" if a != b else "EQUAL"
            print(f"{a:<5} {b:<5} | {x:<15} | {xn:<15} | {desc}")

    print("\n[2] HALF ADDER CIRCUIT TRACE (Using XOR & AND)")
    print("-" * 55)
    print(f"{'A':<5} {'B':<5} | {'Sum = A ⊕ B':<15} | {'Carry = A · B':<15} | {'Binary Sum'}")
    print("-" * 55)
    for a in [0, 1]:
        for b in [0, 1]:
            s, c = half_adder(a, b)
            print(f"{a:<5} {b:<5} | {s:<15} | {c:<15} | {c}{s}_2 ({a + b})")

    print("\n[3] 3-VARIABLE ODD PARITY DETECTOR (A ⊕ B ⊕ C)")
    print("-" * 55)
    print(f"{'A':<4} {'B':<4} {'C':<4} | {'1s Count':<10} | {'Y = A ⊕ B ⊕ C':<15} | {'Parity'}")
    print("-" * 55)
    for a in [0, 1]:
        for b in [0, 1]:
            for c in [0, 1]:
                p = multi_input_xor(a, b, c)
                cnt = a + b + c
                parity_label = "ODD (1s)" if p == 1 else "EVEN (1s)"
                print(f"{a:<4} {b:<4} {c:<4} | {cnt:<10} | {p:<15} | {parity_label}")

if __name__ == "__main__":
    print_xor_xnor_tables()
