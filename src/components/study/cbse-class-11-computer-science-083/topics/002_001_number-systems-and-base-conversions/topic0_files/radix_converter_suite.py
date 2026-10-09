"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT I
MODULE 002_001: NUMBER SYSTEM & RADIX CONVERSION LABORATORY
Topic: Complete Radix Converter Suite (Binary, Octal, Decimal, Hexadecimal)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

from typing import Tuple


def decimal_to_base_detailed(dec_num: int, target_base: int) -> Tuple[str, list]:
    """Converts a decimal integer to any base (2, 8, 16) with step-by-step division steps."""
    if dec_num == 0:
        return "0", []

    digits_map = "0123456789ABCDEF"
    steps = []
    current = dec_num
    result_chars = []

    while current > 0:
        quotient = current // target_base
        remainder = current % target_base
        symbol = digits_map[remainder]
        steps.append({
            "current": current,
            "quotient": quotient,
            "remainder": remainder,
            "symbol": symbol
        })
        result_chars.append(symbol)
        current = quotient

    converted_str = "".join(reversed(result_chars))
    return converted_str, steps


def fractional_decimal_to_binary(fractional_part: float, max_bits: int = 8) -> Tuple[str, list]:
    """[Enrichment] Converts fractional decimal (0.0 < f < 1.0) to binary using successive multiplication."""
    steps = []
    frac = fractional_part
    bits = []

    for bit_index in range(max_bits):
        multiplied = frac * 2.0
        int_bit = int(multiplied)
        new_frac = multiplied - int_bit
        steps.append({
            "step": bit_index + 1,
            "expression": f"{frac:.4f} * 2",
            "multiplied": multiplied,
            "int_bit": int_bit,
            "new_frac": new_frac
        })
        bits.append(str(int_bit))
        frac = new_frac
        if abs(frac) < 1e-9:
            break

    return "0." + "".join(bits), steps


def demonstrate_all_conversions(value_dec: int):
    """Prints comprehensive conversion tables across Binary, Octal, Decimal, and Hex."""
    bin_str, bin_steps = decimal_to_base_detailed(value_dec, 2)
    oct_str, oct_steps = decimal_to_base_detailed(value_dec, 8)
    hex_str, hex_steps = decimal_to_base_detailed(value_dec, 16)

    print("=" * 60)
    print(f"RADIX CONVERSION AUDIT FOR DECIMAL ({value_dec})₁₀")
    print("=" * 60)
    print(f"Binary Representation (Base 2):  ({bin_str})₂")
    print(f"Octal Representation (Base 8):   ({oct_str})₈")
    print(f"Hexadecimal (Base 16):           ({hex_str})₁₆")
    print("-" * 60)

    print("\n--- Step-by-Step Division by 2 (Decimal to Binary) ---")
    for s in bin_steps:
        print(f"{s['current']:4d} ÷ 2 = {s['quotient']:4d} | Remainder = {s['symbol']}")
    print(f"Read upwards: ({bin_str})₂")


if __name__ == "__main__":
    # Test with standard Class XI exam numbers
    sample_decimal = 156
    demonstrate_all_conversions(sample_decimal)

    # Fractional conversion demonstration [Enrichment]
    print("\n" + "=" * 60)
    print("[ENRICHMENT] FRACTIONAL RADIX CONVERSION: (0.625)₁₀ -> BINARY")
    print("=" * 60)
    frac_bin, frac_steps = fractional_decimal_to_binary(0.625)
    for s in frac_steps:
        print(f"Step {s['step']}: {s['expression']} = {s['multiplied']:.3f} -> Extracted Bit: {s['int_bit']}")
    print(f"Result: {frac_bin}₂")
