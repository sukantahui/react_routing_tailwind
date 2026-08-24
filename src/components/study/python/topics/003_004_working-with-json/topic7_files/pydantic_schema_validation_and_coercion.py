# topic7_files/pydantic_schema_validation_and_coercion.py
# Module: 003_004_working-with-json
# Topic: Validating and sanitizing JSON data schemas
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: Schema Validation, Type Coercion & Field Constraints (Pydantic Style)
Demonstrates:
  1. Strongly typed domain models with automatic data coercion
  2. Custom field validation, string whitespace trimming, and email validation
  3. Structured error reporting with precise field-level feedback
"""

from typing import Dict, Any, List
from decimal import Decimal

class AdmissionApplicationModel:
    """Type-safe domain model simulating Pydantic validation and coercion."""

    def __init__(self, raw_data: Dict[str, Any]):
        self.errors: List[str] = []

        # 1. student_id validation
        raw_id = raw_data.get("student_id")
        if not raw_id or not isinstance(raw_id, str) or not raw_id.startswith("STU-"):
            self.errors.append("student_id: Value must be a non-empty string starting with 'STU-'")
            self.student_id = None
        else:
            self.student_id = raw_id.strip()

        # 2. full_name validation & trimming
        raw_name = raw_data.get("full_name")
        if not raw_name or not isinstance(raw_name, str) or len(raw_name.strip()) < 3:
            self.errors.append("full_name: Name must have at least 3 characters")
            self.full_name = None
        else:
            self.full_name = raw_name.strip().title()

        # 3. email validation
        raw_email = raw_data.get("email")
        if not raw_email or "@" not in str(raw_email) or "." not in str(raw_email):
            self.errors.append("email: Invalid email address format")
            self.email = None
        else:
            self.email = str(raw_email).strip().lower()

        # 4. tuition_fee coercion & range validation
        raw_fee = raw_data.get("tuition_fee")
        try:
            fee_dec = Decimal(str(raw_fee))
            if fee_dec < Decimal("10000.00") or fee_dec > Decimal("100000.00"):
                self.errors.append(f"tuition_fee: Fee {fee_dec} must be between INR 10,000 and INR 100,000")
                self.tuition_fee = None
            else:
                self.tuition_fee = fee_dec
        except Exception:
            self.errors.append("tuition_fee: Invalid numeric format")
            self.tuition_fee = None

        # 5. gpa score validation
        raw_gpa = raw_data.get("gpa", 0.0)
        try:
            gpa_float = float(raw_gpa)
            if not (0.0 <= gpa_float <= 10.0):
                self.errors.append(f"gpa: GPA score {gpa_float} must be between 0.0 and 10.0")
                self.gpa = None
            else:
                self.gpa = gpa_float
        except Exception:
            self.errors.append("gpa: Invalid GPA score")
            self.gpa = None

    @property
    def is_valid(self) -> bool:
        return len(self.errors) == 0

    def dict(self) -> Dict[str, Any]:
        return {
            "student_id": self.student_id,
            "full_name": self.full_name,
            "email": self.email,
            "tuition_fee": float(self.tuition_fee) if self.tuition_fee else None,
            "gpa": self.gpa
        }


def demonstrate_pydantic_style_validation():
    print("=" * 70)
    print("CODER & ACCOTAX - SCHEMA VALIDATION & AUTOMATIC COERCION")
    print("=" * 70)

    # 1. Payload with uncoerced string fee and untrimmed whitespace:
    unclean_payload = {
        "student_id": "STU-101",
        "full_name": "   sourav mukherjee   ",
        "email": "SOURAV@CODERnACCOTAX.CO.IN",
        "tuition_fee": "28500.50",  # String successfully coerced to Decimal!
        "gpa": "9.45"               # String coerced to float!
    }

    print("1. Validating and Coercing Unformatted Payload:")
    model = AdmissionApplicationModel(unclean_payload)

    if model.is_valid:
        print("   * [VALIDATION & COERCION SUCCESS]")
        print(f"   * Cleaned Name : '{model.full_name}'")
        print(f"   * Cleaned Email: '{model.email}'")
        print(f"   * Coerced Fee  : INR {model.tuition_fee:,.2f} (Type: {type(model.tuition_fee).__name__})")
        print(f"   * Coerced GPA  : {model.gpa} (Type: {type(model.gpa).__name__})\n")

    # 2. Payload with validation violations:
    bad_payload = {
        "student_id": "WRONG_ID",
        "full_name": "So",
        "email": "not_an_email",
        "tuition_fee": "999.00",
        "gpa": 12.5
    }

    print("2. Validating Malformed Payload:")
    bad_model = AdmissionApplicationModel(bad_payload)
    print(f"   * Validation Failed with {len(bad_model.errors)} Field Errors:")
    for err in bad_model.errors:
        print(f"     - [FIELD ERROR] {err}")

    print("\n[PASSED] Schema Validation & Automatic Coercion Verified.")


if __name__ == "__main__":
    demonstrate_pydantic_style_validation()
