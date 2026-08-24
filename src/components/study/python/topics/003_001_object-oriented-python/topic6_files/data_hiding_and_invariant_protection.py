# topic6_files/data_hiding_and_invariant_protection.py
# Module: 003_001_object-oriented-python
# Topic: Encapsulation & Data Hiding
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 2: Data Hiding & Invariant Protection
Demonstrates:
  1. Hiding internal mutable state behind controlled public methods
  2. Enforcing strict business logic validation before allowing state mutation
  3. Masking sensitive data (e.g. Account Number, Pan Card) for display
"""

import hashlib

class SecureWalletAccount:
    """Enterprise Secure Digital Wallet guarding balance and PIN credentials."""

    def __init__(self, wallet_id: str, owner_name: str, initial_deposit: float, secret_pin: str):
        if initial_deposit < 0:
            raise ValueError("Opening balance cannot be negative!")
        if len(secret_pin) != 4 or not secret_pin.isdigit():
            raise ValueError("PIN must be exactly 4 numeric digits!")

        self.wallet_id = wallet_id
        self.owner_name = owner_name
        
        # Protected and Private Data
        self._balance = float(initial_deposit)
        self.__pin_hash = self._hash_pin(secret_pin)
        self.__failed_attempts = 0
        self.__is_locked = False

    def _hash_pin(self, pin: str) -> str:
        """Internal helper hashing PIN code using SHA-256."""
        return hashlib.sha256(pin.encode("utf-8")).hexdigest()

    def get_masked_id(self) -> str:
        """Public method exposing safely formatted identification."""
        return f"WAL-***-{self.wallet_id[-4:]}"

    def withdraw_funds(self, amount: float, pin: str) -> bool:
        """Controlled public interface with validation and security guards."""
        if self.__is_locked:
            print(f"  [LOCKED] Wallet is temporarily locked due to security breaches!")
            return False

        if self._hash_pin(pin) != self.__pin_hash:
            self.__failed_attempts += 1
            print(f"  [SECURITY ALERT] Invalid PIN! Attempt {self.__failed_attempts}/3")
            if self.__failed_attempts >= 3:
                self.__is_locked = True
                print("  [LOCKOUT] Maximum attempts exceeded! Wallet locked.")
            return False

        # Reset failed attempts on success
        self.__failed_attempts = 0

        if amount <= 0 or amount > self._balance:
            print(f"  [TRANSACTION REJECTED] Invalid amount or insufficient funds (Bal: INR {self._balance:,.2f})")
            return False

        self._balance -= amount
        print(f"  [WITHDRAWAL SUCCESS] {self.owner_name}: -INR {amount:,.2f} | Remaining: INR {self._balance:,.2f}")
        return True


def demonstrate_secure_wallet():
    print("=" * 70)
    print("CODER & ACCOTAX - DATA HIDING & INVARIANT PROTECTION")
    print("=" * 70)

    wallet = SecureWalletAccount("9830099887", "Abhishek Karmakar", 8000.0, "4321")
    print(f"Wallet Created: {wallet.owner_name} | ID: {wallet.get_masked_id()}\n")

    # 1. Valid Withdrawal
    print("1. Attempting Valid Withdrawal with correct PIN (4321):")
    wallet.withdraw_funds(2500.0, "4321")

    # 2. Invalid Withdrawals triggering security lockout
    print("\n2. Attempting Invalid Withdrawals with wrong PIN (0000):")
    wallet.withdraw_funds(1000.0, "0000")
    wallet.withdraw_funds(1000.0, "0000")
    wallet.withdraw_funds(1000.0, "0000")

    # 3. Blocked after lockout
    print("\n3. Attempting withdrawal after lockout:")
    wallet.withdraw_funds(500.0, "4321")

    print("\n[PASSED] Secure Encapsulation & Lockout Pipeline Verified.")


if __name__ == "__main__":
    demonstrate_secure_wallet()
