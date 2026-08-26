"""
# Module: 004_003_python-testing
# Topic 4: Parametrized tests with @pytest.mark.parametrize
# File: matrix_combinatorial_parametrize.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating stacked @pytest.mark.parametrize decorators generating
#              Cartesian Product combinatorial test matrices.
"""

def calculate_regional_course_fee(campus: str, course_tier: str) -> float:
    """Calculates final tuition fee across campus and course combinations."""
    base_fees = {
        "FOUNDATION": 5000.0,
        "PRO": 15000.0,
        "MASTER": 25000.0
    }
    
    # Campus multipliers
    campus_discounts = {
        "barrackpore": 0.15, # 15% discount
        "ichapur": 0.10,     # 10% discount
        "kolkata": 0.05,     # 5% discount
        "jadavpur": 0.00     # 0% discount
    }
    
    fee = base_fees[course_tier.upper()]
    discount = campus_discounts[campus.lower()]
    return fee * (1.0 - discount)

# ------------------------------------------------------------------------------
# SIMULATING STACKED @pytest.mark.parametrize CARTESIAN PRODUCT
# @pytest.mark.parametrize("campus", ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"])
# @pytest.mark.parametrize("tier", ["FOUNDATION", "PRO", "MASTER"])
# Generates 4 x 3 = 12 combinatorial test runs!
# ------------------------------------------------------------------------------
CAMPUSES = ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"]
TIERS = ["FOUNDATION", "PRO", "MASTER"]

def run_combinatorial_matrix_test():
    print(f"\n[...] Executing Cartesian Product Matrix ({len(CAMPUSES)} Campuses x {len(TIERS)} Tiers = {len(CAMPUSES)*len(TIERS)} Tests)...")
    
    test_count = 0
    for campus in CAMPUSES:
        for tier in TIERS:
            net_fee = calculate_regional_course_fee(campus, tier)
            
            # Assert fee is strictly positive and adheres to discount bounds
            assert net_fee > 0.0
            assert net_fee <= 25000.0
            
            print(f"   [TEST {test_count+1:>2}] Campus: {campus:<12} | Tier: {tier:<11} -> Net Fee: Rs. {net_fee:>9,f}")
            test_count += 1
            
    print(f"\n[+] Successfully executed all {test_count} Cartesian product test variations!")

def main():
    print("=" * 75)
    print("[PYTEST MATRIX] Stacked Parametrize Decorators (Cartesian Product)")
    print("=" * 75)

    run_combinatorial_matrix_test()

    print("=" * 75)
    print("[TAKEAWAY] Stacking multiple @pytest.mark.parametrize decorators automatically")
    print("           generates the complete Cartesian product of all parameter values.")
    print("=" * 75)

if __name__ == "__main__":
    main()
