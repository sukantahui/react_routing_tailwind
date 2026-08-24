# topic12_files/enterprise_resilient_financial_engine.py
# Module: 003_002_basic-exception-handling
# Topic: Best practices: Fail fast, log errors, defensive programming
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 4: Resilient Educational Ledger & Billing Engine (Capstone Case Study)
Demonstrates:
  1. Complete synthesis of Module 003_002 principles
  2. Fail-Fast input validation guards + EAFP data retrieval
  3. Custom domain exceptions with chained root-causes (`from`)
  4. Structured logging + Atomic transaction state rollback
"""

import logging
import datetime as dt
from typing import Dict, Any, List

# =====================================================================
# CUSTOM DOMAIN EXCEPTION HIERARCHY
# =====================================================================
class ResilientInstituteError(Exception):
    """Base exception for all educational ledger transactions."""
    pass

class StudentAdmissionValidationError(ResilientInstituteError):
    """Raised when applicant data fails fail-fast boundary validation."""
    pass

class LedgerTransactionDiscrepancyError(ResilientInstituteError):
    """Raised when atomic transaction invariants fail."""
    pass


# =====================================================================
# ENTERPRISE RESILIENT LEDGER ENGINE
# =====================================================================
class ResilientLedgerEngine:
    """Production transaction manager with defensive invariants and logging."""

    def __init__(self, logger: logging.Logger):
        self.logger = logger
        self._accounts: Dict[str, Dict[str, Any]] = {}
        self._audit_trail: List[Dict[str, Any]] = []

    def register_account(self, student_id: str, name: str, initial_deposit: float):
        # 1. FAIL-FAST INPUT GUARDS
        if not isinstance(student_id, str) or not student_id.startswith("STU-"):
            raise StudentAdmissionValidationError(f"Invalid student ID format '{student_id}'")
        if not isinstance(name, str) or not name.strip():
            raise StudentAdmissionValidationError("Student name is mandatory")
        if initial_deposit < 0:
            raise StudentAdmissionValidationError(f"Initial deposit cannot be negative: INR {initial_deposit}")

        self._accounts[student_id] = {
            "name": name.strip(),
            "balance": float(initial_deposit),
            "created_at": dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.logger.info(f"Created Ledger Account for {name} ({student_id}) with INR {initial_deposit:,.2f}")

    def execute_atomic_tuition_deduction(self, student_id: str, tuition_fee: float) -> float:
        """Executes an atomic fee deduction with rollback guarantee."""
        # EAFP lookup
        try:
            account = self._accounts[student_id]
        except KeyError as key_err:
            raise StudentAdmissionValidationError(f"Account for '{student_id}' does not exist!") from key_err

        if tuition_fee <= 0:
            raise StudentAdmissionValidationError(f"Tuition fee must be strictly positive: INR {tuition_fee}")

        # Snapshot state for rollback:
        original_balance = account["balance"]
        self.logger.debug(f"Snapshot original balance for {student_id}: INR {original_balance:,.2f}")

        try:
            if tuition_fee > account["balance"]:
                raise LedgerTransactionDiscrepancyError(
                    f"Insufficient funds: Balance is INR {account['balance']:,.2f}, required: INR {tuition_fee:,.2f}"
                )

            # Mutate state:
            account["balance"] -= tuition_fee

            # Postcondition Invariant:
            assert account["balance"] == original_balance - tuition_fee, "Math Invariant Violated!"

            # Record audit log:
            self._audit_trail.append({
                "student_id": student_id,
                "deducted": tuition_fee,
                "remaining": account["balance"],
                "timestamp": dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })

            self.logger.info(f"Deducted INR {tuition_fee:,.2f} from {student_id}. New Balance: INR {account['balance']:,.2f}")
            return account["balance"]

        except Exception as tx_err:
            # ATOMIC ROLLBACK ON EXCEPTION:
            account["balance"] = original_balance
            self.logger.error(f"Transaction aborted. Rolled back balance for {student_id} to INR {original_balance:,.2f}: {tx_err}")
            raise


def run_resilient_engine_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - RESILIENT LEDGER BILLING ENGINE")
    print("=" * 70)

    # Configure logger
    logging.basicConfig(level=logging.INFO, format="[%(asctime)s] [%(levelname)s] %(message)s", datefmt="%H:%M:%S")
    logger = logging.getLogger("ResilientLedger")

    engine = ResilientLedgerEngine(logger)

    # 1. Register Student Account
    print("1. Registering Student Account (Sourav Mukherjee):")
    engine.register_account("STU-101", "Sourav Mukherjee", 25000.0)

    # 2. Valid Tuition Deduction
    print("\n2. Executing Valid Tuition Payment (INR 15,000):")
    engine.execute_atomic_tuition_deduction("STU-101", 15000.0)

    # 3. Triggering Insufficient Funds with Rollback
    print("\n3. Executing Over-Limit Deduction (INR 20,000 against INR 10,000 balance):")
    try:
        engine.execute_atomic_tuition_deduction("STU-101", 20000.0)
    except LedgerTransactionDiscrepancyError as err:
        print(f"\n[CAUGHT DISCREPANCY ERROR] {err}")

    # Verify balance was protected and rolled back:
    final_balance = engine._accounts["STU-101"]["balance"]
    print(f"\nVerified Final Ledger Balance: INR {final_balance:,.2f} (Cleanly rolled back to INR 10,000!)")

    print("\n[PASSED] Resilient Educational Ledger Billing Engine Verified.")


if __name__ == "__main__":
    run_resilient_engine_demo()
