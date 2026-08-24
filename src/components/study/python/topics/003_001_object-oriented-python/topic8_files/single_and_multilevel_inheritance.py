# topic8_files/single_and_multilevel_inheritance.py
# Module: 003_001_object-oriented-python
# Topic: Inheritance: Single, Multiple, Multilevel, and Hierarchical
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 1: Single & Multilevel Inheritance Mechanics
Demonstrates:
  1. Single Inheritance: Derived class inheriting directly from 1 base class
  2. Multilevel Inheritance: Chained linear hierarchy (Grandparent -> Parent -> Child)
  3. Constructor chaining using `super().__init__()`
  4. Type reflection using `isinstance()` and `issubclass()`
"""

# =====================================================================
# 1. BASE CLASS (Grandparent in Multilevel Chain)
# =====================================================================
class Person:
    """Root entity capturing basic human identification."""
    def __init__(self, full_name: str, national_id: str, email: str):
        self.full_name = full_name
        self.national_id = national_id
        self.email = email

    def get_basic_info(self) -> str:
        return f"Person: {self.full_name} <{self.email}>"


# =====================================================================
# 2. SINGLE INHERITANCE (Parent)
# =====================================================================
class InstituteStaff(Person):
    """Single Inheritance: Inherits from Person and adds employment details."""
    def __init__(self, full_name: str, national_id: str, email: str, emp_id: str, department: str, base_salary: float):
        super().__init__(full_name, national_id, email)
        self.emp_id = emp_id
        self.department = department
        self.base_salary = float(base_salary)

    def get_employment_summary(self) -> str:
        return f"Staff [{self.emp_id}]: {self.full_name} | Dept: {self.department} | Salary: INR {self.base_salary:,.2f}"


# =====================================================================
# 3. MULTILEVEL INHERITANCE (Child)
# =====================================================================
class DepartmentHead(InstituteStaff):
    """Multilevel Inheritance: Person -> InstituteStaff -> DepartmentHead."""
    def __init__(self, full_name: str, national_id: str, email: str, emp_id: str, department: str, base_salary: float, budget_inr: float):
        super().__init__(full_name, national_id, email, emp_id, department, base_salary)
        self.annual_budget = float(budget_inr)
        self.managed_faculty = []

    def allocate_funds(self, amount: float, purpose: str):
        if amount > self.annual_budget:
            print(f"  [OVERBUDGET] Allocation of INR {amount:,.2f} exceeds department budget!")
            return
        self.annual_budget -= amount
        print(f"  [BUDGET ALLOCATED] {self.department}: INR {amount:,.2f} for '{purpose}' | Remaining: INR {self.annual_budget:,.2f}")


def demonstrate_single_and_multilevel():
    print("=" * 70)
    print("CODER & ACCOTAX - SINGLE & MULTILEVEL INHERITANCE")
    print("=" * 70)

    # Instantiate Multilevel Child Class
    hod = DepartmentHead(
        full_name="Prof. Sourav Bhattacharya",
        national_id="AADH-9988-1122",
        email="sourav.hod@codernaccotax.co.in",
        emp_id="HOD-CS-01",
        department="Computer Science & AI",
        base_salary=95000.0,
        budget_inr=500000.0
    )

    # 1. Access Grandparent Method (Person)
    print(f"1. Method from Grandparent (Person) : {hod.get_basic_info()}")

    # 2. Access Parent Method (InstituteStaff)
    print(f"2. Method from Parent (Staff)       : {hod.get_employment_summary()}")

    # 3. Access Own Method (DepartmentHead)
    print("\n3. Invoking Child Method:")
    hod.allocate_funds(75000.0, "High-Performance GPU Server Upgrade")

    # 4. Type & Subclass Introspection
    print("\n" + "=" * 70)
    print("4. TYPE & SUBCLASS INSPECTION MATRIX")
    print("=" * 70)
    print(f"isinstance(hod, DepartmentHead)  : {isinstance(hod, DepartmentHead)}")
    print(f"isinstance(hod, InstituteStaff)  : {isinstance(hod, InstituteStaff)} (Inherited Parent)")
    print(f"isinstance(hod, Person)          : {isinstance(hod, Person)} (Inherited Grandparent)")
    print(f"isinstance(hod, object)          : {isinstance(hod, object)} (Root Python Object)")
    print(f"issubclass(DepartmentHead, Person): {issubclass(DepartmentHead, Person)}")

    print("\n[PASSED] Single & Multilevel Inheritance Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_single_and_multilevel()
