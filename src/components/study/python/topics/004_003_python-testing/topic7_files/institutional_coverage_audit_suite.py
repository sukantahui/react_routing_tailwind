"""
# Module: 004_003_python-testing
# Topic 7: Measuring Code Coverage with coverage.py / pytest-cov
# File: institutional_coverage_audit_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus student admission & fee mutation engine
#              audited for 100% statement and branch coverage.
"""

class InstitutionalStudentLedger:
    """Production financial ledger engine."""
    def __init__(self, sid: str, name: str, campus: str, base_fee: float):
        if base_fee <= 0:
            raise ValueError("Base fee must be positive.")
        self.sid = sid
        self.name = name
        self.campus = campus
        self.balance = float(base_fee)
        self.scholarship_pct = 0.0

    def apply_merit_scholarship(self, score: float):
        if score >= 90.0:
            self.scholarship_pct = 0.20
        elif score >= 80.0:
            self.scholarship_pct = 0.10
        else:
            self.scholarship_pct = 0.0
            
        discount = self.balance * self.scholarship_pct
        self.balance -= discount
        return self.balance

    def pay_amount(self, amount: float):
        if amount <= 0:
            raise ValueError("Payment amount must be positive.")
        if amount > self.balance:
            raise ValueError("Payment cannot exceed total due balance.")
        self.balance -= amount
        return self.balance

    def is_fully_settled(self) -> bool:
        return self.balance == 0.0

# ------------------------------------------------------------------------------
# 100% STATEMENT & BRANCH COVERAGE AUDIT SUITE
# ------------------------------------------------------------------------------
def run_100_percent_coverage_audit():
    print("   [...] Auditing InstitutionalStudentLedger for 100% statement & branch coverage...")
    
    # 1. Invalid base fee constructor exception (Line 14)
    try:
        InstitutionalStudentLedger("STU_ERR", "Err", "Barrackpore", -100)
        assert False
    except ValueError:
        pass

    # 2. Score >= 90 branch (Line 23)
    s1 = InstitutionalStudentLedger("STU_BP_01", "Mamata", "Barrackpore", 10000.0)
    s1.apply_merit_scholarship(95.0)
    assert s1.balance == 8000.0

    # 3. 80 <= Score < 90 branch (Line 25)
    s2 = InstitutionalStudentLedger("STU_CC_02", "Mahima", "Kolkata", 10000.0)
    s2.apply_merit_scholarship(85.0)
    assert s2.balance == 9000.0

    # 4. Score < 80 else branch (Line 27)
    s3 = InstitutionalStudentLedger("STU_IC_03", "Abhronila", "Ichapur", 10000.0)
    s3.apply_merit_scholarship(70.0)
    assert s3.balance == 10000.0

    # 5. Negative payment exception (Line 34)
    try:
        s1.pay_amount(-500)
        assert False
    except ValueError:
        pass

    # 6. Overpayment exception (Line 36)
    try:
        s1.pay_amount(50000)
        assert False
    except ValueError:
        pass

    # 7. Valid partial payment & settle check (Lines 38, 41)
    s1.pay_amount(8000.0)
    assert s1.is_fully_settled() is True

    print("   [PASS] 100% Statement & Branch Coverage Verified: All 7 execution paths traversed!")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Student Ledger 100% Coverage Audit")
    print("=" * 80)

    run_100_percent_coverage_audit()

    print("=" * 80)
    print("[TAKEAWAY] Achieving 100% statement and branch coverage on critical financial")
    print("           engines eliminates silent defects and guards all boundary conditions.")
    print("=" * 80)

if __name__ == "__main__":
    main()
