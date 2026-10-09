"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: decimal_to_all_bases.py
Topic 1: Decimal to Binary, Octal, and Hexadecimal Conversion (Successive Division Method)

Demonstrates:
1. Successive Division by Target Base (2, 8, 16)
2. Recording Remainders from Bottom to Top (MSB to LSB)
3. Step-by-step trace formatting suitable for CBSE board examination answers
"""

def decimal_to_base_with_trace(decimal_num: int, base: int) -> tuple:
    """
    Converts a positive decimal integer into the specified target base (2, 8, or 16)
    using the successive division method, recording step-by-step quotients and remainders.
    """
    base_names = {2: "Binary", 8: "Octal", 16: "Hexadecimal"}
    hex_symbols = "0123456789ABCDEF"
    
    print(f"\n--- [DECIMAL TO {base_names.get(base, f'BASE-{base}').upper()} (SUCCESSIVE DIVISION BY {base})] ---")
    print(f"Converting ({decimal_num})₁₀ to Base {base}:\n")
    print(f"{'Division Step':<16} | {'Quotient':<10} | {'Remainder':<12} | {'Symbol'}")
    print("-" * 55)

    if decimal_num == 0:
        print(f"0 / {base:<13} | 0          | 0            | 0")
        return "0", [{"quotient": 0, "remainder": "0"}]

    steps = []
    remainders = []
    current = decimal_num

    while current > 0:
        quotient = current // base
        rem = current % base
        symbol = hex_symbols[rem]
        remainders.append(symbol)
        steps.append({"step": f"{current} / {base}", "quotient": quotient, "remainder": rem, "symbol": symbol})
        print(f"{current} / {base:<12} | {quotient:<10} | {rem:<12} | {symbol}")
        current = quotient

    # Read remainders from bottom to top (Most Significant Digit to Least Significant Digit)
    converted_result = "".join(reversed(remainders))
    print("-" * 55)
    print(f"[+] Read remainders from BOTTOM to TOP (MSB -> LSB):")
    print(f"    ({decimal_num})₁₀ = ({converted_result})₍{base}₎\n")
    return converted_result, steps


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - SUCCESSIVE DIVISION CONVERTER SUITE   ")
    print("=================================================================\n")

    test_decimal = 156

    # 1. Decimal to Binary (Base 2)
    decimal_to_base_with_trace(test_decimal, 2)

    # 2. Decimal to Octal (Base 8)
    decimal_to_base_with_trace(test_decimal, 8)

    # 3. Decimal to Hexadecimal (Base 16)
    decimal_to_base_with_trace(test_decimal, 16)

if __name__ == "__main__":
    main()
