# topic11_files/protocols_and_structural_subtyping.py
# Module: 003_001_object-oriented-python
# Topic: Polymorphism & Duck Typing in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 3: Protocols & Structural Subtyping (PEP 544)
Demonstrates:
  1. Static Duck Typing with `typing.Protocol` (Python 3.8+)
  2. Nominal Subtyping (Inheritance) vs Structural Subtyping (Shape/Interface matching)
  3. Using `@runtime_checkable` for runtime `isinstance()` validation without inheritance
"""

from typing import Protocol, runtime_checkable

# =====================================================================
# 1. THE PROTOCOL SPECIFICATION (Structural Interface Contract)
# =====================================================================
@runtime_checkable
class AutoPayable(Protocol):
    """Protocol defining any entity capable of processing recurring fee charges."""
    def process_charge(self, amount: float) -> bool:
        """Must accept an amount and return a boolean success flag."""
        ...


# =====================================================================
# 2. IMPLEMENTING CLASSES (Zero Inheritance from AutoPayable!)
# =====================================================================
class BankAutoDebitAccount:
    """Class 1: Satisfies AutoPayable structurally."""
    def __init__(self, account_no: str):
        self.account_no = account_no

    def process_charge(self, amount: float) -> bool:
        print(f"  [NACH ECS DEBIT] Debited INR {amount:,.2f} from Account #{self.account_no}")
        return True


class CreditCardSubscription:
    """Class 2: Satisfies AutoPayable structurally."""
    def __init__(self, card_last_4: str):
        self.card_last_4 = card_last_4

    def process_charge(self, amount: float) -> bool:
        print(f"  [CREDIT CARD AUTO-CHARGE] Charged INR {amount:,.2f} on Card ****{self.card_last_4}")
        return True


class IncompletePaymentMethod:
    """Class 3: Does NOT satisfy AutoPayable (Missing process_charge method!)."""
    def make_cash_payment(self):
        print("  [CASH] Handed over cash.")


def process_recurring_subscription(payer: AutoPayable, fee_amount: float):
    """Accepts any object conforming to the AutoPayable protocol."""
    # Runtime checkable protocol check:
    if not isinstance(payer, AutoPayable):
        raise TypeError(f"Object of type '{type(payer).__name__}' does not conform to the AutoPayable Protocol!")

    return payer.process_charge(fee_amount)


def demonstrate_protocols():
    print("=" * 70)
    print("CODER & ACCOTAX - PROTOCOLS & STRUCTURAL SUBTYPING (PEP 544)")
    print("=" * 70)

    bank = BankAutoDebitAccount("SBIN-2026-9900")
    card = CreditCardSubscription("4422")
    cash = IncompletePaymentMethod()

    # 1. Bank Account Charging
    print("1. Charging Bank Account:")
    process_recurring_subscription(bank, 4500.0)

    # 2. Credit Card Charging
    print("\n2. Charging Credit Card:")
    process_recurring_subscription(card, 4500.0)

    # 3. Incompatible Method Validation
    print("\n3. Testing Incompatible Cash Payment Method:")
    try:
        process_recurring_subscription(cash, 4500.0)
    except TypeError as err:
        print(f"   [BLOCKED] TypeError: {err}")

    print(r"""
Summary:
  Neither `BankAutoDebitAccount` nor `CreditCardSubscription` inherited from `AutoPayable`.
  Yet, because their method signatures match the protocol shape, Python and mypy treat
  them as valid subtypes (Static & Runtime Duck Typing!).
""")
    print("[PASSED] Protocols & Structural Subtyping Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_protocols()
