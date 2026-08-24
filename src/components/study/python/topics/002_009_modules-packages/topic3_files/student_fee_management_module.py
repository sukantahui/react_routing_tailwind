# topic3_files/student_fee_management_module.py
# Module: 002_009_modules-packages
# Topic: Creating and structuring custom user-defined modules
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Module: student_fee_management_module
======================================
Enterprise student fee calculation, GST assessment, and receipt generation engine.

Author  : Sukanta Hui (Founder, Coder & AccoTax)
Location: Barrackpore, West Bengal, India
Version : 2.6.0
License : MIT

Exported Public API (__all__):
  - StudentFeeManager (Class)
  - generate_fee_receipt (Function)
  - calculate_gst_breakdown (Function)
  - STANDARD_GST_RATE (Constant)
"""

import sys
import datetime as dt
from typing import Dict, Any, Optional

# Public API Whitelist
__all__ = [
    "StudentFeeManager",
    "generate_fee_receipt",
    "calculate_gst_breakdown",
    "STANDARD_GST_RATE"
]

# Module Constants
STANDARD_GST_RATE: float = 0.18
INSTITUTE_NAME: str = "Coder & AccoTax"
BRANCH_LOCATION: str = "Barrackpore, Kolkata"


def calculate_gst_breakdown(taxable_amount: float, rate: float = STANDARD_GST_RATE) -> Dict[str, float]:
    """Calculates CGST (9%) and SGST (9%) breakdown for West Bengal state transactions."""
    total_gst = taxable_amount * rate
    cgst = total_gst / 2.0
    sgst = total_gst / 2.0
    return {
        "cgst": cgst,
        "sgst": sgst,
        "total_gst": total_gst
    }


def generate_fee_receipt(
    student_id: int,
    student_name: str,
    course_name: str,
    base_fee: float,
    discount_pct: float = 0.0
) -> str:
    """Generates an ASCII-formatted educational payment receipt."""
    discount = base_fee * (discount_pct / 100.0)
    taxable = base_fee - discount
    gst = calculate_gst_breakdown(taxable)
    net_total = taxable + gst["total_gst"]
    now = dt.datetime.now()

    receipt_lines = [
        "=" * 55,
        f"{INSTITUTE_NAME:^55}",
        f"{BRANCH_LOCATION:^55}",
        f"OFFICIAL ENROLLMENT RECEIPT #{student_id:06d}",
        "=" * 55,
        f"Date & Time  : {now:%d-%b-%Y %I:%M %p}",
        f"Student Name : {student_name}",
        f"Course Track : {course_name}",
        "-" * 55,
        f"Gross Fee    : INR {base_fee:>10.2f}",
        f"Discount ({discount_pct:.0f}%): -INR {discount:>9.2f}",
        f"Taxable Sub  : INR {taxable:>10.2f}",
        f"CGST (9%)    : +INR {gst['cgst']:>9.2f}",
        f"SGST (9%)    : +INR {gst['sgst']:>9.2f}",
        "-" * 55,
        f"NET PAID     : INR {net_total:>10.2f}",
        "=" * 55,
    ]
    return "\n".join(receipt_lines)


class StudentFeeManager:
    """High-level batch fee aggregator and accounting manager."""

    def __init__(self, institute: str = INSTITUTE_NAME):
        self.institute = institute
        self._records: Dict[int, Dict[str, Any]] = {}

    def enroll_student(self, student_id: int, name: str, course: str, fee: float) -> str:
        self._records[student_id] = {"name": name, "course": course, "fee": fee}
        return f"Student {name} (ID: {student_id}) enrolled successfully in {course}."

    def get_total_batch_revenue(self) -> float:
        return sum(r["fee"] for r in self._records.values())


# Module Self-Test Guard
if __name__ == "__main__":
    print(f"Executing self-test for {__name__}...\n")
    receipt_out = generate_fee_receipt(
        student_id=9402,
        student_name="Susmita Mukherjee",
        course_name="Python Basic to Pro",
        base_fee=12500.0,
        discount_pct=10.0
    )
    print(receipt_out)
