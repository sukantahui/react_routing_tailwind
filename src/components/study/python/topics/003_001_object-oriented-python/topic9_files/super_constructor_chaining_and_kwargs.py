# topic9_files/super_constructor_chaining_and_kwargs.py
# Module: 003_001_object-oriented-python
# Topic: Method Overriding & super() function
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 3: super().__init__() Constructor Chaining with **kwargs
Demonstrates:
  1. Forwarding arbitrary keyword arguments (`**kwargs`) up the constructor chain
  2. Mixins extracting their own parameters and forwarding remainder to next MRO class
  3. Ensuring root `object.__init__` receives 0 extra arguments cleanly
"""

from typing import Optional

class RootEntity:
    """Base class at root of hierarchy; consumes no kwargs before object."""
    def __init__(self, **kwargs):
        # Forward any leftover kwargs to object.__init__ (which expects 0 arguments)
        super().__init__()
        print("  [ROOT INITIALIZED] Reached RootEntity base.")


class CourseInfoMixin(RootEntity):
    """Mixin extracting course title and fee."""
    def __init__(self, course_title: str = "Standard Course", fee: float = 10000.0, **kwargs):
        super().__init__(**kwargs)  # Pass remainder forward
        self.course_title = course_title
        self.fee = float(fee)
        print(f"  [COURSE MIXIN INITIALIZED] Title: '{self.course_title}', Fee: INR {self.fee:,.2f}")


class DiscountAllowanceMixin(RootEntity):
    """Mixin extracting scholarship vouchers."""
    def __init__(self, discount_inr: float = 0.0, coupon_code: Optional[str] = None, **kwargs):
        super().__init__(**kwargs)  # Pass remainder forward
        self.discount_inr = float(discount_inr)
        self.coupon_code = coupon_code
        print(f"  [DISCOUNT MIXIN INITIALIZED] Discount: -INR {self.discount_inr:,.2f} (Coupon: {self.coupon_code})")


class EnrolledStudentContract(CourseInfoMixin, DiscountAllowanceMixin):
    """Composite Child Class inheriting both mixins with cooperative **kwargs."""
    def __init__(self, student_name: str, **kwargs):
        # Call cooperative chain passing all keyword arguments:
        super().__init__(**kwargs)
        self.student_name = student_name
        self.net_payable = max(0.0, self.fee - self.discount_inr)
        print(f"  [STUDENT CONTRACT READY] {self.student_name} | Net Payable: INR {self.net_payable:,.2f}")


def demonstrate_kwargs_chaining():
    print("=" * 70)
    print("CODER & ACCOTAX - CONSTRUCTOR CHAINING WITH **kwargs")
    print("=" * 70)

    # Instantiate composite child passing dictionary of heterogeneous arguments:
    print("Instantiating EnrolledStudentContract with keyword payload:")
    student = EnrolledStudentContract(
        student_name="Debolina Mukherjee",
        course_title="Python Pro Full-Stack & Machine Learning",
        fee=20000.0,
        discount_inr=3000.0,
        coupon_code="SUPER2026"
    )

    print("\nSummary State of Constructed Object:")
    print(f"  * Student Name : {student.student_name}")
    print(f"  * Course Title : {student.course_title}")
    print(f"  * Gross Fee    : INR {student.fee:,.2f}")
    print(f"  * Discount     : -INR {student.discount_inr:,.2f}")
    print(f"  * Net Payable  : INR {student.net_payable:,.2f}")

    print("\n[PASSED] Keyword-Forwarding Constructor Chaining Verified.")


if __name__ == "__main__":
    demonstrate_kwargs_chaining()
