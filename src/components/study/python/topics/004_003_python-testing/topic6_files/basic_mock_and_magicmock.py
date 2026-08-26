"""
# Module: 004_003_python-testing
# Topic 6: Mocking external dependencies with unittest.mock (patch, Mock, MagicMock)
# File: basic_mock_and_magicmock.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Mock vs MagicMock, return_value, side_effect, and invocation assertions.
"""

from unittest.mock import Mock, MagicMock, call

def process_student_scholarship(calculator_service, student_id: str, marks: float) -> float:
    """Processes student scholarship using external calculator service."""
    if marks < 80.0:
        return 0.0
    return calculator_service.compute_merit_grant(student_id, marks)

def notify_student_roster(notifier_service, student_names: list[str]):
    """Sends SMS alerts using notifier service."""
    for name in student_names:
        notifier_service.send_alert(f"Welcome {name} to Barrackpore Campus!")

# ------------------------------------------------------------------------------
# TESTS
# ------------------------------------------------------------------------------
def test_mock_return_value_and_assertion():
    print("   [...] Testing Mock return_value and assert_called_once_with...")
    
    # 1. Create Mock object
    mock_calc = Mock()
    mock_calc.compute_merit_grant.return_value = 5000.0

    # 2. Invoke domain logic
    grant = process_student_scholarship(mock_calc, "STU_BP_01", marks=95.0)

    # 3. Assert outputs and invocation contract
    assert grant == 5000.0
    mock_calc.compute_merit_grant.assert_called_once_with("STU_BP_01", 95.0)
    print("   [PASS] test_mock_return_value_and_assertion (Grant Rs. 5000 verified)")

def test_mock_side_effect_exceptions():
    print("   [...] Testing Mock side_effect raising network exceptions...")
    
    mock_calc = Mock()
    mock_calc.compute_merit_grant.side_effect = TimeoutError("External Banking API timed out")

    try:
        process_student_scholarship(mock_calc, "STU_CC_02", marks=92.0)
        assert False, "Expected TimeoutError"
    except TimeoutError as e:
        assert "External Banking API timed out" in str(e)
        print("   [PASS] test_mock_side_effect_exceptions (TimeoutError intercepted cleanly)")

def test_magicmock_dunder_protocols():
    print("   [...] Testing MagicMock context manager and len dunder protocols...")
    
    # MagicMock natively supports __enter__, __exit__, __len__, __iter__
    mock_session = MagicMock()
    mock_session.__enter__.return_value = "ACTIVE_DB_CONNECTION"
    mock_session.__len__.return_value = 42

    with mock_session as conn:
        assert conn == "ACTIVE_DB_CONNECTION"
        assert len(mock_session) == 42
    
    mock_session.__enter__.assert_called_once()
    mock_session.__exit__.assert_called_once()
    print("   [PASS] test_magicmock_dunder_protocols (Dunder protocols verified)")

def test_multiple_calls_inspection():
    print("   [...] Testing call_args_list across multi-student notification...")
    
    mock_notifier = Mock()
    students = ["Mamata", "Mahima", "Abhronila"]
    notify_student_roster(mock_notifier, students)

    assert mock_notifier.send_alert.call_count == 3
    expected_calls = [
        call("Welcome Mamata to Barrackpore Campus!"),
        call("Welcome Mahima to Barrackpore Campus!"),
        call("Welcome Abhronila to Barrackpore Campus!"),
    ]
    mock_notifier.send_alert.assert_has_calls(expected_calls)
    print("   [PASS] test_multiple_calls_inspection (3 calls verified)")

def main():
    print("=" * 75)
    print("[UNITTEST.MOCK] Mock, MagicMock, return_value, side_effect & Assertions")
    print("=" * 75)

    test_mock_return_value_and_assertion()
    test_mock_side_effect_exceptions()
    test_magicmock_dunder_protocols()
    test_multiple_calls_inspection()

    print("=" * 75)
    print("[TAKEAWAY] unittest.mock allows substituting external slow/flaky services")
    print("           with controllable test doubles and verifying exact call signatures.")
    print("=" * 75)

if __name__ == "__main__":
    main()
