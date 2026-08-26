"""
# Module: 004_003_python-testing
# Topic 0: Why automated testing is mandatory for professional software
# File: manual_testing_fragility.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating the extreme fragility of manual print() debugging
#              versus automated self-verifying test assertions.
"""

def calculate_admission_fee(base_fee: float, campus: str, is_early_bird: bool) -> float:
    """Calculates final net admission fee with regional and early bird discounts."""
    if base_fee <= 0:
        raise ValueError("Base fee must be greater than zero.")
        
    discount = 0.0
    
    # Campus specific discount
    if campus.lower() in ("barrackpore", "ichapur"):
        discount += 0.10  # 10% regional scholarship
    elif campus.lower() in ("kolkata", "jadavpur"):
        discount += 0.05  # 5% regional scholarship
        
    # Early bird discount
    if is_early_bird:
        discount += 0.05  # 5% additional early bird
        
    return base_fee * (1.0 - discount)

# ------------------------------------------------------------------------------
# APPROACH 1: THE FRAGILITY OF MANUAL PRINT() DEBUGGING
# ------------------------------------------------------------------------------
def demonstrate_manual_print_debugging():
    print("\n[MANUAL TESTING] Running print() debugging (Requires human eyes to check):")
    
    # Requires human to manually calculate in mind and visually inspect every line!
    res1 = calculate_admission_fee(10000.0, "Barrackpore", True)
    print(f"   * Test 1 (Barrackpore, Early): Result = Rs. {res1} (Expected 8500.0)")

    res2 = calculate_admission_fee(10000.0, "Kolkata", False)
    print(f"   * Test 2 (Kolkata, Normal)   : Result = Rs. {res2} (Expected 9500.0)")

    print("   [-] Flaw: If an algorithm bug produces 8600.0, the script still prints without warning!")

# ------------------------------------------------------------------------------
# APPROACH 2: AUTOMATED SELF-VERIFYING ASSERTION CONTRACTS
# ------------------------------------------------------------------------------
def run_automated_test_suite():
    print("\n[AUTOMATED TEST SUITE] Running Self-Verifying Assertion Contracts:")
    
    tests = [
        ("Barrackpore Early Bird (15% off)", 10000.0, "Barrackpore", True, 8500.0),
        ("Ichapur Regular (10% off)", 10000.0, "Ichapur", False, 9000.0),
        ("Kolkata Early Bird (10% off)", 10000.0, "Kolkata", True, 9000.0),
        ("Jadavpur Regular (5% off)", 10000.0, "Jadavpur", False, 9500.0),
        ("Other City Regular (0% off)", 10000.0, "Siliguri", False, 10000.0),
    ]
    
    passed_count = 0
    for name, fee, campus, early, expected in tests:
        actual = calculate_admission_fee(fee, campus, early)
        
        # Self-verifying contract: Raises AssertionError automatically if mismatched!
        assert actual == expected, f"FAIL: {name} | Got {actual}, Expected {expected}"
        
        print(f"   [PASS] {name:<32} -> Net Fee: Rs. {actual:,.2f}")
        passed_count += 1
        
    print(f"\n[+] Total Automated Tests Passed: {passed_count}/{len(tests)} (100% Verified)")

def main():
    print("=" * 75)
    print("[TESTING FOUNDATION] Manual Print Inspection vs Automated Test Assertions")
    print("=" * 75)

    demonstrate_manual_print_debugging()
    run_automated_test_suite()

    print("=" * 75)
    print("[TAKEAWAY] Never rely on manual 'print()' checks. Write automated assertions")
    print("           that fail loudly and immediately whenever logic breaks.")
    print("=" * 75)

if __name__ == "__main__":
    main()
