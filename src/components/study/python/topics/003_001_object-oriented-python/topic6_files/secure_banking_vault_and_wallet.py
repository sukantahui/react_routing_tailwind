# topic6_files/secure_banking_vault_and_wallet.py
# Module: 003_001_object-oriented-python
# Topic: Encapsulation & Data Hiding
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 4: Secure Institutional Banking Vault & Digital Lockbox (Case Study)
Demonstrates:
  1. Complete encapsulation of sensitive cryptographic keys and transaction ledgers
  2. Multi-factor authentication guards before unlocking digital vaults
  3. Dynamic audit logging with unalterable private histories
"""

import datetime as dt
import hashlib
from typing import List, Optional

class InstitutionalSecurityVault:
    """Enterprise Institutional Vault encapsulating sensitive cryptographic material."""
    institute = "Coder & AccoTax Institutional Reserve"

    def __init__(self, vault_id: str, master_key_passphrase: str, initial_cash_reserve: float):
        self.vault_id = vault_id
        
        # Protected State
        self._operational_branch = "Barrackpore Treasury Division"
        self._cash_reserve = float(initial_cash_reserve)

        # Private Encapsulated State (Name Mangled)
        self.__passphrase_hash = hashlib.sha256(master_key_passphrase.encode("utf-8")).hexdigest()
        self.__secret_bearer_token = hashlib.sha256(f"BEARER-{vault_id}-{dt.date.today()}".encode("utf-8")).hexdigest()
        self.__audit_log: List[str] = [
            f"{dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: Vault created with Reserve INR {self._cash_reserve:,.2f}"
        ]
        self.__is_unlocked = False

    def authenticate_vault(self, passphrase: str) -> bool:
        """Authenticates master passphrase and opens security session."""
        if hashlib.sha256(passphrase.encode("utf-8")).hexdigest() == self.__passphrase_hash:
            self.__is_unlocked = True
            self.__audit_log.append(f"{dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: Vault session UNLOCKED.")
            print(f"  [VAULT UNLOCKED] Session opened for Vault #{self.vault_id}")
            return True
        else:
            self.__audit_log.append(f"{dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: UNAUTHORIZED ACCESS ATTEMPT DETECTED!")
            print(f"  [SECURITY ALERT] Invalid master passphrase for Vault #{self.vault_id}")
            return False

    def lock_vault(self):
        """Terminates active security session."""
        self.__is_unlocked = False
        self.__audit_log.append(f"{dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: Vault session LOCKED.")
        print(f"  [VAULT LOCKED] Session closed for Vault #{self.vault_id}")

    def disburse_treasury_funds(self, amount: float, authorization_code: str) -> bool:
        """Guarded fund disbursement requiring active unlocked session."""
        if not self.__is_unlocked:
            print(f"  [DISBURSEMENT DENIED] Vault is locked. Authenticate first!")
            return False

        if amount <= 0 or amount > self._cash_reserve:
            print(f"  [DISBURSEMENT DENIED] Insufficient treasury reserve (Available: INR {self._cash_reserve:,.2f})")
            return False

        self._cash_reserve -= amount
        self.__audit_log.append(
            f"{dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: Disbursed INR {amount:,.2f} | Auth: {authorization_code}"
        )
        print(f"  [DISBURSED] INR {amount:,.2f} released. Remaining Reserve: INR {self._cash_reserve:,.2f}")
        return True

    def print_audit_ledger(self) -> None:
        """Prints audit history without exposing cryptographic tokens."""
        print(f"\n======================================================================")
        print(f"CODER & ACCOTAX - TREASURY VAULT AUDIT TRAIL [#{self.vault_id}]")
        print(f"Branch: {self._operational_branch} | Reserve: INR {self._cash_reserve:,.2f}")
        print(f"----------------------------------------------------------------------")
        for entry in self.__audit_log:
            print(f"  * {entry}")
        print(f"======================================================================\n")


def run_vault_simulation():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL SECURITY VAULT SIMULATION")
    print("=" * 70)

    vault = InstitutionalSecurityVault("VAULT-BKP-01", "AccoTaxMasterKey2026!", 500000.0)

    # 1. Attempt unauthorized disbursement while locked
    print("1. Attempting disbursement without unlocking vault:")
    vault.disburse_treasury_funds(50000.0, "AUTH-999")

    # 2. Failed unlock attempt
    print("\n2. Attempting unlock with wrong password:")
    vault.authenticate_vault("WrongPassword123")

    # 3. Successful unlock & disbursement
    print("\n3. Authenticating with correct master passphrase:")
    if vault.authenticate_vault("AccoTaxMasterKey2026!"):
        vault.disburse_treasury_funds(120000.0, "AUTH-TREASURY-001")
        vault.lock_vault()

    # 4. Print Audit Trail
    vault.print_audit_ledger()

    print("[PASSED] Institutional Banking Vault Simulation Complete.")


if __name__ == "__main__":
    run_vault_simulation()
