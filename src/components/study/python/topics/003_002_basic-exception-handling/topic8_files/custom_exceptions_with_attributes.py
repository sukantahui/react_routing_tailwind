# topic8_files/custom_exceptions_with_attributes.py
# Module: 003_002_basic-exception-handling
# Topic: Creating User-Defined Custom Exception Classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 2: Custom Exceptions with Rich Contextual Metadata
Demonstrates:
  1. Overriding `__init__()` in custom exceptions to store forensic payload attributes
  2. Calling `super().__init__(formatted_message)` to preserve standard string rendering
  3. Exporting structured JSON / dictionary payloads (`to_dict()`) for HTTP APIs and logs
"""

import datetime as dt
from typing import Dict, Any

class InsufficientTuitionFundsError(Exception):
    """Rich domain exception carrying complete financial audit details."""

    def __init__(self, student_id: str, student_name: str, requested_amount: float, current_balance: float):
        self.student_id = student_id
        self.student_name = student_name
        self.requested_amount = float(requested_amount)
        self.current_balance = float(current_balance)
        self.deficit = self.requested_amount - self.current_balance
        self.timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Construct clear formatted error message for standard traceback:
        message = (
            f"Student {self.student_name} ({self.student_id}) has insufficient funds for fee installment. "
            f"Required: INR {self.requested_amount:,.2f}, Available: INR {self.current_balance:,.2f} "
            f"(Deficit: INR {self.deficit:,.2f})"
        )
        super().__init__(message)

    def to_api_payload(self) -> Dict[str, Any]:
        """Serializes error to structured dictionary for REST API JSON responses."""
        return {
            "error_code": "TUITION_FUNDS_INSUFFICIENT",
            "student_id": self.student_id,
            "student_name": self.student_name,
            "required_inr": self.requested_amount,
            "available_inr": self.current_balance,
            "deficit_inr": self.deficit,
            "timestamp": self.timestamp,
            "support_contact": "finance@codernaccotax.co.in"
        }


def process_semester_fee(student_id: str, student_name: str, installment_fee: float, wallet_balance: float):
    if installment_fee > wallet_balance:
        raise InsufficientTuitionFundsError(student_id, student_name, installment_fee, wallet_balance)
    print(f"  [PAYMENT APPROVED] INR {installment_fee:,.2f} charged to {student_name}'s account.")


def demonstrate_rich_exceptions():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM EXCEPTIONS WITH RICH METADATA")
    print("=" * 70)

    # 1. Successful payment
    print("1. Processing Valid Fee Payment:")
    process_semester_fee("STU-550", "Debolina Roy", 15000.0, 20000.0)

    # 2. Triggering Rich Context Exception
    print("\n2. Processing Payment with Insufficient Balance:")
    try:
        process_semester_fee("STU-551", "Arijit Sen", 25000.0, 18000.0)
    except InsufficientTuitionFundsError as err:
        print(f"\n[STANDARD STR(ERR)]:\n  {err}\n")
        print("[EXTRACTED CONTEXTUAL ATTRIBUTES]:")
        print(f"  * Student ID       : {err.student_id}")
        print(f"  * Deficit Amount   : INR {err.deficit:,.2f}")
        print(f"  * Event Timestamp  : {err.timestamp}\n")

        print("[STRUCTURED REST API JSON PAYLOAD]:")
        print(f"  {err.to_api_payload()}")

    print("\n[PASSED] Custom Exceptions with Rich Metadata Verified.")


if __name__ == "__main__":
    demonstrate_rich_exceptions()
