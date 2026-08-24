# topic5_files/financial_invoice_and_report_generator.py
# Module: 002_007_string-processing
# Topic: Advanced Formatting (f-strings, format() method, padding, alignment)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 5 - File 4: Production Financial Invoice & Fee Receipt Generator
Demonstrates:
  1. Dynamic table generation with precise alignment (<, >, ^)
  2. Fixed-point currency formatting (INR :,.2f)
  3. Percentage discounts & GST tax computations (:.1%)
  4. Zero-padded serial codes (:06d)
  5. Formatted datetime stamps (%d-%b-%Y %I:%M %p)
"""

from datetime import datetime
from typing import List, Dict, Any

class InvoiceGenerator:
    """Generates professional, formatted financial billing statements."""

    INSTITUTE = "CODER & ACCOTAX"
    BRANCH = "25(10/A) Shibtala Road, Barrackpore, Kolkata - 700120"
    PHONE = "+91 7003756860"
    GST_IN = "19AAEC8492Q1ZT"

    @classmethod
    def generate_receipt(
        cls,
        invoice_no: int,
        student_name: str,
        student_id: str,
        courses: List[Dict[str, Any]],
        discount_rate: float = 0.05,
        gst_rate: float = 0.18
    ) -> str:
        date_str = f"{datetime(2026, 8, 24, 18, 45, 0):%d-%b-%Y %I:%M %p}"
        line_w = 76

        # Calculate Financials
        subtotal = sum(item["fee"] for item in courses)
        discount_amount = subtotal * discount_rate
        discounted_subtotal = subtotal - discount_amount
        gst_amount = discounted_subtotal * gst_rate
        net_payable = discounted_subtotal + gst_amount

        lines = []
        # Header Banner
        lines.append("=" * line_w)
        lines.append(f"{cls.INSTITUTE:^{line_w}}")
        lines.append(f"{cls.BRANCH:^{line_w}}")
        lines.append(f"{'Phone: ' + cls.PHONE + ' | GSTIN: ' + cls.GST_IN:^{line_w}}")
        lines.append(f"{'OFFICIAL STUDENT FEE RECEIPT':^{line_w}}")
        lines.append("=" * line_w)

        # Meta Details Grid
        lines.append(f"Invoice No : INV-{invoice_no:06d}{'Date & Time: ' + date_str:>49}")
        lines.append(f"Student    : {student_name:<30} Student ID : {student_id}")
        lines.append("-" * line_w)

        # Items Table Header
        header = f"{'#':<3} | {'COURSE DESCRIPTION':<36} | {'DURATION':<10} | {'FEE (INR)':>15}"
        lines.append(header)
        lines.append("-" * line_w)

        # Items Rows
        for i, item in enumerate(courses, 1):
            row = f"{i:<3} | {item['title']:<36} | {item['duration']:<10} | {item['fee']:>15,.2f}"
            lines.append(row)

        lines.append("-" * line_w)

        # Financial Summary Breakdown
        lines.append(f"{'Gross Course Fee Subtotal:':>56} INR {subtotal:>12,.2f}")
        lines.append(f"{f'Special Early Bird Discount ({discount_rate:.1%}):':>56} -INR {discount_amount:>11,.2f}")
        lines.append(f"{'Taxable Assessment Amount:':>56} INR {discounted_subtotal:>12,.2f}")
        lines.append(f"{f'Central & State GST ({gst_rate:.1%}):':>56} +INR {gst_amount:>11,.2f}")
        lines.append("=" * line_w)
        lines.append(f"{'NET PAYABLE AMOUNT:':>56} INR {net_payable:>12,.2f}")
        lines.append("=" * line_w)

        # Footer Notice
        lines.append(f"{'Thank you for learning with Coder & AccoTax!':^{line_w}}")
        lines.append(f"{'Website: https://www.codernaccotax.co.in':^{line_w}}")
        lines.append("=" * line_w)

        return "\n".join(lines)


def run_invoice_demo():
    sample_courses = [
        {"title": "Python Programming (Basic to Pro)", "duration": "4 Months", "fee": 4500.00},
        {"title": "Data Analytics (NumPy & Pandas)", "duration": "3 Months", "fee": 3800.00},
        {"title": "Web Development (FastAPI + React)", "duration": "3 Months", "fee": 5200.00},
    ]

    receipt_text = InvoiceGenerator.generate_receipt(
        invoice_no=942,
        student_name="Susmita Mukherjee",
        student_id="PY-2026-084",
        courses=sample_courses,
        discount_rate=0.10,  # 10% discount
        gst_rate=0.18        # 18% GST
    )

    print(receipt_text)


if __name__ == "__main__":
    run_invoice_demo()
