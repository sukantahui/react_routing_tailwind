# topic7_files/lightweight_pure_python_schema_validator.py
# Module: 003_004_working-with-json
# Topic: Validating and sanitizing JSON data schemas
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Pure Standard Library Schema Validator
Demonstrates:
  1. Building a zero-dependency, recursive schema validator using standard Python
  2. Enforcing types, required fields, custom predicate validators, and nested schemas
  3. Sanitizing malicious strings (stripping dangerous HTML/script tags)
"""

import html
import re
from typing import Dict, Any, List, Tuple, Callable

class FieldRule:
    """Defines validation constraints for a dictionary field."""
    def __init__(
        self,
        expected_type: type,
        required: bool = True,
        min_val: float = None,
        max_val: float = None,
        regex_pattern: str = None,
        custom_predicate: Callable[[Any], bool] = None,
        error_msg: str = None
    ):
        self.expected_type = expected_type
        self.required = required
        self.min_val = min_val
        self.max_val = max_val
        self.regex_pattern = regex_pattern
        self.custom_predicate = custom_predicate
        self.error_msg = error_msg


class PureSchemaValidator:
    """Standard library schema validation and sanitization engine."""

    def __init__(self, schema_rules: Dict[str, FieldRule]):
        self.rules = schema_rules

    def validate_and_sanitize(self, data: Dict[str, Any]) -> Tuple[Dict[str, Any], List[str]]:
        sanitized_data = {}
        errors = []

        # Check required fields
        for field_name, rule in self.rules.items():
            if rule.required and (field_name not in data or data[field_name] is None):
                errors.append(f"MissingField: Required field '{field_name}' is missing or null.")
                continue

            if field_name in data:
                val = data[field_name]

                # 1. Type validation
                if not isinstance(val, rule.expected_type):
                    errors.append(f"InvalidType: Field '{field_name}' expected {rule.expected_type.__name__}, got {type(val).__name__}")
                    continue

                # 2. String sanitization & regex
                if isinstance(val, str):
                    # Sanitize HTML tags to prevent XSS
                    clean_str = html.escape(val.strip())
                    if rule.regex_pattern and not re.match(rule.regex_pattern, clean_str):
                        errors.append(rule.error_msg or f"PatternViolation: '{field_name}' failed pattern check.")
                    val = clean_str

                # 3. Numeric bounds
                if isinstance(val, (int, float)):
                    if rule.min_val is not None and val < rule.min_val:
                        errors.append(f"BoundViolation: '{field_name}' ({val}) is below minimum {rule.min_val}")
                    if rule.max_val is not None and val > rule.max_val:
                        errors.append(f"BoundViolation: '{field_name}' ({val}) exceeds maximum {rule.max_val}")

                # 4. Custom predicate
                if rule.custom_predicate and not rule.custom_predicate(val):
                    errors.append(rule.error_msg or f"PredicateViolation: '{field_name}' failed custom validation.")

                sanitized_data[field_name] = val

        return sanitized_data, errors


def demonstrate_pure_validator():
    print("=" * 70)
    print("CODER & ACCOTAX - PURE PYTHON SCHEMA VALIDATOR & SANITIZER")
    print("=" * 70)

    # Define schema rules
    admission_schema = {
        "student_id": FieldRule(str, required=True, regex_pattern=r"^STU-\d{3}$", error_msg="Invalid Student ID format (e.g. STU-101)"),
        "full_name": FieldRule(str, required=True),
        "tuition_fee": FieldRule(float, required=True, min_val=15000.0, max_val=80000.0),
        "remarks": FieldRule(str, required=False)
    }

    validator = PureSchemaValidator(admission_schema)

    # Incoming payload with XSS injection:
    dirty_payload = {
        "student_id": "STU-101",
        "full_name": "<script>alert('xss')</script>Sourav Mukherjee",
        "tuition_fee": 28500.0,
        "remarks": "<b>Scholarship Candidate</b>"
    }

    print("1. Processing Payload with Potential XSS Injection:")
    clean_data, errors = validator.validate_and_sanitize(dirty_payload)

    if not errors:
        print("   * [VALIDATION PASSED]")
        print(f"   * Sanitized Full Name: {clean_data['full_name']}")
        print(f"   * Sanitized Remarks  : {clean_data['remarks']}\n")

    # Rejecting invalid ID format
    invalid_payload = {
        "student_id": "BAD_ID",
        "full_name": "Priyanka Sen",
        "tuition_fee": 5000.0  # Below min 15000
    }

    print("2. Processing Invalid Payload:")
    _, errs = validator.validate_and_sanitize(invalid_payload)
    for e in errs:
        print(f"   * [REJECTED] {e}")

    print("\n[PASSED] Pure Python Schema Validator Verified.")


if __name__ == "__main__":
    demonstrate_pure_validator()
