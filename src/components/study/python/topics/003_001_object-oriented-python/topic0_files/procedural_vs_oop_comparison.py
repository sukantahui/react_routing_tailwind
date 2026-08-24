# topic0_files/procedural_vs_oop_comparison.py
# Module: 003_001_object-oriented-python
# Topic: OOP Paradigm: Procedural vs Object-Oriented thinking
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: Procedural Programming vs Object-Oriented Paradigm
Demonstrates:
  1. Procedural Approach: Functions acting on detached data structures (dicts/tuples)
  2. The Flaw of Procedural Code: No data protection, external mutation, fragmented logic
  3. OOP Approach: Bundling state (attributes) and behavior (methods) into an Account class
  4. How OOP guarantees invariant validation and clean state encapsulation
"""

# =====================================================================
# 1. THE PROCEDURAL APPROACH (Data and Logic are Separated)
# =====================================================================

def create_procedural_account(account_number: str, holder_name: str, balance: float) -> dict:
    return {
        "acc_num": account_number,
        "name": holder_name,
        "balance": balance
    }

def procedural_deposit(account: dict, amount: float) -> bool:
    if amount <= 0:
        print(f"  [ERROR] Invalid deposit amount: INR {amount:,.2f}")
        return False
    account["balance"] += amount
    print(f"  [PROCEDURAL] Deposited INR {amount:,.2f}. New Balance: INR {account['balance']:,.2f}")
    return True

def procedural_withdraw(account: dict, amount: float) -> bool:
    if amount <= 0 or amount > account["balance"]:
        print(f"  [ERROR] Insufficient funds or invalid amount: INR {amount:,.2f}")
        return False
    account["balance"] -= amount
    print(f"  [PROCEDURAL] Withdrew INR {amount:,.2f}. Remaining Balance: INR {account['balance']:,.2f}")
    return True


# =====================================================================
# 2. THE OBJECT-ORIENTED APPROACH (Data and Behavior are Encapsulated)
# =====================================================================

class BankAccount:
    """Encapsulated Bank Account with self-managed state and invariants."""

    def __init__(self, account_number: str, holder_name: str, initial_balance: float = 0.0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative!")
        self.account_number = account_number
        self.holder_name = holder_name
        self._balance = float(initial_balance)

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            print(f"  [ERROR] Deposit amount must be positive: INR {amount:,.2f}")
            return False
        self._balance += amount
        print(f"  [OOP] Deposited INR {amount:,.2f} into Account #{self.account_number}. New Balance: INR {self._balance:,.2f}")
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            print(f"  [ERROR] Withdrawal amount must be positive: INR {amount:,.2f}")
            return False
        if amount > self._balance:
            print(f"  [ERROR] Overdraft denied! Balance: INR {self._balance:,.2f}, Requested: INR {amount:,.2f}")
            return False
        self._balance -= amount
        print(f"  [OOP] Withdrew INR {amount:,.2f} from Account #{self.account_number}. Remaining: INR {self._balance:,.2f}")
        return True


def run_comparison_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - PROCEDURAL VS OBJECT-ORIENTED PROGRAMMING")
    print("=" * 70)

    # 1. Procedural Execution
    print("\n--- A. PROCEDURAL APPROACH EXECUTION ---")
    p_acc = create_procedural_account("ACC-101", "Debanjan Roy", 5000.0)
    procedural_deposit(p_acc, 2500.0)
    procedural_withdraw(p_acc, 1200.0)

    # Procedural Vulnerability Demonstration:
    # Any external code can silently corrupt procedural data:
    p_acc["balance"] = -999999.0  # State corrupted without validation!
    print(f"  [CORRUPTION TRAP] External code set balance directly to: INR {p_acc['balance']:,.2f}")

    # 2. OOP Execution
    print("\n--- B. OBJECT-ORIENTED APPROACH EXECUTION ---")
    oop_acc = BankAccount("ACC-202", "Priyanka Sen", 15000.0)
    oop_acc.deposit(5000.0)
    oop_acc.withdraw(3500.0)
    oop_acc.withdraw(50000.0)  # Cleanly rejected by encapsulated logic

    print("\n[PASSED] Paradigm Comparison Completed Successfully.")


if __name__ == "__main__":
    run_comparison_demo()
