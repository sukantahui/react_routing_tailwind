# topic6_files/encapsulation_levels_and_name_mangling.py
# Module: 003_001_object-oriented-python
# Topic: Encapsulation & Data Hiding
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 1: Encapsulation Levels & CPython Name Mangling Mechanics
Demonstrates:
  1. Public attributes: `self.name` (No restriction)
  2. Protected convention: `self._balance` (Internal use warning for developers/subclasses)
  3. Private attributes: `self.__pin` (Triggers Name Mangling to `_ClassName__pin`)
  4. Inspecting `__dict__` to prove how Python renames private attributes in RAM
"""

class StudentBankAccount:
    """Demonstrates all 3 encapsulation conventions in Python."""

    def __init__(self, account_holder: str, branch: str, balance: float, pin_code: str):
        # 1. PUBLIC: Accessible everywhere
        self.account_holder = account_holder
        
        # 2. PROTECTED: Single underscore convention (Please don't touch outside class/subclass)
        self._branch = branch
        self._balance = float(balance)

        # 3. PRIVATE: Double underscore triggers CPython Name Mangling
        self.__pin_code = pin_code

    def authenticate_and_check_balance(self, entered_pin: str):
        """Public interface method guarding private data."""
        if entered_pin == self.__pin_code:
            print(f"  [AUTH SUCCESS] Account: {self.account_holder} | Balance: INR {self._balance:,.2f}")
            return True
        print("  [AUTH FAILED] Invalid PIN Code!")
        return False


def demonstrate_access_levels():
    print("=" * 70)
    print("1. PUBLIC, PROTECTED & PRIVATE ACCESS BEHAVIOR")
    print("=" * 70)

    acc = StudentBankAccount("Debolina Mukherjee", "Barrackpore Main", 15000.0, "7421")

    # 1. Public Access
    print(f"1. Public Attribute (acc.account_holder) : '{acc.account_holder}'")

    # 2. Protected Access (Allowed by Python runtime, but violates convention)
    print(f"2. Protected Attribute (acc._branch)      : '{acc._branch}' (Discouraged by PEP 8)")

    # 3. Direct Private Access (Fails with AttributeError)
    print("\n3. Attempting Direct Private Access: `acc.__pin_code`")
    try:
        print(acc.__pin_code)
    except AttributeError as err:
        print(f"   [BLOCKED] AttributeError: {err}")


def demonstrate_name_mangling():
    print("\n" + "=" * 70)
    print("2. UNDER THE HOOD: CPYTHON NAME MANGLING")
    print("=" * 70)

    acc = StudentBankAccount("Debolina Mukherjee", "Barrackpore Main", 15000.0, "7421")

    print(r"""
How Python handles double underscores:
  - When Python sees `__attr` inside a class definition `ClassName`,
    it automatically renames it internally to `_ClassName__attr`.
""")

    print(f"Actual keys in acc.__dict__:")
    for key, val in acc.__dict__.items():
        print(f"  * {key:<28} : {val}")

    print("\nAccessing via the mangled name: `acc._StudentBankAccount__pin_code`:")
    print(f"  Mangled Value Revealed: '{acc._StudentBankAccount__pin_code}'")
    print("\nTakeaway: In Python, private variables are NOT encrypted; they are mangled to prevent accidental collisions!")


if __name__ == "__main__":
    demonstrate_access_levels()
    demonstrate_name_mangling()
