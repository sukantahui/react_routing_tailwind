"""
# Module: 004_003_python-testing
# Topic 8: Introduction to Test-Driven Development (TDD) workflow
# File: tdd_incremental_feature_development.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating incremental baby-step feature expansion via TDD.
"""

# Story 1: Calculate basic fee
# Story 2: Add merit discount for scores >= 90
# Story 3: Add regional campus grant for Barrackpore and Ichapur

class AdmissionFeeCalculator:
    REGIONAL_GRANTS = {
        "barrackpore": 0.10,
        "ichapur": 0.08,
        "kolkata": 0.05,
        "jadavpur": 0.00
    }

    def compute_fee(self, base_fee: float, score: float = 0.0, campus: str = "jadavpur") -> float:
        if base_fee <= 0:
            raise ValueError("Base fee must be positive.")
        
        # 1. Merit discount
        merit_pct = 0.20 if score >= 90.0 else 0.0
        
        # 2. Regional grant
        regional_pct = self.REGIONAL_GRANTS.get(campus.lower(), 0.0)
        
        total_discount = min(0.35, merit_pct + regional_pct)
        return round(base_fee * (1.0 - total_discount), 2)

# ------------------------------------------------------------------------------
# TDD INCREMENTAL TEST SPECIFICATIONS
# ------------------------------------------------------------------------------
def test_story_1_basic_fee():
    calc = AdmissionFeeCalculator()
    assert calc.compute_fee(10000.0) == 10000.0
    print("   [PASS] Story 1: Basic fee without discounts (Rs. 10,000)")

def test_story_2_merit_discount():
    calc = AdmissionFeeCalculator()
    # 20% merit discount on 10,000 -> 8,000
    assert calc.compute_fee(10000.0, score=95.0) == 8000.0
    print("   [PASS] Story 2: Merit discount for score 95.0 (Rs. 8,000)")

def test_story_3_regional_grant_stacking():
    calc = AdmissionFeeCalculator()
    # Barrackpore (10%) + Merit (20%) = 30% discount on 20,000 -> Rs. 14,000
    res = calc.compute_fee(20000.0, score=92.0, campus="Barrackpore")
    assert res == 14000.0
    print("   [PASS] Story 3: Stacking merit + Barrackpore regional grant (Rs. 14,000)")

def main():
    print("=" * 75)
    print("[TDD INCREMENTAL] Baby-Step Feature Expansion from User Stories")
    print("=" * 75)

    test_story_1_basic_fee()
    test_story_2_merit_discount()
    test_story_3_regional_grant_stacking()

    print("=" * 75)
    print("[TAKEAWAY] Building features incrementally with TDD prevents scope creep")
    print("           and ensures every business requirement is covered by a test.")
    print("=" * 75)

if __name__ == "__main__":
    main()
