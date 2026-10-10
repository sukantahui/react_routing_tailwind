# universal_gates_realizer.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Universal Logic Gates (NAND and NOR Universal Realization)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module proves why NAND and NOR gates are UNIVERSAL GATES.
It demonstrates the exact mathematical realization of basic logic gates (NOT, AND, OR)
using ONLY NAND gates or ONLY NOR gates.
"""

class UniversalGateEngine:
    # --- Base Universal Gates ---
    @staticmethod
    def nand_gate(a: int, b: int) -> int:
        """NAND Gate: Y = (A · B)'"""
        return 0 if (a == 1 and b == 1) else 1

    @staticmethod
    def nor_gate(a: int, b: int) -> int:
        """NOR Gate: Y = (A + B)'"""
        return 1 if (a == 0 and b == 0) else 0

    # --- Realizations using ONLY NAND Gates ---
    @classmethod
    def not_from_nand(cls, a: int) -> int:
        """NOT using 1 NAND gate: (A · A)' = A'"""
        return cls.nand_gate(a, a)

    @classmethod
    def and_from_nand(cls, a: int, b: int) -> int:
        """AND using 2 NAND gates: ((A · B)')' = A · B"""
        step1 = cls.nand_gate(a, b)
        return cls.nand_gate(step1, step1)

    @classmethod
    def or_from_nand(cls, a: int, b: int) -> int:
        """OR using 3 NAND gates: (A' · B')' = A + B (De Morgan's Law)"""
        not_a = cls.nand_gate(a, a)
        not_b = cls.nand_gate(b, b)
        return cls.nand_gate(not_a, not_b)

    # --- Realizations using ONLY NOR Gates ---
    @classmethod
    def not_from_nor(cls, a: int) -> int:
        """NOT using 1 NOR gate: (A + A)' = A'"""
        return cls.nor_gate(a, a)

    @classmethod
    def or_from_nor(cls, a: int, b: int) -> int:
        """OR using 2 NOR gates: ((A + B)')' = A + B"""
        step1 = cls.nor_gate(a, b)
        return cls.nor_gate(step1, step1)

    @classmethod
    def and_from_nor(cls, a: int, b: int) -> int:
        """AND using 3 NOR gates: (A' + B')' = A · B (De Morgan's Law)"""
        not_a = cls.nor_gate(a, a)
        not_b = cls.nor_gate(b, b)
        return cls.nor_gate(not_a, not_b)

def verify_all_realizations():
    print("=" * 70)
    print("   CBSE CLASS XI CS (083) - UNIVERSAL GATE EQUIVALENCE VERIFIER")
    print("=" * 70)

    print("\n--- PART 1: REALIZATIONS USING ONLY NAND GATES ---")
    print("1. NOT Gate from NAND (1 Gate):")
    for a in [0, 1]:
        print(f"  Input A={a} -> NOT via NAND = {UniversalGateEngine.not_from_nand(a)} (Expected: {1-a})")

    print("\n2. AND Gate from NAND (2 Gates):")
    for a in [0, 1]:
        for b in [0, 1]:
            print(f"  A={a}, B={b} -> AND via NAND = {UniversalGateEngine.and_from_nand(a, b)} (Expected: {a & b})")

    print("\n3. OR Gate from NAND (3 Gates):")
    for a in [0, 1]:
        for b in [0, 1]:
            print(f"  A={a}, B={b} -> OR via NAND = {UniversalGateEngine.or_from_nand(a, b)} (Expected: {a | b})")

    print("\n--- PART 2: REALIZATIONS USING ONLY NOR GATES ---")
    print("1. NOT Gate from NOR (1 Gate):")
    for a in [0, 1]:
        print(f"  Input A={a} -> NOT via NOR = {UniversalGateEngine.not_from_nor(a)} (Expected: {1-a})")

    print("\n2. OR Gate from NOR (2 Gates):")
    for a in [0, 1]:
        for b in [0, 1]:
            print(f"  A={a}, B={b} -> OR via NOR = {UniversalGateEngine.or_from_nor(a, b)} (Expected: {a | b})")

    print("\n3. AND Gate from NOR (3 Gates):")
    for a in [0, 1]:
        for b in [0, 1]:
            print(f"  A={a}, B={b} -> AND via NOR = {UniversalGateEngine.and_from_nor(a, b)} (Expected: {a & b})")

if __name__ == "__main__":
    verify_all_realizations()
