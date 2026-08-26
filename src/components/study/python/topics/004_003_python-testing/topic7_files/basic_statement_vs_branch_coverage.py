"""
# Module: 004_003_python-testing
# Topic 7: Measuring Code Coverage with coverage.py / pytest-cov
# File: basic_statement_vs_branch_coverage.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating statement (line) coverage vs branch coverage
#              and exposing hidden logic flaws in partial branch execution.
"""

def evaluate_scholarship_tier(score: float, is_economically_weak: bool) -> float:
    """Calculates scholarship percentage.
    
    Branch 1: score >= 90 (True branch / False branch)
    Branch 2: is_economically_weak (True branch / False branch)
    """
    discount = 0.0
    
    # Branch 1
    if score >= 90.0:
        discount += 0.20  # 20% merit
    elif score >= 80.0:
        discount += 0.10  # 10% merit
    
    # Branch 2
    if is_economically_weak:
        discount += 0.15  # 15% need-based grant
        
    return min(0.35, discount)

# ------------------------------------------------------------------------------
# TESTS
# ------------------------------------------------------------------------------
def test_partial_branch_coverage():
    print("   [...] Running Test 1 (High Score + EWS)...")
    # Score 95 + EWS=True executes Lines 16, 17, 22, 23, 25 (100% Line Coverage!)
    # BUT completely misses score < 90 False branch and score in [80, 90) branch!
    res = evaluate_scholarship_tier(95.0, is_economically_weak=True)
    assert res == 0.35
    print("   [PASS] Test 1: Achieves high line coverage BUT misses critical branches!")

def test_full_branch_coverage():
    print("   [...] Running Comprehensive Branch Coverage Suite...")
    
    # 1. Score >= 90 + No EWS (True branch 1, False branch 2)
    assert evaluate_scholarship_tier(95.0, False) == 0.20
    
    # 2. 80 <= Score < 90 + EWS (Elif branch 1, True branch 2)
    assert evaluate_scholarship_tier(85.0, True) == 0.25
    
    # 3. Score < 80 + EWS (False branch 1, True branch 2)
    assert evaluate_scholarship_tier(70.0, True) == 0.15
    
    # 4. Score < 80 + No EWS (False branch 1, False branch 2)
    assert evaluate_scholarship_tier(60.0, False) == 0.0
    
    print("   [PASS] Full Branch Suite: 100% Statements + 100% Branches Traversed!")

def main():
    print("=" * 75)
    print("[CODE COVERAGE] Statement Coverage vs Branch Decision Coverage")
    print("=" * 75)

    test_partial_branch_coverage()
    test_full_branch_coverage()

    print("=" * 75)
    print("[TAKEAWAY] Branch coverage (--cov-branch) ensures all True/False decisions")
    print("           are tested, exposing edge cases that line coverage overlooks.")
    print("=" * 75)

if __name__ == "__main__":
    main()
