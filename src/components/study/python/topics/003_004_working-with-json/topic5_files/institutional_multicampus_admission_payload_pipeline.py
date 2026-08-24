# topic5_files/institutional_multicampus_admission_payload_pipeline.py
# Module: 003_004_working-with-json
# Topic: Working with nested JSON structures and API payloads
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 4: Multi-Campus University Ingestion Pipeline (Case Study)
Demonstrates:
  1. Deep multi-tier nested traversal across campuses, departments, cohorts, and students
  2. Aggregating financial metrics and academic performance per campus
  3. Redacting sensitive student banking data before generating certified audit reports
"""

import json
from decimal import Decimal
from typing import Dict, Any, List

def process_multicampus_deep_payload(raw_json_str: str) -> Dict[str, Any]:
    """Ingests multi-campus university payload, computes metrics, and redacts PII."""
    doc = json.loads(raw_json_str)

    campuses: List[Dict[str, Any]] = doc.get("university_system", {}).get("campuses", [])
    campus_reports = []
    total_system_revenue = Decimal("0.00")
    total_system_students = 0

    for campus in campuses:
        campus_name = campus.get("campus_name", "UNKNOWN")
        campus_id = campus.get("campus_id", "UNKNOWN")
        students = campus.get("enrollment_records", [])

        campus_revenue = Decimal("0.00")
        honors_count = 0

        sanitized_students = []
        for s in students:
            fee = Decimal(str(s.get("billing", {}).get("tuition_fee_inr", 0.0)))
            score = float(s.get("academics", {}).get("aggregate_gpa", 0.0))

            campus_revenue += fee
            if score >= 9.0:
                honors_count += 1

            # Redact banking credentials
            clean_s = {
                "student_id": s.get("student_id"),
                "name": s.get("name"),
                "gpa": score,
                "course": s.get("course"),
                "fee_paid": float(fee),
                "payment_gateway": s.get("billing", {}).get("gateway", "UNKNOWN"),
                "bank_account_redacted": "********" + str(s.get("billing", {}).get("account_no", "0000"))[-4:]
            }
            sanitized_students.append(clean_s)

        total_system_revenue += campus_revenue
        total_system_students += len(students)

        campus_reports.append({
            "campus_id": campus_id,
            "campus_name": campus_name,
            "student_count": len(students),
            "campus_revenue_inr": campus_revenue,
            "honors_candidates_count": honors_count,
            "students": sanitized_students
        })

    return {
        "institution": doc.get("university_system", {}).get("system_name", "Coder & AccoTax"),
        "academic_session": doc.get("university_system", {}).get("academic_year", "2026-2027"),
        "total_active_campuses": len(campuses),
        "total_enrolled_students": total_system_students,
        "total_system_revenue_inr": total_system_revenue,
        "campus_breakdown": campus_reports
    }


def run_multicampus_pipeline_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTI-CAMPUS NESTED INGESTION PIPELINE")
    print("=" * 70)

    # Complex multi-campus nested payload:
    sample_system_json = """
    {
        "university_system": {
            "system_name": "Coder & AccoTax Autonomous System",
            "academic_year": "2026-2027",
            "campuses": [
                {
                    "campus_id": "BP-01",
                    "campus_name": "Barrackpore Main Campus",
                    "enrollment_records": [
                        {
                            "student_id": "STU-101",
                            "name": "Sourav Mukherjee",
                            "course": "Python Full-Stack & AI",
                            "academics": {"aggregate_gpa": 9.45},
                            "billing": {"tuition_fee_inr": 28000.0, "gateway": "RAZORPAY", "account_no": "123456789012"}
                        },
                        {
                            "student_id": "STU-102",
                            "name": "Priyanka Sen",
                            "course": "Data Science",
                            "academics": {"aggregate_gpa": 9.10},
                            "billing": {"tuition_fee_inr": 32000.0, "gateway": "HDFC_NETBANK", "account_no": "987654321098"}
                        }
                    ]
                },
                {
                    "campus_id": "KL-02",
                    "campus_name": "Kolkata Hub",
                    "enrollment_records": [
                        {
                            "student_id": "STU-201",
                            "name": "Rahul Verma",
                            "course": "Core Python",
                            "academics": {"aggregate_gpa": 8.75},
                            "billing": {"tuition_fee_inr": 25000.0, "gateway": "UPI_PHONEPE", "account_no": "555544443333"}
                        }
                    ]
                }
            ]
        }
    }
    """

    report = process_multicampus_deep_payload(sample_system_json)

    print("1. Multi-Campus University System Ingestion Summary:")
    print(f"   * System Name            : {report['institution']}")
    print(f"   * Academic Year          : {report['academic_session']}")
    print(f"   * Total Active Campuses  : {report['total_active_campuses']}")
    print(f"   * Total Students         : {report['total_enrolled_students']}")
    print(f"   * Total System Revenue   : INR {report['total_system_revenue_inr']:,.2f}\n")

    print("2. Campus Financial & Academic Performance Breakdown:")
    for camp in report["campus_breakdown"]:
        print(f"   * [{camp['campus_id']}] {camp['campus_name']:<24} | Students: {camp['student_count']} | Revenue: INR {camp['campus_revenue_inr']:,.2f} | Honors: {camp['honors_candidates_count']}")
        for s in camp["students"]:
            print(f"       - [{s['student_id']}] {s['name']:<18} | GPA: {s['gpa']} | Bank: {s['bank_account_redacted']}")

    print("\n[PASSED] Multi-Campus University Ingestion Pipeline Verified.")


if __name__ == "__main__":
    run_multicampus_pipeline_demo()
