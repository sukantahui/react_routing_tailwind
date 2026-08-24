# topic3_files/custom_module_anatomy.py
# Module: 002_009_modules-packages
# Topic: Creating and structuring custom user-defined modules
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: Anatomy & Layout of an Enterprise Python Custom Module
Demonstrates:
  1. Top-level module docstrings describing purpose, author, and version
  2. PEP-8 compliant import section (Standard lib, Third-party, Local)
  3. Public API declaration via __all__ whitelist
  4. Encapsulation of private helper functions with leading underscores
  5. Module-level self-testing entry point via if __name__ == '__main__':
"""

# PEP 8 Import Section (Group 1: Standard Library)
import sys
import math
from typing import List, Dict, Optional

# Public API Whitelist: Defines what is exported on 'from custom_module import *'
__all__ = ["calculate_discounted_fee", "format_currency_inr", "DEFAULT_GST_RATE"]

# Module-Level Constants (UPPERCASE_WITH_UNDERSCORES)
DEFAULT_GST_RATE: float = 0.18
AUTHOR: str = "Sukanta Hui (Coder & AccoTax)"
VERSION: str = "2.4.0"


def format_currency_inr(amount: float) -> str:
    """Formats a numeric value into standard Indian Rupee notation."""
    return f"INR {amount:,.2f}"


def calculate_discounted_fee(
    base_fee: float,
    discount_pct: float = 10.0,
    include_gst: bool = True
) -> Dict[str, float]:
    """
    Calculates the final course fee after applying discount and optional GST.
    
    Args:
        base_fee: Original gross fee before discount.
        discount_pct: Percentage discount (default 10.0%).
        include_gst: Whether to append 18% GST (default True).
        
    Returns:
        Dictionary containing breakdown of gross, discount, subtotal, GST, and net.
    """
    _validate_positive_amount(base_fee)
    
    discount_amount = base_fee * (discount_pct / 100.0)
    subtotal = base_fee - discount_amount
    gst_amount = subtotal * DEFAULT_GST_RATE if include_gst else 0.0
    net_total = subtotal + gst_amount

    return {
        "gross": base_fee,
        "discount": discount_amount,
        "subtotal": subtotal,
        "gst": gst_amount,
        "net_payable": net_total
    }


def _validate_positive_amount(val: float) -> None:
    """Private internal helper function (leading underscore) not intended for public use."""
    if val < 0:
        raise ValueError(f"Fee amount cannot be negative! Received: {val}")


# Self-Testing Execution Guard
if __name__ == "__main__":
    print("=" * 65)
    print(f"MODULE SELF-TEST: {__name__} (Version {VERSION})")
    print("=" * 65)
    
    sample_fee = 12000.0
    breakdown = calculate_discounted_fee(sample_fee, discount_pct=15.0)
    
    print(f"Gross Course Fee   : {format_currency_inr(breakdown['gross'])}")
    print(f"15% Discount       : -{format_currency_inr(breakdown['discount'])}")
    print(f"Taxable Subtotal   : {format_currency_inr(breakdown['subtotal'])}")
    print(f"18% GST            : +{format_currency_inr(breakdown['gst'])}")
    print(f"Net Total Payable  : {format_currency_inr(breakdown['net_payable'])}")
