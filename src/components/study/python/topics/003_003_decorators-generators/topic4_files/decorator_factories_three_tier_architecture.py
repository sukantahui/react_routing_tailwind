# topic4_files/decorator_factories_three_tier_architecture.py
# Module: 003_003_decorators-generators
# Topic: Decorators with arguments & functools.wraps preservation
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 1: 3-Tier Decorator Factory Architecture
Demonstrates:
  1. The 3-Tier nested function structure required for Decorators with Arguments
  2. How `@repeat(num_times=3)` evaluates to `func = repeat(num_times=3)(func)`
  3. Preserving function identity using `@functools.wraps(func)`
"""

import functools

# 3-TIER DECORATOR FACTORY ARCHITECTURE:
# Tier 1: Factory Function (Accepts custom decorator arguments)
def repeat_execution(num_times: int = 2, prefix: str = "EXEC"):
    """Tier 1: Decorator Factory that configures how many times to repeat execution."""

    # Tier 2: Actual Decorator Function (Accepts target function)
    def decorator(func):

        # Tier 3: Inner Wrapper Function (Accepts target function's arguments)
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_result = None
            for iteration in range(1, num_times + 1):
                print(f"  [{prefix} #{iteration}/{num_times}] Calling `{func.__name__}`...")
                last_result = func(*args, **kwargs)
            return last_result

        return wrapper

    return decorator


# Applying Decorator with Arguments:
@repeat_execution(num_times=3, prefix="ACADEMIC_AUDIT")
def certify_student_enrollment(student_id: str, student_name: str) -> str:
    """Issues certified student registration certificate."""
    return f"CERT-{student_id}-{student_name.upper().replace(' ', '_')}"


def demonstrate_three_tier_factories():
    print("=" * 70)
    print("CODER & ACCOTAX - 3-TIER DECORATOR FACTORY ARCHITECTURE")
    print("=" * 70)

    # 1. Invoking decorated function:
    print("1. Invoking `@repeat_execution(num_times=3)` decorated function:")
    cert = certify_student_enrollment("STU-101", "Sourav Mukherjee")
    print(f"   Returned Certificate: {cert}\n")

    # 2. Inspecting Preserved Metadata via @functools.wraps:
    print("2. Metadata Preserved with `@functools.wraps`:")
    print(f"   * `__name__` : {certify_student_enrollment.__name__}")
    print(f"   * `__doc__`  : {certify_student_enrollment.__doc__}")

    print(r"""
The 3-Tier Evaluation Sequence:
  @repeat_execution(num_times=3)
  def certify_student_enrollment(...): pass

  Step 1: `decorator = repeat_execution(num_times=3)`  (Tier 1 returns Tier 2)
  Step 2: `wrapper = decorator(certify_student_enrollment)` (Tier 2 returns Tier 3)
  Step 3: `certify_student_enrollment = wrapper`
""")
    print("[PASSED] 3-Tier Decorator Factory Architecture Verified.")


if __name__ == "__main__":
    demonstrate_three_tier_factories()
