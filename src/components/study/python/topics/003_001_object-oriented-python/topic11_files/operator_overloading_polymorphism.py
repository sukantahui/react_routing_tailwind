# topic11_files/operator_overloading_polymorphism.py
# Module: 003_001_object-oriented-python
# Topic: Polymorphism & Duck Typing in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 2: Operator Overloading & Built-in Polymorphism
Demonstrates:
  1. Built-in operator polymorphism (`+`, `*`, `len()`) across native types
  2. Custom operator polymorphism via magic methods (`__add__`, `__sub__`, `__mul__`, `__eq__`)
  3. Building a production `MoneyINR` financial class with polymorphic arithmetic
"""

from typing import Union

class MoneyINR:
    """Financial value object supporting polymorphic arithmetic and equality."""

    def __init__(self, amount: Union[int, float]):
        self.amount = round(float(amount), 2)

    # 1. Polymorphic Addition (+)
    def __add__(self, other: Union["MoneyINR", int, float]) -> "MoneyINR":
        if isinstance(other, MoneyINR):
            return MoneyINR(self.amount + other.amount)
        elif isinstance(other, (int, float)):
            return MoneyINR(self.amount + float(other))
        return NotImplemented

    # 2. Polymorphic Subtraction (-)
    def __sub__(self, other: Union["MoneyINR", int, float]) -> "MoneyINR":
        if isinstance(other, MoneyINR):
            return MoneyINR(self.amount - other.amount)
        elif isinstance(other, (int, float)):
            return MoneyINR(self.amount - float(other))
        return NotImplemented

    # 3. Polymorphic Multiplication (*)
    def __mul__(self, multiplier: Union[int, float]) -> "MoneyINR":
        if isinstance(multiplier, (int, float)):
            return MoneyINR(self.amount * multiplier)
        return NotImplemented

    # 4. Polymorphic Equality (==)
    def __eq__(self, other: object) -> bool:
        if isinstance(other, MoneyINR):
            return self.amount == other.amount
        elif isinstance(other, (int, float)):
            return self.amount == float(other)
        return False

    def __repr__(self) -> str:
        return f"MoneyINR(₹{self.amount:,.2f})"

    def __str__(self) -> str:
        return f"INR {self.amount:,.2f}"


def demonstrate_operator_polymorphism():
    print("=" * 70)
    print("CODER & ACCOTAX - OPERATOR OVERLOADING & POLYMORPHISM")
    print("=" * 70)

    # 1. Built-in Polymorphic '+' operator across built-in types:
    print("1. Built-in '+' Operator Polymorphism:")
    print(f"   * Integers: 10 + 20          = {10 + 20}")
    print(f"   * Strings : 'Hello ' + 'World' = {'Hello ' + 'World'}")
    print(f"   * Lists   : [1, 2] + [3, 4]    = {[1, 2] + [3, 4]}\n")

    # 2. Custom MoneyINR Operator Polymorphism:
    m1 = MoneyINR(18000.0)
    m2 = MoneyINR(4500.0)

    print("2. Custom Domain Operator Polymorphism (MoneyINR):")
    print(f"   m1 = {m1}, m2 = {m2}")
    print(f"   * Addition (m1 + m2)     : {m1 + m2}")
    print(f"   * Subtraction (m1 - m2)  : {m1 - m2}")
    print(f"   * Scaling (m1 * 1.18 GST): {m1 * 1.18}")
    print(f"   * Equality (m1 == 18000) : {m1 == 18000.0}")

    print("\n[PASSED] Operator Polymorphism Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_operator_polymorphism()
