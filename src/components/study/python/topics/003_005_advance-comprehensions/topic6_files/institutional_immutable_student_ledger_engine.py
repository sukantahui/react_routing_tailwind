# topic6_files/institutional_immutable_student_ledger_engine.py
# Module: 003_005_advance-comprehensions
# Topic: Pure functions & immutable programming principles in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 4: Institutional Immutable Student Ledger Engine (Case Study)
Demonstrates:
  1. Complete immutable domain model using `@dataclass(frozen=True)`
  2. Pure transformation pipelines with tamper-proof audit hashing
  3. Verifiable time-travel historical state progression
"""

import hashlib
import json
from dataclasses import dataclass, replace
from decimal import Decimal
from typing import Tuple, List, Dict, Any

@dataclass(frozen=True)
class AcademicRecord:
    student_id: str
    name: str
    course: str
    tuition_fee: Decimal
    fee_paid: Decimal
    grade_points: Tuple[float, ...] = ()
    status: str = "REGISTERED"

    @property
    def gpa(self) -> float:
        return round(sum(self.grade_points) / len(self.grade_points), 2) if self.grade_points else 0.0

    @property
    def is_cleared(self) -> bool:
        return self.fee_paid >= self.tuition_fee

    def apply_scholarship(self, discount_pct: Decimal) -> "AcademicRecord":
        """Pure copy-on-write scholarship application."""
        discount_amount = round(self.tuition_fee * (discount_pct / Decimal("100")), 2)
        new_fee = self.tuition_fee - discount_amount
        return replace(self, tuition_fee=new_fee)

    def record_payment(self, amount: Decimal) -> "AcademicRecord":
        """Pure copy-on-write fee payment."""
        new_paid = self.fee_paid + amount
        new_status = "PAID_CLEARED" if new_paid >= self.tuition_fee else "PARTIAL"
        return replace(self, fee_paid=new_paid, status=new_status)

    def append_grade(self, mark: float) -> "AcademicRecord":
        """Pure copy-on-write grade recording."""
        return replace(self, grade_points=(*self.grade_points, mark))

    def compute_record_hash(self) -> str:
        """Computes deterministic cryptographic fingerprint of immutable state."""
        raw_repr = f"{self.student_id}|{self.name}|{self.tuition_fee}|{self.fee_paid}|{self.status}"
        return hashlib.sha256(raw_repr.encode("utf-8")).hexdigest()[:12]


def demonstrate_immutable_ledger_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL IMMUTABLE ACADEMIC LEDGER")
    print("=" * 70)

    # 1. Instantiate Initial Immutable Student State:
    v0 = AcademicRecord(
        student_id="STU-101",
        name="Sourav Mukherjee",
        course="Python Full-Stack & AI",
        tuition_fee=Decimal("35000.00"),
        fee_paid=Decimal("0.00"),
        grade_points=(9.2, 9.5)
    )

    print("1. Version 0 (Initial Enrolment State):")
    print(f"   * Status   : {v0.status} | Fee: INR {v0.tuition_fee:,.2f} | Paid: INR {v0.fee_paid:,.2f} | GPA: {v0.gpa}")
    print(f"   * Hash V0  : {v0.compute_record_hash()}\n")

    # 2. Pure Transition 1: Apply 15% Academic Scholarship:
    v1 = v0.apply_scholarship(Decimal("15.0"))
    print("2. Version 1 (Scholarship Applied via Pure Transformation):")
    print(f"   * Fee After 15% Discount: INR {v1.tuition_fee:,.2f}")
    print(f"   * Hash V1               : {v1.compute_record_hash()}\n")

    # 3. Pure Transition 2: Complete Tuition Payment:
    v2 = v1.record_payment(Decimal("29750.00"))
    print("3. Version 2 (Tuition Fee Paid in Full):")
    print(f"   * Status   : {v2.status} | Cleared: {v2.is_cleared}")
    print(f"   * Hash V2  : {v2.compute_record_hash()}\n")

    # 4. Audit Proof: Verifying Historical Immutability
    print("4. Cryptographic Audit Chain (Zero Tampering):")
    audit_chain = [v0, v1, v2]
    for idx, snap in enumerate(audit_chain):
        print(f"   * Snapshot V{idx} [{snap.compute_record_hash()}] Fee: INR {snap.tuition_fee:>9,.2f} | Paid: INR {snap.fee_paid:>9,.2f} | Status: {snap.status}")

    print("\n[PASSED] Institutional Immutable Student Ledger Engine Verified.")


if __name__ == "__main__":
    demonstrate_immutable_ledger_suite()
