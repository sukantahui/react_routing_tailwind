# topic8_files/institutional_admission_batch_generator_stream.py
# Module: 003_003_decorators-generators
# Topic: Generators & the yield statement
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 4: Institutional Admission Stream Generator (Case Study)
Demonstrates:
  1. Production generator function streaming student admissions with telemetry
  2. Maintaining stateful cumulative financial metrics across yield points
  3. Clean termination and returning an immutable batch settlement report
"""

from typing import List, Dict, Any, Generator

def stream_admission_cohort(
    candidates: List[Dict[str, Any]],
    institution_branch: str = "Barrackpore Campus"
) -> Generator[Dict[str, Any], None, Dict[str, Any]]:
    """Streams candidate admissions lazily, calculating fees, and returns settlement report."""
    total_revenue_acc = 0.0
    scholarships_awarded_acc = 0.0
    admitted_count = 0

    for idx, candidate in enumerate(candidates, start=1):
        base_tuition = candidate["base_tuition"]
        discount_rate = candidate.get("scholarship_rate", 0.0)

        concession_amount = round(base_tuition * discount_rate, 2)
        net_payable = round(base_tuition - concession_amount, 2)

        total_revenue_acc += net_payable
        scholarships_awarded_acc += concession_amount
        admitted_count += 1

        # Yield admission certificate envelope:
        yield {
            "batch_sequence": idx,
            "certificate_id": f"ADM-2026-{candidate['id']}",
            "student_id": candidate["id"],
            "student_name": candidate["name"],
            "course": candidate["course"],
            "campus": institution_branch,
            "net_fee": net_payable,
            "scholarship_applied": concession_amount,
            "running_revenue": total_revenue_acc
        }

    # Return final audit summary upon completion:
    return {
        "campus": institution_branch,
        "total_admitted": admitted_count,
        "gross_collected": total_revenue_acc,
        "total_scholarships_disbursed": scholarships_awarded_acc,
        "average_student_fee": total_revenue_acc / admitted_count if admitted_count > 0 else 0.0,
        "status": "SETTLED_AND_CONFIRMED"
    }


def run_admission_stream_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - ADMISSION STREAM GENERATOR")
    print("=" * 70)

    cohort = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "course": "Python & AI", "base_tuition": 25000.0, "scholarship_rate": 0.20},
        {"id": "STU-102", "name": "Priyanka Sen", "course": "Data Science", "base_tuition": 30000.0, "scholarship_rate": 0.10},
        {"id": "STU-103", "name": "Rahul Verma", "course": "Python Core", "base_tuition": 18000.0, "scholarship_rate": 0.00},
        {"id": "STU-104", "name": "Debolina Roy", "course": "Machine Learning", "base_tuition": 28000.0, "scholarship_rate": 0.15},
    ]

    print("1. Streaming Admission Certificates Lazily:")
    stream = stream_admission_cohort(cohort, "Barrackpore Main Campus")

    # Manual iteration to observe yields and extract return value:
    while True:
        try:
            cert = next(stream)
            print(
                f"   [SEQ #{cert['batch_sequence']}] {cert['certificate_id']}: {cert['student_name']:<18} | "
                f"Net: INR {cert['net_fee']:>8,.2f} | Running Total: INR {cert['running_revenue']:>9,.2f}"
            )
        except StopIteration as exc:
            report = exc.value
            print("\n2. Final Cohort Audit Settlement Report (StopIteration.value):")
            print(f"   * Campus                      : {report['campus']}")
            print(f"   * Total Students Admitted     : {report['total_admitted']}")
            print(f"   * Gross Revenue Collected     : INR {report['gross_collected']:,.2f}")
            print(f"   * Total Scholarships Disbursed: INR {report['total_scholarships_disbursed']:,.2f}")
            print(f"   * Average Fee Per Student     : INR {report['average_student_fee']:,.2f}")
            print(f"   * Settlement Status           : {report['status']}")
            break

    print("\n[PASSED] Institutional Admission Stream Generator Verified.")


if __name__ == "__main__":
    run_admission_stream_demo()
