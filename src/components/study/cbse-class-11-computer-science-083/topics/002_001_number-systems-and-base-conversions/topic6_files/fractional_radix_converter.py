"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Number Systems & Radix Conversion Algorithms
File: fractional_radix_converter.py
Topic 6: [Enrichment] Fractional Radix Conversions (Successive Multiplication Method)

Demonstrates:
1. Fractional Decimal to Binary, Octal, and Hexadecimal using Successive Multiplication
2. Recording integer carries from TOP to BOTTOM (MSB to LSB)
3. Fractional Base to Decimal expansion using negative powers (b^-1, b^-2, ...)
"""

def decimal_fraction_to_base(frac_val: float, base: int, precision: int = 6) -> tuple:
    """
    Converts a fractional decimal number (0.xxx) into a target base (2, 8, 16)
    using successive multiplication by the base, recording integer parts from top to bottom.
    """
    hex_symbols = "0123456789ABCDEF"
    cur_frac = frac_val - int(frac_val)
    digits = []
    steps = []
    
    print(f"\n--- [FRACTIONAL DECIMAL TO BASE-{base} (SUCCESSIVE MULTIPLICATION)] ---")
    print(f"Converting 0.{str(frac_val).split('.')[1] if '.' in str(frac_val) else '0'} to Base {base}:\n")
    print(f"{'Multiplication':<20} | {'Product':<10} | {'Integer Part':<14} | {'Next Fraction'}")
    print("-" * 65)

    for i in range(precision):
        prod = cur_frac * base
        int_part = int(prod)
        next_frac = prod - int_part
        symbol = hex_symbols[int_part]
        digits.append(symbol)
        
        step_text = f"{cur_frac:.4f} × {base}"
        steps.append({"step": step_text, "product": prod, "integer": int_part, "symbol": symbol, "next_frac": next_frac})
        print(f"{step_text:<20} | {prod:<10.4f} | {symbol:<14} | {next_frac:.4f}")
        
        cur_frac = next_frac
        if cur_frac == 0:
            break

    result_fraction = "0." + "".join(digits)
    print("-" * 65)
    print(f"[+] Read integer parts from TOP to BOTTOM:")
    print(f"    (0.{str(frac_val).split('.')[1]})₁₀ = ({result_fraction})₍{base}₎\n")
    return result_fraction, steps


def fractional_base_to_decimal(frac_str: str, base: int) -> float:
    """Converts a fractional base string (e.g. '0.1011') to decimal using negative powers."""
    clean = frac_str.replace("0.", "").upper()
    hex_map = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'A':10,'B':11,'C':12,'D':13,'E':14,'F':15}
    
    total = 0.0
    print(f"\n--- [FRACTIONAL BASE-{base} TO DECIMAL (NEGATIVE POWERS)] ---")
    for idx, ch in enumerate(clean, start=1):
        val = hex_map.get(ch, 0)
        weight = base ** (-idx)
        term = val * weight
        total += term
        print(f"Digit '{ch}' (Value: {val}) × {base}^(-{idx}) ({weight:.6f}) = {term:.6f}")
    
    print(f"[+] ({frac_str})₍{base}₎ = ({total:.6f})₁₀\n")
    return total


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - FRACTIONAL RADIX CONVERTER SUITE      ")
    print("=================================================================\n")

    # 1. Decimal Fraction to Binary (0.625)
    decimal_fraction_to_base(0.625, 2)

    # 2. Decimal Fraction to Octal (0.625)
    decimal_fraction_to_base(0.625, 8)

    # 3. Binary Fraction to Decimal (0.101)
    fractional_base_to_decimal("0.101", 2)

if __name__ == "__main__":
    main()
