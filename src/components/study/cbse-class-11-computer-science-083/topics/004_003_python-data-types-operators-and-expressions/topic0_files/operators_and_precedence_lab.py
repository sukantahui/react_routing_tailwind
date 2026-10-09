"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT II
MODULE 004_003: PYTHON DATA TYPES & OPERATOR PRECEDENCE LABORATORY
Topic: Arithmetic Tracing, Negative Modulo Math, Operator Precedence & Identity vs Equality
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""


def demonstrate_operator_precedence_and_associativity() -> None:
    """Demonstrates high-frequency CBSE evaluation expressions."""
    print("=" * 70)
    print("DEMONSTRATION: OPERATOR PRECEDENCE & RIGHT-TO-LEFT EXPONENTIATION")
    print("=" * 70)

    # 1. Exponentiation Right-to-Left Associativity
    exp_res = 2 ** 3 ** 2
    print(f"Expression: 2 ** 3 ** 2")
    print(f"Evaluation: 2 ** (3 ** 2) = 2 ** 9 = {exp_res}")

    # 2. Arithmetic Mixed Precedence
    expr2 = 10 + 3 * 2 ** 2 - 8 // 3
    print(f"\nExpression: 10 + 3 * 2 ** 2 - 8 // 3")
    print(f"Step 1 (Exponentiation): 10 + 3 * 4 - 8 // 3")
    print(f"Step 2 (Multiplication & Floor Div): 10 + 12 - 2")
    print(f"Step 3 (Addition & Subtraction): 22 - 2 = {expr2}")

    # 3. Floor Division and Modulo with Negative Numbers (CBSE High Trap)
    print("\n" + "-" * 70)
    print("FLOOR DIVISION (//) & MODULO (%) TRAPS WITH NEGATIVES")
    print("-" * 70)
    for a, b in [(-7, 2), (7, -2), (-7, -2), (7, 2)]:
        fl = a // b
        rem = a % b
        print(f"{a:3d} // {b:3d} = {fl:3d}  |  {a:3d} % {b:3d} = {rem:3d}  |  Check: ({fl} * {b}) + {rem} == {fl * b + rem}")


def demonstrate_identity_vs_equality() -> None:
    """Demonstrates difference between value equality (==) and identity (is)."""
    print("\n" + "=" * 70)
    print("DEMONSTRATION: IDENTITY (is) VS EQUALITY (==)")
    print("=" * 70)

    # Small Integer Caching (-5 to 256)
    x = 100
    y = 100
    print(f"Integers x = 100, y = 100:")
    print(f"x == y: {x == y} (Same value)")
    print(f"x is y: {x is y} (Cached in same memory id: {id(x)})")

    # Mutable Lists (Separate Allocations)
    list1 = ["Barrackpore", "Kolkata"]
    list2 = ["Barrackpore", "Kolkata"]
    print(f"\nLists list1 = {list1}, list2 = {list2}:")
    print(f"list1 == list2: {list1 == list2} (True: identical values)")
    print(f"list1 is list2: {list1 is list2} (False: distinct allocations: id1={id(list1)}, id2={id(list2)})")


def demonstrate_logical_short_circuiting() -> None:
    """Demonstrates Python's short-circuit evaluation rules."""
    print("\n" + "=" * 70)
    print("DEMONSTRATION: LOGICAL SHORT-CIRCUIT EVALUATION (and / or)")
    print("=" * 70)
    print(f"0 and 5        -> {0 and 5} (First falsy returned immediately)")
    print(f"10 and 'Python'-> {10 and 'Python'} (Last truthy returned)")
    print(f"5 or 20        -> {5 or 20} (First truthy returned immediately)")
    print(f"'' or 'CS083'  -> {'' or 'CS083'} (Non-empty truthy returned)")
    print("=" * 70)


if __name__ == "__main__":
    demonstrate_operator_precedence_and_associativity()
    demonstrate_identity_vs_equality()
    demonstrate_logical_short_circuiting()
