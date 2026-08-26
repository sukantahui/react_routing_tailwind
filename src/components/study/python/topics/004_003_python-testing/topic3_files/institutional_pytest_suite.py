"""
# Module: 004_003_python-testing
# Topic 3: Modern testing with PyTest: test discovery, assert statements, fixtures
# File: institutional_pytest_suite.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus student admission and evaluation suite
#              built with modular PyTest function-scoped and module-scoped fixtures.
"""

class InstitutionalAdmissionEngine:
    def __init__(self):
        self.enrolled = {}
        self.transcripts = {}

    def admit_student(self, sid: str, name: str, campus: str, base_fee: float) -> dict:
        if sid in self.enrolled:
            raise KeyError(f"Student ID {sid} already registered.")
        record = {
            "sid": sid,
            "name": name,
            "campus": campus,
            "fee": base_fee,
            "status": "ACTIVE"
        }
        self.enrolled[sid] = record
        return record

    def record_grade(self, sid: str, course: str, score: float):
        if sid not in self.enrolled:
            raise KeyError(f"Student {sid} not found.")
        if sid not in self.transcripts:
            self.transcripts[sid] = {}
        self.transcripts[sid][course] = score

    def calculate_gpa(self, sid: str) -> float:
        if sid not in self.transcripts or not self.transcripts[sid]:
            return 0.0
        scores = list(self.transcripts[sid].values())
        return round(sum(scores) / len(scores), 2)

# ------------------------------------------------------------------------------
# PYTEST FIXTURES & TESTS
# ------------------------------------------------------------------------------
def get_fresh_engine():
    """Simulates @pytest.fixture."""
    return InstitutionalAdmissionEngine()

def test_student_admission_workflow():
    engine = get_fresh_engine()
    res = engine.admit_student("STU_BP_01", "Mamata", "Barrackpore", 15000.0)
    
    # Asserting dictionary contract
    assert res == {
        "sid": "STU_BP_01",
        "name": "Mamata",
        "campus": "Barrackpore",
        "fee": 15000.0,
        "status": "ACTIVE"
    }
    assert "STU_BP_01" in engine.enrolled
    print("   [PASS] test_student_admission_workflow")

def test_duplicate_admission_raises_key_error():
    engine = get_fresh_engine()
    engine.admit_student("STU_CC_02", "Mahima", "Kolkata", 12000.0)
    
    try:
        engine.admit_student("STU_CC_02", "Duplicate", "Kolkata", 10000.0)
        assert False, "Expected KeyError on duplicate ID"
    except KeyError as e:
        assert "already registered" in str(e)
        print("   [PASS] test_duplicate_admission_raises_key_error")

def test_transcript_gpa_calculation():
    engine = get_fresh_engine()
    engine.admit_student("STU_IC_03", "Abhronila", "Ichapur", 15000.0)
    
    engine.record_grade("STU_IC_03", "Python Pro", 95.0)
    engine.record_grade("STU_IC_03", "Data Science", 89.0)
    engine.record_grade("STU_IC_03", "DevOps", 92.0)
    
    gpa = engine.calculate_gpa("STU_IC_03")
    assert gpa == 92.0
    print("   [PASS] test_transcript_gpa_calculation (Abhronila 92.0 GPA verified)")

def main():
    print("=" * 80)
    print("[CASE STUDY] Modern Institutional PyTest Suite")
    print("=" * 80)

    test_student_admission_workflow()
    test_duplicate_admission_raises_key_error()
    test_transcript_gpa_calculation()

    print("=" * 80)
    print("[TAKEAWAY] PyTest allows writing clean, readable, modular tests that verify")
    print("           complex domain logic and exception contracts with minimal code.")
    print("=" * 80)

if __name__ == "__main__":
    main()
