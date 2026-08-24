# topic11_files/multichannel_notification_and_payment_engine.py
# Module: 003_001_object-oriented-python
# Topic: Polymorphism & Duck Typing in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 4: Multi-Channel Gateway Dispatcher (Production Case Study)
Demonstrates:
  1. Unified polymorphic notification and payment processing engine
  2. Polymorphic adapters for WhatsApp, Razorpay UPI, Stripe, and SMS Fallback
  3. Eliminating fragile `if/elif type(x) == Y:` checks using clean duck typing
"""

from typing import List, Dict, Any

# =====================================================================
# POLYMORPHIC ADAPTER 1: RAZORPAY UPI GATEWAY
# =====================================================================
class RazorpayUpiGateway:
    def process_transaction(self, student_id: str, amount_inr: float) -> Dict[str, Any]:
        return {
            "gateway": "Razorpay UPI / BharatPe",
            "student_id": student_id,
            "amount": amount_inr,
            "reference_id": f"RZP-{student_id}-992",
            "status": "SETTLED"
        }

    def dispatch_alert(self, destination: str, message: str) -> str:
        return f"[WhatsApp API -> {destination}] {message}"


# =====================================================================
# POLYMORPHIC ADAPTER 2: STRIPE INTERNATIONAL CARD GATEWAY
# =====================================================================
class StripeInternationalGateway:
    def process_transaction(self, student_id: str, amount_inr: float) -> Dict[str, Any]:
        usd_amount = amount_inr / 85.0  # Simulated USD conversion
        return {
            "gateway": "Stripe International Payments",
            "student_id": student_id,
            "amount": amount_inr,
            "reference_id": f"STRIPE-INT-{student_id}-X4",
            "status": f"SETTLED (${usd_amount:.2f} USD)"
        }

    def dispatch_alert(self, destination: str, message: str) -> str:
        return f"[Email SMTP Service -> {destination}] Subject: Transaction Confirmation | Body: {message}"


# =====================================================================
# POLYMORPHIC ADAPTER 3: OFFLINE CASH & SMS RECEIPT
# =====================================================================
class OfflineCampusCashGateway:
    def process_transaction(self, student_id: str, amount_inr: float) -> Dict[str, Any]:
        return {
            "gateway": "Barrackpore Campus Cash Desk",
            "student_id": student_id,
            "amount": amount_inr,
            "reference_id": f"CAMPUS-CASH-{student_id}-01",
            "status": "CASHIER_VERIFIED"
        }

    def dispatch_alert(self, destination: str, message: str) -> str:
        return f"[Telecom SMS Gateway -> {destination}] {message}"


# =====================================================================
# UNIFIED DISPATCHER HUB (Pure Duck Typing)
# =====================================================================
class UnifiedInstitutionalHub:
    """Processes any gateway adhering to the transaction and alert duck contract."""

    def execute_student_enrollment(self, gateway_adapter: Any, student_id: str, amount: float, contact: str):
        print(f"\n--- INITIATING ENROLLMENT FOR {student_id} ---")
        
        # 1. Polymorphic Transaction Call (No type checks!):
        tx_result = gateway_adapter.process_transaction(student_id, amount)
        print(f"  * Transaction Status : {tx_result['status']}")
        print(f"  * Gateway Used       : {tx_result['gateway']}")
        print(f"  * Reference ID       : {tx_result['reference_id']}")

        # 2. Polymorphic Notification Call:
        receipt_msg = f"Payment of INR {amount:,.2f} verified. Ref: {tx_result['reference_id']}. Welcome to Coder & AccoTax!"
        alert_result = gateway_adapter.dispatch_alert(contact, receipt_msg)
        print(f"  * Notification Sent  : {alert_result}")


def run_polymorphic_gateway_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTI-CHANNEL POLYMORPHIC GATEWAY DEMO")
    print("=" * 70)

    hub = UnifiedInstitutionalHub()

    # 1. Process via Razorpay UPI
    hub.execute_student_enrollment(
        gateway_adapter=RazorpayUpiGateway(),
        student_id="STU-901",
        amount=18000.0,
        contact="+91-9830011111"
    )

    # 2. Process via Stripe International
    hub.execute_student_enrollment(
        gateway_adapter=StripeInternationalGateway(),
        student_id="STU-INT-404",
        amount=25000.0,
        contact="student.overseas@codernaccotax.co.in"
    )

    # 3. Process via Campus Cash
    hub.execute_student_enrollment(
        gateway_adapter=OfflineCampusCashGateway(),
        student_id="STU-102",
        amount=12000.0,
        contact="+91-9830022222"
    )

    print("\n[PASSED] Multi-Channel Polymorphic Gateway Completed Successfully.")


if __name__ == "__main__":
    run_polymorphic_gateway_demo()
