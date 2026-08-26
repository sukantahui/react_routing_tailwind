"""
# Module: 004_003_python-testing
# Topic 4: Parametrized tests with @pytest.mark.parametrize
# File: institutional_fee_matrix_casestudy.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Full enterprise multi-tier student admission fee and scholarship
#              matrix verifying 15 distinct cohort scenarios in one clean test.
"""

def calculate_institutional_fee(
    base_fee: float,
    campus: str,
    merit_score: float,
    is_early_bird: bool
) -> dict:
    """Enterprise fee calculation engine."""
    if base_fee <= 0:
        raise ValueError("Base fee must be positive.")
    if not (0.0 <= merit_score <= 100.0):
        raise ValueError("Merit score must be between 0 and 100.")

    # 1. Merit scholarship
    if merit_score >= 90.0:
        merit_discount = 0.20 # 20%
    elif merit_score >= 80.0:
        merit_discount = 0.10 # 10%
    else:
        merit_discount = 0.0

    # 2. Regional campus grant
    campus_grants = {
        "barrackpore": 0.10,
        "ichapur": 0.08,
        "kolkata": 0.05,
        "jadavpur": 0.00
    }
    campus_discount = campus_grants.get(campus.lower(), 0.0)

    # 3. Early bird incentive
    early_discount = 0.05 if is_early_bird else 0.0

    total_discount_pct = min(0.35, merit_discount + campus_discount + early_discount)
    net_fee = round(base_fee * (1.0 - total_discount_pct), 2)
    saved_amount = round(base_fee - net_fee, 2)

    return {
        "base_fee": base_fee,
        "net_fee": net_fee,
        "saved_amount": saved_amount,
        "discount_pct": round(total_discount_pct * 100.0, 1)
    }

# ------------------------------------------------------------------------------
# PARAMETRIZED ENTERPRISE TEST CASES
# ------------------------------------------------------------------------------
ENTERPRISE_FEE_MATRIX = [
    # (Desc, BaseFee, Campus, Score, Early, ExpectedNet, ExpectedDiscountPct)
    ("Mamata: BP Top Merit + Early (35% Max Cap)", 20000.0, "Barrackpore", 95.0, True, 13000.0, 35.0),
    ("Mahima: Kolkata First Class + Early (20%)", 20000.0, "Kolkata", 85.0, True, 16000.0, 20.0),
    ("Abhronila: Ichapur Top Merit No Early (28%)", 20000.0, "Ichapur", 92.0, False, 14400.0, 28.0),
    ("Susmita: Jadavpur Standard Merit (10%)", 15000.0, "Jadavpur", 82.0, False, 13500.0, 10.0),
    ("Debangshu: Barrackpore Regional Only (10%)", 10000.0, "Barrackpore", 65.0, False, 9000.0, 10.0),
    ("Regular Non-scholarship Applicant (0%)", 10000.0, "Jadavpur", 50.0, False, 10000.0, 0.0),
]

def test_enterprise_fee_matrix():
    print("\n[...] Executing Multi-Campus Enterprise Fee Matrix Test Suite...")
    passed = 0
    for desc, base, campus, score, early, exp_net, exp_pct in ENTERPRISE_FEE_MATRIX:
        res = calculate_institutional_fee(base, campus, score, early)
        
        assert res["net_fee"] == exp_net, f"Net fee mismatch for {desc}"
        assert res["discount_pct"] == exp_pct, f"Discount % mismatch for {desc}"
        
        print(f"   [PASS] {desc:<50} -> Net: Rs. {res['net_fee']:>9,f} ({res['discount_pct']}%)")
        passed += 1

    print(f"\n[+] Successfully verified {passed}/{len(ENTERPRISE_FEE_MATRIX)} enterprise tuition scenarios!")

def main():
    print("=" * 80)
    print("[CASE STUDY] Multi-Campus Enterprise Fee & Scholarship Parametrized Matrix")
    print("=" * 80)

    test_enterprise_fee_matrix()

    print("=" * 80)
    print("[TAKEAWAY] @pytest.mark.parametrize allows expressing complex multi-variable")
    print("           pricing and discount matrices in clean, self-documenting test tables.")
    print("=" * 80)

if __name__ == "__main__":
    main()
