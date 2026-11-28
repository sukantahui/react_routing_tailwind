# =====================================================================
# CBSE Class 12 Computer Science (083) - Master Lab Suite
# Complete Class XI Core Python Revision Laboratory Compilation
# Author: Sukanta Hui | Institute: Coder & AccoTax
# =====================================================================

"""
This comprehensive Python master script contains all laboratory functions
covering Python tokens, variables, mutability, precedence, loops, strings,
lists, tuples, and dictionaries required for CBSE Class 12 examination success.
"""

def demo_tokens():
    print("--- 1. Tokens Demo ---")
    kws = ['True', 'False', 'None']
    print("Capitalized Keywords:", kws)
    print("Binary, Octal, Hex literals:", 0b1010, 0o12, 0xA)

def demo_mutability():
    print("\n--- 2. Mutability Demo ---")
    s = "CBSE"
    # s[0] = 'X' -> TypeError
    L = [10, 20, 30]
    L.append(40)
    print("String immutable, List mutated in-place:", L)

def demo_precedence():
    print("\n--- 3. Precedence Demo ---")
    print("2 ** 3 ** 2 =", 2 ** 3 ** 2)
    print("-7 // 2 =", -7 // 2)

def demo_strings_and_lists():
    print("\n--- 4. Strings & Lists Demo ---")
    msg = "Python 2026"
    print("Reversed string:", msg[::-1])
    squares = [x**2 for x in range(1, 6)]
    print("Squares list comprehension:", squares)

def demo_tuples_and_dicts():
    print("\n--- 5. Tuples & Dictionaries Demo ---")
    tup = (10, 20, 30)
    print("Unpacked tuple:", *tup)
    d = {"subject": "CS 083", "max_marks": 70}
    print("Dictionary lookup:", d.get("subject"))

if __name__ == "__main__":
    demo_tokens()
    demo_mutability()
    demo_precedence()
    demo_strings_and_lists()
    demo_tuples_and_dicts()
    print("\n--- Master Laboratory Suite Executed Successfully ---")
