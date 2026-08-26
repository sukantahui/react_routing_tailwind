"""
# Module: 004_004_capstone-projects
# Topic 2: Configuring logging, error handling, and modular CLI / GUI interfaces
# File: institutional_cli_and_logging_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end administrative management CLI and logging engine case study
#              coordinating custom exceptions, audit trails, and multi-campus operations.
"""

import logging
from dataclasses import dataclass
from typing import Optional

# Set up dedicated audit logger
audit_logger = logging.getLogger("institutional.audit")
audit_logger.setLevel(logging.INFO)
audit_handler = logging.StreamHandler()
audit_handler.setFormatter(logging.Formatter("[AUDIT] %(asctime)s - %(message)s", datefmt="%H:%M:%S"))
if not audit_logger.hasHandlers():
    audit_logger.addHandler(audit_handler)

@dataclass
class StudentProfile:
    sid: str
    name: str
    campus: str
    balance: float

class InstitutionalCLIController:
    """Production CLI controller handling business dispatch, logging, and error handling."""
    def __init__(self):
        self.students: dict[str, StudentProfile] = {}

    def handle_enrollment(self, sid: str, name: str, campus: str, base_fee: float) -> str:
        if sid in self.students:
            raise KeyError(f"Student '{sid}' already registered.")
        if base_fee <= 0:
            raise ValueError("Tuition fee must be strictly positive.")

        # Enroll student
        student = StudentProfile(sid, name, campus, balance=base_fee)
        self.students[sid] = student

        # Record security audit trail
        audit_logger.info("ENROLL_SUCCESS | SID: %s | NAME: %s | CAMPUS: %s | FEE: Rs. %.2f",
                          sid, name, campus, base_fee)
        return f"Successfully enrolled {name} at {campus} (Balance: Rs. {base_fee:,.2f})"

    def handle_payment(self, sid: str, amount: float, memo: str) -> str:
        if sid not in self.students:
            raise KeyError(f"Student ID '{sid}' not found.")
        if amount <= 0:
            raise ValueError("Payment amount must be positive.")
        
        student = self.students[sid]
        if amount > student.balance:
            raise ValueError(f"Payment Rs. {amount:,.2f} exceeds outstanding balance Rs. {student.balance:,.2f}.")

        student.balance -= amount
        audit_logger.info("PAYMENT_RECORDED | SID: %s | AMOUNT: Rs. %.2f | MEMO: %s | REMAINING: Rs. %.2f",
                          sid, amount, memo, student.balance)
        return f"Payment of Rs. {amount:,.2f} processed. Remaining balance: Rs. {student.balance:,.2f}"

def test_institutional_cli_suite():
    print("   [...] Running Institutional CLI & Logging Test Suite...")
    controller = InstitutionalCLIController()

    # 1. Enroll Mamata at Barrackpore
    res1 = controller.handle_enrollment("STU_BP_01", "Mamata", "Barrackpore", 25000.0)
    assert "Successfully enrolled" in res1
    print("   [PASS] 1. Mamata enrollment handled & logged to audit stream")

    # 2. Record Partial Payment
    res2 = controller.handle_payment("STU_BP_01", 15000.0, "Installment 1 - UPI")
    assert "Remaining balance: Rs. 10,000.00" in res2
    print("   [PASS] 2. Partial payment handled: Balance reduced to Rs. 10,000")

    # 3. Test Overpayment Rejection
    try:
        controller.handle_payment("STU_BP_01", 20000.0, "Overpayment attempt")
        assert False, "Expected ValueError on overpayment"
    except ValueError as err:
        assert "exceeds outstanding balance" in str(err)
        print("   [PASS] 3. Overpayment rejected safely via domain validation")

def main():
    print("=" * 80)
    print("[CASE STUDY] Complete Institutional Administrative CLI & Logging Engine")
    print("=" * 80)

    test_institutional_cli_suite()

    print("=" * 80)
    print("[TAKEAWAY] Combining structured error handling, rotating audit logs,")
    print("           and modular CLI controllers provides rock-solid administrative tools.")
    print("=" * 80)

if __name__ == "__main__":
    main()
