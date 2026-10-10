# fundamental_operations_engine.py
# CBSE Class XI Computer Science (083) - Unit 1: Boolean Logic
# Topic: Fundamental Logic Operations (NOT, AND, OR)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

"""
This Python module demonstrates the fundamental Boolean logic operations:
1. Logical NOT (Inversion / Complement)
2. Logical AND (Conjunction / Boolean Product)
3. Logical OR (Disjunction / Boolean Sum)
Includes truth table generation, operator precedence evaluation,
and comparison between Python boolean operators ('not', 'and', 'or')
and bitwise operators ('~', '&', '|').
"""

def boolean_not(a: bool) -> bool:
    """Logical NOT operation: Inverts the truth value."""
    return not a

def boolean_and(a: bool, b: bool) -> bool:
    """Logical AND operation: True only if BOTH inputs are True."""
    return a and b

def boolean_or(a: bool, b: bool) -> bool:
    """Logical OR operation: True if AT LEAST ONE input is True."""
    return a or b

def print_fundamental_truth_tables():
    print("=" * 65)
    print("       CBSE CLASS 11 CS (083) - FUNDAMENTAL LOGIC OPERATIONS")
    print("=" * 65)
    
    # 1. NOT Gate Truth Table (Unary: 1 Variable, 2^1 = 2 states)
    print("\n[1] LOGICAL NOT OPERATION (Inversion: Y = A')")
    print("-" * 35)
    print(f"{'Input A':<10} | {'Output Y = A\'':<15} | {'State Description'}")
    print("-" * 35)
    for a in [False, True]:
        out = boolean_not(a)
        state_desc = "0 (LOW) -> 1 (HIGH)" if not a else "1 (HIGH) -> 0 (LOW)"
        print(f"{int(a):<10} | {int(out):<15} | {state_desc}")
        
    # 2. AND Gate Truth Table (Binary: 2 Variables, 2^2 = 4 states)
    print("\n[2] LOGICAL AND OPERATION (Conjunction: Y = A . B)")
    print("-" * 45)
    print(f"{'Input A':<10} | {'Input B':<10} | {'Output Y = A.B':<15} | {'Status'}")
    print("-" * 45)
    for a in [0, 1]:
        for b in [0, 1]:
            out = 1 if (bool(a) and bool(b)) else 0
            status = "CONDUCTING" if out == 1 else "OFF"
            print(f"{a:<10} | {b:<10} | {out:<15} | {status}")

    # 3. OR Gate Truth Table (Binary: 2 Variables, 2^2 = 4 states)
    print("\n[3] LOGICAL OR OPERATION (Disjunction: Y = A + B)")
    print("-" * 45)
    print(f"{'Input A':<10} | {'Input B':<10} | {'Output Y = A+B':<15} | {'Status'}")
    print("-" * 45)
    for a in [0, 1]:
        for b in [0, 1]:
            out = 1 if (bool(a) or bool(b)) else 0
            status = "CONDUCTING" if out == 1 else "OFF"
            print(f"{a:<10} | {b:<10} | {out:<15} | {status}")

def evaluate_composite_expression(a: bool, b: bool, c: bool):
    """
    Evaluates: Y = A' . B + C
    Operator Precedence in Boolean Logic:
      Step 1: NOT (Highest) -> evaluated first (A')
      Step 2: AND (Middle)  -> evaluated second ((A') . B)
      Step 3: OR  (Lowest)  -> evaluated last (((A') . B) + C)
    """
    not_a = not a
    and_term = not_a and b
    final_result = and_term or c
    return not_a, and_term, final_result

def print_precedence_demonstration():
    print("\n" + "=" * 65)
    print("   BOOLEAN OPERATOR PRECEDENCE EVALUATION: Y = A' . B + C")
    print("   Rule: NOT has highest precedence, then AND, then OR")
    print("=" * 65)
    print(f"{'A':<4} {'B':<4} {'C':<4} | {'A\' (NOT)':<10} | {'A\'.B (AND)':<12} | {'Y = A\'.B + C (OR)'}")
    print("-" * 65)
    for a in [0, 1]:
        for b in [0, 1]:
            for c in [0, 1]:
                na, ab, y = evaluate_composite_expression(bool(a), bool(b), bool(c))
                print(f"{a:<4} {b:<4} {c:<4} | {int(na):<10} | {int(ab):<12} | {int(y)}")

if __name__ == "__main__":
    print_fundamental_truth_tables()
    print_precedence_demonstration()
