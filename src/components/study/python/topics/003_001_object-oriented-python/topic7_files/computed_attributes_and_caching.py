# topic7_files/computed_attributes_and_caching.py
# Module: 003_001_object-oriented-python
# Topic: Properties & Getters/Setters with @property
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Computed Properties, Read-Only State & cached_property
Demonstrates:
  1. Dynamically computed attributes (e.g. `full_name`, `net_payable`)
  2. Creating Read-Only attributes by defining only a getter without a setter
  3. Performance optimization using `functools.cached_property`
"""

import time
from functools import cached_property
from typing import List

class StudentAcademicProfile:
    """Demonstrates computed dynamic properties and cached performance optimizations."""

    def __init__(self, first_name: str, last_name: str, exam_scores: List[float]):
        self.first_name = first_name.strip()
        self.last_name = last_name.strip()
        self.exam_scores = list(exam_scores)

    # =================================================================
    # 1. COMPUTED DYNAMIC PROPERTY (Read-Only)
    # =================================================================
    @property
    def full_name(self) -> str:
        """Computed on the fly; updates automatically if first_name changes!"""
        return f"{self.first_name} {self.last_name}"

    @property
    def gpa(self) -> float:
        """Calculates current GPA dynamically."""
        if not self.exam_scores:
            return 0.0
        return sum(self.exam_scores) / len(self.exam_scores)

    @property
    def is_honor_roll(self) -> bool:
        """Dynamic boolean property."""
        return self.gpa >= 90.0

    # =================================================================
    # 2. CACHED PROPERTY (Computed once and stored on the instance)
    # =================================================================
    @cached_property
    def comprehensive_tax_audit_report(self) -> str:
        """Simulates an expensive statistical analytics computation."""
        print("  [HEAVY COMPUTATION RUNNING] Parsing large dataset and building report...")
        time.sleep(0.05)  # Simulated computation delay
        return f"AUDIT-PASSED: Comprehensive Student Score Variance = {sum(self.exam_scores) * 1.05:.2f}"


def demonstrate_computed_and_cached():
    print("=" * 70)
    print("CODER & ACCOTAX - COMPUTED PROPERTIES & CACHING")
    print("=" * 70)

    student = StudentAcademicProfile("Sourav", "Mukherjee", [88.0, 94.5, 91.0, 89.5])

    # 1. Computed Full Name
    print(f"1. Computed Full Name : '{student.full_name}'")
    print(f"   Computed GPA       : {student.gpa:.2f}")
    print(f"   Honor Roll Status  : {student.is_honor_roll}\n")

    # 2. Read-Only Protection
    print("2. Attempting to overwrite read-only property: `student.full_name = 'New Name'`:")
    try:
        student.full_name = "New Name"
    except AttributeError as err:
        print(f"   [PROTECTED] AttributeError: {err}\n")

    # 3. Cached Property Performance
    print("3. Accessing @cached_property (First Time - Executes Function):")
    rep1 = student.comprehensive_tax_audit_report
    print(f"   Result: {rep1}\n")

    print("4. Accessing @cached_property (Second Time - Served Instantly from RAM Cache):")
    rep2 = student.comprehensive_tax_audit_report
    print(f"   Result: {rep2}")

    print("\n[PASSED] Computed & Cached Properties Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_computed_and_cached()
