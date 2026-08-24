# topic5_files/classmethod_vs_staticmethod_mechanics.py
# Module: 003_001_object-oriented-python
# Topic: Class methods (@classmethod) & Static methods (@staticmethod)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 1: The Three Method Types in Python (Instance, Class, Static)
Demonstrates:
  1. Instance Methods: Bound to instance (`self`); accesses instance and class state
  2. Class Methods (@classmethod): Bound to class (`cls`); accesses class state and factories
  3. Static Methods (@staticmethod): Unbound utility; accesses neither `self` nor `cls`
  4. Invocation mechanics across both Class and Instance references
"""

class EmployeePayroll:
    """Demonstrates all 3 Python method types within a unified domain."""
    company_name = "Coder & AccoTax"
    standard_work_hours = 40

    def __init__(self, emp_id: str, name: str, hourly_rate: float):
        self.emp_id = emp_id
        self.name = name
        self.hourly_rate = float(hourly_rate)

    # =================================================================
    # 1. INSTANCE METHOD (Receives `self`)
    # =================================================================
    def calculate_weekly_pay(self, hours_worked: float) -> float:
        """Operates on instance state (self.hourly_rate) and class state."""
        overtime_hours = max(0.0, hours_worked - self.standard_work_hours)
        regular_hours = min(hours_worked, self.standard_work_hours)
        gross_pay = (regular_hours * self.hourly_rate) + (overtime_hours * self.hourly_rate * 1.5)
        print(f"  [INSTANCE METHOD] {self.name}: Worked {hours_worked}h -> Gross: INR {gross_pay:,.2f}")
        return gross_pay

    # =================================================================
    # 2. CLASS METHOD (Receives `cls`)
    # =================================================================
    @classmethod
    def set_standard_hours(cls, new_hours: int):
        """Modifies class-level state (cls.standard_work_hours)."""
        cls.standard_work_hours = new_hours
        print(f"  [CLASS METHOD] Standard work hours updated globally to {new_hours}h for {cls.company_name}")

    # =================================================================
    # 3. STATIC METHOD (Receives neither `self` nor `cls`)
    # =================================================================
    @staticmethod
    def validate_pan_card(pan_number: str) -> bool:
        """Pure utility function logically scoped to the Employee domain."""
        clean = pan_number.strip().upper()
        # Indian PAN format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
        is_valid = len(clean) == 10 and clean[:5].isalpha() and clean[5:9].isdigit() and clean[9].isalpha()
        print(f"  [STATIC METHOD] PAN '{pan_number}' validation result: {is_valid}")
        return is_valid


def demonstrate_method_types():
    print("=" * 70)
    print("1. THE THREE METHOD TYPES IN PYTHON")
    print("=" * 70)

    # 1. Instance Method Invocation
    emp = EmployeePayroll("EMP-101", "Sourav Bhattacharya", 600.0)
    emp.calculate_weekly_pay(45.0)

    # 2. Class Method Invocation
    print("\nInvoking Class Method on Class:")
    EmployeePayroll.set_standard_hours(45)
    emp.calculate_weekly_pay(45.0)  # Overtime changes based on class update!

    # 3. Static Method Invocation
    print("\nInvoking Static Method on Class & Instance:")
    EmployeePayroll.validate_pan_card("ABCDE1234F")
    emp.validate_pan_card("INVALID123")


if __name__ == "__main__":
    demonstrate_method_types()
