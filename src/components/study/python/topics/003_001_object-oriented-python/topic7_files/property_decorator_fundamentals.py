# topic7_files/property_decorator_fundamentals.py
# Module: 003_001_object-oriented-python
# Topic: Properties & Getters/Setters with @property
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: @property Decorator, Setters & Deleters Fundamentals
Demonstrates:
  1. Defining managed getter attributes via `@property`
  2. Defining validated setter mutators via `@<attr>.setter`
  3. Defining cleanup hooks via `@<attr>.deleter`
  4. The classic infinite recursion bug in setters (`self.val = val` vs `self._val = val`)
"""

class StudentFeeRecord:
    """Demonstrates getter, setter, and deleter descriptors on course fees."""

    def __init__(self, student_name: str, initial_fee: float):
        self.student_name = student_name
        # Use setter directly to ensure validation:
        self.fee = initial_fee

    # =================================================================
    # 1. THE GETTER (@property)
    # =================================================================
    @property
    def fee(self) -> float:
        """Getter: returns the internal protected _fee attribute."""
        return self._fee

    # =================================================================
    # 2. THE SETTER (@<property>.setter)
    # =================================================================
    @fee.setter
    def fee(self, value: float):
        """Setter: validates invariants before mutating self._fee."""
        if not isinstance(value, (int, float)):
            raise TypeError(f"Fee must be a numeric value, got {type(value).__name__}!")
        if value < 0:
            raise ValueError(f"Fee cannot be negative: INR {value}")
        if value > 100000.0:
            raise ValueError(f"Fee exceeds institutional maximum limit of INR 100,000.00!")

        # CAUTION: Must assign to self._fee (NOT self.fee, which causes infinite recursion!)
        self._fee = float(value)
        print(f"  [SETTER] Updated fee for {self.student_name} -> INR {self._fee:,.2f}")

    # =================================================================
    # 3. THE DELETER (@<property>.deleter)
    # =================================================================
    @fee.deleter
    def fee(self):
        """Deleter: clears fee record and marks as scholarship waiver."""
        print(f"  [DELETER] Fee attribute deleted for {self.student_name}; scholarship waiver applied.")
        del self._fee


def demonstrate_property_basics():
    print("=" * 70)
    print("1. THE @property GETTER & SETTER IN ACTION")
    print("=" * 70)

    # 1. Instantiation (Triggers Setter)
    record = StudentFeeRecord("Debanjan Roy", 18000.0)

    # 2. Reading via Getter (Syntactically looks like a plain attribute!)
    print(f"\nReading fee via getter (record.fee): INR {record.fee:,.2f}")

    # 3. Mutating via Setter
    print("\nUpdating fee to INR 22,000.00 via setter:")
    record.fee = 22000.0

    # 4. Invariant Validation Guard in Action
    print("\nAttempting invalid assignment: `record.fee = -5000.0`:")
    try:
        record.fee = -5000.0
    except ValueError as err:
        print(f"  [BLOCKED] ValueError: {err}")

    # 5. Deleter
    print("\nExecuting: `del record.fee`:")
    del record.fee


if __name__ == "__main__":
    demonstrate_property_basics()
