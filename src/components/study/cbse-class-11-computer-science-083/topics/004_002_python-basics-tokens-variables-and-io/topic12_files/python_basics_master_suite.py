"""
CBSE Class 11 Computer Science (083) - Unit 2
Module 004_002 Master Verification Suite
Author: Sukanta Hui
"""

import keyword
import sys

def verify_python_basics():
    print("=" * 70)
    print("CBSE CLASS 11 CS (083) - PYTHON BASICS MASTER VERIFICATION SUITE")
    print("=" * 70)

    # 1. Keywords Verification
    kw_list = keyword.kwlist
    print(f"\n[1] Python 3 Keywords Count: {len(kw_list)}")
    print(f"    Sample Keywords: {', '.join(kw_list[:10])}...")
    assert "def" in kw_list and "return" in kw_list and "lambda" in kw_list

    # 2. Identifiers Naming Rules
    print("\n[2] Identifier Validation Checks:")
    tests = [
        ("total_score", True),
        ("_private_var", True),
        ("2nd_rank", False),
        ("class", False),
        ("user$name", False)
    ]
    for name, expected in tests:
        is_valid = name.isidentifier() and not keyword.iskeyword(name)
        status = "PASSED" if is_valid == expected else "FAILED"
        print(f"    Identifier '{name:<15}': Valid={is_valid:<5} | Test: {status}")

    # 3. Memory & Object References
    print("\n[3] Variable Object References & id():")
    a = 100
    b = 100
    c = a
    print(f"    a = {a}, id(a) = {id(a)}")
    print(f"    b = {b}, id(b) = {id(b)}")
    print(f"    c = {c}, id(c) = {id(c)}")
    print(f"    a is b: {a is b} (Small Integer Caching)")

    # 4. Dynamic Typing
    print("\n[4] Dynamic Typing In Action:")
    dyn = 42
    print(f"    dyn = {dyn:<10} | type: {type(dyn)}")
    dyn = "CBSE Python"
    print(f"    dyn = {dyn:<10} | type: {type(dyn)}")
    dyn = [1, 2, 3]
    print(f"    dyn = {dyn} | type: {type(dyn)}")

    # 5. l-value vs r-value Mechanics
    print("\n[5] l-value vs r-value Validation:")
    print("    x = 10           --> VALID (x is locator, 10 is value)")
    print("    10 = x           --> INVALID (SyntaxError: cannot assign to literal)")
    print("    x + 2 = y        --> INVALID (SyntaxError: cannot assign to expression)")

    # 6. Console Output (sep, end)
    print("\n[6] Console Output (sep & end):")
    print("    Output:", "Unit", "2", "Programming", sep=" * ", end=" [DONE]\n")

    print("\n" + "=" * 70)
    print("ALL PYTHON BASICS TOPIC VERIFICATION MODULES EXECUTED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    verify_python_basics()
