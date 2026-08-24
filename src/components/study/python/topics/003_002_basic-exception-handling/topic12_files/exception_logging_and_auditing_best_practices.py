# topic12_files/exception_logging_and_auditing_best_practices.py
# Module: 003_002_basic-exception-handling
# Topic: Best practices: Fail fast, log errors, defensive programming
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 2: Exception Logging & Forensic Auditing Best Practices
Demonstrates:
  1. The Danger of Silent Exception Swallowing (`except: pass` anti-pattern)
  2. Structured forensic logging with contextual metadata
  3. The "Log, Rollback & Graceful Degradation" pattern
"""

import logging
import sys
from typing import Optional, Dict, Any

# Configure Institutional Logger
logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)-7s] [%(name)s] %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("FeeAuditService")

# =====================================================================
# 1. THE CATASTROPHIC ANTI-PATTERN: SILENT EXCEPTION SWALLOWING
# =====================================================================
def flawed_save_fee_silent_swallow(student_id: str, amount: float):
    """CATASTROPHIC: Catches all errors and does 'pass', hiding corruption permanently!"""
    try:
        # Simulate network or database crash:
        raise ConnectionResetError("SQL Socket Reset by peer on port 5432")
    except Exception:
        pass  # ❌ SILENT BUG: The caller thinks the write succeeded, but data was LOST!


# =====================================================================
# 2. THE PYTHONIC DEFENSIVE PATTERN: AUDITED GRACEFUL DEGRADATION
# =====================================================================
def pythonic_save_fee_with_audit(student_id: str, amount: float) -> Optional[Dict[str, Any]]:
    """Pythonic: Logs forensic error, creates recovery queue, and returns structured status."""
    try:
        if amount <= 0:
            raise ValueError(f"Fee amount must be positive, got INR {amount}")

        # Simulate transient network drop
        raise ConnectionResetError("SQL Socket Reset by peer on port 5432")

    except ConnectionResetError as net_err:
        # Step 1: Log detailed forensic telemetry with exception traceback
        logger.error(
            f"Transient database disconnection while processing Fee for Student {student_id} (INR {amount:,.2f}): {net_err}"
        )

        # Step 2: Enqueue to offline fallback persistence buffer
        logger.info(f"  [OFFLINE QUEUE] Pushed transaction to offline SQLite sync queue for Student {student_id}.")

        # Step 3: Return graceful degradation payload or raise domain exception
        return {
            "status": "QUEUED_OFFLINE",
            "student_id": student_id,
            "amount": amount,
            "message": "Payment recorded in secure offline sync ledger. Will sync upon reconnection."
        }


def demonstrate_logging_best_practices():
    print("=" * 70)
    print("CODER & ACCOTAX - EXCEPTION LOGGING & AUDITING BEST PRACTICES")
    print("=" * 70)

    # 1. Demonstrating the Silent Swallow Anti-Pattern
    print("1. Demonstrating Silent Exception Swallowing (The Danger of `except: pass`):")
    flawed_save_fee_silent_swallow("STU-101", 18000.0)
    print("   -> Notice: Function returned silently with NO output, hiding database data loss!\n")

    # 2. Demonstrating Audited Fallback
    print("2. Demonstrating Defensive Forensic Auditing & Offline Queuing:")
    res = pythonic_save_fee_with_audit("STU-102", 18000.0)
    print(f"   Service Response: {res}")

    print("\n[PASSED] Exception Logging & Auditing Best Practices Demonstrated.")


if __name__ == "__main__":
    demonstrate_logging_best_practices()
