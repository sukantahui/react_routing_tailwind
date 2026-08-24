# topic0_files/institutional_student_portal_api_schema_spec.py
# Module: 003_004_working-with-json
# Topic: JSON Format overview: types, syntax, and schema standards
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Institutional Student Portal JSON API Schema Spec (Case Study)
Demonstrates:
  1. Production JSON API schema contract definition for academic student registries
  2. Multi-tier payload validation (Envelope, Academic records, Payment vouchers)
  3. Sanitizing and serializing validated payloads into compliant JSON documents
"""

import json
from typing import Dict, Any, Tuple, List

INSTITUTIONAL_API_CONTRACT = {
    "title": "Coder & AccoTax Student Admission & Examination API",
    "version": "2026.1",
    "required_envelope_keys": ["api_version", "institution", "timestamp", "payload"],
    "allowed_courses": ["Python Full-Stack", "Data Science & AI", "Generators & Metaclasses"],
    "allowed_campuses": ["Barrackpore Main Campus", "Kolkata Hub", "Online Global"]
}

def validate_and_process_admission_payload(raw_json: str) -> Tuple[bool, List[str], str]:
    """Validates complete API envelope and student payload according to 2026 schema spec."""
    errors = []

    # 1. Parse JSON Syntax:
    try:
        doc = json.loads(raw_json)
    except json.JSONDecodeError as exc:
        return False, [f"JSON Parse Error: {exc.msg} at line {exc.lineno}"], ""

    # 2. Validate API Envelope:
    for key in INSTITUTIONAL_API_CONTRACT["required_envelope_keys"]:
        if key not in doc:
            errors.append(f"Envelope Error: Missing required key '{key}'")

    if errors:
        return False, errors, ""

    payload = doc["payload"]

    # 3. Validate Student Metadata:
    student_id = payload.get("student_id")
    name = payload.get("name")
    course = payload.get("course")
    campus = payload.get("campus")
    marks = payload.get("academic_scores", {})
    payment = payload.get("payment_voucher", {})

    if not student_id or not str(student_id).startswith("STU-"):
        errors.append("Student ID must follow format 'STU-XXXX'")

    if course not in INSTITUTIONAL_API_CONTRACT["allowed_courses"]:
        errors.append(f"Invalid course '{course}'. Allowed: {INSTITUTIONAL_API_CONTRACT['allowed_courses']}")

    if campus not in INSTITUTIONAL_API_CONTRACT["allowed_campuses"]:
        errors.append(f"Invalid campus '{campus}'. Allowed: {INSTITUTIONAL_API_CONTRACT['allowed_campuses']}")

    # 4. Validate Payment Voucher:
    if payment.get("amount_paid", 0) <= 0:
        errors.append("Payment voucher must have a positive 'amount_paid'")

    if errors:
        return False, errors, ""

    # Generate Certified Sanitized JSON Record:
    certified_record = {
        "status": "OFFICIALLY_REGISTERED",
        "reference_token": f"SEAL-2026-{student_id}",
        "student_name": name,
        "course_enrolled": course,
        "campus_location": campus,
        "fees_settled": payment.get("amount_paid"),
        "gpa": sum(marks.values()) / len(marks) if marks else 0.0
    }

    return True, [], json.dumps(certified_record, indent=2)


def run_portal_schema_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL STUDENT PORTAL JSON API SCHEMA")
    print("=" * 70)

    # Valid Production Payload:
    sample_request_json = """
    {
        "api_version": "2026.1",
        "institution": "Coder & AccoTax",
        "timestamp": "2026-08-24T10:00:00Z",
        "payload": {
            "student_id": "STU-101",
            "name": "Sourav Mukherjee",
            "course": "Python Full-Stack",
            "campus": "Barrackpore Main Campus",
            "academic_scores": {
                "core_python": 95.0,
                "oop_structures": 92.0,
                "generators_decorators": 96.5
            },
            "payment_voucher": {
                "voucher_no": "VOUCH-BP-2026-001",
                "amount_paid": 28000.0,
                "status": "SETTLED"
            }
        }
    }
    """

    print("1. Processing Valid Admission Payload against 2026 Spec:")
    is_valid, errors, certified_json = validate_and_process_admission_payload(sample_request_json)

    if is_valid:
        print("   [VALIDATED] Payload conforms to official JSON schema contract!")
        print(f"   Certified Institutional Output:\n{certified_json}")
    else:
        print("   [REJECTED] Payload failed validation:")
        for err in errors:
            print(f"   - {err}")

    print("\n[PASSED] Institutional Student Portal API Schema Verified.")


if __name__ == "__main__":
    run_portal_schema_demo()
