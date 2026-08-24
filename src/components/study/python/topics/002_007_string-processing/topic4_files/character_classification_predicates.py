# topic4_files/character_classification_predicates.py
# Module: 002_007_string-processing
# Topic: Searching & Validation (find, rfind, count, startswith, endswith, isdigit, isalpha)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 4 - File 3: Character Classification & Boolean Predicate Methods
Demonstrates:
  1. The Numeric Hierarchy: isdecimal() vs isdigit() vs isnumeric()
  2. Text classification: isalpha(), isalnum(), isascii()
  3. Whitespace & printable checking: isspace(), isprintable()
  4. Identifier validation: isidentifier() (valid Python variable names)
  5. Case state inspection: islower(), isupper(), istitle()
"""

def demonstrate_numeric_hierarchy():
    print("=" * 70)
    print("1. THE NUMERIC HIERARCHY: isdecimal() vs isdigit() vs isnumeric()")
    print("=" * 70)

    # Comparison matrix for different numeric representations
    test_cases = [
        ("12345", "Standard ASCII Digits", "12345"),
        ("2\u00B2", "Superscript 2^2", "2\\u00B2"),
        ("\u00BD", "Vulgar Fraction 1/2", "\\u00BD"),
        ("IX", "Roman Numeral (ASCII 'IX')", "IX"),
        ("-10", "Negative Integer String", "-10"),
        ("3.14", "Float Number String", "3.14"),
    ]

    header = f"{'STRING':<15} | {'DESCRIPTION':<28} | {'isdecimal()':<11} | {'isdigit()':<9} | {'isnumeric()'}"
    print(header)
    print("-" * len(header))

    for val, desc, display_name in test_cases:
        print(f"{display_name:<15} | {desc:<28} | {str(val.isdecimal()):<11} | {str(val.isdigit()):<9} | {str(val.isnumeric())}")

    print("-" * len(header))
    print("Key Insights:")
    print("  * isdecimal(): Strict base-10 digits 0-9 (can be safely passed to int()).")
    print("  * isdigit()  : Strict digits + superscripts/subscripts (e.g. 2²).")
    print("  * isnumeric(): Broadest set (includes fractions ½, Chinese numerals).")
    print("  * Notice that negative numbers ('-10') and floats ('3.14') return False for ALL THREE!")


def demonstrate_alphanumeric_and_ascii():
    print("\n" + "=" * 70)
    print("2. isalpha(), isalnum(), AND isascii()")
    print("=" * 70)

    samples = [
        ("Barrackpore", "Alphabetic Only"),
        ("Python313", "Alphanumeric (Letters + Digits)"),
        ("Coder & AccoTax", "Contains Symbols/Spaces"),
        ("", "Empty String"),
    ]

    for val, desc in samples:
        print(f"'{val}' ({desc}):")
        print(f"  * isalpha(): {val.isalpha()}")
        print(f"  * isalnum(): {val.isalnum()}")
        print(f"  * isascii(): {val.isascii()}\n")


def demonstrate_isspace_and_isprintable():
    print("=" * 70)
    print("3. isspace() AND isprintable()")
    print("=" * 70)

    # isspace() checks if string contains ONLY whitespace characters (non-empty)
    print(f"'   \\t\\n  '.isspace()       -> {'   \t\n  '.isspace()} (All whitespace)")
    print(f"''.isspace()               -> {''.isspace()} (Empty string is False!)")
    print(f"'  Python  '.isspace()     -> {'  Python  '.isspace()} (Contains letters)\n")

    # isprintable() detects non-printable escape/control codes
    print(f"'Hello World 2026'.isprintable() -> {'Hello World 2026'.isprintable()}")
    print(f"'Line 1\\nLine 2'.isprintable()     -> {'Line 1\nLine 2'.isprintable()} (Contains \\n control code)")


def demonstrate_isidentifier():
    print("\n" + "=" * 70)
    print("4. isidentifier(): PYTHON VARIABLE NAME VALIDATION")
    print("=" * 70)

    test_identifiers = [
        ("student_name", "Valid snake_case"),
        ("_private_var", "Valid leading underscore"),
        ("2nd_roll", "Invalid: starts with digit"),
        ("user-name", "Invalid: contains hyphen"),
        ("for", "Syntactically valid identifier (though a keyword)"),
        ("class", "Syntactically valid identifier (though a keyword)"),
    ]

    import keyword
    for name, desc in test_identifiers:
        valid_id = name.isidentifier()
        is_kw = keyword.iskeyword(name)
        status = "[VALID VARIABLE]" if valid_id and not is_kw else ("[KEYWORD - RESERVED]" if is_kw else "[INVALID]")
        print(f"'{name:<15}' -> isidentifier: {str(valid_id):<5} | iskeyword: {str(is_kw):<5} -> {status}")


if __name__ == "__main__":
    demonstrate_numeric_hierarchy()
    demonstrate_alphanumeric_and_ascii()
    demonstrate_isspace_and_isprintable()
    demonstrate_isidentifier()
