# topic0_files/financial_toolkit_importer.py
# Module: 002_009_modules-packages
# Topic: import & from-import syntax variations
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Production Financial Toolkit & Tax Assessor
Demonstrates:
  1. Clean, PEP-8 compliant import organization
  2. Standard library aliasing (import datetime as dt)
  3. High-precision arithmetic via 'from decimal import Decimal, ROUND_HALF_UP'
  4. Explicit function aliasing ('from math import ceil as round_up')
  5. Generating professional financial assessment reports
"""

# Standard Library Imports (Group 1: Core Utilities)
import sys
from typing import List, Dict, Any, Tuple

# Standard Library Imports (Group 2: Math & Arithmetic)
from math import ceil as round_up
from decimal import Decimal, ROUND_HALF_UP

# Standard Library Imports (Group 3: Time & Logging)
import datetime as dt

class FinancialToolkit:
    """Production tax and financial assessment engine with exact Decimal precision."""

    GST_RATE = Decimal("0.18")       # 18% GST standard
    EARLY_BIRD_DISCOUNT = Decimal("0.10") # 10% discount

    @classmethod
    def calculate_assessment(
        cls,
        base_fee_inr: float,
        installments: int = 3
    ) -> Dict[str, Any]:
        # Convert float to Decimal for currency safety
        base_dec = Decimal(str(base_fee_inr))
        discount_dec = (base_dec * cls.EARLY_BIRD_DISCOUNT).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        taxable_dec = base_dec - discount_dec
        gst_dec = (taxable_dec * cls.GST_RATE).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        net_total = taxable_dec + gst_dec

        # Calculate monthly installment
        installment_val = (net_total / Decimal(installments)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

        return {
            "gross_fee": base_dec,
            "discount": discount_dec,
            "taxable_amount": taxable_dec,
            "gst_amount": gst_dec,
            "net_payable": net_total,
            "installments_count": installments,
            "monthly_installment": installment_val,
            "rounded_up_total": round_up(float(net_total)),
            "assessed_on": dt.datetime(2026, 8, 24, 18, 30, 0)
        }


def run_financial_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - MODULAR FINANCIAL ASSESSMENT REPORT")
    print("=" * 75)

    course_fee = 13500.00
    report = FinancialToolkit.calculate_assessment(course_fee, installments=3)

    date_str = f"{report['assessed_on']:%d-%b-%Y %I:%M %p}"
    print(f"Assessment Timestamp : {date_str}")
    print(f"Python Platform      : {sys.platform} (CPython {sys.version.split()[0]})\n")

    print(f"Gross Course Fee     : INR {report['gross_fee']:>10.2f}")
    print(f"Special Discount     : -INR {report['discount']:>9.2f} (10% Early Bird)")
    print(f"Taxable Subtotal     : INR {report['taxable_amount']:>10.2f}")
    print(f"GST Assessment (18%) : +INR {report['gst_amount']:>9.2f}")
    print("-" * 45)
    print(f"NET PAYABLE TOTAL    : INR {report['net_payable']:>10.2f}")
    print("-" * 45)
    print(f"Monthly EMI (3 Months): INR {report['monthly_installment']:>10.2f} / month")
    print(f"Ceil Rounded Total   : INR {report['rounded_up_total']:>10}")


if __name__ == "__main__":
    run_financial_demo()
