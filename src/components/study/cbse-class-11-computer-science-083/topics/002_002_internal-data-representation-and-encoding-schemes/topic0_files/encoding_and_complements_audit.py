"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT I
MODULE 002_002: INTERNAL DATA REPRESENTATION LABORATORY
Topic: Character Encoding Audits (ASCII, Unicode) & 2's Complement Arithmetic
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

from typing import Dict, Tuple


def audit_character_encodings(sample_string: str) -> None:
    """Inspects character code points, ASCII values, binary bytes, and UTF-8 representations."""
    print("=" * 70)
    print(f"CHARACTER ENCODING AUDIT FOR STRING: '{sample_string}'")
    print("=" * 70)
    print(f"{'Char':<6} | {'Unicode Point':<14} | {'Decimal':<8} | {'Binary (8-bit)':<14} | {'UTF-8 Hex Bytes'}")
    print("-" * 70)

    for char in sample_string:
        code_point = ord(char)
        unicode_str = f"U+{code_point:04X}"
        utf8_bytes = char.encode("utf-8").hex(" ").upper()
        bin_8bit = f"{code_point:08b}" if code_point < 256 else "Multibyte (>8b)"

        print(f"{char:<6} | {unicode_str:<14} | {code_point:<8d} | {bin_8bit:<14} | {utf8_bytes}")
    print("=" * 70)


def compute_twos_complement(num: int, bit_width: int = 8) -> Tuple[str, str, str]:
    """[Enrichment] Computes True Binary, 1's Complement, and 2's Complement for signed integers."""
    if num >= 0:
        pos_bin = f"{num:0{bit_width}b}"
        return pos_bin, pos_bin, pos_bin

    abs_num = abs(num)
    pos_bin = f"{abs_num:0{bit_width}b}"

    # 1's Complement: invert all bits
    ones_comp = "".join("1" if b == "0" else "0" for b in pos_bin)

    # 2's Complement: add 1
    val_ones = int(ones_comp, 2)
    val_twos = val_ones + 1
    twos_comp = f"{val_twos:0{bit_width}b}"[-bit_width:]

    return pos_bin, ones_comp, twos_comp


if __name__ == "__main__":
    # 1. Character Encoding Demonstration (English, Numbers, Hindi, Bengali, Emoji)
    test_chars = "A5कক🚀"
    audit_character_encodings(test_chars)

    # 2. Signed Binary 2's Complement Demonstration [Enrichment]
    print("\n" + "=" * 70)
    print("[ENRICHMENT] SIGNED 8-BIT 2's COMPLEMENT REPRESENTATIONS")
    print("=" * 70)
    test_numbers = [13, -13, 25, -25, 1, -1, 127, -128]

    print(f"{'Signed Decimal':<16} | {'True Binary':<12} | {'1s Complement':<14} | {'2s Complement (Stored)'}")
    print("-" * 70)
    for n in test_numbers:
        p_bin, o_comp, t_comp = compute_twos_complement(n, 8)
        print(f"{n:<16d} | {p_bin:<12} | {o_comp:<14} | {t_comp}")
    print("=" * 70)
