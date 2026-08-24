# topic1_files/object_namespaces_and_dict.py
# Module: 003_001_object-oriented-python
# Topic: Classes, Instances & Objects: syntax and lifecycle
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: Object Namespaces & The __dict__ Attribute Table
Demonstrates:
  1. How instances store attributes in their private __dict__ mapping
  2. How classes store shared class variables and methods in Class.__dict__
  3. The attribute resolution order (Instance.__dict__ -> Class.__dict__ -> AttributeError)
  4. Dynamically modifying object state via __dict__
"""

class Employee:
    """Class blueprint with shared class metadata."""
    company_name = "Coder & AccoTax"
    base_currency = "INR"

    def __init__(self, emp_id: str, name: str, salary: float):
        self.emp_id = emp_id
        self.name = name
        self.salary = salary


def inspect_namespaces():
    print("=" * 70)
    print("1. INSTANCE NAMESPACE VS CLASS NAMESPACE")
    print("=" * 70)

    emp1 = Employee("EMP-101", "Sourav Bhattacharya", 45000.0)
    emp2 = Employee("EMP-102", "Moumita Sen", 55000.0)

    print("Employee 1's instance __dict__:")
    for k, v in emp1.__dict__.items():
        print(f"  * {k:<12} : {v}")

    print("\nEmployee 2's instance __dict__:")
    for k, v in emp2.__dict__.items():
        print(f"  * {k:<12} : {v}")

    print("\nClass Level __dict__ Keys (Sample):")
    sample_class_keys = [k for k in Employee.__dict__.keys() if not k.startswith("__")][:4]
    print(f"  * {sample_class_keys}")


def demonstrate_attribute_lookup_resolution():
    print("\n" + "=" * 70)
    print("2. ATTRIBUTE LOOKUP RESOLUTION ENGINE")
    print("=" * 70)

    emp = Employee("EMP-103", "Kallol Das", 60000.0)

    print("Lookup Step 1: `emp.name`")
    print(f"  -> Found directly in emp.__dict__: '{emp.name}'")

    print("\nLookup Step 2: `emp.company_name`")
    print("  -> Not in emp.__dict__!")
    print(f"  -> Python searches Employee.__dict__ and finds: '{emp.company_name}'")

    print("\nLookup Step 3: Shadowing a class attribute on an instance:")
    emp.company_name = "Coder & AccoTax (Consulting Wing)"
    print(f"  -> Now in emp.__dict__: '{emp.__dict__['company_name']}'")
    print(f"  -> Original Class.__dict__ unchanged: '{Employee.company_name}'")


if __name__ == "__main__":
    inspect_namespaces()
    demonstrate_attribute_lookup_resolution()
