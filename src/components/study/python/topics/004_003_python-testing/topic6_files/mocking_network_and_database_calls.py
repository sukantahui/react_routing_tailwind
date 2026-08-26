"""
# Module: 004_003_python-testing
# Topic 6: Mocking external dependencies with unittest.mock (patch, Mock, MagicMock)
# File: mocking_network_and_database_calls.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating mocking HTTP network calls (requests.get / post)
#              and external SMS webhook endpoints.
"""

from unittest.mock import Mock, patch
import json

# Simulated external API client
class RegionalNotificationClient:
    def __init__(self, api_url: str):
        self.api_url = api_url

    def dispatch_sms(self, phone: str, message: str) -> dict:
        # In production: requests.post(self.api_url, json={"phone": phone, "msg": message})
        # For demonstration: calls network
        raise ConnectionError("Cannot reach live SMS gateway in unit tests!")

class InstitutionalAdmissionCoordinator:
    def __init__(self, notifier: RegionalNotificationClient):
        self.notifier = notifier

    def onboard_student(self, sid: str, name: str, phone: str, campus: str) -> dict:
        msg = f"Admission confirmed for {name} at {campus} Campus."
        response = self.notifier.dispatch_sms(phone, msg)
        return {
            "sid": sid,
            "name": name,
            "campus": campus,
            "sms_status": response.get("status", "FAILED")
        }

# ------------------------------------------------------------------------------
# TESTS WITH NETWORK MOCKING
# ------------------------------------------------------------------------------
def test_student_onboarding_sms_dispatch():
    print("   [...] Testing student onboarding with mocked SMS network response...")
    
    # Create mock notifier
    mock_notifier = Mock(spec=RegionalNotificationClient)
    mock_notifier.dispatch_sms.return_value = {
        "status": "DELIVERED",
        "message_id": "MSG_SMS_8877",
        "phone": "9830001111"
    }

    coordinator = InstitutionalAdmissionCoordinator(mock_notifier)
    result = coordinator.onboard_student("STU_BP_01", "Mamata", "9830001111", "Barrackpore")

    # Assert business outcomes and mock invocations
    assert result["sms_status"] == "DELIVERED"
    assert result["name"] == "Mamata"
    
    mock_notifier.dispatch_sms.assert_called_once_with(
        "9830001111",
        "Admission confirmed for Mamata at Barrackpore Campus."
    )
    print("   [PASS] test_student_onboarding_sms_dispatch (SMS delivered without network calls)")

def test_student_onboarding_network_failure_handling():
    print("   [...] Testing SMS network timeout handling...")
    
    mock_notifier = Mock(spec=RegionalNotificationClient)
    mock_notifier.dispatch_sms.side_effect = TimeoutError("SMS Gateway Connection Timed Out")

    coordinator = InstitutionalAdmissionCoordinator(mock_notifier)

    try:
        coordinator.onboard_student("STU_CC_02", "Mahima", "9830002222", "Kolkata")
        assert False, "Expected TimeoutError"
    except TimeoutError as e:
        assert "SMS Gateway Connection Timed Out" in str(e)
        print("   [PASS] test_student_onboarding_network_failure_handling (Timeout handled)")

def main():
    print("=" * 75)
    print("[UNITTEST.MOCK] Mocking External Network & Webhook Dispatches")
    print("=" * 75)

    test_student_onboarding_sms_dispatch()
    test_student_onboarding_network_failure_handling()

    print("=" * 75)
    print("[TAKEAWAY] Mocking network boundaries enables fast, deterministic tests that")
    print("           run reliably in offline CI/CD pipelines without sending real SMS.")
    print("=" * 75)

if __name__ == "__main__":
    main()
