"""
# Module: 004_003_python-testing
# Topic 0: Why automated testing is mandatory for professional software
# File: assertion_contract_verification.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating the AAA (Arrange, Act, Assert) pattern, boundary
#              testing, and contract invariant verification in Python.
"""

class StudentAccount:
    """Represents a student tuition fee balance ledger."""
    def __init__(self, student_id: str, name: str, campus: str, initial_balance: float = 0.0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        self.student_id = student_id
        self.name = name
        self.campus = campus
        self.balance = float(initial_balance)
        self.transactions = []

    def deposit(self, amount: float):
        """Deposits tuition payment."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        self.transactions.append(("DEPOSIT", amount))
        return self.balance

    def charge_fee(self, amount: float):
        """Charges course fee."""
        if amount <= 0:
            raise ValueError("Charge amount must be positive.")
        self.balance -= amount
        self.transactions.append(("CHARGE", amount))
        return self.balance

# ------------------------------------------------------------------------------
# AAA (ARRANGE, ACT, ASSERT) TEST CONTRACTS
# ------------------------------------------------------------------------------

def test_student_account_initialization():
    """Test 1: Verifying account creation and initial state."""
    # [ARRANGE] Setup test fixtures
    sid = "STU_BP_001"
    name = "Mamata"
    campus = "Barrackpore"
    init_bal = 1000.0

    # [ACT] Execute target constructor
    account = StudentAccount(sid, name, campus, init_bal)

    # [ASSERT] Verify post-conditions
    assert account.student_id == sid, "Student ID mismatch"
    assert account.name == name, "Student name mismatch"
    assert account.campus == campus, "Campus mismatch"
    assert account.balance == 1000.0, "Balance initialization failed"
    assert len(account.transactions) == 0, "Transactions should start empty"
    print("   [PASS] test_student_account_initialization")

def test_deposit_and_charge_lifecycle():
    """Test 2: Verifying balance mutations and transaction logs."""
    # [ARRANGE]
    account = StudentAccount("STU_CC_002", "Mahima", "Kolkata", 5000.0)

    # [ACT] Perform operations
    account.charge_fee(2000.0)  # Balance: 3000.0
    account.deposit(1500.0)     # Balance: 4500.0

    # [ASSERT]
    assert account.balance == 4500.0, f"Expected 4500.0, but got {account.balance}"
    assert len(account.transactions) == 2, "Expected exactly 2 transaction entries"
    assert account.transactions[0] == ("CHARGE", 2000.0), "First transaction log invalid"
    assert account.transactions[1] == ("DEPOSIT", 1500.0), "Second transaction log invalid"
    print("   [PASS] test_deposit_and_charge_lifecycle")

def test_negative_deposit_raises_exception():
    """Test 3: Verifying negative deposit raises ValueError."""
    # [ARRANGE]
    account = StudentAccount("STU_IC_003", "Abhronila", "Ichapur", 2000.0)
    exception_caught = False

    # [ACT & ASSERT]
    try:
        account.deposit(-500.0)
    except ValueError as e:
        exception_caught = True
        assert "must be positive" in str(e).lower()

    assert exception_caught, "Expected ValueError when depositing negative amount!"
    assert account.balance == 2000.0, "Balance should not change on failed deposit"
    print("   [PASS] test_negative_deposit_raises_exception")

def main():
    print("=" * 75)
    print("[CONTRACT VERIFICATION] AAA Pattern (Arrange, Act, Assert) Test Suite")
    print("=" * 75)

    test_student_account_initialization()
    test_deposit_and_charge_lifecycle()
    test_negative_deposit_raises_exception()

    print("=" * 75)
    print("[TAKEAWAY] The AAA pattern structures tests into predictable, readable,")
    print("           and maintainable contracts that guard business invariants.")
    print("=" * 75)

if __name__ == "__main__":
    main()
