# topic2_files/institutional_admission_roster_cleaner_suite.py
# Module: 003_005_advance-comprehensions
# Topic: Readability guidelines: When to use comprehensions vs loops
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 4: Institutional Admission Roster Cleaner & Code Review Suite (Case Study)
Demonstrates:
  1. Strategic balance: using comprehensions for clean transformations and procedural loops for defensive I/O
  2. Automatic readability and code quality scoring for student data pipelines
  3. Handling dirty financial and academic payloads with graceful degradation
"""

from decimal import Decimal, InvalidOperation
from typing import Dict, Any, List, Tuple

class InstitutionalAdmissionCleaner:
    """Production data pipeline demonstrating idiomatic comprehension vs loop decisions."""

    def __init__(self, raw_applications: List[Dict[str, Any]]):
        self.raw_applications = raw_applications
        self.approved_roster: List[Dict[str, Any]] = []
        self.quarantined_records: List[Dict[str, Any]] = []

    def clean_and_audit(self) -> Dict[str, Any]:
        # Phase 1: Procedural Loop for defensive parsing, dirty type coercion, and error logging
        for raw in self.raw_applications:
            app_id = raw.get("app_id", "UNKNOWN")
            name = str(raw.get("name", "")).strip()
            course = str(raw.get("course", "")).strip().upper()
            fee_str = str(raw.get("fee_submitted", "0")).replace(",", "").strip()

            if not name or len(name) < 3:
                self.quarantined_records.append({"app_id": app_id, "reason": "Invalid or missing name"})
                continue

            try:
                fee = Decimal(fee_str)
                if fee < Decimal("10000.00"):
                    self.quarantined_records.append({"app_id": app_id, "reason": f"Fee {fee} below threshold"})
                    continue

                self.approved_roster.append({
                    "app_id": app_id,
                    "name": name,
                    "course": course,
                    "fee": fee
                })
            except (InvalidOperation, ValueError) as exc:
                self.quarantined_records.append({"app_id": app_id, "reason": f"Corrupt fee format ({exc})"})

        # Phase 2: Idiomatic Comprehensions for Pure Data Aggregations and Indexing (High Readability!)
        
        # 1. Set Comprehension: Extract unique approved courses
        unique_courses = {s["course"] for s in self.approved_roster}

        # 2. Dict Comprehension: Course to approved student count map
        course_counts = {
            c: len([s for s in self.approved_roster if s["course"] == c])
            for c in unique_courses
        }

        # 3. Generator Expression: Total revenue aggregation (O(1) memory)
        total_revenue = sum(s["fee"] for s in self.approved_roster)

        # 4. List Comprehension: Extract scholarship candidates (Fee >= 30,000)
        scholarship_candidates = [
            s["name"] for s in self.approved_roster if s["fee"] >= Decimal("30000.00")
        ]

        return {
            "total_submitted": len(self.raw_applications),
            "approved_count": len(self.approved_roster),
            "quarantined_count": len(self.quarantined_records),
            "total_revenue_inr": total_revenue,
            "unique_courses": list(unique_courses),
            "course_distribution": course_counts,
            "scholarship_eligible": scholarship_candidates
        }


def run_admission_cleaner_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL ADMISSION CLEANER & AUDIT SUITE")
    print("=" * 70)

    raw_data = [
        {"app_id": "APP-001", "name": "Sourav Mukherjee", "course": "py-ai", "fee_submitted": "28,500.00"},
        {"app_id": "APP-002", "name": "Priyanka Sen", "course": "ds-ml", "fee_submitted": "32,000.00"},
        {"app_id": "APP-003", "name": "Al", "course": "py-ai", "fee_submitted": "25000"},  # Name too short (< 3 chars)
        {"app_id": "APP-004", "name": "Debolina Roy", "course": "py-ai", "fee_submitted": "35,000.00"},
        {"app_id": "APP-005", "name": "Rahul Verma", "course": "web-dev", "fee_submitted": "INVALID_NUMBER"}  # Corrupt fee
    ]

    cleaner = InstitutionalAdmissionCleaner(raw_data)
    report = cleaner.clean_and_audit()

    print("1. Admission Pipeline Audit Report:")
    print(f"   * Total Applications Submitted: {report['total_submitted']}")
    print(f"   * Approved Applications       : {report['approved_count']}")
    print(f"   * Quarantined Applications    : {report['quarantined_count']}")
    print(f"   * Total Collected Revenue     : INR {report['total_revenue_inr']:,.2f}")
    print(f"   * Course Distribution         : {report['course_distribution']}")
    print(f"   * Scholarship Eligible Names  : {report['scholarship_eligible']}\n")

    print("2. Quarantined Audit Logs (Procedural Defense):")
    for q in cleaner.quarantined_records:
        print(f"   * [REJECTED] {q['app_id']}: {q['reason']}")

    print("\n[PASSED] Institutional Admission Cleaner Suite Verified.")


if __name__ == "__main__":
    run_admission_cleaner_demo()
