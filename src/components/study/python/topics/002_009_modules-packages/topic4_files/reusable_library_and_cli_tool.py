# topic4_files/reusable_library_and_cli_tool.py
# Module: 002_009_modules-packages
# Topic: The __name__ == '__main__' idiom explained with practical use cases
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: Dual-Purpose Module Architecture (Library + CLI Tool)
Demonstrates:
  1. Writing pure functions for import by web backends / other scripts
  2. Wiring command-line argument parsing (sys.argv) inside the main guard
  3. Interactive terminal usage vs programmatic import usage
"""

import sys
from typing import Dict

# Currency exchange rates table (Simulated Coder & AccoTax FX Engine)
EXCHANGE_RATES: Dict[str, float] = {
    "USD": 83.50,   # 1 USD = 83.50 INR
    "EUR": 90.20,   # 1 EUR = 90.20 INR
    "GBP": 105.80,  # 1 GBP = 105.80 INR
}

def convert_to_inr(amount_foreign: float, currency_code: str) -> float:
    """
    Pure library function: Converts foreign currency to Indian Rupees (INR).
    Usable anywhere in your web backend without printing to console.
    """
    code = currency_code.upper().strip()
    if code not in EXCHANGE_RATES:
        raise ValueError(f"Unsupported currency '{code}'! Supported: {list(EXCHANGE_RATES.keys())}")
    
    return amount_foreign * EXCHANGE_RATES[code]


def cli_entry_point():
    """Terminal CLI interface handler when executed directly."""
    print("=" * 65)
    print("CODER & ACCOTAX - FX CURRENCY CONVERTER CLI")
    print("=" * 65)

    # Check CLI arguments or provide standard demo
    if len(sys.argv) >= 3:
        try:
            amt = float(sys.argv[1])
            curr = sys.argv[2]
            res = convert_to_inr(amt, curr)
            print(f"Input: {curr} {amt:,.2f} -> Output: INR {res:,.2f}")
        except ValueError as err:
            print(f"CLI Error: {err}")
    else:
        print("Usage: python reusable_library_and_cli_tool.py <AMOUNT> <CURRENCY_CODE>")
        print("\nRunning Standard Self-Demo:")
        for curr, rate in EXCHANGE_RATES.items():
            converted = convert_to_inr(100.0, curr)
            print(f"  * 100 {curr:<3} @ Rate {rate:>6.2f} = INR {converted:>9.2f}")


if __name__ == "__main__":
    cli_entry_point()
