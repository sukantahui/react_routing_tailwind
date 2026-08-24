# topic3_files/smart_banking_account_ledger.py
# Module: 003_001_object-oriented-python
# Topic: Instance methods & the self parameter
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 4: Interactive Bank Account & Multi-Account Transaction Ledger
Demonstrates:
  1. Rich instance methods interacting across multiple object instances (transfer_to)
  2. Guarding state invariants across operations
  3. Dynamic statement generation and compounding interest calculations
"""

import datetime as dt
from typing import List

class BankAccount:
    """Enterprise Bank Account with multi-method capabilities."""
    bank_name = "Coder & AccoTax Commercial Reserve Bank"

    def __init__(self, account_no: str, holder_name: str, opening_balance: float = 0.0):
        if opening_balance < 0:
            raise ValueError("Opening balance cannot be negative!")
        self.account_no = account_no
        self.holder_name = holder_name
        self.balance = float(opening_balance)
        self.ledger: List[str] = [
            f"{dt.date.today()}: Account opened with INR {self.balance:,.2f}"
        ]

    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            print(f"  [ERROR] Invalid deposit amount: INR {amount:,.2f}")
            return False
        self.balance += amount
        self.ledger.append(f"{dt.date.today()}: Deposit +INR {amount:,.2f} | Bal: INR {self.balance:,.2f}")
        print(f"  [DEPOSIT] {self.holder_name}: +INR {amount:,.2f} | New Balance: INR {self.balance:,.2f}")
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= 0 or amount > self.balance:
            print(f"  [ERROR] Insufficient funds or invalid amount: INR {amount:,.2f} (Current: INR {self.balance:,.2f})")
            return False
        self.balance -= amount
        self.ledger.append(f"{dt.date.today()}: Withdrawal -INR {amount:,.2f} | Bal: INR {self.balance:,.2f}")
        print(f"  [WITHDRAW] {self.holder_name}: -INR {amount:,.2f} | Remaining: INR {self.balance:,.2f}")
        return True

    def transfer_to(self, target_account: 'BankAccount', amount: float) -> bool:
        """Transfers funds directly to another BankAccount object instance."""
        print(f"\nInitiating Transfer of INR {amount:,.2f} from {self.holder_name} -> {target_account.holder_name}:")
        if self.withdraw(amount):
            target_account.deposit(amount)
            print(f"  [TRANSFER SUCCESS] Transfer complete between #{self.account_no} and #{target_account.account_no}")
            return True
        print(f"  [TRANSFER FAILED] Transfer aborted.")
        return False

    def apply_monthly_interest(self, annual_rate_percent: float = 4.0) -> None:
        monthly_interest = self.balance * (annual_rate_percent / 100 / 12)
        self.balance += monthly_interest
        self.ledger.append(f"{dt.date.today()}: Interest +INR {monthly_interest:,.2f} | Bal: INR {self.balance:,.2f}")
        print(f"  [INTEREST] {self.holder_name}: +INR {monthly_interest:,.2f} interest credited.")

    def print_statement(self) -> None:
        print(f"\n======================================================================")
        print(f"{self.bank_name.upper()}")
        print(f"ACCOUNT STATEMENT - #{self.account_no} ({self.holder_name})")
        print(f"----------------------------------------------------------------------")
        for entry in self.ledger:
            print(f"  * {entry}")
        print(f"----------------------------------------------------------------------")
        print(f"NET CLOSING BALANCE: INR {self.balance:,.2f}")
        print(f"======================================================================\n")


def run_banking_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTI-ACCOUNT BANKING LEDGER SUITE")
    print("=" * 70)

    # 1. Instantiate Accounts
    acc1 = BankAccount("ACC-101", "Debanjan Roy", 10000.0)
    acc2 = BankAccount("ACC-202", "Priyanka Sen", 5000.0)

    # 2. Deposits and Withdrawals
    acc1.deposit(4000.0)
    acc2.deposit(3000.0)

    # 3. Inter-Account Transfer
    acc1.transfer_to(acc2, 6000.0)

    # 4. Apply Interest
    acc2.apply_monthly_interest(4.5)

    # 5. Print Detailed Statements
    acc1.print_statement()
    acc2.print_statement()

    print("[PASSED] Smart Banking Ledger Suite Completed Successfully.")


if __name__ == "__main__":
    run_banking_suite()
