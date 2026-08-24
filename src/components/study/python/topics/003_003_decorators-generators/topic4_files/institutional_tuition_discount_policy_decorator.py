# topic4_files/institutional_tuition_discount_policy_decorator.py
# Module: 003_003_decorators-generators
# Topic: Decorators with arguments & functools.wraps preservation
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 4: Multi-Campus Dynamic Tuition Policy Engine (Case Study)
Demonstrates:
  1. Stacking multiple Parameterized Decorators with custom domain configurations
  2. Enforcing institutional policy constraints (Discount Caps, Campus Rules)
  3. Dynamic audit logging with configurable ledger categories
"""

import functools
from typing import Dict, Any

# =====================================================================
# PARAMETERIZED PRODUCTION POLICY DECORATORS
# =====================================================================
def enforce_discount_ceiling(max_discount_rate: float, campus_code: str):
    """Tier 1: Decorator Factory enforcing campus-specific concession ceilings."""

    def decorator(func):

        @functools.wraps(func)
        def wrapper(base_fee: float, discount_rate: float, *args, **kwargs):
            if discount_rate > max_discount_rate:
                raise ValueError(
                    f"[POLICY VIOLATION] Discount {discount_rate*100:.1f}% exceeds maximum allowed "
                    f"ceiling of {max_discount_rate*100:.1f}% for campus '{campus_code}'!"
                )
            return func(base_fee, discount_rate, *args, **kwargs)

        return wrapper

    return decorator


def audit_financial_transaction(ledger_code: str, min_alert_threshold: float = 4000.0):
    """Tier 1: Decorator Factory auditing concessions and flagging large deductions."""

    def decorator(func):

        @functools.wraps(func)
        def wrapper(base_fee: float, discount_rate: float, *args, **kwargs):
            discount_amount = base_fee * discount_rate
            net_fee = func(base_fee, discount_rate, *args, **kwargs)

            print(
                f"  [LEDGER AUDIT: {ledger_code}] Base: INR {base_fee:,.2f} | "
                f"Discount: INR {discount_amount:,.2f} | Net Payable: INR {net_fee:,.2f}"
            )

            if discount_amount >= min_alert_threshold:
                print(f"  [MANAGEMENT ALERT] Large concession of INR {discount_amount:,.2f} flagged for director review.")

            return net_fee

        return wrapper

    return decorator


# =====================================================================
# DECORATED TUITION CALCULATOR
# =====================================================================
@enforce_discount_ceiling(max_discount_rate=0.25, campus_code="BARRACKPORE")
@audit_financial_transaction(ledger_code="SCHOLARSHIP-2026", min_alert_threshold=4000.0)
def calculate_concession_fee(base_fee: float, discount_rate: float, student_id: str) -> float:
    """Calculates net payable tuition fee after applying institutional concessions."""
    return base_fee * (1.0 - discount_rate)


def run_tuition_policy_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - TUITION CONCESSION POLICY ENGINE")
    print("=" * 70)

    # 1. Standard Concession (15% - Allowed):
    print("1. Calculating 15% Academic Concession (Base INR 20,000):")
    fee1 = calculate_concession_fee(20000.0, 0.15, student_id="STU-101")
    print(f"   Final Net Fee: INR {fee1:,.2f}\n")

    # 2. Large Concession (20% on INR 30,000 - Triggers Management Alert):
    print("2. Calculating 20% Concession on INR 30,000 (INR 6,000 deduction):")
    fee2 = calculate_concession_fee(30000.0, 0.20, student_id="STU-102")
    print(f"   Final Net Fee: INR {fee2:,.2f}\n")

    # 3. Policy Ceiling Violation (35% requested against 25% max):
    print("3. Attempting 35% Concession (Exceeds 25% Ceiling):")
    try:
        calculate_concession_fee(20000.0, 0.35, student_id="STU-103")
    except ValueError as err:
        print(f"   [BLOCKED BY POLICY GUARD] {err}")

    print("\n[PASSED] Tuition Concession Policy Engine Verified.")


if __name__ == "__main__":
    run_tuition_policy_demo()
