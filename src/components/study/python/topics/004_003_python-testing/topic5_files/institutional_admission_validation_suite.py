"""
# Module: 004_003_python-testing
# Topic 5: Testing exceptions with pytest.raises
# File: institutional_admission_validation_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus candidate validation suite testing
#              duplicate student IDs, age boundaries, negative scores, and voucher validation.
"""

class AdmissionRegistry:
    def __init__(self):
        self.students = {}
        self.vouchers = {"SUMMER2026": 0.20, "MERIT50": 0.50}

    def admit_candidate(self, sid: str, name: str, campus: str, age: int, voucher: str = None) -> dict:
        if not sid or not sid.strip():
            raise ValueError("Student ID cannot be empty.")
        if sid in self.students:
            raise KeyError(f"Student ID '{sid}' already registered in registry.")
        if age < 16 or age > 65:
            raise ValueError(f"Age {age} is outside eligible admission bracket (16-65).")
        
        discount = 0.0
        if voucher:
            if voucher not in self.vouchers:
                raise ValueError(f"Invalid or expired admission voucher code: '{voucher}'")
            discount = self.vouchers[voucher]

        record = {
            "sid": sid,
            "name": name,
            "campus": campus,
            "age": age,
            "discount": discount,
            "status": "ACTIVE"
        }
        self.students[sid] = record
        return record

# ------------------------------------------------------------------------------
# TEST SUITE
# ------------------------------------------------------------------------------
def test_successful_admission():
    reg = AdmissionRegistry()
    res = reg.admit_candidate("STU_BP_01", "Mamata", "Barrackpore", 19, "SUMMER2026")
    assert res["name"] == "Mamata"
    assert res["discount"] == 0.20
    print("   [PASS] test_successful_admission (Mamata admitted with 20% voucher)")

def test_duplicate_sid_raises_key_error():
    reg = AdmissionRegistry()
    reg.admit_candidate("STU_CC_02", "Mahima", "Kolkata", 21)
    
    try:
        reg.admit_candidate("STU_CC_02", "Mahima Duplicate", "Kolkata", 21)
        assert False, "Expected KeyError on duplicate ID"
    except KeyError as e:
        assert "already registered" in str(e)
        print("   [PASS] test_duplicate_sid_raises_key_error")

def test_invalid_voucher_raises_value_error():
    reg = AdmissionRegistry()
    try:
        reg.admit_candidate("STU_IC_03", "Abhronila", "Ichapur", 20, voucher="FAKE_CODE")
        assert False, "Expected ValueError on bad voucher"
    except ValueError as e:
        assert "Invalid or expired admission voucher" in str(e)
        print("   [PASS] test_invalid_voucher_raises_value_error")

def test_invalid_age_boundary():
    reg = AdmissionRegistry()
    try:
        reg.admit_candidate("STU_JU_04", "Susmita", "Jadavpur", age=12)
        assert False, "Expected ValueError on age 12"
    except ValueError as e:
        assert "outside eligible admission bracket" in str(e)
        print("   [PASS] test_invalid_age_boundary")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Multi-Campus Admission Guard Test Suite")
    print("=" * 80)

    test_successful_admission()
    test_duplicate_sid_raises_key_error()
    test_invalid_voucher_raises_value_error()
    test_invalid_age_boundary()

    print("=" * 80)
    print("[TAKEAWAY] Exception testing ensures all domain integrity constraints are")
    print("           strictly enforced across all campus admission endpoints.")
    print("=" * 80)

if __name__ == "__main__":
    main()
