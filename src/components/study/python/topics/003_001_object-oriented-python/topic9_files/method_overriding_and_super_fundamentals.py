# topic9_files/method_overriding_and_super_fundamentals.py
# Module: 003_001_object-oriented-python
# Topic: Method Overriding & super() function
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 1: Method Overriding & super() Fundamentals
Demonstrates:
  1. Method Overriding: Redefining a parent method in a child subclass
  2. Extending Parent Behavior: Calling `super().method_name()` to augment existing logic
  3. Total Replacement: Overriding a method completely without delegating to `super()`
  4. Modern zero-argument `super()` in Python 3 vs legacy `super(Child, self)`
"""

class BaseStudentReport:
    """Base parent report generator."""

    def __init__(self, student_name: str, total_marks: float):
        self.student_name = student_name
        self.total_marks = float(total_marks)

    def generate_report(self) -> str:
        """Base report logic."""
        return (
            f"--- ACADEMIC PERFORMANCE REPORT ---\n"
            f"Student: {self.student_name}\n"
            f"Total Marks: {self.total_marks:.1f} / 500"
        )


class HonorsStudentReport(BaseStudentReport):
    """Subclass EXTENDING parent report logic via super()."""

    def __init__(self, student_name: str, total_marks: float, thesis_title: str):
        # 1. Constructor Chaining via zero-argument super()
        super().__init__(student_name, total_marks)
        self.thesis_title = thesis_title

    def generate_report(self) -> str:
        # 2. Method Overriding: Extend base report with honors-specific data
        base_content = super().generate_report()
        return (
            f"{base_content}\n"
            f"Degree Track: Honors with Distinction\n"
            f"Senior Thesis: '{self.thesis_title}'"
        )


class ExpelledStudentReport(BaseStudentReport):
    """Subclass COMPLETELY REPLACING parent report logic (No super call)."""

    def generate_report(self) -> str:
        # 3. Total Replacement: completely ignores BaseStudentReport.generate_report
        return (
            f"--- DISCIPLINARY NOTICE ---\n"
            f"Student: {self.student_name}\n"
            f"Status: ENROLLMENT TERMINATED (Expelled due to misconduct)"
        )


def demonstrate_overriding_and_super():
    print("=" * 70)
    print("CODER & ACCOTAX - METHOD OVERRIDING & super() FUNDAMENTALS")
    print("=" * 70)

    # 1. Base Class Report
    base = BaseStudentReport("Souvik Ghosh", 380.0)
    print("1. Base Class Report:")
    print(base.generate_report())
    print("-" * 50)

    # 2. Extended Subclass Report (via super())
    honors = HonorsStudentReport("Priyanka Sen", 485.0, "Distributed Microservices in Python")
    print("\n2. Subclass Extending Parent via super().generate_report():")
    print(honors.generate_report())
    print("-" * 50)

    # 3. Completely Replaced Subclass Report
    expelled = ExpelledStudentReport("Rahul Verma", 150.0)
    print("\n3. Subclass Completely Overriding Parent (Zero super delegation):")
    print(expelled.generate_report())

    print("\n[PASSED] Method Overriding & super() Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_overriding_and_super()
