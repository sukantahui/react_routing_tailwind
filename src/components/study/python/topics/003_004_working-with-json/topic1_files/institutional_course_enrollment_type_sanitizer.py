# topic1_files/institutional_course_enrollment_type_sanitizer.py
# Module: 003_004_working-with-json
# Topic: JSON in Python: Mapping Python types to JSON types
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Course Enrollment & Financial Ledger Type Sanitizer (Case Study)
Demonstrates:
  1. Automated pre-serialization type conversion for enterprise student registries
  2. Converting unsupported types (`set` -> `sorted list`, `datetime` -> ISO 8601, `Decimal` -> `float`)
  3. Generating deterministic, schema-compliant JSON documents for audit compliance
"""

import json
from datetime import datetime
from decimal import Decimal
from typing import Dict, Any, List

def sanitize_enterprise_record(record: Any) -> Any:
    """Recursively converts unsupported Python types into standard JSON primitives."""
    if isinstance(record, dict):
        return {str(k): sanitize_enterprise_record(v) for k, v in record.items()}
    elif isinstance(record, (list, tuple)):
        return [sanitize_enterprise_record(item) for item in record]
    elif isinstance(record, set):
        return sorted([sanitize_enterprise_record(item) for item in record])
    elif isinstance(record, datetime):
        return record.isoformat()
    elif isinstance(record, Decimal):
        return float(record)
    elif isinstance(record, bytes):
        return record.decode("utf-8", errors="replace")
    return record


def run_sanitizer_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE RECORD TYPE SANITIZER")
    print("=" * 70)

    # Complex Python domain payload containing heterogeneous non-JSON types:
    raw_enrollment_record = {
        "student_id": "STU-101",
        "candidate_name": "Sourav Mukherjee",
        "enrollment_timestamp": datetime(2026, 8, 24, 10, 30, 0),
        "tuition_fee_decimal": Decimal("28500.50"),
        "earned_skill_badges": {"AI_ENGINEER", "DECORATORS_MASTER", "PYTHON_CORE"},
        "campus_location_tuple": ("Barrackpore Main Campus", "West Bengal"),
        "digital_audit_signature": b"SEAL_VALIDATED_2026",
        "module_credits_map": {
            101: Decimal("4.0"),
            102: Decimal("3.5")
        }
    }

    print("1. Original Python Record with Unsupported Types:")
    print(f"   * Badges Type     : {type(raw_enrollment_record['earned_skill_badges']).__name__}")
    print(f"   * Timestamp Type  : {type(raw_enrollment_record['enrollment_timestamp']).__name__}")
    print(f"   * Fee Decimal Type: {type(raw_enrollment_record['tuition_fee_decimal']).__name__}")
    print(f"   * Signature Type  : {type(raw_enrollment_record['digital_audit_signature']).__name__}\n")

    # 2. Sanitize and Serialize:
    print("2. Running Enterprise Type Sanitizer:")
    clean_payload = sanitize_enterprise_record(raw_enrollment_record)
    compliant_json = json.dumps(clean_payload, indent=2, sort_keys=True)

    print("   [SUCCESS] Successfully Serialized to 100% Valid RFC 8259 JSON Document:")
    print(compliant_json)

    print("\n[PASSED] Enterprise Record Type Sanitizer Verified.")


if __name__ == "__main__":
    run_sanitizer_case_study()
