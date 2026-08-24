# topic3_files/method_chaining_and_fluent_interfaces.py
# Module: 003_001_object-oriented-python
# Topic: Instance methods & the self parameter
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: Method Chaining & Fluent Builder Interfaces
Demonstrates:
  1. The Method Chaining pattern: Returning 'self' from mutator methods
  2. Building elegant, fluent API pipelines
  3. Invoice & Billing Builder Case Study for Coder & AccoTax
"""

from typing import List, Dict

class TaxInvoiceBuilder:
    """Fluent Builder for generating GST Tax Invoices via method chaining."""

    def __init__(self, invoice_number: str, client_name: str):
        self.invoice_number = invoice_number
        self.client_name = client_name
        self.items: List[Dict[str, float]] = []
        self.gst_rate = 18.0  # 18% standard GST
        self.discount = 0.0

    def add_line_item(self, item_name: str, unit_price: float, quantity: int = 1):
        """Adds a line item and returns self to allow chaining."""
        self.items.append({"name": item_name, "price": unit_price * quantity})
        return self  # Return self enables chaining!

    def set_gst_rate(self, rate_percent: float):
        """Sets custom GST tax slab and returns self."""
        self.gst_rate = rate_percent
        return self

    def apply_discount_voucher(self, discount_inr: float):
        """Applies flat promotional discount and returns self."""
        self.discount = discount_inr
        return self

    def build_summary(self) -> str:
        """Terminal method executing final computation and output."""
        subtotal = sum(i["price"] for i in self.items)
        discounted = max(0.0, subtotal - self.discount)
        gst_amount = discounted * (self.gst_rate / 100)
        net_total = discounted + gst_amount

        item_lines = "\n".join([f"    - {i['name']:<30} : INR {i['price']:,.2f}" for i in self.items])

        return (
            f"======================================================================\n"
            f"INVOICE #{self.invoice_number} | Client: {self.client_name}\n"
            f"Items:\n{item_lines}\n"
            f"----------------------------------------------------------------------\n"
            f"Subtotal        : INR {subtotal:,.2f}\n"
            f"Discount Applied: -INR {self.discount:,.2f}\n"
            f"GST ({self.gst_rate:.0f}%)       : +INR {gst_amount:,.2f}\n"
            f"NET TOTAL DUE   : INR {net_total:,.2f}\n"
            f"======================================================================"
        )


def demonstrate_fluent_chaining():
    print("=" * 70)
    print("CODER & ACCOTAX - METHOD CHAINING & FLUENT INTERFACES")
    print("=" * 70)

    # Fluent Method Chaining in Action:
    invoice = (
        TaxInvoiceBuilder("INV-2026-88", "Tanushree Das")
        .add_line_item("Python Pro Full-Stack Course", 15000.0)
        .add_line_item("Official Printed Study Kit", 1200.0)
        .apply_discount_voucher(1000.0)
        .set_gst_rate(18.0)
    )

    print(invoice.build_summary())
    print("\n[PASSED] Fluent Method Chaining Pipeline Executed Successfully.")


if __name__ == "__main__":
    demonstrate_fluent_chaining()
