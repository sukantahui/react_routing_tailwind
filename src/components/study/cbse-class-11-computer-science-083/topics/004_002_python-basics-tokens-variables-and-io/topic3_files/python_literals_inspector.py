"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Programming - 1
Topic 3: Python Literals: Numeric, String, Boolean, and Special Literal None

This script demonstrates and inspects the 4 primary literal categories in Python:
1. Numeric Literals (Int with 0b/0o/0x bases, Float with exponent, Complex)
2. String Literals (Single, Double, Triple Quoted, Raw strings)
3. Boolean Literals (True / False as int subclasses)
4. Special Literal (None)
"""

import sys

def audit_numeric_literals() -> dict:
    """Demonstrates all Python numeric literal representations and radix bases."""
    # Integer literal representations
    dec_val = 42
    bin_val = 0b101010    # Base 2 prefix 0b / 0B
    oct_val = 0o52        # Base 8 prefix 0o / 0O
    hex_val = 0x2A        # Base 16 prefix 0x / 0X
    
    # Float literals
    float_std = 3.14159
    float_exp1 = 1.5e3    # 1.5 * 10^3 = 1500.0
    float_exp2 = 2.5e-2   # 2.5 * 10^-2 = 0.025
    
    # Complex literals
    comp_val = 3 + 4j     # real=3.0, imag=4.0
    
    return {
        "integer_bases": {
            "decimal_42": dec_val,
            "binary_0b101010": bin_val,
            "octal_0o52": oct_val,
            "hex_0x2A": hex_val,
            "are_all_equal": (dec_val == bin_val == oct_val == hex_val)
        },
        "floating_point": {
            "standard_fractional": float_std,
            "exponent_1.5e3": float_exp1,
            "exponent_2.5e-2": float_exp2
        },
        "complex_numbers": {
            "literal": str(comp_val),
            "real_part": comp_val.real,
            "imag_part": comp_val.imag
        }
    }


def audit_string_and_boolean_literals() -> dict:
    """Demonstrates String, Boolean, and None literal behaviors."""
    # String literals
    single_q = 'Single Quoted'
    double_q = "Double Quoted"
    triple_q = """Multiline
    String Literal"""
    raw_str = r"C:\new\folder\test.txt"
    
    # Boolean literals
    bool_t = True
    bool_f = False
    
    # Special literal None
    none_lit = None
    
    return {
        "strings": {
            "single": single_q,
            "double": double_q,
            "triple_multiline": triple_q,
            "raw_string": raw_str
        },
        "booleans": {
            "True_val": bool_t,
            "True_as_int": int(bool_t),    # 1
            "False_val": bool_f,
            "False_as_int": int(bool_f),  # 0
            "math_check": (True + True + False) # 2
        },
        "special_none": {
            "value": str(none_lit),
            "type": str(type(none_lit)),
            "is_none_check": (none_lit is None)
        }
    }


if __name__ == "__main__":
    print("=== 1. NUMERIC LITERALS INSPECTION ===")
    num_res = audit_numeric_literals()
    print("Integer Radix Equality:", num_res["integer_bases"])
    print("Floating Point Exponents:", num_res["floating_point"])
    print("Complex Numbers:", num_res["complex_numbers"])
    
    print("\n=== 2. STRING, BOOLEAN & NONE LITERALS ===")
    str_res = audit_string_and_boolean_literals()
    print("Booleans as Ints:", str_res["booleans"])
    print("Special Literal None:", str_res["special_none"])
