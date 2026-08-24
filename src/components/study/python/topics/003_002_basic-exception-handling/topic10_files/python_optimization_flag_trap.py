# topic10_files/python_optimization_flag_trap.py
# Module: 003_002_basic-exception-handling
# Topic: Using assertions with assert for internal invariant checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 2: The Optimization Flag (-O) & The Tuple Trap
Demonstrates:
  1. The Python `__debug__` constant and how `-O` strips assertions from bytecode
  2. The Critical Security Flaw: Never use `assert` for user authentication or authorization
  3. The Infamous Assert Tuple Trap: `assert (x > 0, "Error")` is always TRUE!
"""

# =====================================================================
# 1. THE FATAL SECURITY VULNERABILITY (Assert for Auth)
# =====================================================================
def vulnerable_admin_delete_student(user_role: str, student_id: str):
    """FATAL VULNERABILITY: If Python is run with `python -O`, this assertion IS DELETED!"""
    assert user_role == "ADMIN", "Security Violation: Only Admins can delete student records!"
    print(f"  [DANGER: DELETED] Student {student_id} was purged from database by '{user_role}'!")


def secure_admin_delete_student(user_role: str, student_id: str):
    """SECURE: Uses `raise PermissionError` which CANNOT be disabled by optimization flags."""
    if user_role != "ADMIN":
        raise PermissionError(f"Security Violation: Role '{user_role}' is not authorized to delete records!")
    print(f"  [SECURE DELETE] Student {student_id} purged by authorized Admin.")


# =====================================================================
# 2. THE INFAMOUS ASSERT TUPLE TRAP
# =====================================================================
def demonstrate_tuple_trap():
    print("\n--- THE INFAMOUS ASSERT TUPLE TRAP ---")
    score = -50  # Obviously invalid!

    # ❌ THE FATAL SYNTAX ERROR: Putting parentheses around condition and message!
    # In Python, `(False, "Error message")` is a non-empty 2-element tuple.
    # Non-empty tuples ALWAYS evaluate to True in boolean contexts!
    # Therefore, this assertion NEVER FAILS even with negative score!
    assert (score >= 0, "Score cannot be negative!")
    print(f"  [TRAP TRIGGERED] `assert (score >= 0, 'msg')` PASSED SILENTLY on score={score} because non-empty tuples are truthy!")

    # ✓ THE CORRECT SYNTAX (No wrapping parentheses):
    try:
        assert score >= 0, "Score cannot be negative!"
    except AssertionError as err:
        print(f"  [CORRECT SYNTAX] Properly caught AssertionError: {err}")


def demonstrate_optimization_mechanics():
    print("=" * 70)
    print("CODER & ACCOTAX - ASSERT OPTIMIZATION FLAG (-O) & TRAPS")
    print("=" * 70)

    print(f"1. Current Python Execution Mode: `__debug__` = {__debug__}")
    if __debug__:
        print("   (Normal Development Mode: All `assert` statements are actively executing.)")
    else:
        print("   (Optimized Production Mode (-O): All `assert` statements are STRIPPED from bytecode!)")

    # 2. Testing Secure vs Vulnerable Auth
    print("\n2. Testing Unauthorized Deletion (Guest User):")
    try:
        secure_admin_delete_student("GUEST", "STU-101")
    except PermissionError as err:
        print(f"   [BLOCKED BY SECURE RAISE] PermissionError: {err}")

    # 3. Tuple Trap Demo
    demonstrate_tuple_trap()

    print(r"""
Key Rules:
  1. NEVER use `assert` for security, permissions, or public API input validation.
  2. NEVER put parentheses around the assert condition and message: `assert cond, msg`.
""")
    print("[PASSED] Optimization Flag Trap & Tuple Trap Demonstrated.")


if __name__ == "__main__":
    demonstrate_optimization_mechanics()
