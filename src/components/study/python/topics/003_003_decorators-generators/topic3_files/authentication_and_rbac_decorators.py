# topic3_files/authentication_and_rbac_decorators.py
# Module: 003_003_decorators-generators
# Topic: Writing custom decorators (logging, timing execution, authentication)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 3: Authentication & Role-Based Access Control (RBAC) Decorators
Demonstrates:
  1. Securing sensitive business functions with authorization decorators
  2. Inspecting user session contexts passed in kwargs or global request states
  3. Raising `PermissionError` when non-authorized roles attempt access
"""

import functools
from typing import Dict, Any

# Current Simulated User Session Context
current_session = {
    "user_id": "USR-991",
    "username": "sourav_student",
    "role": "STUDENT",
    "is_authenticated": True
}


def require_authenticated(func):
    """Enforces that the caller has an active authenticated session."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if not current_session.get("is_authenticated"):
            raise PermissionError("[ACCESS DENIED] User is not authenticated. Please log in first!")
        return func(*args, **kwargs)
    return wrapper


def require_role(*allowed_roles: str):
    """Decorator factory that restricts access to specific institutional roles."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            user_role = current_session.get("role", "GUEST")
            if user_role not in allowed_roles:
                raise PermissionError(
                    f"[ACCESS DENIED] Role '{user_role}' is not authorized to execute `{func.__name__}`! "
                    f"Required roles: {allowed_roles}"
                )
            return func(*args, **kwargs)
        return wrapper
    return decorator


# Secured Endpoints:
@require_authenticated
def view_own_report_card(student_id: str) -> Dict[str, Any]:
    return {"student_id": student_id, "gpa": 3.92, "status": "PASSED"}


@require_authenticated
@require_role("ADMIN", "FACULTY")
def publish_institutional_exam_schedule(exam_code: str, date_str: str) -> str:
    return f"Official Exam Schedule for '{exam_code}' published on {date_str} by {current_session['username']}."


@require_authenticated
@require_role("ADMIN")
def purge_student_ledger_record(student_id: str) -> str:
    return f"Student record '{student_id}' permanently purged by Administrator."


def demonstrate_rbac_decorators():
    print("=" * 70)
    print("CODER & ACCOTAX - AUTHENTICATION & RBAC DECORATORS")
    print("=" * 70)

    # 1. Student viewing own report card (Allowed):
    print(f"1. Current Session: Role = '{current_session['role']}'")
    report = view_own_report_card("STU-101")
    print(f"   [OK] View Report Card: {report}\n")

    # 2. Student attempting to publish exam schedule (Blocked by @require_role):
    print("2. Student attempting to Publish Exam Schedule (Requires ADMIN / FACULTY):")
    try:
        publish_institutional_exam_schedule("PY-301", "2026-09-15")
    except PermissionError as err:
        print(f"   [DENIED] {err}\n")

    # 3. Switching Session to ADMIN:
    print("3. Elevating Session to Role = 'ADMIN':")
    current_session["role"] = "ADMIN"
    current_session["username"] = "sukanta_director"

    res = publish_institutional_exam_schedule("PY-301", "2026-09-15")
    print(f"   [OK] {res}")

    purge_res = purge_student_ledger_record("STU-999")
    print(f"   [OK] {purge_res}")

    print("\n[PASSED] Authentication & RBAC Decorators Verified.")


if __name__ == "__main__":
    demonstrate_rbac_decorators()
