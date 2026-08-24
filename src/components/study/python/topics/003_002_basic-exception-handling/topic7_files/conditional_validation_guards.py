# topic7_files/conditional_validation_guards.py
# Module: 003_002_basic-exception-handling
# Topic: Raising exceptions intentionally using raise keyword
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: Exceptions vs Error Codes & Fail-Fast Guards
Demonstrates:
  1. The Danger of Returning Error Codes (`return None` or `return -1`)
  2. The Pythonic Fail-Fast Principle using `raise`
  3. Composing multi-tiered input validation guards
"""

import re
from typing import Dict, Any

# =====================================================================
# 1. THE FLAWED APPROACH: RETURNING ERROR CODES (Silent Bug Hazard!)
# =====================================================================
def flawed_calculate_tax_return_code(salary: float) -> float:
    """Flawed: Returns -1 on error. Caller might forget to check and use -1 in calculations!"""
    if salary < 0:
        return -1.0  # Flawed error code!
    return salary * 0.15


# =====================================================================
# 2. THE PYTHONIC FAIL-FAST APPROACH: RAISING EXCEPTIONS
# =====================================================================
def pythonic_calculate_tax(salary: float, pan_number: str) -> float:
    """Pythonic: Raises descriptive exceptions immediately on invalid data."""
    if not isinstance(salary, (int, float)):
        raise TypeError(f"Salary must be numeric, got {type(salary).__name__}!")

    if salary < 0:
        raise ValueError(f"Salary cannot be negative: INR {salary:,.2f}")

    if not isinstance(pan_number, str) or not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", pan_number.strip()):
        raise ValueError(f"Invalid Indian Income Tax PAN format: '{pan_number}'. Expected 10-char alphanumeric (e.g. ABCDE1234F).")

    return salary * 0.15


def demonstrate_fail_fast_vs_error_codes():
    print("=" * 70)
    print("CODER & ACCOTAX - EXCEPTIONS VS ERROR CODES (FAIL-FAST)")
    print("=" * 70)

    # 1. The Flawed Error Code Bug:
    print("1. Demonstrating Silent Corruption with Return Codes:")
    corrupt_tax = flawed_calculate_tax_return_code(-50000.0)
    print(f"   Corrupt Tax Returned: INR {corrupt_tax} (Caller accidentally adds -1 to ledger!)\n")

    # 2. The Pythonic Fail-Fast Exception:
    print("2. Demonstrating Pythonic Fail-Fast Protection:")
    try:
        tax = pythonic_calculate_tax(-50000.0, "ABCDE1234F")
    except ValueError as err:
        print(f"   [PREVENTED DISASTER] ValueError: {err}\n")

    # 3. PAN Regex Validation Guard:
    print("3. Demonstrating Invalid PAN Format Guard:")
    try:
        tax = pythonic_calculate_tax(75000.0, "INVALID-PAN-99")
    except ValueError as err:
        print(f"   [PREVENTED DISASTER] ValueError: {err}")

    print("\n[PASSED] Fail-Fast Exception Guards Verified.")


if __name__ == "__main__":
    demonstrate_fail_fast_vs_error_codes()
