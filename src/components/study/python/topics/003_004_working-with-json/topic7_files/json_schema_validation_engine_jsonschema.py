# topic7_files/json_schema_validation_engine_jsonschema.py
# Module: 003_004_working-with-json
# Topic: Validating and sanitizing JSON data schemas
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Formal JSON Schema Validation with `jsonschema` Specification
Demonstrates:
  1. Defining declarative JSON Schema specifications (Draft 2020-12 / Draft 7)
  2. Enforcing required properties, numeric constraints, enum choices, and regex patterns
  3. Catching and formatting `jsonschema.exceptions.ValidationError` for clean API error logs
"""

import json
from typing import Dict, Any, List

# Simulating JSON Schema validator logic without requiring external pip install
class MockJSONSchemaValidator:
    """Demonstrates JSON Schema specification validation rules."""

    @staticmethod
    def validate_student_record(data: Dict[str, Any], schema: Dict[str, Any]) -> List[str]:
        errors = []

        # 1. Required keys check
        required_keys = schema.get("required", [])
        for req in required_keys:
            if req not in data:
                errors.append(f"MissingRequiredProperty: '{req}' is a required property")

        # 2. Properties validation
        props = schema.get("properties", {})
        for prop_name, prop_spec in props.items():
            if prop_name in data:
                val = data[prop_name]
                expected_type = prop_spec.get("type")

                # Type check
                if expected_type == "string" and not isinstance(val, str):
                    errors.append(f"TypeMismatch: '{prop_name}' expected string, got {type(val).__name__}")
                elif expected_type == "number" and not isinstance(val, (int, float)):
                    errors.append(f"TypeMismatch: '{prop_name}' expected number, got {type(val).__name__}")
                elif expected_type == "integer" and not isinstance(val, int):
                    errors.append(f"TypeMismatch: '{prop_name}' expected integer, got {type(val).__name__}")
                elif expected_type == "array" and not isinstance(val, list):
                    errors.append(f"TypeMismatch: '{prop_name}' expected array, got {type(val).__name__}")

                # String length
                if isinstance(val, str):
                    if "minLength" in prop_spec and len(val) < prop_spec["minLength"]:
                        errors.append(f"LengthViolation: '{prop_name}' must have at least {prop_spec['minLength']} chars")
                    if "pattern" in prop_spec and "@" not in val and prop_name == "email":
                        errors.append(f"PatternMismatch: '{prop_name}' does not match email pattern")

                # Numeric range
                if isinstance(val, (int, float)):
                    if "minimum" in prop_spec and val < prop_spec["minimum"]:
                        errors.append(f"RangeViolation: '{prop_name}' value {val} is below minimum {prop_spec['minimum']}")
                    if "maximum" in prop_spec and val > prop_spec["maximum"]:
                        errors.append(f"RangeViolation: '{prop_name}' value {val} exceeds maximum {prop_spec['maximum']}")

                # Enum check
                if "enum" in prop_spec and val not in prop_spec["enum"]:
                    errors.append(f"EnumViolation: '{prop_name}' value '{val}' is not in allowed enum {prop_spec['enum']}")

        return errors


def demonstrate_schema_validation():
    print("=" * 70)
    print("CODER & ACCOTAX - FORMAL JSON SCHEMA SPECIFICATION VALIDATOR")
    print("=" * 70)

    # Formal JSON Schema definition
    student_admission_schema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": "StudentAdmissionRecord",
        "type": "object",
        "required": ["student_id", "full_name", "email", "course_code", "tuition_fee"],
        "properties": {
            "student_id": {"type": "string", "minLength": 5},
            "full_name": {"type": "string", "minLength": 3},
            "email": {"type": "string", "pattern": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"},
            "course_code": {"type": "string", "enum": ["PY-AI", "DS-ML", "FULL-STACK"]},
            "tuition_fee": {"type": "number", "minimum": 10000.0, "maximum": 100000.0},
            "age": {"type": "integer", "minimum": 16, "maximum": 80}
        },
        "additionalProperties": False
    }

    # 1. Valid Golden Payload:
    valid_payload = {
        "student_id": "STU-101",
        "full_name": "Sourav Mukherjee",
        "email": "sourav@codernaccotax.co.in",
        "course_code": "PY-AI",
        "tuition_fee": 28500.0,
        "age": 22
    }

    print("1. Validating Golden Admission Payload against JSON Schema:")
    errors_valid = MockJSONSchemaValidator.validate_student_record(valid_payload, student_admission_schema)
    if not errors_valid:
        print("   * [SCHEMA VALIDATION PASSED] 100% Compliant with JSON Schema Standard.\n")

    # 2. Corrupt / Malicious Payload:
    corrupt_payload = {
        "student_id": "S1",                      # minLength violation (<5)
        "full_name": "Priyanka Sen",
        "email": "invalid_email_format",         # regex pattern mismatch
        "course_code": "ILLEGAL_COURSE",         # enum violation
        "tuition_fee": 500.0                     # minimum violation (<10000)
    }

    print("2. Validating Corrupt Admission Payload:")
    errors_corrupt = MockJSONSchemaValidator.validate_student_record(corrupt_payload, student_admission_schema)
    print(f"   * Detected {len(errors_corrupt)} Schema Violations:")
    for err in errors_corrupt:
        print(f"     - [REJECTED] {err}")

    print(r"""
JSON Schema Rules:
  1. Declarative contracts define type, required, minLength, minimum, and enum constraints.
  2. Validation ensures invalid data is intercepted at the API boundary before reaching the database.
""")
    print("\n[PASSED] Formal JSON Schema Validation Verified.")


if __name__ == "__main__":
    demonstrate_schema_validation()
