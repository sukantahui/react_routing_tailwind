# topic12_files/defensive_programming_contracts.py
# Module: 003_002_basic-exception-handling
# Topic: Best practices: Fail fast, log errors, defensive programming
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 3: EAFP vs LBYL & Defensive Invariant Contracts
Demonstrates:
  1. EAFP (Easier to Ask for Forgiveness than Permission) in Python
  2. LBYL (Look Before You Leap) and the TOCTOU (Time-of-Check to Time-of-Use) Race Hazard
  3. Preconditions, Postconditions, and Class Invariants
"""

from typing import Dict, Any, Optional

# =====================================================================
# 1. EAFP VS LBYL DICTIONARY LOOKUP
# =====================================================================
def lbyl_get_student_fee(database: dict, student_id: str) -> Optional[float]:
    """LBYL: Checks existence first, then retrieves (2 lookups, slower)."""
    if student_id in database:
        return database[student_id]["fee"]
    return None


def eafp_get_student_fee(database: dict, student_id: str) -> Optional[float]:
    """EAFP (Pythonic): Directly attempts access, catches KeyError (1 lookup, faster & thread-safe)."""
    try:
        return database[student_id]["fee"]
    except KeyError:
        return None


# =====================================================================
# 2. DEFENSIVE CLASS INVARIANTS: ATOMIC STUDENT WALLET
# =====================================================================
class DefensiveStudentWallet:
    """Implements complete pre/post conditions and class invariants."""

    def __init__(self, student_id: str, initial_balance: float = 0.0):
        # Precondition
        if initial_balance < 0:
            raise ValueError(f"Initial balance cannot be negative: INR {initial_balance}")

        self.student_id = student_id
        self._balance = float(initial_balance)
        self._check_class_invariant()

    def _check_class_invariant(self):
        """Internal Invariant: Balance must NEVER be negative in memory."""
        assert self._balance >= 0.0, f"Class Invariant Broken: Balance {self._balance} < 0!"

    @property
    def balance(self) -> float:
        return self._balance

    def transfer_fee(self, amount: float):
        # 1. Preconditions
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise ValueError(f"Transfer amount must be strictly positive, got {amount}")
        if amount > self._balance:
            raise ValueError(f"Insufficient funds: Balance is INR {self._balance:,.2f}, requested INR {amount:,.2f}")

        # 2. State Mutation
        old_balance = self._balance
        self._balance -= float(amount)

        # 3. Postcondition & Class Invariant Check
        assert self._balance == old_balance - amount, "Postcondition Broken: Math arithmetic error!"
        self._check_class_invariant()

        print(f"  [TRANSFER COMPLETE] -INR {amount:,.2f} | Remaining: INR {self._balance:,.2f}")


def demonstrate_defensive_contracts():
    print("=" * 70)
    print("CODER & ACCOTAX - EAFP VS LBYL & DEFENSIVE CONTRACTS")
    print("=" * 70)

    sample_db = {"STU-101": {"name": "Sourav Mukherjee", "fee": 18000.0}}

    # 1. EAFP vs LBYL
    print("1. Comparing EAFP vs LBYL Query Performance:")
    print(f"   LBYL Result : {lbyl_get_student_fee(sample_db, 'STU-101')}")
    print(f"   EAFP Result : {eafp_get_student_fee(sample_db, 'STU-101')}\n")

    # 2. Defensive Invariant Wallet
    print("2. Executing Defensive Atomic Wallet Operations:")
    wallet = DefensiveStudentWallet("STU-101", initial_balance=25000.0)
    wallet.transfer_fee(5000.0)
    wallet.transfer_fee(10000.0)

    # 3. Triggering Precondition Guard
    print("\n3. Testing Precondition Violation (Overdraft Attempt):")
    try:
        wallet.transfer_fee(15000.0) # Balance is 10000
    except ValueError as err:
        print(f"   [BLOCKED BY PRECONDITION] ValueError: {err}")

    print("\n[PASSED] Defensive Programming Contracts Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_defensive_contracts()
