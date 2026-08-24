# topic5_files/padding_alignment_and_numbers.py
# Module: 002_007_string-processing
# Topic: Advanced Formatting (f-strings, format() method, padding, alignment)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 5 - File 2: Padding, Alignment & Number Format Specification Mini-Language
Demonstrates:
  1. Alignment operators: < (left), > (right), ^ (center), = (sign-aware)
  2. Custom fill characters (*, -, _, 0)
  3. Fixed-point float precision: :.2f, :.4f
  4. Percentage formatting: :.1%
  5. Thousands separators: :, and :_
  6. Base conversions: Binary (:b), Octal (:o), Hexadecimal (:x, :#X)
"""

def demonstrate_alignment_and_padding():
    print("=" * 65)
    print("1. ALIGNMENT OPERATORS & CUSTOM FILL CHARACTERS")
    print("=" * 65)

    title = "PYTHON"
    width = 24

    # Default alignments: Strings default to left (<), Numbers default to right (>)
    print(f"Left-Aligned   (<)  : '{title:<{width}}'")
    print(f"Right-Aligned  (>)  : '{title:>{width}}'")
    print(f"Center-Aligned (^)  : '{title:^{width}}'\n")

    # Custom fill characters: [fill][align][width]
    print(f"Fill with '*'       : '{title:*<{width}}'")
    print(f"Fill with '-'       : '{title:->{width}}'")
    print(f"Fill with '='       : '{title:=^{width}}'")
    print(f"Header Banner       : '{title: ^30}'")


def demonstrate_number_precision_and_currency():
    print("\n" + "=" * 65)
    print("2. FLOAT PRECISION, PERCENTAGES & THOUSANDS SEPARATORS")
    print("=" * 65)

    amount = 1245000.7856
    discount_rate = 0.185
    ratio = 7 / 3

    print(f"Raw Amount            : {amount}")
    print(f"Fixed 2 Decimals (:.2f): {amount:.2f}")
    print(f"Comma Separator (:,)  : {amount:,.2f}  (INR Standard)")
    print(f"Underscore Sep (:_)   : {amount:_.2f}  (Pythonic Literal Style)\n")

    print(f"Percentage (:.1%)     : {discount_rate:.1%}")
    print(f"Percentage (:.2%)     : {discount_rate:.2%}")
    print(f"Scientific (:.2e)     : {amount:.2e}\n")

    print(f"Ratio 7/3 (:.4f)      : {ratio:.4f}")


def demonstrate_sign_aware_and_zero_padding():
    print("=" * 65)
    print("3. SIGN-AWARE PADDING (=) & ZERO-PADDING (:0N)")
    print("=" * 65)

    invoice_id = 942
    pos_temp = 32.5
    neg_temp = -18.4

    # Zero-padding for IDs & Serial Numbers
    print(f"Invoice Serial (:06d) : {invoice_id:06d}")
    print(f"Padded ID (:08d)      : {invoice_id:08d}\n")

    # Sign display specifiers:
    # '+' shows sign for both positive and negative
    # '-' shows sign for negative only (default)
    # ' ' (space) shows leading space for positive, '-' for negative
    print(f"Sign Always (+): Pos = {pos_temp:+.1f}, Neg = {neg_temp:+.1f}")
    print(f"Space Sign  ( ): Pos = '{pos_temp: .1f}', Neg = '{neg_temp: .1f}'\n")

    # Sign-aware padding with '=': places padding BETWEEN the sign and digits
    print(f"Sign-aware pad (:=+10.2f):")
    print(f"  Pos: '{pos_temp:=+10.2f}'")
    print(f"  Neg: '{neg_temp:=+10.2f}'")


def demonstrate_integer_base_conversions():
    print("\n" + "=" * 65)
    print("4. INTEGER BASE CONVERSIONS: BINARY, OCTAL, HEX")
    print("=" * 65)

    num = 255
    print(f"Decimal Value : {num}")
    print(f"Binary (:b)   : {num:b} (Prefixed :#b: {num:#b})")
    print(f"Octal  (:o)   : {num:o} (Prefixed :#o: {num:#o})")
    print(f"Hex Lower (:x): {num:x} (Prefixed :#x: {num:#x})")
    print(f"Hex Upper (:X): {num:X} (Prefixed :#X: {num:#X})")


if __name__ == "__main__":
    demonstrate_alignment_and_padding()
    demonstrate_number_precision_and_currency()
    demonstrate_sign_aware_and_zero_padding()
    demonstrate_integer_base_conversions()
