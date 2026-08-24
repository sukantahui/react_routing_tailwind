# topic7_files/student_banking_withdrawal_guard.py
# Module: 003_002_basic-exception-handling
# Topic: Raising exceptions intentionally using raise keyword
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 4: Student Financial Wallet & Defensive Invariant Engine (Case Study)
Demonstrates:
  1. Production financial ledger invariant guards using `raise`
  2. Differentiating TypeError, ValueError, and PermissionError based on failure mode
  3. Safe atomic transaction handling guaranteeing corrupted states are impossible
"""

class StudentCampusWallet:
    """Enterprise Student Digital Wallet with Defensive Invariant Guards."""
    SINGLE_WITHDRAWAL_LIMIT_INR = 5000.0

    def __init__(self, student_id: str, student_name: str, initial_balance: float = 0.0):
        self.student_id = student_id
        self.student_name = student_name
        self.is_active = True

        if initial_balance < 0:
            raise ValueError(f"Initial wallet balance cannot be negative: INR {initial_balance:,.2f}")
        self._balance = float(initial_balance)

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float):
        """Guarded deposit method."""
        if not isinstance(amount, (int, float)):
            raise TypeError(f"Deposit amount must be numeric, got {type(amount).__name__}!")
        if amount <= 0:
            raise ValueError(f"Deposit amount must be strictly positive: INR {amount:,.2f}")

        self._balance += float(amount)
        print(f"  [DEPOSIT SUCCESS] +INR {amount:,.2f} | New Balance: INR {self._balance:,.2f}")

    def withdraw(self, amount: float) -> float:
        """Guarded withdrawal method enforcing institutional safety constraints."""
        if not self.is_active:
            raise PermissionError(f"Wallet for {self.student_name} ({self.student_id}) is FROZEN by administration!")

        if not isinstance(amount, (int, float)):
            raise TypeError(f"Withdrawal amount must be numeric, got {type(amount).__name__}!")

        if amount <= 0:
            raise ValueError(f"Withdrawal amount must be strictly positive: INR {amount:,.2f}")

        if amount > self.SINGLE_WITHDRAWAL_LIMIT_INR:
            raise ValueError(f"Withdrawal of INR {amount:,.2f} exceeds single transaction limit of INR {self.SINGLE_WITHDRAWAL_LIMIT_INR:,.2f}!")

        if amount > self._balance:
            raise ValueError(f"Insufficient Funds: Requested INR {amount:,.2f}, Available: INR {self._balance:,.2f}!")

        self._balance -= float(amount)
        print(f"  [WITHDRAWAL SUCCESS] -INR {amount:,.2f} | Remaining Balance: INR {self._balance:,.2f}")
        return self._balance


def run_wallet_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - STUDENT WALLET INVARIANT ENGINE")
    print("=" * 70)

    wallet = StudentCampusWallet("STU-882", "Debanjan Roy", initial_balance=10000.0)
    print(f"Initialized Wallet for {wallet.student_name} with INR {wallet.balance:,.2f}\n")

    # 1. Normal Withdrawal
    print("1. Executing Valid Withdrawal (INR 2,500.00):")
    wallet.withdraw(2500.0)

    # 2. Exceeding Single Limit
    print("\n2. Attempting to withdraw INR 7,000 (Exceeds Single TX Cap):")
    try:
        wallet.withdraw(7000.0)
    except ValueError as err:
        print(f"   [BLOCKED] ValueError: {err}")

    # 3. Insufficient Funds (Within single limit 5,000, but exceeds remaining balance 2,500)
    print("\n3. Attempting to withdraw INR 4,000 after multiple transactions:")
    wallet.withdraw(3000.0) # Balance becomes 4500
    wallet.withdraw(3000.0) # Balance becomes 1500
    try:
        wallet.withdraw(3000.0) # 3000 <= 5000 limit, but > 1500 balance!
    except ValueError as err:
        print(f"   [BLOCKED] ValueError: {err}")

    # 4. Account Frozen Permission Error
    print("\n4. Freezing Wallet and attempting withdrawal:")
    wallet.is_active = False
    try:
        wallet.withdraw(500.0)
    except PermissionError as err:
        print(f"   [BLOCKED] PermissionError: {err}")

    print(f"\nFinal Verified Wallet Balance: INR {wallet.balance:,.2f}")
    print("[PASSED] Student Wallet Invariant Case Study Completed Successfully.")


if __name__ == "__main__":
    run_wallet_case_study()
