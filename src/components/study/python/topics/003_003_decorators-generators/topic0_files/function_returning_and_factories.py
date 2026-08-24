# topic0_files/function_returning_and_factories.py
# Module: 003_003_decorators-generators
# Topic: First-Class Functions: Passing and returning functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: Returning Functions from Functions (Function Factories)
Demonstrates:
  1. Defining functions inside functions (Nested functions)
  2. Returning function objects as values
  3. Dynamic Function Factory pattern for generating custom calculators
"""

from typing import Callable

# Function Factory: Takes parameters and returns a brand-new customized function
def create_tuition_calculator(tax_rate: float, discount_rate: float) -> Callable[[float], float]:
    """Factory that dynamically builds and returns a custom tax and discount calculator."""

    def custom_calculator(raw_fee: float) -> float:
        discounted = raw_fee * (1.0 - discount_rate)
        taxed = discounted * (1.0 + tax_rate)
        return taxed

    # Giving our generated function a descriptive name for introspection:
    custom_calculator.__name__ = f"calc_disc{int(discount_rate*100)}_tax{int(tax_rate*100)}"
    custom_calculator.__doc__ = f"Custom Fee Calculator (Discount: {discount_rate*100}%, Tax: {tax_rate*100}%)"

    # Returning the uninvoked function object itself:
    return custom_calculator


def demonstrate_function_factories():
    print("=" * 70)
    print("CODER & ACCOTAX - RETURNING FUNCTIONS & FUNCTION FACTORIES")
    print("=" * 70)

    # 1. Generate specialized calculators:
    print("1. Generating Custom Fee Calculators via Factory:")
    kolkata_center_calc = create_tuition_calculator(tax_rate=0.18, discount_rate=0.10)
    barrackpore_center_calc = create_tuition_calculator(tax_rate=0.05, discount_rate=0.20)

    print(f"   Generated Calculator 1: {kolkata_center_calc.__name__}")
    print(f"   Documentation        : {kolkata_center_calc.__doc__}")
    print(f"   Generated Calculator 2: {barrackpore_center_calc.__name__}")
    print(f"   Documentation        : {barrackpore_center_calc.__doc__}\n")

    # 2. Invoking returned function objects:
    base_tuition = 30000.0
    print(f"2. Invoking Generated Calculators with Base Tuition INR {base_tuition:,.2f}:")

    fee_kolkata = kolkata_center_calc(base_tuition)
    print(f"   * Kolkata Center Fee    : INR {fee_kolkata:,.2f}")

    fee_barrackpore = barrackpore_center_calc(base_tuition)
    print(f"   * Barrackpore Center Fee: INR {fee_barrackpore:,.2f}")

    print("\n[PASSED] Function Returning & Factory Pattern Verified.")


if __name__ == "__main__":
    demonstrate_function_factories()
