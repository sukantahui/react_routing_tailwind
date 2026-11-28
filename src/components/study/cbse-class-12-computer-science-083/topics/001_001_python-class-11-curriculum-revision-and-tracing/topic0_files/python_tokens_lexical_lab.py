# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 0: Review of Python Tokens (Keywords, Identifiers, Literals, Operators, Punctuators)
# =====================================================================

import keyword

# 1. Inspecting Python Keywords
print("--- 1. Python Keywords Audit ---")
kw_list = keyword.kwlist
print(f"Total Reserved Keywords: {len(kw_list)}")
print("Keywords starting with Capital Letter:", [k for k in kw_list if k[0].isupper()])
# Output: ['False', 'None', 'True']

# 2. Identifier Validity Demonstration
print("\n--- 2. Identifier Mechanics ---")
valid_name = "score_2026"
_private_var = 100
MAX_BUFFER = 1024
print(f"Valid Identifiers: {valid_name}, {_private_var}, {MAX_BUFFER}")

# 3. Literals in Python
print("\n--- 3. Literal Types ---")
int_dec = 42
int_bin = 0b101010    # 42 in binary
int_oct = 0o52        # 42 in octal
int_hex = 0x2A        # 42 in hexadecimal
float_val = 3.14159
sci_float = 2.5e3     # 2500.0
complex_val = 3 + 4j  # Complex number
raw_str = r"C:\new_folder\test" # Suppresses escape sequences
multiline_str = '''Line 1
Line 2'''
none_literal = None

print(f"Decimal: {int_dec}, Binary: {int_bin}, Octal: {int_oct}, Hex: {int_hex}")
print(f"Float: {float_val}, Scientific: {sci_float}, Complex: {complex_val.real}+{complex_val.imag}j")
print(f"Raw String: {raw_str}")
print(f"None literal check: {none_literal is None}")

# 4. Punctuators and Delimiters
print("\n--- 4. Punctuators and Delimiters ---")
# Punctuators include: ( ), [ ], { }, @, ,, :, ., `, =, ;, +=, -=, etc.
student_record = {"name": "Aarav", "marks": (95, 92, 98)}
print("Delimiters dictionary & tuple:", student_record)
