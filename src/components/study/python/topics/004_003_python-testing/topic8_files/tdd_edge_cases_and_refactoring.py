"""
# Module: 004_003_python-testing
# Topic 8: Introduction to Test-Driven Development (TDD) workflow
# File: tdd_edge_cases_and_refactoring.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating writing edge case test specifications first and safe refactoring.
"""

def generate_student_registration_code(campus_code: str, year: int, sequence_num: int) -> str:
    """Generates standardized student registration ID string e.g. 'BP-2026-0042'."""
    if not campus_code or len(campus_code.strip()) != 2:
        raise ValueError(f"Campus code must be exactly 2 characters (e.g. 'BP', 'CC').")
    if year < 2020 or year > 2099:
        raise ValueError(f"Invalid academic year: {year}")
    if sequence_num <= 0 or sequence_num > 9999:
        raise ValueError(f"Sequence number must be between 1 and 9999.")
    
    return f"{campus_code.upper().strip()}-{year}-{sequence_num:04d}"

# ------------------------------------------------------------------------------
# TDD EDGE CASE TEST SPECIFICATIONS
# ------------------------------------------------------------------------------
def test_valid_standard_code():
    code = generate_student_registration_code("BP", 2026, 42)
    assert code == "BP-2026-0042"
    print("   [PASS] 1. Standard format formatting verified ('BP-2026-0042')")

def test_lowercase_and_whitespace_campus_trimmed():
    code = generate_student_registration_code(" ic ", 2026, 7)
    assert code == "IC-2026-0007"
    print("   [PASS] 2. Whitespace and lowercase campus normalized ('IC-2026-0007')")

def test_invalid_campus_length_raises():
    try:
        generate_student_registration_code("BARRACKPORE", 2026, 1)
        assert False, "Expected ValueError on long campus code"
    except ValueError as e:
        assert "exactly 2 characters" in str(e)
        print("   [PASS] 3. Long campus code rejected via ValueError")

def test_out_of_range_sequence_raises():
    try:
        generate_student_registration_code("CC", 2026, 10000)
        assert False, "Expected ValueError on sequence > 9999"
    except ValueError as e:
        assert "between 1 and 9999" in str(e)
        print("   [PASS] 4. Sequence number overflow rejected via ValueError")

def main():
    print("=" * 75)
    print("[TDD EDGE CASES] Test-First Boundary & Error Specification")
    print("=" * 75)

    test_valid_standard_code()
    test_lowercase_and_whitespace_campus_trimmed()
    test_invalid_campus_length_raises()
    test_out_of_range_sequence_raises()

    print("=" * 75)
    print("[TAKEAWAY] Writing edge-case tests before code guarantees robust input")
    print("           validation and eliminates boundary defect leaks.")
    print("=" * 75)

if __name__ == "__main__":
    main()
