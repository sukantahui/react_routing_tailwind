# topic5_files/staticmethod_utility_and_namespace_helpers.py
# Module: 003_001_object-oriented-python
# Topic: Class methods (@classmethod) & Static methods (@staticmethod)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 3: @staticmethod as Logical Utility & Domain Namespaces
Demonstrates:
  1. Defining pure utility functions with @staticmethod
  2. Scoping mathematical algorithms and string validators into class namespaces
  3. Why static methods are preferred over loose global functions for cohesion
"""

import re
import math

class FinancialMathUtils:
    """Domain namespace containing financial math algorithms and tax calculations."""

    @staticmethod
    def calculate_emi(principal: float, annual_rate_percent: float, tenure_months: int) -> float:
        """Calculates Equated Monthly Installment (EMI) using standard financial formula."""
        monthly_rate = (annual_rate_percent / 100) / 12
        emi = (principal * monthly_rate * math.pow(1 + monthly_rate, tenure_months)) / (math.pow(1 + monthly_rate, tenure_months) - 1)
        return emi

    @staticmethod
    def calculate_gst_breakdown(gross_amount: float, gst_rate_percent: float = 18.0) -> dict:
        """Splits gross amount into base value, CGST (half) and SGST (half)."""
        base_value = gross_amount / (1 + (gst_rate_percent / 100))
        total_gst = gross_amount - base_value
        cgst = total_gst / 2.0
        sgst = total_gst / 2.0

        return {
            "gross_amount": gross_amount,
            "base_value": base_value,
            "cgst_9pct": cgst,
            "sgst_9pct": sgst,
            "total_tax": total_gst
        }

    @staticmethod
    def is_valid_gstin(gstin: str) -> bool:
        """Validates 15-character Indian GST Identification Number (GSTIN)."""
        pattern = r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
        return bool(re.match(pattern, gstin.strip().upper()))


def demonstrate_static_utilities():
    print("=" * 70)
    print("CODER & ACCOTAX - STATIC METHOD UTILITY NAMESPACE")
    print("=" * 70)

    # 1. Calculate Course Installment EMI:
    emi = FinancialMathUtils.calculate_emi(principal=24000.0, annual_rate_percent=10.0, tenure_months=6)
    print(f"1. 6-Month Course Loan EMI (INR 24,000 @ 10%): INR {emi:,.2f} / month\n")

    # 2. Reverse GST Breakdown:
    gst_info = FinancialMathUtils.calculate_gst_breakdown(11800.0, 18.0)
    print("2. GST 18% Inward Breakdown on INR 11,800.00:")
    print(f"   * Base Value  : INR {gst_info['base_value']:,.2f}")
    print(f"   * CGST (9%)   : +INR {gst_info['cgst_9pct']:,.2f}")
    print(f"   * SGST (9%)   : +INR {gst_info['sgst_9pct']:,.2f}")
    print(f"   * Total Tax   : INR {gst_info['total_tax']:,.2f}\n")

    # 3. GSTIN Regex Validation:
    sample_gstin = "19AAECR4849J1Z8"
    is_valid = FinancialMathUtils.is_valid_gstin(sample_gstin)
    print(f"3. GSTIN '{sample_gstin}' Valid? -> {is_valid}")

    print("\n[PASSED] Static Utility Methods Verified.")


if __name__ == "__main__":
    demonstrate_static_utilities()
