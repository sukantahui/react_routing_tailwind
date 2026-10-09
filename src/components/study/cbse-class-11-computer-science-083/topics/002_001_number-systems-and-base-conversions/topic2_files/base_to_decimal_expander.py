"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: base_to_decimal_expander.py
Topic 2: Binary, Octal, and Hexadecimal to Decimal Conversion (Positional Weight Expansion Method)

Demonstrates:
1. Positional Weight Formula: Sum(Digit_i * Base^i)
2. Evaluation of Binary, Octal, and Hexadecimal to Decimal
3. Step-by-step intermediate calculation logs suitable for exam scripts
"""

def base_to_decimal_with_expansion(num_str: str, base: int) -> tuple:
    """
    Converts a number string in base 2, 8, or 16 into Decimal (Base 10)
    using the positional weight expansion method.
    """
    hex_map = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
        '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
    }
    
    clean_str = num_str.upper().strip()
    length = len(clean_str)
    total_decimal = 0
    expansion_terms = []
    
    print(f"\n--- [BASE-{base} TO DECIMAL (POSITIONAL WEIGHT EXPANSION)] ---")
    print(f"Converting ({clean_str})₍{base}₎ to Decimal:\n")
    
    for i, char in enumerate(clean_str):
        power = length - 1 - i
        digit_value = hex_map.get(char, 0)
        weight = base ** power
        subtotal = digit_value * weight
        total_decimal += subtotal
        
        term_str = f"({digit_value} × {base}^{power})"
        expansion_terms.append((term_str, subtotal, char, power, digit_value, weight))
        print(f"Position {power}: Digit '{char}' (Value: {digit_value}) × {base}^{power} ({weight}) = {subtotal}")
    
    formula_line = " + ".join([t[0] for t in expansion_terms])
    sum_line = " + ".join([str(t[1]) for t in expansion_terms])
    
    print("-" * 60)
    print(f"Formula Expansion: {formula_line}")
    print(f"Subtotals Sum:     {sum_line}")
    print(f"[+] Result: ({clean_str})₍{base}₎ = ({total_decimal})₁₀\n")
    return total_decimal, expansion_terms


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - POSITIONAL WEIGHT EXPANSION SUITE     ")
    print("=================================================================\n")

    # 1. Binary to Decimal
    base_to_decimal_with_expansion("10011100", 2)

    # 2. Octal to Decimal
    base_to_decimal_with_expansion("234", 8)

    # 3. Hexadecimal to Decimal
    base_to_decimal_with_expansion("9C", 16)

if __name__ == "__main__":
    main()
