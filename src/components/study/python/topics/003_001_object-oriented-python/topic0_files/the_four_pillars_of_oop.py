# topic0_files/the_four_pillars_of_oop.py
# Module: 003_001_object-oriented-python
# Topic: OOP Paradigm: Procedural vs Object-Oriented thinking
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: The Four Foundational Pillars of Object-Oriented Programming
Demonstrates:
  1. Encapsulation: Protecting internal attributes behind validated methods
  2. Abstraction: Hiding intricate hardware/business mechanics behind simple APIs
  3. Inheritance: Reusing and extending base capabilities in specialized subtypes
  4. Polymorphism: Interacting with varied objects through a unified protocol
"""

from abc import ABC, abstractmethod
from typing import List

# =====================================================================
# 1. ABSTRACTION & INHERITANCE
# =====================================================================

class PaymentProcessor(ABC):
    """Abstract Base Class representing a general payment gateway contract."""

    def __init__(self, merchant_id: str):
        self.merchant_id = merchant_id

    @abstractmethod
    def process_payment(self, amount: float) -> bool:
        """Abstract method enforced on all derived processors."""
        pass


class UPIPayment(PaymentProcessor):
    """Encapsulated UPI Payment Gateway."""

    def __init__(self, merchant_id: str, upi_id: str):
        super().__init__(merchant_id)
        self.__upi_id = upi_id  # Private attribute (Encapsulation)

    def process_payment(self, amount: float) -> bool:
        # Abstraction: User doesn't need to know NPCI backend token exchange
        print(f"  [UPI GATEWAY] Processing INR {amount:,.2f} via Virtual UPI ID: {self.__upi_id}")
        return True


class CreditCardPayment(PaymentProcessor):
    """Encapsulated Credit Card Payment Gateway."""

    def __init__(self, merchant_id: str, masked_card_number: str):
        super().__init__(merchant_id)
        self.__card = masked_card_number

    def process_payment(self, amount: float) -> bool:
        print(f"  [CARD GATEWAY] Routing INR {amount:,.2f} via Visa/Mastercard: {self.__card}")
        return True


# =====================================================================
# 2. POLYMORPHISM IN ACTION
# =====================================================================

def checkout_shopping_cart(processors: List[PaymentProcessor], order_total: float):
    """Polymorphic dispatcher: processes any PaymentProcessor uniformly."""
    print("Executing Polymorphic Checkout Routine:")
    for processor in processors:
        processor.process_payment(order_total)


def run_four_pillars_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - THE FOUR PILLARS OF OBJECT-ORIENTED PROGRAMMING")
    print("=" * 70)

    # 1. Create polymorphic instances
    upi = UPIPayment("MERCH-99", "sukanta@okaxis")
    card = CreditCardPayment("MERCH-99", "XXXX-XXXX-XXXX-4098")

    # 2. Dispatch payments polymorphically
    gateways = [upi, card]
    checkout_shopping_cart(gateways, 4500.0)

    print("\n[PASSED] The Four Pillars Demonstrated Successfully.")


if __name__ == "__main__":
    run_four_pillars_demo()
