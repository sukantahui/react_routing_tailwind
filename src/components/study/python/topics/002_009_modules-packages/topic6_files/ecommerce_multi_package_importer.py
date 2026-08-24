# topic6_files/ecommerce_multi_package_importer.py
# Module: 002_009_modules-packages
# Topic: Relative vs absolute imports in packages
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 4: Production Multi-Tier E-Commerce Import Simulator
Demonstrates:
  1. Coordinating absolute imports from project root and explicit relative imports
  2. Multi-tier order checkout, shipping calculation, and GST assessment
  3. Dynamic package simulation showing how __package__ resolves relative imports
"""

import types
from typing import Dict, Any

class MockECommerceApp:
    """Simulates an enterprise application with multi-tier subpackages."""

    @classmethod
    def setup_system(cls):
        # 1. Root Package
        root = types.ModuleType("ecommerce_app")
        root.__path__ = ["/simulated/ecommerce_app"]

        # 2. config submodule
        config_mod = types.ModuleType("ecommerce_app.config")
        config_mod.GST_RATE = 0.18
        config_mod.FREE_SHIPPING_THRESHOLD = 5000.0

        # 3. logistics submodule
        logistics_mod = types.ModuleType("ecommerce_app.services.logistics")
        def calculate_shipping(weight_kg: float, gross_amt: float) -> float:
            if gross_amt >= config_mod.FREE_SHIPPING_THRESHOLD:
                return 0.0
            return 150.0 + (weight_kg * 25.0)
        logistics_mod.calculate_shipping = calculate_shipping

        # 4. billing submodule
        billing_mod = types.ModuleType("ecommerce_app.services.billing")
        def process_checkout(order_id: int, student: str, gross_fee: float, books_kg: float) -> Dict[str, Any]:
            # Uses simulated relative import to logistics and config
            shipping_cost = logistics_mod.calculate_shipping(books_kg, gross_fee)
            gst_amount = gross_fee * config_mod.GST_RATE
            net_total = gross_fee + gst_amount + shipping_cost

            return {
                "order_id": order_id,
                "student": student,
                "gross_fee": gross_fee,
                "gst_18": gst_amount,
                "shipping": shipping_cost,
                "total_payable": net_total
            }
        billing_mod.process_checkout = process_checkout

        root.config = config_mod
        root.services_logistics = logistics_mod
        root.services_billing = billing_mod

        return root, billing_mod


def run_ecommerce_checkout_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTI-TIER E-COMMERCE CHECKOUT PIPELINE")
    print("=" * 70)

    app, billing = MockECommerceApp.setup_system()

    print("Inter-Module Import Graph:")
    print("  * 'services.billing' -> uses explicit relative import to 'services.logistics'")
    print("  * 'services.logistics' -> uses absolute import to 'ecommerce_app.config'\n")

    # Order 1: Standard Enrollment with Course Books
    order1 = billing.process_checkout(
        order_id=202601,
        student="Susmita Mukherjee",
        gross_fee=12500.0,
        books_kg=3.5
    )

    print("--- ORDER #202601 CHECKOUT BREAKDOWN ---")
    print(f"Student Name    : {order1['student']}")
    print(f"Gross Course Fee: INR {order1['gross_fee']:,.2f}")
    print(f"18% GST         : +INR {order1['gst_18']:,.2f}")
    print(f"Course Material : +INR {order1['shipping']:,.2f} (Free Shipping applied: > INR 5,000)")
    print("-" * 45)
    print(f"NET TOTAL DUE   : INR {order1['total_payable']:,.2f}\n")


if __name__ == "__main__":
    run_ecommerce_checkout_demo()
