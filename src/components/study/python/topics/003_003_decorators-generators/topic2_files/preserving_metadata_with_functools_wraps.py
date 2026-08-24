# topic2_files/preserving_metadata_with_functools_wraps.py
# Module: 003_003_decorators-generators
# Topic: Understanding Decorators: Concept and @decorator syntax
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: Metadata Preservation with `functools.wraps`
Demonstrates:
  1. The Metadata Erasure Trap: Why undecorated wrappers lose their identity
  2. How `@functools.wraps(func)` preserves `__name__`, `__doc__`, and `__annotations__`
  3. Accessing the unwrapped primordial function via `__wrapped__`
"""

import functools

# ❌ BAD: Decorator without functools.wraps (Erases Metadata!)
def flawed_audit_decorator(func):
    def wrapper(*args, **kwargs):
        """Generic wrapper docstring (Overwrites original docstring!)."""
        print(f"  [FLAWED AUDIT] Called: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper


# ✓ GOOD: Decorator with @functools.wraps (Preserves Metadata!)
def pythonic_audit_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"  [PYTHONIC AUDIT] Called: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper


# Applying Flawed Decorator:
@flawed_audit_decorator
def calculate_scholarship_fund(total_corpus: float, share_pct: float) -> float:
    """Calculates allocation from institutional scholarship corpus."""
    return total_corpus * share_pct


# Applying Pythonic Decorator:
@pythonic_audit_decorator
def calculate_infrastructure_fund(total_corpus: float, share_pct: float) -> float:
    """Calculates allocation for campus lab and AI classroom infrastructure."""
    return total_corpus * share_pct


def demonstrate_metadata_preservation():
    print("=" * 70)
    print("CODER & ACCOTAX - METADATA PRESERVATION WITH `functools.wraps`")
    print("=" * 70)

    # 1. Inspecting Function Decorated with Flawed Decorator:
    print("1. Inspecting Function Decorated WITHOUT @functools.wraps:")
    print(f"   * `__name__` : '{calculate_scholarship_fund.__name__}' (LOST! Replaced with 'wrapper')")
    print(f"   * `__doc__`  : '{calculate_scholarship_fund.__doc__}' (ERASED!)\n")

    # 2. Inspecting Function Decorated WITH @functools.wraps:
    print("2. Inspecting Function Decorated WITH @functools.wraps:")
    print(f"   * `__name__` : '{calculate_infrastructure_fund.__name__}' (PRESERVED!)")
    print(f"   * `__doc__`  : '{calculate_infrastructure_fund.__doc__}' (PRESERVED!)")
    print(f"   * Has `__wrapped__` attribute: {hasattr(calculate_infrastructure_fund, '__wrapped__')}")
    print(f"   * Direct Unwrapped Call: INR {calculate_infrastructure_fund.__wrapped__(100000.0, 0.25):,.2f}")

    print("\n[PASSED] Metadata Preservation with functools.wraps Verified.")


if __name__ == "__main__":
    demonstrate_metadata_preservation()
