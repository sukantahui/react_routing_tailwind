"""
# Module: 004_003_python-testing
# Topic 0: Why automated testing is mandatory for professional software
# File: institutional_grade_testing_case.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end automated testing suite for student grading,
#              attendance thresholds, and honors distinction evaluation.
"""

def evaluate_student_performance(scores: list[float], attendance_pct: float) -> dict:
    """Evaluates student average score, letter grade, and honors distinction."""
    if not scores:
        raise ValueError("Score list cannot be empty.")
    if not (0.0 <= attendance_pct <= 100.0):
        raise ValueError(f"Invalid attendance percentage: {attendance_pct}")

    avg_score = sum(scores) / len(scores)

    # Attendance disqualification rule
    if attendance_pct < 75.0:
        return {
            "average": round(avg_score, 2),
            "grade": "F (Low Attendance)",
            "passed": False,
            "honors": False
        }

    # Grade determination
    if avg_score >= 90.0:
        grade = "A+"
    elif avg_score >= 80.0:
        grade = "A"
    elif avg_score >= 60.0:
        grade = "B"
    elif avg_score >= 40.0:
        grade = "C"
    else:
        grade = "F"

    passed = grade != "F"
    honors = (avg_score >= 85.0) and (attendance_pct >= 90.0)

    return {
        "average": round(avg_score, 2),
        "grade": grade,
        "passed": passed,
        "honors": honors
    }

# ------------------------------------------------------------------------------
# AUTOMATED TEST CASES
# ------------------------------------------------------------------------------
def run_institutional_test_suite():
    tests = [
        {
            "name": "Mamata (Top Performer: A+, Honors)",
            "scores": [95.0, 92.0, 98.0],
            "attendance": 96.0,
            "expected_grade": "A+",
            "expected_passed": True,
            "expected_honors": True
        },
        {
            "name": "Mahima (Good Student: A, No Honors due to 88% attendance)",
            "scores": [82.0, 85.0, 88.0],
            "attendance": 88.0,
            "expected_grade": "A",
            "expected_passed": True,
            "expected_honors": False
        },
        {
            "name": "Abhronila (High Score, Failed on Low Attendance < 75%)",
            "scores": [95.0, 98.0, 92.0],
            "attendance": 70.0,
            "expected_grade": "F (Low Attendance)",
            "expected_passed": False,
            "expected_honors": False
        },
        {
            "name": "Susmita (Exact Boundary Passing: 40.0 Avg, 75.0% Attendance)",
            "scores": [40.0, 40.0, 40.0],
            "attendance": 75.0,
            "expected_grade": "C",
            "expected_passed": True,
            "expected_honors": False
        },
        {
            "name": "Debangshu (Failing Grade: 35.0 Avg, 95% Attendance)",
            "scores": [30.0, 40.0, 35.0],
            "attendance": 95.0,
            "expected_grade": "F",
            "expected_passed": False,
            "expected_honors": False
        }
    ]

    print("\n[...] Running Institutional Student Evaluation Test Suite...")
    passed = 0
    for t in tests:
        res = evaluate_student_performance(t["scores"], t["attendance"])
        
        assert res["grade"] == t["expected_grade"], f"Grade mismatch for {t['name']}"
        assert res["passed"] == t["expected_passed"], f"Pass status mismatch for {t['name']}"
        assert res["honors"] == t["expected_honors"], f"Honors status mismatch for {t['name']}"
        
        print(f"   [PASS] {t['name']:<60} -> Grade: {res['grade']:<18} | Honors: {res['honors']}")
        passed += 1

    print(f"\n[+] Successfully verified {passed}/{len(tests)} candidate grading scenarios!")

def main():
    print("=" * 80)
    print("[CASE STUDY] Institutional Student Evaluation Automated Test Suite")
    print("=" * 80)

    run_institutional_test_suite()

    print("=" * 80)
    print("[TAKEAWAY] Automated tests cover complex multi-variable business rules")
    print("           (grades, attendance gates, honors flags) with complete fidelity.")
    print("=" * 80)

if __name__ == "__main__":
    main()
