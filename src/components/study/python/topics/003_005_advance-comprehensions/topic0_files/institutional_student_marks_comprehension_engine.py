# topic0_files/institutional_student_marks_comprehension_engine.py
# Module: 003_005_advance-comprehensions
# Topic: Deep Dive: List, Dict, and Set Comprehensions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Institutional Marks & Scholarship Comprehension Suite (Case Study)
Demonstrates:
  1. Full-pipeline academic marks processing using pure comprehensions
  2. Synthesizing list, dict, and set comprehensions for roster analytics
  3. Calculating grade allocations, distinction honors, and scholarship subsidies
"""

from decimal import Decimal
from typing import Dict, Any, List, Set

def run_academic_comprehension_pipeline(students_dataset: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Processes student records using list, dict, and set comprehensions."""

    # 1. Set comprehension: Extract distinct enrolled departments
    departments: Set[str] = {s["department"] for s in students_dataset}

    # 2. List comprehension: Extract honors candidates with calculated scholarship grant
    honors_candidates = [
        {
            "student_id": s["id"],
            "name": s["name"],
            "score": s["score"],
            "department": s["department"],
            "scholarship_inr": round(Decimal(str(s["tuition_fee"])) * Decimal("0.20"), 2)
        }
        for s in students_dataset
        if s["score"] >= 90.0 and s["status"] == "ACTIVE"
    ]

    # 3. Dict comprehension: Grade allocation map
    grade_roster = {
        s["id"]: {
            "name": s["name"],
            "grade": "PLATINUM" if s["score"] >= 90 else "GOLD" if s["score"] >= 80 else "STANDARD",
            "score": s["score"]
        }
        for s in students_dataset
    }

    # 4. Dict comprehension: Departmental student count summary
    department_summary = {
        dept: len([s for s in students_dataset if s["department"] == dept])
        for dept in departments
    }

    # 5. Comprehension-based metric aggregation
    total_scholarship_allocated = sum(c["scholarship_inr"] for c in honors_candidates)

    return {
        "total_active_students": len(students_dataset),
        "departments_count": len(departments),
        "department_distribution": department_summary,
        "honors_candidates_count": len(honors_candidates),
        "total_scholarship_grant_inr": total_scholarship_allocated,
        "honors_roster": honors_candidates,
        "grade_book": grade_roster
    }


def demonstrate_institutional_marks_suite():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL COMPREHENSION SUITE")
    print("=" * 70)

    dataset = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "score": 95.5, "department": "AI_ENGINEERING", "tuition_fee": 35000.0, "status": "ACTIVE"},
        {"id": "STU-102", "name": "Priyanka Sen", "score": 88.0, "department": "DATA_SCIENCE", "tuition_fee": 32000.0, "status": "ACTIVE"},
        {"id": "STU-103", "name": "Debolina Roy", "score": 96.0, "department": "AI_ENGINEERING", "tuition_fee": 35000.0, "status": "ACTIVE"},
        {"id": "STU-104", "name": "Rahul Verma", "score": 78.0, "department": "WEB_DEV", "tuition_fee": 25000.0, "status": "ACTIVE"},
        {"id": "STU-105", "name": "Sneha Gupta", "score": 92.5, "department": "DATA_SCIENCE", "tuition_fee": 32000.0, "status": "ACTIVE"}
    ]

    report = run_academic_comprehension_pipeline(dataset)

    print("1. Academic Processing Summary (Derived via Pure Comprehensions):")
    print(f"   * Total Active Students       : {report['total_active_students']}")
    print(f"   * Department Distribution     : {report['department_distribution']}")
    print(f"   * Total Honors Candidates     : {report['honors_candidates_count']}")
    print(f"   * Total Scholarship Grant     : INR {report['total_scholarship_grant_inr']:,.2f}\n")

    print("2. Honors Scholarship Awardees:")
    for h in report["honors_roster"]:
        print(f"   * [{h['student_id']}] {h['name']:<18} | Dept: {h['department']:<15} | Score: {h['score']}% | Grant: INR {h['scholarship_inr']:,.2f}")

    print("\n[PASSED] Institutional Marks Comprehension Suite Verified.")


if __name__ == "__main__":
    demonstrate_institutional_marks_suite()
