# topic2_files/institutional_admission_telemetry_decorator_suite.py
# Module: 003_003_decorators-generators
# Topic: Understanding Decorators: Concept and @decorator syntax
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Institutional Admission & Telemetry Decorator Suite (Case Study)
Demonstrates:
  1. Stacking multiple orthogonal decorators: Validation, Timing, and Auditing
  2. Input argument validation and security enforcement via decorators
  3. Generating real-time telemetry logs for institutional admissions
"""

import functools
import time
import re
from typing import Dict, Any

# =====================================================================
# PRODUCTION DECORATORS
# =====================================================================
def validate_student_id_format(func):
    """Enforces that candidate student ID matches 'STU-XXXX' regex pattern."""
    @functools.wraps(func)
    def wrapper(student_id: str, *args, **kwargs):
        if not isinstance(student_id, str) or not re.match(r"^STU-\d{3,6}$", student_id):
            raise ValueError(f"[VALIDATION FAILED] Invalid Student ID format: '{student_id}'. Expected 'STU-XXXX'!")
        return func(student_id, *args, **kwargs)
    return wrapper


def forensic_admission_audit(func):
    """Logs full input parameters, timestamp, and returned registration status."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        func_name = func.__name__
        print(f"  [FORENSIC AUDIT ENTRY] Executing `{func_name}` | Positional Args: {args} | Keyword Args: {kwargs}")

        result = func(*args, **kwargs)

        print(f"  [FORENSIC AUDIT EXIT] `{func_name}` Completed -> Status: {result.get('status', 'OK')}")
        return result
    return wrapper


def measure_admission_latency(func):
    """Measures microsecond latency for mission-critical student onboarding."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed_us = (time.perf_counter() - start) * 1_000_000.0
        print(f"  [LATENCY TELEMETRY] `{func.__name__}` finished in {elapsed_us:.2f} microseconds")
        return result
    return wrapper


# =====================================================================
# DECORATED ADMISSION SERVICE FUNCTION
# =====================================================================
@validate_student_id_format
@forensic_admission_audit
@measure_admission_latency
def onboard_new_candidate(student_id: str, student_name: str, course_name: str, deposit: float) -> Dict[str, Any]:
    """Official student onboarding service with automated validation, telemetry, and auditing."""
    if deposit < 5000.0:
        raise ValueError(f"Minimum enrollment deposit is INR 5,000.00, received INR {deposit:,.2f}")

    return {
        "student_id": student_id,
        "name": student_name,
        "course": course_name,
        "deposit": deposit,
        "status": "ACTIVE_ENROLLED"
    }


def run_decorator_suite_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - ADMISSION TELEMETRY DECORATOR SUITE")
    print("=" * 70)

    # 1. Valid Candidate Onboarding
    print("1. Onboarding Valid Candidate (Sourav Mukherjee):")
    record1 = onboard_new_candidate("STU-101", "Sourav Mukherjee", "Python Full-Stack & AI", 18000.0)
    print(f"   Candidate Record Generated: {record1}\n")

    # 2. Testing Invalid Student ID (Fails in `@validate_student_id_format`)
    print("2. Testing Invalid Student ID ('INVALID_REG_ID'):")
    try:
        onboard_new_candidate("INVALID_REG_ID", "Priyanka Sen", "Python Full-Stack & AI", 18000.0)
    except ValueError as err:
        print(f"   [BLOCKED BY DECORATOR GUARD] {err}\n")

    # 3. Testing Underpaid Deposit
    print("3. Testing Underpaid Deposit (INR 2,000 against INR 5,000 min):")
    try:
        onboard_new_candidate("STU-102", "Rahul Verma", "Python Core", 2000.0)
    except ValueError as err:
        print(f"   [BLOCKED BY BUSINESS RULE] {err}")

    print("\n[PASSED] Institutional Admission Telemetry Decorator Suite Verified.")


if __name__ == "__main__":
    run_decorator_suite_demo()
