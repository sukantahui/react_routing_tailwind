# topic8_files/multi_tiered_domain_exception_handling.py
# Module: 003_002_basic-exception-handling
# Topic: Creating User-Defined Custom Exception Classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 3: Hierarchical Exception Dispatch & Ordering Mechanics
Demonstrates:
  1. Catching exceptions from Most Specific (leaf child) to Most General (root ancestor)
  2. The Base Class Shadowing Trap (Unreachable child except blocks)
  3. Polymorphic fallback strategies in microservices
"""

# Base Architecture
class InstituteAppError(Exception):
    """Level 0: General Application Error."""
    pass

class AuthenticationError(InstituteAppError):
    """Level 1: Security & Session Error."""
    pass

class ExpiredTokenError(AuthenticationError):
    """Level 2: Specific Token Expiry."""
    pass

class InvalidPasswordError(AuthenticationError):
    """Level 2: Specific Password Mismatch."""
    pass


def login_student(auth_mode: str):
    if auth_mode == "expired":
        raise ExpiredTokenError("Session expired at 22:30. Please refresh your JWT token.")
    elif auth_mode == "wrong_pwd":
        raise InvalidPasswordError("Password mismatch: 3 failed attempts remaining.")
    elif auth_mode == "network":
        raise InstituteAppError("Gateway communication timeout to authentication server.")
    print("  [LOGIN SUCCESS] Welcome to Coder & AccoTax Student Portal!")


def demonstrate_hierarchical_dispatch():
    print("=" * 70)
    print("CODER & ACCOTAX - HIERARCHICAL EXCEPTION DISPATCH & ORDERING")
    print("=" * 70)

    test_cases = ["expired", "wrong_pwd", "network"]

    for mode in test_cases:
        print(f"Testing Scenario: '{mode}'")
        try:
            login_student(mode)
        # 1. MOST SPECIFIC FIRST:
        except ExpiredTokenError as err:
            print(f"  -> Handled by [ExpiredTokenError Block]: Redirecting to Token Refresh Endpoint! ({err})")
        # 2. INTERMEDIATE GENERAL:
        except AuthenticationError as err:
            print(f"  -> Handled by [AuthenticationError Block]: Showing Password Reset Dialog! ({err})")
        # 3. ROOT ANCESTOR LAST:
        except InstituteAppError as err:
            print(f"  -> Handled by [InstituteAppError Catch-All]: Displaying Generic Network Banner! ({err})")
        print()

    print(r"""
Rule of Ordering:
  Always order except clauses from MOST SPECIFIC (subclass) to MOST GENERAL (base class).
  If `except InstituteAppError` were placed first, it would catch everything, rendering
  the child `ExpiredTokenError` and `AuthenticationError` blocks unreachable!
""")
    print("[PASSED] Hierarchical Exception Dispatch Verified.")


if __name__ == "__main__":
    demonstrate_hierarchical_dispatch()
