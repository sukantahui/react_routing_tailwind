# topic7_files/re_raising_active_exceptions.py
# Module: 003_002_basic-exception-handling
# Topic: Raising exceptions intentionally using raise keyword
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Re-Raising Active Exceptions (Bare `raise` statement)
Demonstrates:
  1. The bare `raise` syntax inside an `except` block
  2. Preserving the exact original traceback during error re-raising
  3. The "Log, Cleanup & Re-raise" production middleware pattern
"""

import datetime as dt

def audit_log_error(action_name: str, error_instance: Exception):
    timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"  [SYSTEM AUDIT LOG] [{timestamp}] Failed Action '{action_name}': {type(error_instance).__name__}: {error_instance}")


def execute_database_transaction(account_id: str, amount_inr: float):
    """Simulates a database transaction with audit logging and re-raising."""
    try:
        if amount_inr > 50000.0:
            raise PermissionError(f"Transaction of INR {amount_inr:,.2f} exceeds single API withdrawal limit (INR 50,000.00)!")
        print(f"  [DB COMMIT] Successfully transferred INR {amount_inr:,.2f} to {account_id}")
    except PermissionError as err:
        # Step 1: Log forensic audit trail locally
        audit_log_error("execute_database_transaction", err)
        # Step 2: Clean up connection / rollback state
        print("  [ROLLBACK] Rolled back transaction state to maintain database consistency.")
        # Step 3: Re-raise original exception up the call stack!
        raise


def run_caller_service():
    print("=" * 70)
    print("CODER & ACCOTAX - BARE `raise` RE-RAISING PATTERN")
    print("=" * 70)

    # 1. Successful Transaction
    print("1. Executing Normal Transaction (INR 12,000):")
    execute_database_transaction("ACC-101", 12000.0)

    # 2. Triggering Guard & Re-raising Exception
    print("\n2. Executing Over-Limit Transaction (INR 75,000):")
    try:
        execute_database_transaction("ACC-101", 75000.0)
    except PermissionError as err:
        print(f"\n[CALLER SERVICE CAUGHT RE-RAISED ERROR] Client Alert: {err}")

    print(r"""
Key Takeaway:
  A bare `raise` statement inside an `except` block re-raises the active exception
  without altering its original traceback. This allows intermediate layers to log
  or cleanup without masking errors from the top-level caller!
""")
    print("[PASSED] Re-raising Active Exceptions Demonstrated Successfully.")


if __name__ == "__main__":
    run_caller_service()
