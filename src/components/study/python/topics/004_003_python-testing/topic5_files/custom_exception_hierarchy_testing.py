"""
# Module: 004_003_python-testing
# Topic 5: Testing exceptions with pytest.raises
# File: custom_exception_hierarchy_testing.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating testing custom enterprise domain exception hierarchies
#              and inspecting structured exception payload attributes.
"""

# Enterprise Custom Domain Exception Hierarchy
class InstitutionalError(Exception):
    """Base domain exception."""
    pass

class AdmissionQuotaExceededError(InstitutionalError):
    """Raised when campus batch reaches maximum seating capacity."""
    def __init__(self, campus: str, batch: str, capacity: int):
        self.campus = campus
        self.batch = batch
        self.capacity = capacity
        super().__init__(f"Quota full for {campus} [{batch}]: Maximum {capacity} students reached.")

class PaymentDeclinedError(InstitutionalError):
    """Raised when tuition transaction is declined by bank."""
    def __init__(self, student_id: str, amount: float, decline_code: str):
        self.student_id = student_id
        self.amount = amount
        self.decline_code = decline_code
        super().__init__(f"Payment of Rs. {amount} declined for {student_id} (Code: {decline_code}).")

# ------------------------------------------------------------------------------
# SIMULATED DOMAIN SERVICES
# ------------------------------------------------------------------------------
def enroll_in_batch(campus: str, batch: str, current_enrolled: int, max_cap: int = 30):
    if current_enrolled >= max_cap:
        raise AdmissionQuotaExceededError(campus, batch, max_cap)
    return {"status": "SUCCESS", "campus": campus, "batch": batch}

def process_fee_charge(sid: str, amount: float, card_valid: bool):
    if not card_valid:
        raise PaymentDeclinedError(sid, amount, "BANK_ERR_INSUFFICIENT_FUNDS")
    return {"status": "PAID", "sid": sid, "amount": amount}

# ------------------------------------------------------------------------------
# TESTS WITH EXCEPTION ATTRIBUTE INSPECTION
# ------------------------------------------------------------------------------
def test_quota_exceeded_exception_payload():
    print("   [...] Testing AdmissionQuotaExceededError structured payload attributes...")
    try:
        enroll_in_batch("Barrackpore", "Python_Batch_A", current_enrolled=30, max_cap=30)
        assert False, "Expected AdmissionQuotaExceededError"
    except AdmissionQuotaExceededError as err:
        # In PyTest: exc_info.value exposes all custom attributes
        assert isinstance(err, InstitutionalError), "Should inherit from base InstitutionalError"
        assert err.campus == "Barrackpore"
        assert err.batch == "Python_Batch_A"
        assert err.capacity == 30
        assert "Maximum 30 students reached" in str(err)
        print(f"   [PASS] test_quota_exceeded_exception_payload -> Payload verified: {err.campus}, Cap: {err.capacity}")

def test_payment_declined_exception_payload():
    print("   [...] Testing PaymentDeclinedError structured payload attributes...")
    try:
        process_fee_charge("STU_MAMATA_01", 15000.0, card_valid=False)
        assert False, "Expected PaymentDeclinedError"
    except PaymentDeclinedError as err:
        assert err.student_id == "STU_MAMATA_01"
        assert err.amount == 15000.0
        assert err.decline_code == "BANK_ERR_INSUFFICIENT_FUNDS"
        print(f"   [PASS] test_payment_declined_exception_payload -> Code: {err.decline_code}")

def main():
    print("=" * 75)
    print("[CUSTOM EXCEPTIONS] Structured Payload Inspection & Inheritance Testing")
    print("=" * 75)

    test_quota_exceeded_exception_payload()
    test_payment_declined_exception_payload()

    print("=" * 75)
    print("[TAKEAWAY] Testing custom exceptions ensures that error payloads carry rich")
    print("           structured context for logging, telemetry, and API responses.")
    print("=" * 75)

if __name__ == "__main__":
    main()
