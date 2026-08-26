"""
# Module: 004_003_python-testing
# Topic 5: Testing exceptions with pytest.raises
# File: exception_message_regex_matching.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating regular expression error message matching and
#              ExceptionInfo attribute inspection.
"""

import re

def issue_course_certificate(student_id: str, marks_pct: float, attendance_pct: float) -> str:
    """Issues certificate or raises specific formatted exception."""
    if marks_pct < 50.0:
        raise ValueError(f"CERT_FAIL_401: Score {marks_pct:.1f}% is below passing mark 50.0%")
    if attendance_pct < 75.0:
        raise ValueError(f"CERT_FAIL_402: Attendance {attendance_pct:.1f}% is below required 75.0%")
    return f"CERT_SUCCESS_{student_id}"

# ------------------------------------------------------------------------------
# SIMULATED REGEX MATCHING & ATTRIBUTE INSPECTION
# ------------------------------------------------------------------------------
def test_certificate_low_score_regex_matching():
    print("   [...] Testing regex message matching on low score (CERT_FAIL_401)...")
    expected_pattern = r"^CERT_FAIL_401: Score 42\.5% is below passing.*"
    
    try:
        issue_course_certificate("STU_BP_01", marks_pct=42.5, attendance_pct=90.0)
        assert False, "Expected ValueError"
    except ValueError as e:
        msg = str(e)
        assert re.search(expected_pattern, msg), f"Message '{msg}' did not match regex '{expected_pattern}'"
        print(f"   [PASS] test_certificate_low_score_regex_matching -> Matched '{msg}'")

def test_certificate_low_attendance_regex_matching():
    print("   [...] Testing regex message matching on low attendance (CERT_FAIL_402)...")
    expected_pattern = r"^CERT_FAIL_402: Attendance 68\.0% is below required 75\.0%"
    
    try:
        issue_course_certificate("STU_CC_02", marks_pct=95.0, attendance_pct=68.0)
        assert False, "Expected ValueError"
    except ValueError as e:
        msg = str(e)
        assert re.search(expected_pattern, msg)
        print(f"   [PASS] test_certificate_low_attendance_regex_matching -> Matched '{msg}'")

def main():
    print("=" * 75)
    print("[PYTEST MATCH] Error Message Regex Verification (match=r'...')")
    print("=" * 75)

    test_certificate_low_score_regex_matching()
    test_certificate_low_attendance_regex_matching()

    print("=" * 75)
    print("[TAKEAWAY] Using pytest.raises(Exception, match=r'...') asserts both the")
    print("           exact error type and ensures the error message contains the expected cause.")
    print("=" * 75)

if __name__ == "__main__":
    main()
