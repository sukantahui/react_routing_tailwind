# topic7_files/refactoring_from_attributes_to_properties.py
# Module: 003_001_object-oriented-python
# Topic: Properties & Getters/Setters with @property
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: The Uniform Access Principle & Seamless Refactoring
Demonstrates:
  1. Starting simple: Standard public attributes in Python (Pythonic simplicity)
  2. Refactoring to `@property` with validation WITHOUT breaking any existing caller code
  3. Why Python does NOT require upfront boilerplate getters/setters like Java or C++
"""

# =====================================================================
# V1: EARLY PROTOTYPE (Simple Public Attribute)
# =====================================================================
class BookOrderV1:
    def __init__(self, title: str, price: float):
        self.title = title
        self.price = price  # Plain public attribute


# =====================================================================
# V2: PRODUCTION REFACTOR (Seamlessly Converted to @property)
# =====================================================================
class BookOrderV2:
    def __init__(self, title: str, price: float):
        self.title = title
        self.price = price  # Seamlessly routes through setter below!

    @property
    def price(self) -> float:
        return self._price

    @price.setter
    def price(self, new_price: float):
        if new_price < 0:
            raise ValueError(f"Price cannot be negative: INR {new_price}")
        self._price = float(new_price)


def demonstrate_uniform_access():
    print("=" * 70)
    print("CODER & ACCOTAX - THE UNIFORM ACCESS PRINCIPLE")
    print("=" * 70)

    # Client Code written for V1:
    v1 = BookOrderV1("Python Core", 450.0)
    v1.price = 500.0  # Plain attribute assignment
    print(f"V1 Order: {v1.title} -> INR {v1.price:,.2f}")

    # The SAME exact client code executed on V2 (Zero Changes Needed!):
    v2 = BookOrderV2("Python Advanced", 650.0)
    v2.price = 700.0  # Routes through @price.setter automatically!
    print(f"V2 Order: {v2.title} -> INR {v2.price:,.2f}")

    print(r"""
Takeaway:
  In Python, you NEVER need to write premature `get_price()` / `set_price()` methods!
  Start with plain attributes. If you ever need validation or computed logic later,
  refactor to `@property` without breaking a single line of external client code!
""")
    print("[PASSED] Uniform Access Principle Verified.")


if __name__ == "__main__":
    demonstrate_uniform_access()
