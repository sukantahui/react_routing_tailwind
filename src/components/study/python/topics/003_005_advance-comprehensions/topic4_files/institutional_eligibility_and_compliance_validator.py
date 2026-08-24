# topic4_files/institutional_eligibility_and_compliance_validator.py
# Module: 003_005_advance-comprehensions
# Topic: any() and all() predicates for quick boolean checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 4: Institutional Eligibility & Compliance Validator (Case Study)
Demonstrates:
  1. Production admission compliance engine powered by short-circuiting `all()` and `any()`
  2. Multi-rule evaluation: mandatory documentation, academic cutoffs, and fee clearance
  3. Generating granular compliance audit reports
"""

from decimal import Decimal
from typing import Dict, Any, List, Tuple

class InstitutionalAdmissionComplianceEngine:
    """Production validator using any() and all() for institutional admission audits."""

    MANDATORY_DOCUMENTS = {"AADHAAR_CARD", "10TH_MARKSHEET", "12TH_MARKSHEET", "PASSPORT_PHOTO"}
    MIN_ACADEMIC_PERCENTAGE = Decimal("60.0")
    MIN_INITIAL_FEE = Decimal("15000.00")

    def __init__(self, applications: List[Dict[str, Any]]):
        self.applications = applications

    def validate_candidate(self, candidate: Dict[str, Any]) -> Tuple[bool, List[str]]:
        """Validates a single candidate using short-circuiting predicates."""
        rejection_reasons = []

        # Check 1: Mandatory Document Verification (all)
        docs_submitted = set(candidate.get("submitted_documents", []))
        if not self.MANDATORY_DOCUMENTS.issubset(docs_submitted):
            missing = self.MANDATORY_DOCUMENTS - docs_submitted
            rejection_reasons.append(f"Missing mandatory documents: {list(missing)}")

        # Check 2: Academic Cutoff Across All Recorded Subjects (all)
        subject_scores = [Decimal(str(s)) for s in candidate.get("subject_scores", [])]
        if not subject_scores or any(score < self.MIN_ACADEMIC_PERCENTAGE for score in subject_scores):
            rejection_reasons.append(f"Subject score below minimum {self.MIN_ACADEMIC_PERCENTAGE}% cutoff")

        # Check 3: Fee Deposit Verification
        fee_paid = Decimal(str(candidate.get("fee_deposit", "0")))
        if fee_paid < self.MIN_INITIAL_FEE:
            rejection_reasons.append(f"Fee deposit INR {fee_paid} below threshold INR {self.MIN_INITIAL_FEE}")

        # Check 4: Disciplinary Blacklist Check (any)
        has_disciplinary_flag = candidate.get("has_disciplinary_action", False)
        if has_disciplinary_flag:
            rejection_reasons.append("Candidate flagged for previous institutional disciplinary action")

        is_eligible = len(rejection_reasons) == 0
        return is_eligible, rejection_reasons

    def evaluate_cohort(self) -> Dict[str, Any]:
        """Evaluates entire cohort."""
        admitted = []
        rejected = []

        for app in self.applications:
            eligible, reasons = self.validate_candidate(app)
            if eligible:
                admitted.append(app)
            else:
                rejected.append({"candidate": app["name"], "app_id": app["app_id"], "reasons": reasons})

        # Cohort level predicate checks:
        # Check if ALL admitted candidates are cleared for enrollment
        is_cohort_100_percent_compliant = all(self.validate_candidate(a)[0] for a in admitted)
        # Check if ANY candidate has a scholarship recommendation
        has_scholarship_candidate = any(
            Decimal(str(a.get("scholarship_score", 0))) >= Decimal("90.0")
            for a in admitted
        )

        return {
            "total_applicants": len(self.applications),
            "total_admitted": len(admitted),
            "total_rejected": len(rejected),
            "cohort_compliant": is_cohort_100_percent_compliant,
            "has_scholarship_candidate": has_scholarship_candidate,
            "admitted_roster": admitted,
            "rejected_audit": rejected
        }


def demonstrate_compliance_validator():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL COMPLIANCE & ELIGIBILITY VALIDATOR")
    print("=" * 70)

    cohort_applications = [
        {
            "app_id": "APP-2026-01",
            "name": "Sourav Mukherjee",
            "submitted_documents": ["AADHAAR_CARD", "10TH_MARKSHEET", "12TH_MARKSHEET", "PASSPORT_PHOTO"],
            "subject_scores": [95.0, 92.5, 88.0, 94.0],
            "fee_deposit": "28500.00",
            "has_disciplinary_action": False,
            "scholarship_score": 92.5
        },
        {
            "app_id": "APP-2026-02",
            "name": "Priyanka Sen",
            "submitted_documents": ["AADHAAR_CARD", "10TH_MARKSHEET", "12TH_MARKSHEET", "PASSPORT_PHOTO"],
            "subject_scores": [88.0, 85.0, 90.0, 82.0],
            "fee_deposit": "32000.00",
            "has_disciplinary_action": False,
            "scholarship_score": 86.0
        },
        {
            "app_id": "APP-2026-03",
            "name": "Rahul Verma",
            "submitted_documents": ["AADHAAR_CARD", "10TH_MARKSHEET"],  # Missing 12th & photo!
            "subject_scores": [55.0, 70.0, 48.0],  # Scores below 60%!
            "fee_deposit": "10000.00",  # Below 15,000 threshold!
            "has_disciplinary_action": True,  # Disciplinary flag!
            "scholarship_score": 50.0
        }
    ]

    engine = InstitutionalAdmissionComplianceEngine(cohort_applications)
    report = engine.evaluate_cohort()

    print("1. Cohort Admission Audit Summary:")
    print(f"   * Total Applicants Evaluated : {report['total_applicants']}")
    print(f"   * Approved for Admission     : {report['total_admitted']}")
    print(f"   * Rejected Candidates        : {report['total_rejected']}")
    print(f"   * All Admitted 100% Compliant: {report['cohort_compliant']}")
    print(f"   * Has Scholarship Candidates : {report['has_scholarship_candidate']}\n")

    print("2. Rejection Audit Log Details:")
    for rej in report["rejected_audit"]:
        print(f"   * [REJECTED] {rej['app_id']} ({rej['candidate']}):")
        for r in rej["reasons"]:
            print(f"     - {r}")

    print("\n[PASSED] Institutional Eligibility & Compliance Validator Verified.")


if __name__ == "__main__":
    demonstrate_compliance_validator()
