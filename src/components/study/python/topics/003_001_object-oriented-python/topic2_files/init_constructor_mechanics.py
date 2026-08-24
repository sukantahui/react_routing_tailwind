# topic2_files/init_constructor_mechanics.py
# Module: 003_001_object-oriented-python
# Topic: Constructors & the __init__() method
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: Constructor Mechanics, Parameter Validation & Return None Rule
Demonstrates:
  1. Defining __init__(self, ...) with mandatory and default arguments
  2. Guarding invariants via input validation inside __init__
  3. Why __init__ must return None (attempting to return a value raises TypeError)
  4. Explicit attribute binding to the instance namespace
"""

class CourseEnrollment:
    """Represents a validated student enrollment."""

    def __init__(self, student_id: str, full_name: str, course_fee: float, discount_percent: float = 0.0):
        # 1. Parameter Validation Guards
        if not student_id or not full_name:
            raise ValueError("Student ID and Full Name cannot be empty strings!")
        if course_fee <= 0:
            raise ValueError(f"Course fee must be positive: INR {course_fee}")
        if not (0.0 <= discount_percent <= 50.0):
            raise ValueError(f"Discount must be between 0% and 50%: {discount_percent}%")

        # 2. Attribute Binding
        self.student_id = student_id
        self.full_name = full_name
        self.course_fee = float(course_fee)
        self.discount_percent = float(discount_percent)
        
        # Computed attribute
        self.net_fee = self.course_fee * (1 - (self.discount_percent / 100))

    def get_summary(self) -> str:
        return (
            f"Enrollment [{self.student_id}]: {self.full_name} | "
            f"Gross: INR {self.course_fee:,.2f} | Discount: {self.discount_percent}% | "
            f"Net Due: INR {self.net_fee:,.2f}"
        )


def demonstrate_constructor_mechanics():
    print("=" * 70)
    print("1. VALIDATED CONSTRUCTOR INITIALIZATION")
    print("=" * 70)

    # Valid Instantiation
    enrollment = CourseEnrollment("ENR-2026-01", "Souvik Ghosh", 15000.0, 10.0)
    print("Successfully Initialized Object:")
    print(f"  * {enrollment.get_summary()}")

    # Demonstrating Validation Guard in Action
    print("\nAttempting invalid enrollment (Discount: 75%):")
    try:
        invalid_enr = CourseEnrollment("ENR-99", "Tester", 10000.0, 75.0)
    except ValueError as err:
        print(f"  [CONSTRUCTOR BLOCKED] ValueError: {err}")


def demonstrate_return_none_rule():
    print("\n" + "=" * 70)
    print("2. WHY __init__ MUST ALWAYS RETURN None")
    print("=" * 70)
    print(r"""
Rule:
  - In Python, `__new__` creates and returns the new object.
  - `__init__` is only responsible for mutating that object (binding attributes).
  - If you write `return 42` inside `__init__`, Python immediately raises:
    `TypeError: __init__() should return None, not 'int'`
""")


if __name__ == "__main__":
    demonstrate_constructor_mechanics()
    demonstrate_return_none_rule()
