# topic5_files/class_methods_and_stacked_builtin_decorators.py
# Module: 003_003_decorators-generators
# Topic: Chaining multiple decorators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 3: Stacking Custom & Built-in Decorators on Class Methods
Demonstrates:
  1. Stacking custom decorators with `@classmethod`, `@staticmethod`, and `@property`
  2. The Golden Rule of Built-in Ordering: `@classmethod` / `@staticmethod` MUST be OUTERMOST
  3. Proper `self` and `cls` parameter forwarding
"""

import functools

def audit_method_call(func):
    """Custom decorator logging method execution."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"  [METHOD AUDIT] Invoking `{func.__name__}` with args: {args}")
        return func(*args, **kwargs)
    return wrapper


class StudentCourseRegistry:
    institution = "Coder & AccoTax (Barrackpore)"

    def __init__(self, course_name: str, base_fee: float):
        self.course_name = course_name
        self.base_fee = base_fee

    # 1. Stacking with Instance Method:
    @audit_method_call
    def calculate_net_fee(self, concession_pct: float) -> float:
        return self.base_fee * (1.0 - concession_pct / 100.0)

    # 2. Stacking with @classmethod (RULE: @classmethod MUST BE ON TOP!):
    @classmethod
    @audit_method_call
    def create_ai_batch(cls, base_fee: float):
        print(f"    [FACTORY] Creating AI Batch under {cls.institution}")
        return cls("Python Full-Stack & AI", base_fee)

    # 3. Stacking with @staticmethod (RULE: @staticmethod MUST BE ON TOP!):
    @staticmethod
    @audit_method_call
    def validate_course_code(code: str) -> bool:
        return code.startswith("PY-") or code.startswith("AI-")


def demonstrate_class_decorator_chaining():
    print("=" * 70)
    print("CODER & ACCOTAX - STACKED BUILT-IN & CUSTOM METHOD DECORATORS")
    print("=" * 70)

    # 1. Calling Stacked Class Method Factory:
    print("1. Calling `@classmethod` stacked with `@audit_method_call`:")
    batch = StudentCourseRegistry.create_ai_batch(28000.0)
    print(f"   Instantiated Course: {batch.course_name} (Fee: INR {batch.base_fee:,.2f})\n")

    # 2. Calling Stacked Instance Method:
    print("2. Calling Instance Method with `@audit_method_call`:")
    net = batch.calculate_net_fee(15.0)
    print(f"   Calculated Net Payable: INR {net:,.2f}\n")

    # 3. Calling Stacked Static Method:
    print("3. Calling `@staticmethod` stacked with `@audit_method_call`:")
    is_valid = StudentCourseRegistry.validate_course_code("AI-401")
    print(f"   Is Valid Course Code: {is_valid}")

    print(r"""
The Golden Built-In Decorator Ordering Rule:
  [CORRECT]:
    @classmethod
    @custom_decorator
    def my_method(cls): pass

  [INCORRECT] (Crashes with TypeError):
    @custom_decorator
    @classmethod
    def my_method(cls): pass
""")
    print("[PASSED] Stacked Class Method Decorators Verified.")


if __name__ == "__main__":
    demonstrate_class_decorator_chaining()
