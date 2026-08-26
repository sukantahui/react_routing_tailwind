"""
# Module: 004_003_python-testing
# Topic 3: Modern testing with PyTest: test discovery, assert statements, fixtures
# File: pytest_assert_rewriting_and_discovery.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating modern PyTest standalone functions and AST assert rewriting.
"""

def calculate_net_tuition(base_fee: float, scholarship_pct: float) -> float:
    if not (0.0 <= scholarship_pct <= 1.0):
        raise ValueError("Scholarship percentage must be between 0.0 and 1.0.")
    return base_fee * (1.0 - scholarship_pct)

def get_student_metadata(sid: str, name: str, campus: str) -> dict:
    return {
        "sid": sid,
        "name": name,
        "campus": campus,
        "active": True
    }

# ------------------------------------------------------------------------------
# PYTEST STANDALONE FUNCTIONS (Zero OOP Boilerplate!)
# ------------------------------------------------------------------------------
def test_calculate_net_tuition_regular():
    """Standard test function with plain assert statement."""
    net = calculate_net_tuition(10000.0, 0.15)
    # Plain Python assert statement (PyTest rewrites AST to provide detailed diffs!)
    assert net == 8500.0
    print("   [PASS] test_calculate_net_tuition_regular (8500.0 verified)")

def test_calculate_net_tuition_full_waiver():
    net = calculate_net_tuition(15000.0, 1.0)
    assert net == 0.0
    print("   [PASS] test_calculate_net_tuition_full_waiver (0.0 verified)")

def test_student_metadata_dict_comparison():
    meta = get_student_metadata("STU_BP_001", "Mamata", "Barrackpore")
    # PyTest compares nested dictionaries and highlights missing keys on failure
    assert meta == {
        "sid": "STU_BP_001",
        "name": "Mamata",
        "campus": "Barrackpore",
        "active": True
    }
    assert meta["campus"] in ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"]
    print("   [PASS] test_student_metadata_dict_comparison (Dict verified)")

def main():
    print("=" * 75)
    print("[PYTEST DISCOVERY & ASSERT REWRITING] Standalone Test Functions")
    print("=" * 75)

    test_calculate_net_tuition_regular()
    test_calculate_net_tuition_full_waiver()
    test_student_metadata_dict_comparison()

    print("=" * 75)
    print("[TAKEAWAY] PyTest eliminates OOP class boilerplate and uses standard 'assert'")
    print("           with automatic AST rewriting for detailed failure diffs.")
    print("=" * 75)

if __name__ == "__main__":
    main()
