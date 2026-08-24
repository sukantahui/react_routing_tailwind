# topic12_files/dunder_arithmetic_and_callable.py
# Module: 003_001_object-oriented-python
# Topic: Magic / Dunder Methods: __str__, __repr__, __len__, __eq__, __add__
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 3: Arithmetic Overloading & Callable Objects (__call__)
Demonstrates:
  1. Arithmetic & Reflected dunders: `__add__`, `__radd__`, `__iadd__`
  2. Callable objects via `__call__` (Objects that can be invoked like functions)
  3. Stateful function objects (Functors) for calculation & caching
"""

from typing import Union, List

class DiscountCouponFunctor:
    """A stateful callable object that computes promotional discounts."""

    def __init__(self, coupon_code: str, discount_rate: float):
        self.coupon_code = coupon_code
        self.discount_rate = float(discount_rate)
        self.usage_count = 0

    # THE CALLABLE DUNDER (__call__)
    def __call__(self, gross_amount: float) -> float:
        """Allows calling `coupon_obj(18000.0)` directly like a function!"""
        self.usage_count += 1
        discount = gross_amount * self.discount_rate
        net = gross_amount - discount
        print(f"  [COUPON EXECUTED] Code '{self.coupon_code}' applied: -INR {discount:,.2f} (Total uses: {self.usage_count})")
        return net


class BillableServiceItem:
    """Represents a billable module supporting arithmetic additions."""

    def __init__(self, item_name: str, cost: float):
        self.item_name = item_name
        self.cost = float(cost)

    # 1. ADDITION (__add__)
    def __add__(self, other: Union["BillableServiceItem", int, float]) -> "BillableServiceItem":
        if isinstance(other, BillableServiceItem):
            return BillableServiceItem(f"{self.item_name} + {other.item_name}", self.cost + other.cost)
        elif isinstance(other, (int, float)):
            return BillableServiceItem(self.item_name, self.cost + float(other))
        return NotImplemented

    # 2. REFLECTED ADDITION (__radd__)
    def __radd__(self, other: Union[int, float]) -> "BillableServiceItem":
        # Allows: 500 + item
        return self.__add__(other)

    # 3. IN-PLACE ADDITION (__iadd__)
    def __iadd__(self, other: Union["BillableServiceItem", int, float]) -> "BillableServiceItem":
        # Allows: item += 1000
        if isinstance(other, BillableServiceItem):
            self.item_name = f"{self.item_name} & {other.item_name}"
            self.cost += other.cost
        elif isinstance(other, (int, float)):
            self.cost += float(other)
        return self

    def __repr__(self) -> str:
        return f"BillableServiceItem({self.item_name!r}, cost=INR {self.cost:,.2f})"


def demonstrate_arithmetic_and_callable():
    print("=" * 70)
    print("CODER & ACCOTAX - ARITHMETIC DUNDERS & CALLABLE OBJECTS")
    print("=" * 70)

    # 1. Callable Object (__call__)
    print("1. Callable Objects (__call__):")
    festive_coupon = DiscountCouponFunctor("DIWALI2026", 0.10)

    # Invoke object directly like a function:
    net1 = festive_coupon(20000.0)
    net2 = festive_coupon(15000.0)
    print(f"   Total times coupon invoked: {festive_coupon.usage_count}\n")

    # 2. Arithmetic Overloading (__add__, __radd__, __iadd__)
    print("2. Arithmetic Overloading (__add__, __radd__, __iadd__):")
    core_python = BillableServiceItem("Core Python", 12000.0)
    adv_oop = BillableServiceItem("Advanced OOP & MRO", 8000.0)

    combo = core_python + adv_oop
    print(f"   combo (core + adv) : {combo}")

    # Reflected Addition (Number + Object):
    combo_with_tax = 1500.0 + combo
    print(f"   with lab fee (+ 1500): {combo_with_tax}")

    # In-place addition (+=):
    core_python += 500.0
    print(f"   core_python += 500 : {core_python}")

    print("\n[PASSED] Arithmetic & Callable Dunders Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_arithmetic_and_callable()
