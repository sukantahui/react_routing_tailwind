"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT II
MODULE 004_005: CONDITIONALS & NESTED DECISION LABORATORY
Topic: Comprehensive Decision Making Suite (Leap Year, Slab Tariffs, Quadratic Solver)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

import math
from typing import Tuple, Dict, Any


def is_leap_year(year: int) -> Tuple[bool, str]:
    """Evaluates the Gregorian Leap Year conditions."""
    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
        return True, f"{year} is a LEAP YEAR (Divisible by 4 and not 100, or divisible by 400)."
    return False, f"{year} is a COMMON YEAR (365 days)."


def compute_electricity_bill_slabs(units: float) -> Tuple[float, list]:
    """Calculates progressive tiered slab tariff."""
    steps = []
    total_bill = 0.0

    if units <= 100:
        b1 = units * 3.0
        steps.append(f"Slab 1 (0 to {units} units @ Rs 3): Rs {b1:.2f}")
        total_bill = b1
    elif units <= 200:
        b1 = 100 * 3.0
        b2 = (units - 100) * 5.0
        steps.append("Slab 1 (First 100 units @ Rs 3): Rs 300.00")
        steps.append(f"Slab 2 ({units - 100} units @ Rs 5): Rs {b2:.2f}")
        total_bill = b1 + b2
    else:
        b1 = 100 * 3.0
        b2 = 100 * 5.0
        b3 = (units - 200) * 7.0
        steps.append("Slab 1 (First 100 units @ Rs 3): Rs 300.00")
        steps.append("Slab 2 (Next 100 units @ Rs 5): Rs 500.00")
        steps.append(f"Slab 3 ({units - 200} units @ Rs 7): Rs {b3:.2f}")
        total_bill = b1 + b2 + b3

    return total_bill, steps


if __name__ == "__main__":
    print("=" * 70)
    print("CONDITIONALS AUDIT: LEAP YEAR CHECKER")
    print("=" * 70)
    for yr in [2000, 2024, 2026, 1900, 2100]:
        is_leap, desc = is_leap_year(yr)
        print(f"Year {yr}: {desc}")

    print("\n" + "=" * 70)
    print("SLAB BILL AUDIT: 250 UNITS CONSUMED")
    print("=" * 70)
    bill_val, bill_steps = compute_electricity_bill_slabs(250)
    for s in bill_steps:
        print(f"-> {s}")
    print(f"Total Electricity Bill: Rs {bill_val:.2f}")
    print("=" * 70)
