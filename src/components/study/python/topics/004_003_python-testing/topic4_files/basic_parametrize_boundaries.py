"""
# Module: 004_003_python-testing
# Topic 4: Parametrized tests with @pytest.mark.parametrize
# File: basic_parametrize_boundaries.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating multi-argument @pytest.mark.parametrize on grade boundaries.
"""

def evaluate_academic_tier(score: float) -> str:
    """Evaluates student score against strict academic tiers."""
    if not (0.0 <= score <= 100.0):
        raise ValueError("Score must be between 0 and 100.")
    if score >= 90.0:
        return "DISTINCTION_A_PLUS"
    elif score >= 80.0:
        return "FIRST_CLASS_A"
    elif score >= 60.0:
        return "SECOND_CLASS_B"
    elif score >= 40.0:
        return "PASS_CLASS_C"
    return "FAILED_F"

# ------------------------------------------------------------------------------
# SIMULATED PARAMETRIZED TEST RUNNER
# ------------------------------------------------------------------------------
PARAMETRIZED_CASES = [
    # (Student, Score, Expected Tier)
    ("Mamata", 98.5, "DISTINCTION_A_PLUS"),
    ("Mahima (Exact 90.0 Boundary)", 90.0, "DISTINCTION_A_PLUS"),
    ("Abhronila (89.9 Sub-boundary)", 89.9, "FIRST_CLASS_A"),
    ("Susmita (Exact 80.0 Boundary)", 80.0, "FIRST_CLASS_A"),
    ("Debangshu (Exact 40.0 Pass Boundary)", 40.0, "PASS_CLASS_C"),
    ("Failing Edge Case (39.9)", 39.9, "FAILED_F"),
    ("Zero Score Edge Case", 0.0, "FAILED_F"),
    ("Perfect Score Edge Case", 100.0, "DISTINCTION_A_PLUS"),
]

def test_academic_tier_parametrized():
    print("\n[...] Running 8 Parameterized Test Variations...")
    passed = 0
    for name, score, expected in PARAMETRIZED_CASES:
        actual = evaluate_academic_tier(score)
        assert actual == expected, f"Failed for {name}: expected {expected}, got {actual}"
        print(f"   [PASS] {name:<42} (Score {score:>5.1f}) -> {actual}")
        passed += 1
    print(f"\n[+] Total {passed}/{len(PARAMETRIZED_CASES)} Parameterized Tests Passed!")

def main():
    print("=" * 75)
    print("[PYTEST PARAMETRIZE] Multi-Argument Boundary Verification")
    print("=" * 75)

    test_academic_tier_parametrized()

    print("=" * 75)
    print("[TAKEAWAY] @pytest.mark.parametrize maps input-output vectors into single clean")
    print("           test functions, verifying extensive boundary tables with zero boilerplate.")
    print("=" * 75)

if __name__ == "__main__":
    main()
