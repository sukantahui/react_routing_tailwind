"""
# Module: 004_003_python-testing
# Topic 5: Testing exceptions with pytest.raises
# File: basic_pytest_raises_context.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating basic pytest.raises context manager exception validation.
"""

def register_candidate(name: str, campus: str, age: int, initial_deposit: float):
    if not name or not name.strip():
        raise ValueError("Candidate name cannot be empty.")
    if campus.lower() not in ("barrackpore", "kolkata", "ichapur", "jadavpur"):
        raise ValueError(f"Invalid regional campus: '{campus}'")
    if age < 16:
        raise ValueError(f"Candidate age {age} is below the minimum requirement of 16 years.")
    if initial_deposit < 2000.0:
        raise ValueError(f"Initial deposit Rs. {initial_deposit} is below minimum requirement of Rs. 2,000.")
    return {"name": name, "campus": campus, "status": "REGISTERED"}

# ------------------------------------------------------------------------------
# SIMULATED PYTEST.RAISES EXCEPTION TESTING
# ------------------------------------------------------------------------------
def test_empty_name_raises_value_error():
    print("   [...] Testing empty name validation contract...")
    try:
        register_candidate("", "Barrackpore", 18, 5000.0)
        assert False, "Expected ValueError on empty name"
    except ValueError as e:
        assert "name cannot be empty" in str(e).lower()
        print("   [PASS] test_empty_name_raises_value_error")

def test_invalid_campus_raises_value_error():
    print("   [...] Testing invalid campus validation contract...")
    try:
        register_candidate("Mamata", "UnknownCity", 18, 5000.0)
        assert False, "Expected ValueError on invalid campus"
    except ValueError as e:
        assert "invalid regional campus" in str(e).lower()
        print("   [PASS] test_invalid_campus_raises_value_error")

def test_underage_candidate_raises_value_error():
    print("   [...] Testing minimum age limit (Age 14 < 16)...")
    try:
        register_candidate("Debangshu", "Kolkata", 14, 5000.0)
        assert False, "Expected ValueError on underage candidate"
    except ValueError as e:
        assert "below the minimum requirement" in str(e).lower()
        print("   [PASS] test_underage_candidate_raises_value_error")

def test_insufficient_deposit_raises_value_error():
    print("   [...] Testing insufficient deposit (Rs. 1000 < Rs. 2000)...")
    try:
        register_candidate("Mahima", "Ichapur", 20, 1000.0)
        assert False, "Expected ValueError on low deposit"
    except ValueError as e:
        assert "below minimum requirement" in str(e).lower()
        print("   [PASS] test_insufficient_deposit_raises_value_error")

def main():
    print("=" * 75)
    print("[PYTEST.RAISES] Basic Exception Context & Negative Testing")
    print("=" * 75)

    test_empty_name_raises_value_error()
    test_invalid_campus_raises_value_error()
    test_underage_candidate_raises_value_error()
    test_insufficient_deposit_raises_value_error()

    print("=" * 75)
    print("[TAKEAWAY] Negative testing with pytest.raises proves that systems reject")
    print("           malformed inputs defensively before invalid state corrupts data.")
    print("=" * 75)

if __name__ == "__main__":
    main()
