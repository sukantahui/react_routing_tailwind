"""
# Module: 004_003_python-testing
# Topic 6: Mocking external dependencies with unittest.mock (patch, Mock, MagicMock)
# File: patch_decorator_and_context_manager.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating @patch decorator and context managers adhering to
#              the golden rule: "Patch where it is used, not where defined".
"""

from unittest.mock import patch, MagicMock

# Simulated external service module
class ExternalBankingGateway:
    @staticmethod
    def transfer_tuition(student_id: str, amount: float) -> str:
        # In real life: makes live network HTTP POST call to bank!
        return "LIVE_TXN_SUCCESS"

# Domain Service under test (Depends on ExternalBankingGateway)
def process_student_enrollment_fee(student_id: str, amount: float) -> dict:
    txn_id = ExternalBankingGateway.transfer_tuition(student_id, amount)
    return {
        "student_id": student_id,
        "amount": amount,
        "txn_id": txn_id,
        "status": "ENROLLED"
    }

# ------------------------------------------------------------------------------
# TESTS USING @patch DECORATOR AND with patch() CONTEXT MANAGER
# ------------------------------------------------------------------------------

# 1. Using @patch as a Decorator
@patch.object(ExternalBankingGateway, "transfer_tuition")
def test_enrollment_with_patch_decorator(mock_transfer):
    print("   [...] Testing @patch decorator on external banking gateway...")
    
    # Configure mock return value
    mock_transfer.return_value = "MOCK_TXN_BP_9988"

    result = process_student_enrollment_fee("STU_BP_01", 12000.0)

    assert result["status"] == "ENROLLED"
    assert result["txn_id"] == "MOCK_TXN_BP_9988"
    mock_transfer.assert_called_once_with("STU_BP_01", 12000.0)
    print("   [PASS] test_enrollment_with_patch_decorator (Mocked txn verified)")

# 2. Using patch as a Context Manager
def test_enrollment_with_patch_context_manager():
    print("   [...] Testing with patch() context manager...")
    
    with patch.object(ExternalBankingGateway, "transfer_tuition") as mock_transfer:
        mock_transfer.return_value = "MOCK_TXN_CC_7766"

        result = process_student_enrollment_fee("STU_CC_02", 15000.0)
        assert result["txn_id"] == "MOCK_TXN_CC_7766"
        mock_transfer.assert_called_once_with("STU_CC_02", 15000.0)

    # Outside the 'with' block, the real method is automatically restored!
    print("   [PASS] test_enrollment_with_patch_context_manager (Scope isolation verified)")

def main():
    print("=" * 75)
    print("[UNITTEST.MOCK] @patch Decorators & Context Managers")
    print("=" * 75)

    test_enrollment_with_patch_decorator()
    test_enrollment_with_patch_context_manager()

    print("=" * 75)
    print("[TAKEAWAY] patch temporarily replaces an object during test execution and")
    print("           guarantees complete restoration when the test finishes.")
    print("=" * 75)

if __name__ == "__main__":
    main()
