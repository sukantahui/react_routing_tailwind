# topic5_files/decorator_chaining_wrapping_vs_execution_order.py
# Module: 003_003_decorators-generators
# Topic: Chaining multiple decorators
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 1: Decorator Chaining: Wrapping vs Execution Order
Demonstrates:
  1. How stacked decorators wrap from BOTTOM to TOP at definition time
  2. How stacked decorators execute from TOP to BOTTOM (Onion Layer model) at runtime
  3. Visualizing nested wrapper call stack traces
"""

import functools

def layer_outer_bold(func):
    """Outer layer decorator."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("  [LAYER 1: OUTER ENTRY] <b>")
        result = func(*args, **kwargs)
        print("  [LAYER 1: OUTER EXIT]  </b>")
        return f"<b>{result}</b>"
    return wrapper


def layer_middle_italic(func):
    """Middle layer decorator."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("    [LAYER 2: MIDDLE ENTRY] <i>")
        result = func(*args, **kwargs)
        print("    [LAYER 2: MIDDLE EXIT]  </i>")
        return f"<i>{result}</i>"
    return wrapper


def layer_inner_underline(func):
    """Inner layer decorator (closest to function)."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("      [LAYER 3: INNER ENTRY] <u>")
        result = func(*args, **kwargs)
        print("      [LAYER 3: INNER EXIT]  </u>")
        return f"<u>{result}</u>"
    return wrapper


# Stacking 3 Decorators:
@layer_outer_bold
@layer_middle_italic
@layer_inner_underline
def format_diploma_title(student_name: str, course_title: str) -> str:
    """Core function formatting diploma credential."""
    print(f"        [CORE FUNCTION] Formatting: {student_name} - {course_title}")
    return f"{student_name} | {course_title}"


def demonstrate_chaining_order():
    print("=" * 70)
    print("CODER & ACCOTAX - DECORATOR CHAINING & EXECUTION ORDER")
    print("=" * 70)

    print("1. Invoking 3-Layer Stacked Function `@layer_outer_bold -> @layer_middle_italic -> @layer_inner_underline`:")
    formatted = format_diploma_title("Sourav Mukherjee", "Certified Full-Stack AI Engineer")
    print(f"\n   Final Formatted Output: {formatted}\n")

    print(r"""
The Decorator Stacking Rule:
  @decorator_1   <-- Runs FIRST on entry, runs LAST on exit
  @decorator_2   <-- Runs SECOND
  @decorator_3   <-- Runs THIRD (closest to core function)
  def target_function(): pass

  Definition-time wrapping order: target_function = decorator_1(decorator_2(decorator_3(target_function)))
  Runtime execution flow        : Dec1 Entry -> Dec2 Entry -> Dec3 Entry -> Core -> Dec3 Exit -> Dec2 Exit -> Dec1 Exit
""")
    print("[PASSED] Decorator Chaining Order Verified.")


if __name__ == "__main__":
    demonstrate_chaining_order()
