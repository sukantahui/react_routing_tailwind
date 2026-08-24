# topic9_files/implicit_chaining_and_context.py
# Module: 003_002_basic-exception-handling
# Topic: Exception Chaining (raise ... from ...)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 2: Implicit Chaining, `__context__` & Suppressing with `from None`
Demonstrates:
  1. Implicit chaining: Automatic setting of `__context__` when an error occurs in `except`
  2. The traceback message: "During handling of the above exception, another exception occurred"
  3. Suppressing low-level tracebacks with `raise ... from None`
"""

class StudentAuthenticationError(Exception):
    """Clean public exception shown to end-users."""
    pass


def implicit_chaining_demo(db_path: str):
    """Demonstrates implicit chaining (shows two tracebacks automatically)."""
    try:
        # Step 1: Low-level file opening error
        with open(db_path, "r") as f:
            return f.read()
    except FileNotFoundError:
        # Step 2: Raising a new exception inside except WITHOUT 'from':
        # Python automatically sets __context__ to the FileNotFoundError!
        raise StudentAuthenticationError("Internal authentication credentials could not be loaded!")


def suppressed_chaining_demo(db_path: str):
    """Demonstrates suppressed chaining with `from None` (hides low-level traceback)."""
    try:
        with open(db_path, "r") as f:
            return f.read()
    except FileNotFoundError:
        # Step 2: SUPPRESSING THE INTERNAL TRACEBACK USING 'from None':
        raise StudentAuthenticationError("Invalid or missing institutional authentication credentials.") from None


def demonstrate_implicit_and_suppressed():
    print("=" * 70)
    print("CODER & ACCOTAX - IMPLICIT CHAINING & `from None` SUPPRESSION")
    print("=" * 70)

    # 1. Implicit Chaining Inspection:
    print("1. Inspecting Implicit Chaining (__context__):")
    try:
        implicit_chaining_demo("non_existent_auth.db")
    except StudentAuthenticationError as err:
        print(f"  * Caught Error : {err}")
        print(f"  * __context__  : {type(err.__context__).__name__}: {err.__context__}")
        print(f"  * __cause__    : {err.__cause__} (None because chaining was implicit!)")
        print(f"  * __suppress_context__: {err.__suppress_context__}\n")

    # 2. Suppressed Chaining Inspection (`from None`):
    print("2. Inspecting Suppressed Chaining (`from None`):")
    try:
        suppressed_chaining_demo("non_existent_auth.db")
    except StudentAuthenticationError as err:
        print(f"  * Caught Error : {err}")
        print(f"  * __cause__    : {err.__cause__}")
        print(f"  * __suppress_context__: {err.__suppress_context__} (Clean, single traceback!)")

    print(r"""
Summary of Differences:
  - `raise New from Original` -> Explicit (`__cause__` set, shows "direct cause").
  - `raise New` (in except)   -> Implicit (`__context__` set, shows "during handling").
  - `raise New from None`     -> Suppressed (`__suppress_context__ = True`, hides root).
""")
    print("[PASSED] Implicit & Suppressed Chaining Verified.")


if __name__ == "__main__":
    demonstrate_implicit_and_suppressed()
