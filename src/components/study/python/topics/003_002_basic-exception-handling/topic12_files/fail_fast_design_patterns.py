# topic12_files/fail_fast_design_patterns.py
# Module: 003_002_basic-exception-handling
# Topic: Best practices: Fail fast, log errors, defensive programming
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 1: Fail-Fast Architecture & Guard Clauses
Demonstrates:
  1. Fail-Fast Principle: Halting immediately on invalid input at API boundaries
  2. Guard Clauses vs Nested 'Pyramid of Doom' (Flattening complex conditionals)
  3. Preventing corrupt state from polluting downstream systems
"""

import re
from typing import Dict, Any

# =====================================================================
# 1. THE FLAWED APPROACH: DEEP NESTED 'PYRAMID OF DOOM' (Anti-Pattern)
# =====================================================================
def flawed_enroll_student_nested(student_data: dict) -> bool:
    """Anti-pattern: Deeply nested if-statements, hard to read, fails slowly."""
    if student_data is not None:
        if "name" in student_data:
            if len(student_data["name"].strip()) > 0:
                if "fee" in student_data:
                    if student_data["fee"] >= 5000:
                        print("  [ENROLLED NESTED] Successfully enrolled.")
                        return True
                    else:
                        print("  Fee too low")
                else:
                    print("  Missing fee")
            else:
                print("  Empty name")
        else:
            print("  Missing name")
    return False


# =====================================================================
# 2. THE PYTHONIC FAIL-FAST GUARD CLAUSES APPROACH
# =====================================================================
def pythonic_enroll_student_fail_fast(student_data: Dict[str, Any]) -> Dict[str, Any]:
    """Pythonic: Flat, readable guard clauses that fail fast with descriptive exceptions."""
    # Guard 1: Root Dictionary Existence
    if not isinstance(student_data, dict):
        raise TypeError(f"Student data must be a dictionary, got {type(student_data).__name__}!")

    # Guard 2: Name Validation
    name = student_data.get("name")
    if not isinstance(name, str) or not name.strip():
        raise ValueError("Student 'name' is required and cannot be empty!")

    # Guard 3: Student ID Validation
    stu_id = student_data.get("id")
    if not isinstance(stu_id, str) or not re.match(r"^STU-\d{3,6}$", stu_id):
        raise ValueError(f"Invalid Student ID format '{stu_id}'. Expected 'STU-XXXX' (e.g. STU-101)!")

    # Guard 4: Financial Minimum Threshold
    fee = student_data.get("fee")
    if not isinstance(fee, (int, float)) or fee < 5000.0:
        raise ValueError(f"Minimum enrollment deposit is INR 5,000.00, received: INR {fee}!")

    # Core Happy Path (Zero Nesting!)
    print(f"  [ENROLLMENT CONFIRMED] {name.strip()} ({stu_id}) | Deposit: INR {fee:,.2f}")
    return {"id": stu_id, "name": name.strip(), "fee": fee, "status": "ACTIVE"}


def demonstrate_fail_fast():
    print("=" * 70)
    print("CODER & ACCOTAX - FAIL-FAST ARCHITECTURE & GUARD CLAUSES")
    print("=" * 70)

    # 1. Valid Record
    print("1. Processing Valid Student Record:")
    record = {"id": "STU-101", "name": "Sourav Mukherjee", "fee": 18000.0}
    pythonic_enroll_student_fail_fast(record)

    # 2. Testing Invalid Student ID Guard
    print("\n2. Testing Malformed Student ID ('INVALID_ID'):")
    try:
        pythonic_enroll_student_fail_fast({"id": "INVALID_ID", "name": "Priyanka Sen", "fee": 18000.0})
    except ValueError as err:
        print(f"   [BLOCKED FAIL-FAST] ValueError: {err}")

    # 3. Testing Underpaid Fee Guard
    print("\n3. Testing Underpaid Initial Fee (INR 2,500):")
    try:
        pythonic_enroll_student_fail_fast({"id": "STU-102", "name": "Rahul Verma", "fee": 2500.0})
    except ValueError as err:
        print(f"   [BLOCKED FAIL-FAST] ValueError: {err}")

    print("\n[PASSED] Fail-Fast Architecture & Guard Clauses Verified.")


if __name__ == "__main__":
    demonstrate_fail_fast()
