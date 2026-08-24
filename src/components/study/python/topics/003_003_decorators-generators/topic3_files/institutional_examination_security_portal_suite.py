# topic3_files/institutional_examination_security_portal_suite.py
# Module: 003_003_decorators-generators
# Topic: Writing custom decorators (logging, timing execution, authentication)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 4: Institutional Exam Security & Telemetry Portal (Case Study)
Demonstrates:
  1. Complete synthesis of Custom Decorators: Security, Rate-Limiting, Timing, and Auditing
  2. Multi-tier decorator architecture protecting critical administrative APIs
  3. Comprehensive execution logs and access control audit trails
"""

import functools
import time
import datetime as dt
from typing import Dict, Any, List

# Simulated Global Authentication Context
session_context = {
    "user_id": "ADMIN-01",
    "role": "ADMIN",
    "is_authenticated": True
}


# 1. Rate Limiting Decorator (Prevents API abuse)
def rate_limit(max_per_minute: int = 3):
    """Decorator factory that throttles function invocations."""
    def decorator(func):
        invocation_timestamps = []

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Clean timestamps older than 60 seconds:
            valid_timestamps = [t for t in invocation_timestamps if now - t < 60.0]
            invocation_timestamps.clear()
            invocation_timestamps.extend(valid_timestamps)

            if len(invocation_timestamps) >= max_per_minute:
                raise RuntimeError(
                    f"[RATE LIMIT EXCEEDED] `{func.__name__}` cannot exceed {max_per_minute} calls/minute! Please wait."
                )

            invocation_timestamps.append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator


# 2. RBAC Security Guard
def require_roles(*allowed_roles: str):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            role = session_context.get("role", "GUEST")
            if role not in allowed_roles:
                raise PermissionError(f"[UNAUTHORIZED] Role '{role}' cannot access `{func.__name__}`. Allowed: {allowed_roles}")
            return func(*args, **kwargs)
        return wrapper
    return decorator


# 3. High-Precision Timing & Forensic Audit
def forensic_telemetry(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        user = session_context.get("user_id", "ANONYMOUS")
        print(f"  [AUDIT ENTRY] User: {user} | Method: `{func.__name__}` | Timestamp: {dt.datetime.now().strftime('%H:%M:%S')}")

        result = func(*args, **kwargs)

        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        print(f"  [AUDIT EXIT]  Method `{func.__name__}` finished in {elapsed_ms:.2f} ms")
        return result
    return wrapper


# =====================================================================
# SECURED MISSION-CRITICAL PORTAL METHODS
# =====================================================================
@require_roles("ADMIN", "EXAM_CONTROLLER")
@rate_limit(max_per_minute=2)
@forensic_telemetry
def finalize_and_lock_exam_grades(exam_code: str, student_count: int) -> Dict[str, Any]:
    """Finalizes and cryptographically locks exam grades."""
    time.sleep(0.005)
    return {
        "exam_code": exam_code,
        "records_locked": student_count,
        "status": "FINALIZED_AND_SEALED"
    }


def run_portal_suite_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL EXAM SECURITY PORTAL")
    print("=" * 70)

    # 1. Successful Invocation #1:
    print("1. Admin Finalizing Grades (Call 1/2 - Allowed):")
    res1 = finalize_and_lock_exam_grades("PY-301-FINAL", 45)
    print(f"   Result: {res1}\n")

    # 2. Successful Invocation #2:
    print("2. Admin Finalizing Grades (Call 2/2 - Allowed):")
    res2 = finalize_and_lock_exam_grades("AI-401-FINAL", 32)
    print(f"   Result: {res2}\n")

    # 3. Triggering Rate Limit Guard (Call #3 in rapid succession):
    print("3. Attempting Rapid Call #3 (Triggers @rate_limit):")
    try:
        finalize_and_lock_exam_grades("DATA-201-FINAL", 28)
    except RuntimeError as err:
        print(f"   [BLOCKED] {err}\n")

    # 4. Testing Permission Guard with Unauthorized Student Role:
    print("4. Attempting Execution with Role = 'STUDENT' (Triggers @require_roles):")
    session_context["role"] = "STUDENT"
    try:
        finalize_and_lock_exam_grades("PY-301-FINAL", 45)
    except PermissionError as err:
        print(f"   [BLOCKED] {err}")

    print("\n[PASSED] Institutional Exam Security Portal Suite Verified.")


if __name__ == "__main__":
    run_portal_suite_demo()
