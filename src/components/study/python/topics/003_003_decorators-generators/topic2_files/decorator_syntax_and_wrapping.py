# topic2_files/decorator_syntax_and_wrapping.py
# Module: 003_003_decorators-generators
# Topic: Understanding Decorators: Concept and @decorator syntax
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: Decorator Concept & @decorator Syntactic Sugar
Demonstrates:
  1. What a Decorator is (A higher-order function that takes a function and returns a wrapper)
  2. How `@decorator` syntax is identical to `func = decorator(func)`
  3. Writing a clean execution banner and logging decorator
"""

def banner_logger_decorator(original_func):
    """Decorator that wraps a function with visual execution banners."""

    def wrapper():
        print(f"\n>>> [START OF EXECUTION]: {original_func.__name__}() <<<")
        result = original_func()
        print(f">>> [END OF EXECUTION]: {original_func.__name__}() <<<\n")
        return result

    return wrapper


# 1. Manual Wrapping (Without @ Syntax):
def manual_generate_report():
    print("  [REPORT GENERATOR] Compiling Institutional Daily Attendance...")
    return "ATTENDANCE_OK"

# Applying decorator manually:
decorated_report = banner_logger_decorator(manual_generate_report)


# 2. Modern Pythonic @decorator Syntax (Identical to manual wrapping!):
@banner_logger_decorator
def automated_generate_report():
    print("  [REPORT GENERATOR] Compiling Certified Revenue & Tuition Audit...")
    return "REVENUE_OK"


def demonstrate_decorator_syntax():
    print("=" * 70)
    print("CODER & ACCOTAX - DECORATOR SYNTAX & WRAPPING FUNDAMENTALS")
    print("=" * 70)

    # 1. Calling manually decorated function:
    print("1. Invoking Manually Wrapped Function (`decorated_report = decorator(func)`):")
    res1 = decorated_report()
    print(f"   Returned Result: {res1}")

    # 2. Calling function decorated with `@` syntax:
    print("2. Invoking Function with `@banner_logger_decorator` Syntactic Sugar:")
    res2 = automated_generate_report()
    print(f"   Returned Result: {res2}")

    print(r"""
The Fundamental Equivalence:
  @my_decorator
  def target_function():
      pass

  Is 100% equivalent to:
  def target_function():
      pass
  target_function = my_decorator(target_function)
""")
    print("[PASSED] Decorator Syntax & Wrapping Verified.")


if __name__ == "__main__":
    demonstrate_decorator_syntax()
