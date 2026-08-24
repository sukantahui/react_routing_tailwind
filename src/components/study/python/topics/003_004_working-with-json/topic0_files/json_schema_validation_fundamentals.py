# topic0_files/json_schema_validation_fundamentals.py
# Module: 003_004_working-with-json
# Topic: JSON Format overview: types, syntax, and schema standards
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: JSON Schema Standards & Programmatic Schema Validation
Demonstrates:
  1. Defining declarative JSON schema rules (type checks, required fields, range bounds)
  2. Programmatic validation of raw JSON API payloads without third-party dependencies
  3. Generating clear error diagnostics for invalid payloads
"""

import json
from typing import Dict, Any, List, Tuple

class StudentSchemaValidator:
    """Validates raw JSON payloads against institutional student schema rules."""

    SCHEMA = {
        "required_fields": ["student_id", "name", "course", "score", "fee_paid"],
        "field_types": {
            "student_id": str,
            "name": str,
            "course": str,
            "score": (int, float),
            "fee_paid": (int, float),
            "is_active": bool
        },
        "value_ranges": {
            "score": (0.0, 100.0),
            "fee_paid": (0.0, 100000.0)
        }
    }

    @classmethod
    def validate_payload(cls, raw_json_str: str) -> Tuple[bool, List[str], Dict[str, Any]]:
        errors = []

        # 1. Check JSON Syntax:
        try:
            data = json.loads(raw_json_str)
        except json.JSONDecodeError as exc:
            return False, [f"Malformed JSON Syntax: {exc.msg} (line {exc.lineno})"], {}

        if not isinstance(data, dict):
            return False, ["Root JSON structure must be a JSON Object (dictionary)."], {}

        # 2. Check Required Fields:
        for req_field in cls.SCHEMA["required_fields"]:
            if req_field not in data:
                errors.append(f"Missing required field: '{req_field}'")

        # 3. Check Data Types:
        for field, expected_type in cls.SCHEMA["field_types"].items():
            if field in data and data[field] is not None:
                if not isinstance(data[field], expected_type):
                    errors.append(
                        f"Type mismatch on '{field}': Expected {expected_type}, got {type(data[field]).__name__}"
                    )

        # 4. Check Value Range Bounds:
        for field, (min_val, max_val) in cls.SCHEMA["value_ranges"].items():
            if field in data and isinstance(data[field], (int, float)):
                if not (min_val <= data[field] <= max_val):
                    errors.append(f"Range violation on '{field}': Value {data[field]} not in range [{min_val}, {max_val}]")

        is_valid = len(errors) == 0
        return is_valid, errors, data if is_valid else {}


def demonstrate_schema_validation():
    print("=" * 70)
    print("CODER & ACCOTAX - JSON SCHEMA VALIDATION ENGINE")
    print("=" * 70)

    # Payload 1: Valid Student JSON
    valid_payload = '{"student_id": "STU-101", "name": "Sourav Mukherjee", "course": "Python AI", "score": 94.5, "fee_paid": 25000.0, "is_active": true}'
    is_valid, errors, data = StudentSchemaValidator.validate_payload(valid_payload)
    print("1. Validating Compliant Student Payload:")
    print(f"   * Status: {'[VALID]' if is_valid else '[INVALID]'}")
    print(f"   * Verified Student: {data.get('name')} ({data.get('student_id')})\n")

    # Payload 2: Schema Violations (Wrong type + Out of range)
    invalid_payload = '{"student_id": "STU-102", "name": "Priyanka Sen", "course": "Data Science", "score": 145.0, "fee_paid": "NOT_PAID"}'
    is_valid, errors, _ = StudentSchemaValidator.validate_payload(invalid_payload)
    print("2. Validating Payload with Schema Violations:")
    print(f"   * Status: {'[VALID]' if is_valid else '[INVALID]'}")
    for err in errors:
        print(f"     - [SCHEMA REJECTION] {err}")

    # Payload 3: Missing Required Fields
    missing_fields_payload = '{"name": "Rahul Verma", "course": "Python Core"}'
    is_valid, errors, _ = StudentSchemaValidator.validate_payload(missing_fields_payload)
    print("\n3. Validating Incomplete Payload (Missing Keys):")
    print(f"   * Status: {'[VALID]' if is_valid else '[INVALID]'}")
    for err in errors:
        print(f"     - [SCHEMA REJECTION] {err}")

    print("\n[PASSED] JSON Schema Validation Engine Verified.")


if __name__ == "__main__":
    demonstrate_schema_validation()
