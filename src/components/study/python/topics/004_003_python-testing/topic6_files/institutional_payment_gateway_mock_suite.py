"""
# Module: 004_003_python-testing
# Topic 6: Mocking external dependencies with unittest.mock (patch, Mock, MagicMock)
# File: institutional_payment_gateway_mock_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Production-grade multi-campus institutional payment orchestration suite
#              mocking external banking gateways, SMS dispatchers, and audit loggers.
"""

from unittest.mock import Mock, patch, call

class PaymentGatewayClient:
    def charge_card(self, sid: str, amount: float, token: str) -> dict:
        raise NotImplementedError("Live banking API")

class AuditLogService:
    def log_transaction(self, sid: str, status: str, txn_ref: str):
        raise NotImplementedError("Remote logging database")

class InstitutionalTuitionProcessor:
    def __init__(self, gateway: PaymentGatewayClient, auditor: AuditLogService):
        self.gateway = gateway
        self.auditor = auditor

    def pay_admission_fee(self, sid: str, name: str, campus: str, amount: float, token: str) -> dict:
        if amount <= 0:
            raise ValueError("Payment amount must be positive.")
        
        # 1. External Gateway Call
        gw_response = self.gateway.charge_card(sid, amount, token)
        
        if gw_response.get("status") != "SUCCESS":
            self.auditor.log_transaction(sid, "FAILED", gw_response.get("ref", "NO_REF"))
            raise RuntimeError(f"Payment failed: {gw_response.get('error', 'Unknown Error')}")
            
        txn_ref = gw_response["ref"]
        
        # 2. External Audit Call
        self.auditor.log_transaction(sid, "SETTLED", txn_ref)
        
        return {
            "sid": sid,
            "name": name,
            "campus": campus,
            "amount": amount,
            "status": "PAID",
            "txn_ref": txn_ref
        }

# ------------------------------------------------------------------------------
# TEST SUITE
# ------------------------------------------------------------------------------
def test_successful_tuition_payment_workflow():
    print("   [...] Testing successful payment workflow with mock gateway & auditor...")
    
    mock_gw = Mock(spec=PaymentGatewayClient)
    mock_auditor = Mock(spec=AuditLogService)
    
    mock_gw.charge_card.return_value = {
        "status": "SUCCESS",
        "ref": "BANK_TXN_BP_1001",
        "auth_code": "AUTH_9988"
    }

    processor = InstitutionalTuitionProcessor(mock_gw, mock_auditor)
    res = processor.pay_admission_fee("STU_BP_01", "Mamata", "Barrackpore", 15000.0, "TOK_CARD_777")

    assert res["status"] == "PAID"
    assert res["txn_ref"] == "BANK_TXN_BP_1001"
    
    # Assert Gateway call contract
    mock_gw.charge_card.assert_called_once_with("STU_BP_01", 15000.0, "TOK_CARD_777")
    
    # Assert Auditor call contract
    mock_auditor.log_transaction.assert_called_once_with("STU_BP_01", "SETTLED", "BANK_TXN_BP_1001")
    print("   [PASS] test_successful_tuition_payment_workflow (Mamata fee processed)")

def test_declined_tuition_payment_workflow():
    print("   [...] Testing declined payment workflow with mock gateway failure...")
    
    mock_gw = Mock(spec=PaymentGatewayClient)
    mock_auditor = Mock(spec=AuditLogService)
    
    mock_gw.charge_card.return_value = {
        "status": "DECLINED",
        "ref": "BANK_FAIL_CC_2002",
        "error": "Card limit exceeded"
    }

    processor = InstitutionalTuitionProcessor(mock_gw, mock_auditor)

    try:
        processor.pay_admission_fee("STU_CC_02", "Mahima", "Kolkata", 25000.0, "TOK_CARD_999")
        assert False, "Expected RuntimeError on declined payment"
    except RuntimeError as e:
        assert "Card limit exceeded" in str(e)
        
        # Verify auditor logged failure
        mock_auditor.log_transaction.assert_called_once_with("STU_CC_02", "FAILED", "BANK_FAIL_CC_2002")
        print("   [PASS] test_declined_tuition_payment_workflow (Mahima failure audited)")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Payment Gateway & Audit Mock Suite")
    print("=" * 80)

    test_successful_tuition_payment_workflow()
    test_declined_tuition_payment_workflow()

    print("=" * 80)
    print("[TAKEAWAY] Mocking multiple interacting dependencies allows end-to-end testing")
    print("           of complex transactional workflows without real financial transactions.")
    print("=" * 80)

if __name__ == "__main__":
    main()
