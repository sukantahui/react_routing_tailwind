"""
================================================================================
CBSE CLASS XI COMPUTER SCIENCE (083) - UNIT II
MODULE 004_004: PYTHON ERRORS & DEBUGGING LABORATORY
Topic: Error Taxonomy Demonstrator (Syntax, Logical, Runtime) & Exception Interceptors
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

from typing import Any, Tuple


def demonstrate_logical_error() -> None:
    """Demonstrates a silent logical calculation error vs the mathematically correct formula."""
    print("=" * 70)
    print("1. LOGICAL ERROR DEMONSTRATION (Silent Semantic Bug)")
    print("=" * 70)

    physics_marks = 85
    chemistry_marks = 95

    # Flawed Logic (Missing parentheses): Calculates 85 + (95 / 2)
    flawed_average = physics_marks + chemistry_marks / 2

    # Correct Logic: Calculates (85 + 95) / 2
    correct_average = (physics_marks + chemistry_marks) / 2

    print(f"Physics: {physics_marks}, Chemistry: {chemistry_marks}")
    print(f"[FLAWED FORMULA]  marks1 + marks2 / 2   = {flawed_average}  (INCORRECT!)")
    print(f"[CORRECT FORMULA] (marks1 + marks2) / 2 = {correct_average}  (CORRECT ✓)")
    print("Notice: The program ran without crashing, but produced wrong math!")


def demonstrate_runtime_exceptions_with_handling() -> None:
    """Demonstrates standard Python built-in exceptions and graceful try-except recovery."""
    print("\n" + "=" * 70)
    print("2. RUNTIME EXCEPTIONS & TRY-EXCEPT INTERCEPTION")
    print("=" * 70)

    test_cases = [
        ("ZeroDivisionError", lambda: 100 / 0),
        ("ValueError", lambda: int("Kolkata")),
        ("TypeError", lambda: "Score: " + 98),
        ("IndexError", lambda: [10, 20, 30][5]),
        ("KeyError", lambda: {"school": "APS Barrackpore"}["roll_no"]),
    ]

    for name, op in test_cases:
        try:
            op()
            print(f"{name:<20}: Operation succeeded unexpectedly.")
        except ZeroDivisionError as e:
            print(f"Caught ZeroDivisionError : {e}")
        except ValueError as e:
            print(f"Caught ValueError        : {e}")
        except TypeError as e:
            print(f"Caught TypeError         : {e}")
        except IndexError as e:
            print(f"Caught IndexError        : {e}")
        except KeyError as e:
            print(f"Caught KeyError          : Key {e} does not exist in dictionary")


def safe_student_calculator(dividend: Any, divisor: Any) -> Tuple[bool, Any, str]:
    """Production-grade error-handled arithmetic utility."""
    try:
        val_a = float(dividend)
        val_b = float(divisor)
        result = val_a / val_b
        return True, result, "Calculation successful."
    except ValueError:
        return False, None, "TypeError/ValueError: Non-numeric input provided."
    except ZeroDivisionError:
        return False, None, "ZeroDivisionError: Division by zero is mathematically undefined."
    except Exception as ex:
        return False, None, f"Unexpected Error: {type(ex).__name__}"


if __name__ == "__main__":
    demonstrate_logical_error()
    demonstrate_runtime_exceptions_with_handling()

    print("\n" + "=" * 70)
    print("3. PRODUCTION-GRADE SAFE CALCULATOR DEMONSTRATION")
    print("=" * 70)
    for num, den in [(100, 4), (100, 0), ("95", "5"), ("abc", 2)]:
        success, val, msg = safe_student_calculator(num, den)
        status = "[SUCCESS]" if success else "[HANDLED]"
        print(f"{status:<10} ({num} / {den}) -> Value: {val} | Message: {msg}")
    print("=" * 70)
