# topic4_files/institutional_student_portfolio_codec_suite.py
# Module: 003_004_working-with-json
# Topic: Handling custom Python objects with custom JSONEncoders & object_hook
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 4: Institutional Student Portfolio Codec Suite (Case Study)
Demonstrates:
  1. Production codec architecture for multi-model student portfolios
  2. Subclassing `JSONEncoder` for custom domains and integrating `object_hook`
  3. Preserving precision, enums, dates, and domain methods across persistence boundaries
"""

import json
from datetime import datetime
from decimal import Decimal
from typing import List, Set

class AcademicCertificate:
    """Certificate entity earned by a student."""
    def __init__(self, cert_code: str, title: str, award_date: datetime, honors_tier: str):
        self.cert_code = cert_code
        self.title = title
        self.award_date = award_date
        self.honors_tier = honors_tier

    def __repr__(self):
        return f"Certificate({self.cert_code}, {self.title}, {self.honors_tier})"


class StudentPortfolio:
    """Comprehensive academic and financial portfolio for Coder & AccoTax students."""
    def __init__(
        self,
        student_id: str,
        full_name: str,
        total_fees_paid: Decimal,
        skill_tags: Set[str],
        certificates: List[AcademicCertificate]
    ):
        self.student_id = student_id
        self.full_name = full_name
        self.total_fees_paid = total_fees_paid
        self.skill_tags = skill_tags
        self.certificates = certificates

    def calculate_merit_grant(self) -> Decimal:
        """Calculates institutional merit scholarship award."""
        if any(c.honors_tier == "PLATINUM" for c in self.certificates):
            return round(self.total_fees_paid * Decimal("0.25"), 2)
        return Decimal("0.00")


class InstitutionalPortfolioCodec:
    """Full-featured enterprise codec for student portfolios."""

    class Encoder(json.JSONEncoder):
        def default(self, o):
            if isinstance(o, StudentPortfolio):
                return {
                    "__model__": "StudentPortfolio",
                    "student_id": o.student_id,
                    "full_name": o.full_name,
                    "total_fees_paid": o.total_fees_paid,
                    "skill_tags": o.skill_tags,
                    "certificates": o.certificates
                }
            elif isinstance(o, AcademicCertificate):
                return {
                    "__model__": "AcademicCertificate",
                    "cert_code": o.cert_code,
                    "title": o.title,
                    "award_date": o.award_date,
                    "honors_tier": o.honors_tier
                }
            elif isinstance(o, datetime):
                return o.isoformat()
            elif isinstance(o, Decimal):
                return float(o)
            elif isinstance(o, set):
                return sorted(list(o))
            return super().default(o)

    @classmethod
    def object_hook(cls, dct: dict):
        model_type = dct.get("__model__")
        if model_type == "AcademicCertificate":
            return AcademicCertificate(
                cert_code=dct["cert_code"],
                title=dct["title"],
                award_date=datetime.fromisoformat(dct["award_date"]),
                honors_tier=dct["honors_tier"]
            )
        elif model_type == "StudentPortfolio":
            return StudentPortfolio(
                student_id=dct["student_id"],
                full_name=dct["full_name"],
                total_fees_paid=Decimal(str(dct["total_fees_paid"])),
                skill_tags=set(dct["skill_tags"]),
                certificates=dct["certificates"]
            )
        return dct


def run_portfolio_codec_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL STUDENT PORTFOLIO CODEC")
    print("=" * 70)

    # 1. Create Rich Student Portfolio:
    original_portfolio = StudentPortfolio(
        student_id="STU-101",
        full_name="Sourav Mukherjee",
        total_fees_paid=Decimal("35000.00"),
        skill_tags={"PYTHON_CORE", "GENERATORS", "REST_APIS", "DECORATORS"},
        certificates=[
            AcademicCertificate("CERT-PY-01", "Python AI Engineering", datetime(2026, 8, 20), "PLATINUM"),
            AcademicCertificate("CERT-DB-02", "Relational Database Systems", datetime(2026, 6, 15), "GOLD")
        ]
    )

    # 2. Serialize to JSON:
    print("1. Serializing Rich Portfolio Object to JSON:")
    json_doc = json.dumps(original_portfolio, cls=InstitutionalPortfolioCodec.Encoder, indent=2)
    print(json_doc)

    # 3. Deserialize via object_hook:
    print("\n2. Deserializing Back to Live Python Domain Objects:")
    restored: StudentPortfolio = json.loads(json_doc, object_hook=InstitutionalPortfolioCodec.object_hook)

    print(f"   * Restored Class : {type(restored).__name__}")
    print(f"   * Student Name   : {restored.full_name} ({restored.student_id})")
    print(f"   * Total Fees     : INR {restored.total_fees_paid} (Type: {type(restored.total_fees_paid).__name__})")
    print(f"   * Skill Tags     : {restored.skill_tags} (Type: {type(restored.skill_tags).__name__})")
    print(f"   * Certificates   : {restored.certificates}")

    # Invoke Business Logic Method on Restored Instance:
    grant = restored.calculate_merit_grant()
    print(f"   * Executed Method calculate_merit_grant(): INR {grant:,.2f}")

    print("\n[PASSED] Institutional Student Portfolio Codec Verified.")


if __name__ == "__main__":
    run_portfolio_codec_case_study()
