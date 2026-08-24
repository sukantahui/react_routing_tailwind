# topic9_files/banking_transaction_processor_and_discount_engine.py
# Module: 003_001_object-oriented-python
# Topic: Method Overriding & super() function
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 4: Layered Transaction Processing & Concession Pipeline (Case Study)
Demonstrates:
  1. Multilevel method overriding: Base -> Scholarship -> EarlyBird -> Festive
  2. Each layer modifying and extending computations returned by `super()`
  3. Dynamic audit trace generation of applied discount tiers
"""

from typing import List, Dict, Any

class BaseTuitionProcessor:
    """Root fee calculator: Gross Tuition + 18% GST."""
    def __init__(self, student_name: str, base_tuition: float):
        self.student_name = student_name
        self.base_tuition = float(base_tuition)

    def calculate_payable(self, audit_trail: List[str]) -> float:
        gst = self.base_tuition * 0.18
        gross = self.base_tuition + gst
        audit_trail.append(f"1. Base Tuition: INR {self.base_tuition:,.2f} + GST (18%): INR {gst:,.2f} -> INR {gross:,.2f}")
        return gross


class ScholarshipDiscountProcessor(BaseTuitionProcessor):
    """Layer 2: Subtracts Merit Scholarship from base payable."""
    def __init__(self, student_name: str, base_tuition: float, scholarship_inr: float):
        super().__init__(student_name, base_tuition)
        self.scholarship_inr = float(scholarship_inr)

    def calculate_payable(self, audit_trail: List[str]) -> float:
        # Get amount from parent layer:
        amount_before = super().calculate_payable(audit_trail)
        net = max(0.0, amount_before - self.scholarship_inr)
        audit_trail.append(f"2. Merit Scholarship Applied: -INR {self.scholarship_inr:,.2f} -> Subtotal: INR {net:,.2f}")
        return net


class EarlyBirdConcessionProcessor(ScholarshipDiscountProcessor):
    """Layer 3: Subtracts Early Bird promotional voucher."""
    def __init__(self, student_name: str, base_tuition: float, scholarship_inr: float, early_bird_inr: float):
        super().__init__(student_name, base_tuition, scholarship_inr)
        self.early_bird_inr = float(early_bird_inr)

    def calculate_payable(self, audit_trail: List[str]) -> float:
        amount_before = super().calculate_payable(audit_trail)
        net = max(0.0, amount_before - self.early_bird_inr)
        audit_trail.append(f"3. Early Bird Discount Applied: -INR {self.early_bird_inr:,.2f} -> Subtotal: INR {net:,.2f}")
        return net


class FestivePromoProcessor(EarlyBirdConcessionProcessor):
    """Layer 4: Applies 5% seasonal festive rebate on current balance."""
    def __init__(self, student_name: str, base_tuition: float, scholarship_inr: float, early_bird_inr: float, festive_rate: float = 0.05):
        super().__init__(student_name, base_tuition, scholarship_inr, early_bird_inr)
        self.festive_rate = float(festive_rate)

    def calculate_payable(self, audit_trail: List[str]) -> float:
        amount_before = super().calculate_payable(audit_trail)
        discount = amount_before * self.festive_rate
        net = max(0.0, amount_before - discount)
        audit_trail.append(f"4. Festive Promo (5%): -INR {discount:,.2f} -> FINAL DUE: INR {net:,.2f}")
        return net


def run_layered_processor_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - LAYERED CONCESSION PROCESSOR (super() STACK)")
    print("=" * 70)

    processor = FestivePromoProcessor(
        student_name="Tanushree Das",
        base_tuition=20000.0,
        scholarship_inr=3000.0,
        early_bird_inr=1500.0,
        festive_rate=0.05
    )

    audit_records = []
    final_amount = processor.calculate_payable(audit_records)

    print(f"Student: {processor.student_name}\n")
    print("Executed Layered Computation Stack via `super()`:")
    for record in audit_records:
        print(f"  * {record}")

    print(f"\nNet Payable Disbursed: INR {final_amount:,.2f}")
    print("\n[PASSED] Layered Method Overriding Demonstration Complete.")


if __name__ == "__main__":
    run_layered_processor_demo()
