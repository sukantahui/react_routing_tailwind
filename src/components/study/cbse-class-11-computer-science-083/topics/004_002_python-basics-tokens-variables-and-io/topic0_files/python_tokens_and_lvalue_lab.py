"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT II
MODULE 004_002: PYTHON TOKENS & L-VALUE / R-VALUE LABORATORY
Topic: Tokens Taxonomy, Identifier Validator, l-value/r-value Rules, and Print I/O
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

import keyword
from typing import Tuple, List


def validate_python_identifier(name: str) -> Tuple[bool, str]:
    """Validates whether a given string is a valid Python identifier and not a reserved keyword."""
    if keyword.iskeyword(name):
        return False, f"'{name}' is a reserved Python KEYWORD."
    if not name.isidentifier():
        if name[0].isdigit():
            return False, f"'{name}' is INVALID: Identifiers cannot begin with a numeric digit."
        return False, f"'{name}' is INVALID: Contains illegal special characters or whitespace."
    return True, f"'{name}' is a VALID Python identifier."


def demonstrate_lvalue_and_rvalue_mechanics() -> None:
    """Demonstrates correct l-value targets vs invalid r-value assignment attempts."""
    print("=" * 70)
    print("DEMONSTRATION: L-VALUE AND R-VALUE ASSIGNMENT MECHANICS")
    print("=" * 70)

    # 1. Simple Assignment (lvalue: variable identifier, rvalue: literal)
    x = 100
    print(f"1. Simple Assignment:  x = 100  -> x = {x}, id(x) = {id(x)}")

    # 2. Expression as r-value (lvalue: variable, rvalue: arithmetic expression)
    total = x * 2 + 50
    print(f"2. Expression r-value: total = x * 2 + 50 -> total = {total}")

    # 3. Multiple Assignment (Tuple Unpacking)
    roll, name, marks = 1101, "Mamata", 98.5
    print(f"3. Multiple Targets:   roll, name, marks = {roll}, '{name}', {marks}")

    # 4. Clean Swapping via Tuple Unpacking
    a, b = 15, 30
    print(f"4. Before Swapping:    a = {a}, b = {b}")
    a, b = b, a
    print(f"   After Swapping:     a = {a}, b = {b}")

    # 5. Chained Assignment (Single r-value bound to multiple l-value targets)
    p = q = r = 500
    print(f"5. Chained Targets:    p = q = r = 500 -> p={p}, q={q}, r={r}")
    print("=" * 70)


def demonstrate_print_io_formatting() -> None:
    """Demonstrates custom separator (sep) and ending terminator (end) formatting."""
    print("\n" + "=" * 70)
    print("DEMONSTRATION: PRINT() PARAMETERS (sep, end)")
    print("=" * 70)

    # Using custom separator
    print("Item 1:", "Barrackpore", "Kolkata", "Naihati", sep=" -> ")
    print("Item 2:", 98, 85, 92, 100, sep=" | ")

    # Using custom end terminator
    print("Progress:", end=" ")
    for i in range(1, 6):
        print(f"[{i * 20}%]", end="...")
    print(" COMPLETE!")
    print("=" * 70)


if __name__ == "__main__":
    # Test identifiers against Python rules
    test_identifiers = ["student_name", "_roll_no", "2nd_rank", "total$sum", "for", "True", "Score100"]

    print("IDENTIFIER VALIDATION AUDIT:")
    for ident in test_identifiers:
        valid, msg = validate_python_identifier(ident)
        status = "[VALID]" if valid else "[INVALID]"
        print(f"{status:<10} {msg}")

    demonstrate_lvalue_and_rvalue_mechanics()
    demonstrate_print_io_formatting()
