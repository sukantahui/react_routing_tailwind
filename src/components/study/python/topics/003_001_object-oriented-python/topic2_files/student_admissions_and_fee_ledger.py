# topic2_files/student_admissions_and_fee_ledger.py
# Module: 003_001_object-oriented-python
# Topic: Constructors & the __init__() method
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Student Admissions & Fee Ledger Generator (Production Case Study)
Demonstrates:
  1. Production-grade __init__ constructor with strict domain validation
  2. Automatic transaction receipt ID generation during construction
  3. Calculating net balances, discount allowances, and payment installments
"""

import datetime as dt
from typing import Optional, List

class StudentAdmissionLedger:
    """Enterprise Student Admission & Fee Ledger Record."""
    institute_code = "CODER-ACCOTAX-BKP"
    _sequence_counter = 1000

    def __init__(
        self,
        student_name: str,
        guardian_contact: str,
        course_name: str,
        total_course_fee: float,
        initial_downpayment: float,
        scholarship_coupon: Optional[str] = None
    ):
        # 1. Validation Invariants
        if not student_name.strip():
            raise ValueError("Student name cannot be blank!")
        if total_course_fee <= 0:
            raise ValueError("Total course fee must be positive!")
        if initial_downpayment < 0 or initial_downpayment > total_course_fee:
            raise ValueError(f"Invalid downpayment: INR {initial_downpayment:,.2f}")

        # 2. Sequence ID Generation
        StudentAdmissionLedger._sequence_counter += 1
        self.admission_id = f"ADM-2026-{StudentAdmissionLedger._sequence_counter}"
        self.admission_date = dt.date.today()

        # 3. Core State
        self.student_name = student_name.strip()
        self.guardian_contact = guardian_contact.strip()
        self.course_name = course_name
        self.total_course_fee = float(total_course_fee)
        self.paid_amount = float(initial_downpayment)
        self.scholarship_coupon = scholarship_coupon

        # 4. Computed Discount
        self.discount_amount = 2000.0 if scholarship_coupon == "SUPER2026" else 0.0
        self.net_course_fee = max(0.0, self.total_course_fee - self.discount_amount)
        self.due_balance = max(0.0, self.net_course_fee - self.paid_amount)
        self.payment_history: List[str] = [
            f"{self.admission_date}: Initial Downpayment INR {self.paid_amount:,.2f}"
        ]

    def record_installment(self, amount: float) -> None:
        if amount <= 0:
            print(f"  [ERROR] Invalid installment: INR {amount:,.2f}")
            return
        if amount > self.due_balance:
            print(f"  [ERROR] Amount exceeds due balance of INR {self.due_balance:,.2f}")
            return
        self.paid_amount += amount
        self.due_balance -= amount
        self.payment_history.append(f"{dt.date.today()}: Installment INR {amount:,.2f}")
        print(f"  [PAYMENT RECORDED] {self.student_name}: Paid INR {amount:,.2f} | Remaining Due: INR {self.due_balance:,.2f}")

    def generate_invoice(self) -> str:
        return (
            f"======================================================================\n"
            f"CODER & ACCOTAX - STUDENT ADMISSION INVOICE\n"
            f"Admission ID  : {self.admission_id} | Date: {self.admission_date}\n"
            f"Student Name  : {self.student_name} | Contact: {self.guardian_contact}\n"
            f"Course Enrolled: {self.course_name}\n"
            f"Gross Fee     : INR {self.total_course_fee:,.2f}\n"
            f"Scholarship   : -INR {self.discount_amount:,.2f} (Coupon: {self.scholarship_coupon or 'None'})\n"
            f"Net Course Fee: INR {self.net_course_fee:,.2f}\n"
            f"Paid to Date  : INR {self.paid_amount:,.2f}\n"
            f"Outstanding   : INR {self.due_balance:,.2f}\n"
            f"======================================================================"
        )


def run_admission_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - STUDENT ADMISSIONS CASE STUDY")
    print("=" * 70)

    # 1. Instantiate with Valid Parameters & Coupon
    adm = StudentAdmissionLedger(
        student_name="Priyanka Sen",
        guardian_contact="+91-9830022222",
        course_name="Python Pro Full-Stack Development",
        total_course_fee=18000.0,
        initial_downpayment=6000.0,
        scholarship_coupon="SUPER2026"
    )

    print(adm.generate_invoice())

    # 2. Record next installment
    print("\nRecording subsequent monthly installment:")
    adm.record_installment(5000.0)

    print("\n[PASSED] Student Admissions Ledger Suite Complete.")


if __name__ == "__main__":
    run_admission_demo()
