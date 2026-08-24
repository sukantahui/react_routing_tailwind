# topic4_files/dunder_name_idiom_mechanics.py
# Module: 002_009_modules-packages
# Topic: The __name__ == '__main__' idiom explained with practical use cases
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 1: Mechanics of __name__ and the '__main__' Execution Guard
Demonstrates:
  1. How Python assigns __name__ dynamically based on execution context
  2. Direct execution: __name__ == '__main__'
  3. Import execution: __name__ == 'module_name'
  4. Preventing unwanted side-effect execution during imports
"""

# Module-level functions (always defined regardless of execution mode)
def calculate_circle_area(radius: float) -> float:
    """Computes area of circle given radius."""
    import math
    return math.pi * (radius ** 2)


def calculate_rectangle_area(length: float, width: float) -> float:
    """Computes area of rectangle."""
    return length * width


# The Canonical Execution Guard
if __name__ == "__main__":
    print("=" * 65)
    print(f"DIRECT EXECUTION DETECTED: __name__ == '{__name__}'")
    print("=" * 65)
    print("This code runs ONLY when you execute: python dunder_name_idiom_mechanics.py")
    print("It will NEVER run when another file writes: import dunder_name_idiom_mechanics\n")

    r = 7.0
    print(f"Area of circle (r={r}): {calculate_circle_area(r):.2f} sq.units")
    print(f"Area of rectangle (10x5): {calculate_rectangle_area(10, 5)} sq.units")
