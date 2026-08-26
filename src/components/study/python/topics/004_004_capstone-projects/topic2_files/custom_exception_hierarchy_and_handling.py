"""
# Module: 004_004_capstone-projects
# Topic 2: Configuring logging, error handling, and modular CLI / GUI interfaces
# File: custom_exception_hierarchy_and_handling.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating structured domain exception hierarchies, error codes,
#              and exception chaining.
"""

from typing import Any, Optional

# ------------------------------------------------------------------------------
# 1. BASE DOMAIN EXCEPTION
# ------------------------------------------------------------------------------
class InstitutionalError(Exception):
    """Root base exception for all institutional management domain errors."""
    def __init__(self, message: str, code: str = "GENERIC_INSTITUTIONAL_ERROR", payload: Optional[dict[str, Any]] = None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.payload = payload or {}

    def to_dict(self) -> dict[str, Any]:
        return {
            "error": self.__class__.__name__,
            "code": self.code,
            "message": self.message,
            "payload": self.payload
        }

# ------------------------------------------------------------------------------
# 2. SPECIFIC SUB-EXCEPTIONS
# ------------------------------------------------------------------------------
class StudentNotFoundError(InstitutionalError):
    def __init__(self, sid: str):
        super().__init__(
            message=f"Student record with ID '{sid}' does not exist.",
            code="STUDENT_NOT_FOUND",
            payload={"sid": sid}
        )

class DuplicateEnrollmentError(InstitutionalError):
    def __init__(self, sid: str, existing_name: str):
        super().__init__(
            message=f"Student ID '{sid}' is already assigned to '{existing_name}'.",
            code="DUPLICATE_ENROLLMENT",
            payload={"sid": sid, "existing_name": existing_name}
        )

class InsufficientFundsError(InstitutionalError):
    def __init__(self, sid: str, required_amount: float, available_balance: float):
        super().__init__(
            message=f"Payment of Rs. {required_amount:,.2f} exceeds outstanding debt of Rs. {available_balance:,.2f}.",
            code="INSUFFICIENT_FUNDS",
            payload={"sid": sid, "required_amount": required_amount, "available_balance": available_balance}
        )

# ------------------------------------------------------------------------------
# 3. VERIFICATION & EXCEPTION HANDLING
# ------------------------------------------------------------------------------
def test_exception_hierarchy():
    print("   [...] Testing Domain Exception Hierarchy & Payloads...")

    # 1. Catching specific error
    try:
        raise StudentNotFoundError("STU_BP_99")
    except StudentNotFoundError as err:
        assert err.code == "STUDENT_NOT_FOUND"
        assert err.payload["sid"] == "STU_BP_99"
        print(f"   [PASS] 1. Specific Catch: [{err.code}] {err.message}")

    # 2. Polymorphic Catch using base class
    try:
        raise InsufficientFundsError("STU_BP_01", 30000.0, 10000.0)
    except InstitutionalError as base_err:
        err_dict = base_err.to_dict()
        assert err_dict["code"] == "INSUFFICIENT_FUNDS"
        assert err_dict["payload"]["required_amount"] == 30000.0
        print(f"   [PASS] 2. Base Catch: Structured JSON Payload -> {err_dict}")

def main():
    print("=" * 75)
    print("[CUSTOM EXCEPTIONS] Domain Hierarchies, Error Codes & Structured Payloads")
    print("=" * 75)

    test_exception_hierarchy()

    print("=" * 75)
    print("[TAKEAWAY] Structured domain exceptions provide clean, typed error channels")
    print("           that communicate exact failure reasons to API/CLI consumers.")
    print("=" * 75)

if __name__ == "__main__":
    main()
