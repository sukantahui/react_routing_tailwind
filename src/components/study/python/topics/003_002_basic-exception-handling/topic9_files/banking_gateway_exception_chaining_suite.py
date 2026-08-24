# topic9_files/banking_gateway_exception_chaining_suite.py
# Module: 003_002_basic-exception-handling
# Topic: Exception Chaining (raise ... from ...)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 4: Enterprise Banking & Fee Gateway Exception Chaining Suite (Case Study)
Demonstrates:
  1. Production payment gateway client wrapping multi-layer network and parsing failures
  2. Full exception chaining with `from root_cause` for forensic tracking
  3. Sanitizing public API errors using `from None` to prevent credential leaks
"""

import json
from typing import Dict, Any

# =====================================================================
# DOMAIN PAYMENT GATEWAY EXCEPTIONS
# =====================================================================
class PaymentGatewayBaseError(Exception):
    """Base exception for all payment gateway transactions."""
    pass

class PaymentGatewayTimeoutError(PaymentGatewayBaseError):
    """Raised when bank API socket fails to respond within timeout window."""
    pass

class MalformedPaymentResponseError(PaymentGatewayBaseError):
    """Raised when bank API returns corrupt or invalid JSON."""
    pass

class CardAuthorizationFailedError(PaymentGatewayBaseError):
    """Clean public exception shown to students/parents."""
    pass


# =====================================================================
# PAYMENT GATEWAY CLIENT
# =====================================================================
class InstitutionalFeePaymentGateway:
    """Enterprise payment client for Coder & AccoTax fees."""

    def submit_fee_payment(self, student_id: str, amount_inr: float, simulated_scenario: str) -> Dict[str, Any]:
        print(f"  [GATEWAY INITIATED] Processing INR {amount_inr:,.2f} for Student {student_id}...")

        # Scenario 1: Socket Timeout
        if simulated_scenario == "timeout":
            try:
                # Simulating low-level socket timeout
                raise TimeoutError("Socket read timed out after 3000ms on api.bankgateway.in:443")
            except TimeoutError as socket_err:
                raise PaymentGatewayTimeoutError(
                    f"Bank authorization server timed out for transaction (Student: {student_id})"
                ) from socket_err

        # Scenario 2: Corrupt JSON Response
        elif simulated_scenario == "corrupt_json":
            try:
                raw_response = "<xml>Gateway 502 Bad Gateway</xml>"  # Not JSON!
                parsed = json.loads(raw_response)
            except json.JSONDecodeError as json_err:
                raise MalformedPaymentResponseError(
                    f"Bank API returned invalid non-JSON payload for Student {student_id}"
                ) from json_err

        # Scenario 3: Clean Public Error (Suppressed Chaining)
        elif simulated_scenario == "card_declined":
            try:
                # Internal bank decline with internal routing codes
                raise ValueError("DECLINE_CODE_51_INSUFFICIENT_LIMIT_ACC_998124")
            except ValueError:
                # Suppress internal account strings from leaking to client UI:
                raise CardAuthorizationFailedError(
                    "Your payment card was declined by the issuing bank. Please contact your bank or try another card."
                ) from None

        # Scenario 4: Success
        return {
            "status": "APPROVED",
            "transaction_id": "TXN-2026-991823",
            "student_id": student_id,
            "amount_paid": amount_inr
        }


def run_banking_chaining_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - PAYMENT GATEWAY EXCEPTION CHAINING SUITE")
    print("=" * 70)

    gateway = InstitutionalFeePaymentGateway()

    # 1. Successful Transaction
    print("1. Successful Tuition Payment:")
    receipt = gateway.submit_fee_payment("STU-101", 18000.0, simulated_scenario="success")
    print(f"   Receipt: {receipt}\n")

    # 2. Testing Network Timeout (Chained via `from socket_err`)
    print("2. Testing Bank Socket Timeout (Chained via `from`):")
    try:
        gateway.submit_fee_payment("STU-102", 15000.0, simulated_scenario="timeout")
    except PaymentGatewayTimeoutError as err:
        print(f"   [CAUGHT DOMAIN ERROR] {err}")
        print(f"   * Root Cause Type   : {type(err.__cause__).__name__}")
        print(f"   * Root Cause Message: {err.__cause__}\n")

    # 3. Testing Corrupt JSON (Chained via `from json_err`)
    print("3. Testing Malformed JSON Response (Chained via `from`):")
    try:
        gateway.submit_fee_payment("STU-103", 22000.0, simulated_scenario="corrupt_json")
    except MalformedPaymentResponseError as err:
        print(f"   [CAUGHT DOMAIN ERROR] {err}")
        print(f"   * Root Cause Type   : {type(err.__cause__).__name__}\n")

    # 4. Testing Card Declined (Suppressed via `from None`)
    print("4. Testing Card Declined (Suppressed via `from None` to hide internal codes):")
    try:
        gateway.submit_fee_payment("STU-104", 12000.0, simulated_scenario="card_declined")
    except CardAuthorizationFailedError as err:
        print(f"   [CLEAN PUBLIC ERROR] {err}")
        print(f"   * __cause__ is None : {err.__cause__ is None}")
        print(f"   * Context Suppressed: {err.__suppress_context__}")

    print("\n[PASSED] Payment Gateway Exception Chaining Suite Completed Successfully.")


if __name__ == "__main__":
    run_banking_chaining_demo()
