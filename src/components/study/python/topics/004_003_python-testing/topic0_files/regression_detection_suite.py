"""
# Module: 004_003_python-testing
# Topic 0: Why automated testing is mandatory for professional software
# File: regression_detection_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating how automated regression tests catch silent bugs
#              introduced during code refactoring or feature additions.
"""

# ------------------------------------------------------------------------------
# 1. ORIGINAL WORKING IMPLEMENTATION
# ------------------------------------------------------------------------------
def calculate_scholarship_v1(score: float, income: float) -> float:
    """Original working scholarship rule:
       - Score >= 90: Rs. 5,000
       - Score >= 75 and Income <= 300,000: Rs. 3,000
       - Otherwise: Rs. 0
    """
    if score >= 90.0:
        return 5000.0
    elif score >= 75.0 and income <= 300000.0:
        return 3000.0
    return 0.0

# ------------------------------------------------------------------------------
# 2. BUGGY REFACTORED IMPLEMENTATION (Introduced an off-by-one boundary bug)
# ------------------------------------------------------------------------------
def calculate_scholarship_v2_buggy(score: float, income: float) -> float:
    """Developer attempted to refactor with ternary logic, but used '>' instead of '>='!"""
    if score > 90.0: # BUG: Off-by-one! Score of exactly 90.0 misses top tier!
        return 5000.0
    elif score >= 75.0 and income <= 300000.0:
        return 3000.0
    return 0.0

# ------------------------------------------------------------------------------
# 3. REGRESSION TEST RUNNER
# ------------------------------------------------------------------------------
def run_regression_suite(func, version_name: str):
    print(f"\n[...] Executing Regression Suite on '{version_name}'...")
    
    test_cases = [
        ("Mamata (Score 95.0, Top Tier)", 95.0, 500000.0, 5000.0),
        ("Mahima (Score Exactly 90.0 Boundary)", 90.0, 400000.0, 5000.0),
        ("Abhronila (Score 80.0, Low Income)", 80.0, 250000.0, 3000.0),
        ("Susmita (Score 80.0, High Income)", 80.0, 450000.0, 0.0),
        ("Debangshu (Score Exactly 75.0 Boundary)", 75.0, 280000.0, 3000.0),
        ("Sub-threshold Score (65.0)", 65.0, 100000.0, 0.0)
    ]
    
    failures = []
    for desc, score, income, expected in test_cases:
        actual = func(score, income)
        if actual != expected:
            failures.append(f"   [FAIL] {desc:<40} -> Expected {expected}, but Got {actual}")
        else:
            print(f"   [PASS] {desc:<40} -> Scholarship: Rs. {actual:,.2f}")
            
    if failures:
        print(f"\n[!] REGRESSION DETECTED IN {version_name}:")
        for f in failures:
            print(f)
        return False
    else:
        print(f"\n[+] ALL TESTS PASSED: '{version_name}' is 100% regression-free!")
        return True

def main():
    print("=" * 75)
    print("[REGRESSION TESTING] Catching Silent Refactoring Bugs Automatically")
    print("=" * 75)

    # 1. Run on original code
    run_regression_suite(calculate_scholarship_v1, "Version 1 (Original)")

    # 2. Run on refactored code (Catches Mahima's boundary regression!)
    run_regression_suite(calculate_scholarship_v2_buggy, "Version 2 (Buggy Refactor)")

    print("\n" + "=" * 75)
    print("[TAKEAWAY] Automated regression tests catch subtle boundary bugs in seconds")
    print("           before they ever reach production or affect real students.")
    print("=" * 75)

if __name__ == "__main__":
    main()
