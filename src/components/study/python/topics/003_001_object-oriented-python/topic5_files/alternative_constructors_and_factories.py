# topic5_files/alternative_constructors_and_factories.py
# Module: 003_001_object-oriented-python
# Topic: Class methods (@classmethod) & Static methods (@staticmethod)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 2: @classmethod Factory Methods & Subclass Polymorphism
Demonstrates:
  1. Creating multiple clean constructors via @classmethod factory methods
  2. The Subclass Polymorphism Advantage: Why `cls(...)` is mandatory instead of `ClassName(...)`
  3. Constructing base and derived class objects through the same factory pattern
"""

import json
from typing import Dict, Any

class BaseCourse:
    """Base Course class with factory constructor."""
    base_tax_rate = 18.0

    def __init__(self, course_id: str, title: str, fee: float):
        self.course_id = course_id
        self.title = title
        self.fee = float(fee)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        """Polymorphic Factory: cls(...) automatically instantiates the calling class!"""
        print(f"  [FACTORY CALLED] Invoked on class: '{cls.__name__}'")
        return cls(
            course_id=data.get("id", "UNSET"),
            title=data.get("title", "Untitled Course"),
            fee=data.get("fee", 0.0)
        )

    def __str__(self) -> str:
        return f"{self.__class__.__name__} [{self.course_id}]: {self.title} (INR {self.fee:,.2f})"


class PremiumCertificationCourse(BaseCourse):
    """Subclass inheriting the factory constructor."""

    def __init__(self, course_id: str, title: str, fee: float, includes_mentorship: bool = True):
        super().__init__(course_id, title, fee)
        self.includes_mentorship = includes_mentorship

    def __str__(self) -> str:
        base_str = super().__str__()
        return f"{base_str} | 1-on-1 Mentorship: {self.includes_mentorship}"


def demonstrate_factory_polymorphism():
    print("=" * 70)
    print("CODER & ACCOTAX - @classmethod FACTORY SUBCLASS POLYMORPHISM")
    print("=" * 70)

    course_data = {
        "id": "PY-PRO-2026",
        "title": "Python Pro Full-Stack & Machine Learning",
        "fee": 22000.0
    }

    # 1. Factory called on BaseCourse -> Returns BaseCourse instance
    print("1. Creating via BaseCourse.from_dict():")
    base_obj = BaseCourse.from_dict(course_data)
    print(f"   Result Type: {type(base_obj)} -> {base_obj}\n")

    # 2. Factory called on Subclass -> Returns PremiumCertificationCourse instance!
    print("2. Creating via PremiumCertificationCourse.from_dict():")
    sub_obj = PremiumCertificationCourse.from_dict(course_data)
    print(f"   Result Type: {type(sub_obj)} -> {sub_obj}")

    print("\n[PASSED] Subclass Polymorphic Factory Instantiation Verified.")


if __name__ == "__main__":
    demonstrate_factory_polymorphism()
