"""
# Module: 004_004_capstone-projects
# Topic 3: Writing complete documentation (README.md, docstrings, typing hints)
# File: institutional_documentation_audit_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Full documentation, type annotation, and doctest verification suite
#              for the institutional management engine.
"""

from typing import Literal, Optional
from dataclasses import dataclass
import doctest

CampusTier = Literal["Tier1_Metropolitan", "Tier2_Regional"]

@dataclass
class VerifiedStudent:
    """Represents a verified institutional student record.

    Attributes:
        sid (str): Standardized registration token (e.g. 'BP-2026-0042').
        name (str): Full registered student name.
        campus (str): Campus location (Barrackpore, Kolkata, Ichapur).
        base_fee (float): Initial tuition fee.
        paid_amount (float): Total payments completed.
    """
    sid: str
    name: str
    campus: str
    base_fee: float
    paid_amount: float = 0.0

    @property
    def outstanding_balance(self) -> float:
        """Calculates remaining tuition balance.

        Returns:
            float: Outstanding debt amount.

        Examples:
            >>> s = VerifiedStudent('BP-2026-0001', 'Mamata', 'Barrackpore', 20000.0, 12000.0)
            >>> s.outstanding_balance
            8000.0
        """
        return max(0.0, self.base_fee - self.paid_amount)

class InstitutionalDocumentationEngine:
    """Administrative documentation and certification engine."""

    @classmethod
    def format_completion_certificate(cls, student: VerifiedStudent, gpa: float) -> str:
        """Generates formal graduation certification string.

        Args:
            student (VerifiedStudent): Validated student domain entity.
            gpa (float): Cumulative grade point average (0.0 to 100.0).

        Returns:
            str: Standardized certificate transcript string.

        Raises:
            ValueError: If GPA is not in range [0.0, 100.0] or student has unpaid debt.

        Examples:
            >>> s = VerifiedStudent('BP-01', 'Mamata', 'Barrackpore', 20000.0, 20000.0)
            >>> InstitutionalDocumentationEngine.format_completion_certificate(s, 95.0)
            'CERTIFICATE: Mamata has graduated from Barrackpore Campus with 95.0 GPA.'
        """
        if not (0.0 <= gpa <= 100.0):
            raise ValueError(f"Invalid GPA {gpa}: must be between 0.0 and 100.0.")
        if student.outstanding_balance > 0:
            raise ValueError(f"Cannot certify student with unpaid balance of Rs. {student.outstanding_balance:,.2f}.")

        return f"CERTIFICATE: {student.name} has graduated from {student.campus} Campus with {gpa:.1f} GPA."

def run_documentation_audit():
    print("   [...] Running Institutional Documentation & Doctest Audit...")
    results = doctest.testmod(verbose=False)
    assert results.failed == 0, f"Doctests failed: {results.failed} errors"
    print(f"   [PASS] 1. All {results.attempted} embedded docstring examples passed verification")

    # 2. Test certificate generation for Mamata
    mamata = VerifiedStudent("BP-2026-0001", "Mamata", "Barrackpore", 25000.0, 25000.0)
    cert = InstitutionalDocumentationEngine.format_completion_certificate(mamata, 96.5)
    assert "Mamata" in cert and "96.5 GPA" in cert
    print(f"   [PASS] 2. Verified Student Certificate generated: {cert}")

def main():
    print("=" * 80)
    print("[CASE STUDY] Complete Institutional Documentation & Type Audit")
    print("=" * 80)

    run_documentation_audit()

    print("=" * 80)
    print("[TAKEAWAY] Pair rigorous PEP 257 Google-style docstrings with executable doctests")
    print("           and static typing for bulletproof enterprise codebases.")
    print("=" * 80)

if __name__ == "__main__":
    main()
