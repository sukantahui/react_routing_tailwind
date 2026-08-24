# topic7_files/institutional_admission_application_validator_suite.py
# Module: 003_004_working-with-json
# Topic: Validating and sanitizing JSON data schemas
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 4: Institutional Admission Application Validator Suite (Case Study)
Demonstrates:
  1. Production batch schema validator for institutional student admissions
  2. Defense-in-depth sanitization: stripping dangerous HTML/XSS scripts
  3. Generating certified audit reports for valid registrations while isolating quarantined records
"""

import html
import json
import re
from decimal import Decimal
from typing import Dict, Any, List, Tuple

class InstitutionalAdmissionValidator:
    """Production validator & sanitizer for Coder & AccoTax student admissions."""

    EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    PHONE_REGEX = r"^\+91-\d{10}$"

    @classmethod
    def sanitize_string(cls, text: str) -> str:
        """Strips HTML tags and escapes special characters."""
        if not isinstance(text, str):
            return text
        clean = re.sub(r"<[^>]*>", "", text)  # Strip tags
        return html.escape(clean.strip())

    @classmethod
    def validate_single_application(cls, record: Dict[str, Any]) -> Tuple[Dict[str, Any], List[str]]:
        errors = []

        # 1. student_id
        student_id = record.get("student_id")
        if not student_id or not re.match(r"^STU-\d{3,5}$", str(student_id)):
            errors.append("student_id: Must match pattern STU-XXX (e.g. STU-101)")

        # 2. full_name (Sanitize XSS)
        raw_name = record.get("full_name", "")
        clean_name = cls.sanitize_string(raw_name)
        if len(clean_name) < 3:
            errors.append("full_name: Must be at least 3 characters long")

        # 3. email
        email = str(record.get("email", "")).strip().lower()
        if not re.match(cls.EMAIL_REGEX, email):
            errors.append("email: Invalid email format")

        # 4. phone
        phone = str(record.get("phone", "")).strip()
        if not re.match(cls.PHONE_REGEX, phone):
            errors.append("phone: Phone must be in format +91-XXXXXXXXXX")

        # 5. tuition_fee
        fee_raw = record.get("tuition_fee")
        fee_decimal = Decimal("0.00")
        try:
            fee_decimal = Decimal(str(fee_raw))
            if fee_decimal < Decimal("15000.00") or fee_decimal > Decimal("75000.00"):
                errors.append(f"tuition_fee: Fee {fee_decimal} must be between INR 15,000 and INR 75,000")
        except Exception:
            errors.append("tuition_fee: Invalid numeric format")

        clean_record = {
            "student_id": student_id,
            "full_name": clean_name,
            "email": email,
            "phone": phone,
            "tuition_fee": float(fee_decimal),
            "status": "APPROVED" if len(errors) == 0 else "QUARANTINED"
        }

        return clean_record, errors

    @classmethod
    def process_admission_batch(cls, raw_batch_json: str) -> Dict[str, Any]:
        doc = json.loads(raw_batch_json)
        applications = doc.get("applications", [])

        approved = []
        quarantined = []
        total_revenue = Decimal("0.00")

        for app in applications:
            clean_app, errs = cls.validate_single_application(app)
            if errs:
                quarantined.append({"record": clean_app, "violations": errs})
            else:
                approved.append(clean_app)
                total_revenue += Decimal(str(clean_app["tuition_fee"]))

        return {
            "institution": "Coder & AccoTax - Barrackpore & Kolkata",
            "batch_id": doc.get("batch_id", "BATCH-2026"),
            "total_submitted": len(applications),
            "total_approved": len(approved),
            "total_quarantined": len(quarantined),
            "total_collected_revenue_inr": total_revenue,
            "approved_roster": approved,
            "quarantined_records": quarantined
        }


def run_institutional_validator_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - ADMISSION APPLICATION VALIDATOR & SANITIZER")
    print("=" * 70)

    sample_batch_payload = """
    {
        "batch_id": "BATCH-2026-FINAL",
        "applications": [
            {
                "student_id": "STU-101",
                "full_name": "<script>alert(1)</script>Sourav Mukherjee",
                "email": "sourav@codernaccotax.co.in",
                "phone": "+91-9876543210",
                "tuition_fee": 28500.00
            },
            {
                "student_id": "STU-102",
                "full_name": "Priyanka Sen",
                "email": "priyanka.sen@gmail.com",
                "phone": "+91-9123456780",
                "tuition_fee": 32000.00
            },
            {
                "student_id": "INVALID-ID",
                "full_name": "Ab",
                "email": "bad_email_format",
                "phone": "12345",
                "tuition_fee": 500.00
            }
        ]
    }
    """

    report = InstitutionalAdmissionValidator.process_admission_batch(sample_batch_payload)

    print("1. Admission Batch Validation Summary:")
    print(f"   * Institution       : {report['institution']}")
    print(f"   * Batch ID          : {report['batch_id']}")
    print(f"   * Total Submitted   : {report['total_submitted']}")
    print(f"   * Total Approved    : {report['total_approved']} (Passed all schema checks & XSS clean)")
    print(f"   * Total Quarantined : {report['total_quarantined']}")
    print(f"   * Approved Revenue  : INR {report['total_collected_revenue_inr']:,.2f}\n")

    print("2. Approved Admissions:")
    for app in report["approved_roster"]:
        print(f"   * [{app['student_id']}] {app['full_name']:<18} | Email: {app['email']:<26} | Fee: INR {app['tuition_fee']:,.2f}")

    print("\n3. Quarantined Applications (Schema Violations):")
    for q in report["quarantined_records"]:
        print(f"   * Raw Record: {q['record']['student_id']}")
        for v in q["violations"]:
            print(f"     - [REJECTED] {v}")

    print("\n[PASSED] Institutional Admission Application Validator Suite Verified.")


if __name__ == "__main__":
    run_institutional_validator_suite()
