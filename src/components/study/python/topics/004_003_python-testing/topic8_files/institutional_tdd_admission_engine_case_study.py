"""
# Module: 004_003_python-testing
# Topic 8: Introduction to Test-Driven Development (TDD) workflow
# File: institutional_tdd_admission_engine_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus student admission, scholarship calculation,
#              and academic transcript engine designed 100% via TDD workflow.
"""

class InstitutionalAdmissionEngine:
    """Production domain engine designed 100% via TDD."""
    def __init__(self):
        self.students = {}
        self.grades = {}

    def admit_student(self, sid: str, name: str, campus: str, base_fee: float, score: float) -> dict:
        if not sid:
            raise ValueError("Student ID required.")
        if sid in self.students:
            raise KeyError(f"Student '{sid}' already admitted.")
        if base_fee <= 0:
            raise ValueError("Base fee must be positive.")

        # Merit waiver
        waiver_pct = 0.20 if score >= 90.0 else (0.10 if score >= 80.0 else 0.0)
        net_fee = round(base_fee * (1.0 - waiver_pct), 2)

        student_record = {
            "sid": sid,
            "name": name,
            "campus": campus,
            "base_fee": base_fee,
            "net_fee": net_fee,
            "score": score,
            "status": "ENROLLED"
        }
        self.students[sid] = student_record
        self.grades[sid] = {}
        return student_record

    def submit_course_grade(self, sid: str, course_name: str, grade_score: float):
        if sid not in self.students:
            raise KeyError(f"Student '{sid}' not enrolled.")
        if not (0.0 <= grade_score <= 100.0):
            raise ValueError("Grade must be between 0 and 100.")
        self.grades[sid][course_name] = grade_score

    def generate_transcript(self, sid: str) -> dict:
        if sid not in self.students:
            raise KeyError(f"Student '{sid}' not enrolled.")
        
        scores = list(self.grades[sid].values())
        gpa = round(sum(scores) / len(scores), 2) if scores else 0.0
        
        status = "PASSED" if gpa >= 40.0 else "FAILED"
        if gpa >= 90.0:
            honors = "DISTINCTION"
        elif gpa >= 75.0:
            honors = "FIRST_CLASS"
        else:
            honors = "GENERAL"

        return {
            "student": self.students[sid]["name"],
            "campus": self.students[sid]["campus"],
            "courses_completed": len(scores),
            "gpa": gpa,
            "honors": honors,
            "status": status
        }

# ------------------------------------------------------------------------------
# COMPREHENSIVE TDD SPECIFICATION SUITE
# ------------------------------------------------------------------------------
def run_institutional_tdd_suite():
    print("   [...] Running Comprehensive Institutional TDD Specification Suite...")
    engine = InstitutionalAdmissionEngine()

    # Spec 1: Admit Mamata at Barrackpore Campus with 20% Top Merit Waiver
    mamata = engine.admit_student("STU_BP_01", "Mamata", "Barrackpore", 20000.0, score=96.0)
    assert mamata["net_fee"] == 16000.0
    assert mamata["status"] == "ENROLLED"
    print("   [PASS] Spec 1: Mamata admitted at Barrackpore with 20% waiver (Net: Rs. 16,000)")

    # Spec 2: Duplicate admission prevention
    try:
        engine.admit_student("STU_BP_01", "Mamata Duplicate", "Barrackpore", 20000.0, 96.0)
        assert False
    except KeyError:
        print("   [PASS] Spec 2: Duplicate student ID rejected via KeyError")

    # Spec 3: Course grades submission and transcript generation with Distinction honors
    engine.submit_course_grade("STU_BP_01", "Python Mastery", 96.0)
    engine.submit_course_grade("STU_BP_01", "Automated Testing", 94.0)
    engine.submit_course_grade("STU_BP_01", "Data Structures", 92.0)

    transcript = engine.generate_transcript("STU_BP_01")
    assert transcript["student"] == "Mamata"
    assert transcript["courses_completed"] == 3
    assert transcript["gpa"] == 94.0
    assert transcript["honors"] == "DISTINCTION"
    assert transcript["status"] == "PASSED"
    print("   [PASS] Spec 3: Mamata transcript generated: 94.0 GPA with DISTINCTION")

    # Spec 4: Admit Mahima at Kolkata Campus with First Class honors
    mahima = engine.admit_student("STU_CC_02", "Mahima", "Kolkata", 15000.0, score=85.0)
    assert mahima["net_fee"] == 13500.0
    engine.submit_course_grade("STU_CC_02", "Python Mastery", 84.0)
    engine.submit_course_grade("STU_CC_02", "Automated Testing", 86.0)
    
    t_mahima = engine.generate_transcript("STU_CC_02")
    assert t_mahima["gpa"] == 85.0
    assert t_mahima["honors"] == "FIRST_CLASS"
    print("   [PASS] Spec 4: Mahima admitted at Kolkata: 85.0 GPA with FIRST_CLASS")

def main():
    print("=" * 80)
    print("[CASE STUDY] Complete Institutional Admission & Transcript Engine via TDD")
    print("=" * 80)

    run_institutional_tdd_suite()

    print("=" * 80)
    print("[TAKEAWAY] TDD guarantees that complex business domains are designed with")
    print("           clean modular boundaries, self-documenting APIs, and 100% test coverage.")
    print("=" * 80)

if __name__ == "__main__":
    main()
