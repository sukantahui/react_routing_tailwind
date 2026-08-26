"""
# Module: 004_003_python-testing
# Topic 1: Types of testing: Unit testing, Integration testing, Functional testing
# File: unit_testing_pure_functions.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Level 1 of Testing Pyramid - High-speed isolated Unit Tests
#              verifying pure calculation functions in memory.
"""

def calculate_gpa(marks: list[float]) -> float:
    """Calculates weighted grade point average on a 10.0 scale."""
    if not marks:
        raise ValueError("Marks list cannot be empty.")
    for m in marks:
        if not (0.0 <= m <= 100.0):
            raise ValueError(f"Mark out of valid range (0-100): {m}")
    return round((sum(marks) / len(marks)) / 10.0, 2)

def calculate_late_fee(due_days: int, daily_rate: float = 50.0, cap: float = 1500.0) -> float:
    """Calculates late fine with maximum cap."""
    if due_days <= 0:
        return 0.0
    return min(float(due_days * daily_rate), cap)

def apply_campus_waiver(base_fee: float, campus: str) -> float:
    """Calculates net fee after campus regional waiver."""
    waivers = {
        "barrackpore": 0.15,
        "ichapur": 0.10,
        "kolkata": 0.08,
        "jadavpur": 0.05
    }
    pct = waivers.get(campus.lower(), 0.0)
    return base_fee * (1.0 - pct)

# ------------------------------------------------------------------------------
# UNIT TEST SUITE (Isolated in-memory assertions)
# ------------------------------------------------------------------------------
def test_calculate_gpa_valid():
    # Arrange
    scores = [90.0, 95.0, 85.0]
    # Act
    gpa = calculate_gpa(scores)
    # Assert
    assert gpa == 9.0, f"Expected 9.0, got {gpa}"
    print("   [PASS] test_calculate_gpa_valid (Mamata: 9.0 GPA)")

def test_calculate_gpa_empty_raises():
    try:
        calculate_gpa([])
        assert False, "Expected ValueError on empty list"
    except ValueError:
        print("   [PASS] test_calculate_gpa_empty_raises")

def test_calculate_late_fee_zero_and_capped():
    assert calculate_late_fee(0) == 0.0, "Zero days should have zero fee"
    assert calculate_late_fee(5, daily_rate=50.0) == 250.0, "5 days should be 250"
    assert calculate_late_fee(50, daily_rate=50.0, cap=1000.0) == 1000.0, "Should cap at 1000"
    print("   [PASS] test_calculate_late_fee_zero_and_capped")

def test_apply_campus_waivers():
    assert apply_campus_waiver(10000.0, "Barrackpore") == 8500.0, "Barrackpore 15% failed"
    assert apply_campus_waiver(10000.0, "Kolkata") == 9200.0, "Kolkata 8% failed"
    assert apply_campus_waiver(10000.0, "Unknown") == 10000.0, "Unknown campus should have 0% waiver"
    print("   [PASS] test_apply_campus_waivers")

def main():
    print("=" * 75)
    print("[UNIT TESTING] Level 1: Isolated In-Memory Function Verification")
    print("=" * 75)

    test_calculate_gpa_valid()
    test_calculate_gpa_empty_raises()
    test_calculate_late_fee_zero_and_capped()
    test_apply_campus_waivers()

    print("=" * 75)
    print("[TAKEAWAY] Unit tests execute in microseconds with zero external dependencies,")
    print("           pinpointing calculation defects instantly during development.")
    print("=" * 75)

if __name__ == "__main__":
    main()
