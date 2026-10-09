"""
================================================================================
CBSE CLASS 11 COMPUTER SCIENCE (083) - UNIT 1
MODULE 002.001: NUMBER SYSTEMS AND BASE CONVERSIONS MASTER LABORATORY
Author: Sukanta Hui
================================================================================
A comprehensive Python educational engine covering:
1. Decimal to Any Base (Successive Division / Multiplication for Fractions)
2. Any Base to Decimal (Positional Weight Expansion)
3. Direct Grouping (Binary <-> Octal 3-bit, Binary <-> Hex 4-bit)
4. Direct Octal <-> Hexadecimal Bridging
5. Binary ALU Arithmetic (Addition with Carries, Subtraction with Borrows)
================================================================================
"""

import math

HEX_DIGITS = "0123456789ABCDEF"

def dec_to_base_integer(n: int, base: int) -> str:
    """Converts a positive decimal integer to base (2, 8, 16) with steps."""
    if n == 0:
        return "0"
    digits = []
    temp = n
    print(f"\n[Division Steps for ({n})10 -> Base {base}]:")
    while temp > 0:
        rem = temp % base
        sym = HEX_DIGITS[rem]
        digits.append(sym)
        print(f"  {temp:5d} ÷ {base} = {temp // base:5d}  |  Remainder: {rem:2d} ({sym})")
        temp //= base
    result = "".join(reversed(digits))
    print(f"  Result (read bottom-to-top): ({result})_{base}")
    return result

def dec_to_base_fraction(frac: float, base: int, precision: int = 6) -> str:
    """Converts a fractional decimal (e.g. 0.625) to base (2, 8, 16) with steps."""
    steps = []
    digits = []
    cur = frac - int(frac)
    print(f"\n[Multiplication Steps for (0.{str(frac).split('.')[1]})10 -> Base {base}]:")
    for step_num in range(1, precision + 1):
        prod = cur * base
        int_part = int(prod)
        sym = HEX_DIGITS[int_part]
        digits.append(sym)
        next_frac = prod - int_part
        print(f"  Step {step_num}: {cur:.6f} × {base} = {prod:.6f} -> Integer Carry: {sym}")
        cur = round(next_frac, 6)
        if cur == 0.0:
            break
    result = "0." + "".join(digits)
    print(f"  Fractional Result (read top-to-bottom): ({result})_{base}")
    return result

def base_to_dec(num_str: str, base: int) -> float:
    """Evaluates any radix number using positional weight expansion."""
    num_str = num_str.strip().upper()
    if "." in num_str:
        int_p, frac_p = num_str.split(".", 1)
    else:
        int_p, frac_p = num_str, ""

    total = 0.0
    print(f"\n[Positional Weight Expansion for ({num_str})_{base}]:")

    # Integer expansion
    int_len = len(int_p)
    int_sum = 0
    for i, char in enumerate(int_p):
        power = int_len - 1 - i
        val = HEX_DIGITS.index(char)
        term = val * (base ** power)
        int_sum += term
        print(f"  Digit '{char}' (val {val:2d}) × {base}^{power:<2d} = {term}")

    # Fractional expansion
    frac_sum = 0.0
    for i, char in enumerate(frac_p):
        power = -(i + 1)
        val = HEX_DIGITS.index(char)
        term = val * (base ** power)
        frac_sum += term
        print(f"  Digit '{char}' (val {val:2d}) × {base}^{power:<2d} = {term:.6f}")

    total = int_sum + frac_sum
    print(f"  Total Decimal Value: ({total})10")
    return total

def binary_octal_bridge(bin_str: str) -> str:
    """Direct 3-bit binary to octal conversion."""
    clean = bin_str.replace(" ", "")
    pad = (3 - len(clean) % 3) % 3
    padded = ("0" * pad) + clean
    groups = [padded[i:i+3] for i in range(0, len(padded), 3)]
    oct_digits = [str(int(g, 2)) for g in groups]
    print(f"\n[Binary -> Octal 3-bit Grouping]:")
    print(f"  Original: {clean}  (Padded to multiple of 3: {padded})")
    print(f"  Groups:   {' | '.join(groups)}")
    print(f"  Octal:    {'   '.join(oct_digits)}  => ({''.join(oct_digits)})8")
    return "".join(oct_digits)

def binary_hex_bridge(bin_str: str) -> str:
    """Direct 4-bit binary to hexadecimal conversion."""
    clean = bin_str.replace(" ", "")
    pad = (4 - len(clean) % 4) % 4
    padded = ("0" * pad) + clean
    groups = [padded[i:i+4] for i in range(0, len(padded), 4)]
    hex_digits = [HEX_DIGITS[int(g, 2)] for g in groups]
    print(f"\n[Binary -> Hexadecimal 4-bit Grouping]:")
    print(f"  Original: {clean}  (Padded to multiple of 4: {padded})")
    print(f"  Groups:   {' | '.join(groups)}")
    print(f"  Hex:      {'   '.join(hex_digits)}  => ({''.join(hex_digits)})16")
    return "".join(hex_digits)

def binary_alu_add(bin_a: str, bin_b: str):
    """Simulates bitwise binary addition with ripple carry tracking."""
    max_len = max(len(bin_a), len(bin_b))
    a_pad = bin_a.zfill(max_len)
    b_pad = bin_b.zfill(max_len)
    carries = [0]
    result_bits = []
    carry = 0

    for i in range(max_len - 1, -1, -1):
        b1 = int(a_pad[i])
        b2 = int(b_pad[i])
        tot = b1 + b2 + carry
        result_bits.insert(0, str(tot % 2))
        carry = tot // 2
        carries.insert(0, carry)

    if carry > 0:
        result_bits.insert(0, str(carry))

    print(f"\n[Binary Addition]:")
    print(f"  Carries: {''.join(map(str, carries[:max_len]))}")
    print(f"  A:       {a_pad} ({int(bin_a, 2)} in decimal)")
    print(f"  B:     + {b_pad} ({int(bin_b, 2)} in decimal)")
    print(f"  ------------------------")
    print(f"  Sum:     {''.join(result_bits)} ({int(''.join(result_bits), 2)} in decimal)")
    return "".join(result_bits)

def main_menu():
    print("=" * 60)
    print(" CBSE CLASS 11 CS (083) - NUMBER SYSTEMS MASTER LAB ")
    print("=" * 60)
    print("Running automated demonstration suite:\n")

    # Demo 1: Dec to Bin, Oct, Hex
    dec_val = 156
    dec_to_base_integer(dec_val, 2)
    dec_to_base_integer(dec_val, 8)
    dec_to_base_integer(dec_val, 16)

    # Demo 2: Positional Weight
    base_to_dec("2E", 16)
    base_to_dec("234", 8)

    # Demo 3: Fractional
    dec_to_base_fraction(0.625, 2)
    dec_to_base_fraction(0.125, 8)

    # Demo 4: Grouping
    binary_octal_bridge("10011100")
    binary_hex_bridge("10011100")

    # Demo 5: ALU Addition
    binary_alu_add("11011", "01110")

if __name__ == "__main__":
    main_menu()
