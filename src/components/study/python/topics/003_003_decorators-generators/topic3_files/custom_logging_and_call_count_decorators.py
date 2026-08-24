# topic3_files/custom_logging_and_call_count_decorators.py
# Module: 003_003_decorators-generators
# Topic: Writing custom decorators (logging, timing execution, authentication)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: Custom Logging & Stateful Call-Counter Decorators
Demonstrates:
  1. Writing a stateful call counter decorator using function attributes
  2. Structured logging decorator with argument serialization
  3. Dynamic inspection of function invocation metrics
"""

import functools
import datetime as dt

def count_calls_decorator(func):
    """Decorator that tracks how many times a function has been invoked across its lifetime."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        print(f"  [CALL COUNTER] `{func.__name__}` invocation #{wrapper.calls}")
        return func(*args, **kwargs)

    wrapper.calls = 0  # Attach state attribute to wrapper function object
    return wrapper


def structured_audit_logger(func):
    """Decorator that records structured execution telemetry."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        arg_str = ", ".join([repr(a) for a in args] + [f"{k}={repr(v)}" for k, v in kwargs.items()])
        print(f"[{timestamp}] [AUDIT ENTRY] Invoking `{func.__name__}({arg_str})`")

        result = func(*args, **kwargs)

        print(f"[{timestamp}] [AUDIT EXIT]  `{func.__name__}` returned: {result}")
        return result
    return wrapper


@count_calls_decorator
@structured_audit_logger
def issue_student_hall_ticket(student_id: str, exam_code: str) -> str:
    """Generates hall ticket credential for institutional examination."""
    return f"TICKET-2026-{exam_code}-{student_id}"


def demonstrate_custom_loggers():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM LOGGING & CALL COUNTER DECORATORS")
    print("=" * 70)

    # 1. First invocation:
    print("1. First Invocation:")
    t1 = issue_student_hall_ticket("STU-101", "PY-301")
    print(f"   Generated: {t1}\n")

    # 2. Second invocation:
    print("2. Second Invocation:")
    t2 = issue_student_hall_ticket("STU-102", "PY-301")
    print(f"   Generated: {t2}\n")

    # 3. Third invocation:
    print("3. Third Invocation:")
    t3 = issue_student_hall_ticket("STU-103", "AI-401")
    print(f"   Generated: {t3}\n")

    # 4. Inspecting total invocation metric:
    print(f"Total Lifetime Calls Tracked: {issue_student_hall_ticket.calls}")

    print("\n[PASSED] Custom Logging & Call Counter Decorators Verified.")


if __name__ == "__main__":
    demonstrate_custom_loggers()
