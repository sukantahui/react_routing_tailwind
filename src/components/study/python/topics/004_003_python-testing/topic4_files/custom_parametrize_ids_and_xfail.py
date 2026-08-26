"""
# Module: 004_003_python-testing
# Topic 4: Parametrized tests with @pytest.mark.parametrize
# File: custom_parametrize_ids_and_xfail.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating custom test IDs and individual row metadata with pytest.param().
"""

def parse_student_token(token: str) -> dict:
    """Parses student admission token e.g. 'BP-2026-STU01'."""
    parts = token.split("-")
    if len(parts) != 3:
        raise ValueError(f"Invalid token format: {token}")
    return {
        "campus_code": parts[0],
        "year": int(parts[1]),
        "student_id": parts[2]
    }

# ------------------------------------------------------------------------------
# SIMULATED PYTEST.PARAM DATA WITH CUSTOM IDS AND XFAIL MARKERS
# ------------------------------------------------------------------------------
PARAMETRIZED_ROWS = [
    {
        "id": "valid_barrackpore_2026",
        "token": "BP-2026-MAMATA01",
        "expected": {"campus_code": "BP", "year": 2026, "student_id": "MAMATA01"},
        "is_xfail": False
    },
    {
        "id": "valid_kolkata_2026",
        "token": "CC-2026-MAHIMA02",
        "expected": {"campus_code": "CC", "year": 2026, "student_id": "MAHIMA02"},
        "is_xfail": False
    },
    {
        "id": "valid_ichapur_2026",
        "token": "IC-2026-ABHRONILA03",
        "expected": {"campus_code": "IC", "year": 2026, "student_id": "ABHRONILA03"},
        "is_xfail": False
    },
    {
        "id": "legacy_two_part_token_known_bug",
        "token": "BP-MAMATA01", # Missing year component (Expected failure!)
        "expected": None,
        "is_xfail": True
    }
]

def run_custom_ids_and_xfail_tests():
    print("\n[...] Executing Parametrized Test Suite with Custom IDs & xfail rows:")
    
    for row in PARAMETRIZED_ROWS:
        test_id = row["id"]
        token = row["token"]
        is_xfail = row["is_xfail"]
        
        if is_xfail:
            try:
                parse_student_token(token)
                print(f"   [XPASS] Test [{test_id}] passed unexpectedly!")
            except ValueError:
                print(f"   [XFAIL] Test [{test_id}] failed as expected (Handled gracefully)")
        else:
            actual = parse_student_token(token)
            assert actual == row["expected"]
            print(f"   [PASS]  Test [{test_id:<32}] -> {actual}")

def main():
    print("=" * 75)
    print("[PYTEST PARAM] Custom Test IDs & pytest.param(marks=pytest.mark.xfail)")
    print("=" * 75)

    run_custom_ids_and_xfail_tests()

    print("=" * 75)
    print("[TAKEAWAY] pytest.param() attaches individual IDs and markers to specific rows,")
    print("           making test output crystal clear and tracking known defects safely.")
    print("=" * 75)

if __name__ == "__main__":
    main()
