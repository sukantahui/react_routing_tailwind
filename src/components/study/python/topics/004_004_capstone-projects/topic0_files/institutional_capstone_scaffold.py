"""
# Module: 004_004_capstone-projects
# Topic 0: End-to-End project architecture & clean directory layout
# File: institutional_capstone_scaffold.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Production scaffolding and structure generator for the Multi-Campus
#              Student Management System across Barrackpore, Kolkata, Ichapur, and Jadavpur.
"""

from dataclasses import dataclass
from typing import Optional
import sqlite3

# ------------------------------------------------------------------------------
# 1. DOMAIN MODELS (models/student.py)
# ------------------------------------------------------------------------------
@dataclass
class Student:
    sid: str
    name: str
    campus: str
    course: str
    base_fee: float
    paid_fee: float = 0.0

    @property
    def balance(self) -> float:
        return self.base_fee - self.paid_fee

# ------------------------------------------------------------------------------
# 2. REPOSITORY LAYER (repositories/student_repo.py)
# ------------------------------------------------------------------------------
class SQLiteStudentRepository:
    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn
        self._init_db()

    def _init_db(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS students (
                    sid TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    campus TEXT NOT NULL,
                    course TEXT NOT NULL,
                    base_fee REAL NOT NULL,
                    paid_fee REAL NOT NULL
                )
            """)

    def save(self, student: Student):
        with self.conn:
            self.conn.execute("""
                INSERT OR REPLACE INTO students VALUES (?, ?, ?, ?, ?, ?)
            """, (student.sid, student.name, student.campus, student.course, student.base_fee, student.paid_fee))

    def get_by_id(self, sid: str) -> Optional[Student]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT sid, name, campus, course, base_fee, paid_fee FROM students WHERE sid = ?", (sid,))
        row = cursor.fetchone()
        if not row:
            return None
        return Student(*row)

# ------------------------------------------------------------------------------
# 3. SERVICE LAYER (services/admission_service.py)
# ------------------------------------------------------------------------------
class InstitutionalAdmissionService:
    def __init__(self, repo: SQLiteStudentRepository):
        self.repo = repo

    def enroll_new_student(self, sid: str, name: str, campus: str, course: str, fee: float) -> Student:
        existing = self.repo.get_by_id(sid)
        if existing:
            raise KeyError(f"Student ID '{sid}' already registered.")
        
        student = Student(sid, name, campus, course, fee, paid_fee=0.0)
        self.repo.save(student)
        return student

    def record_payment(self, sid: str, amount: float) -> float:
        student = self.repo.get_by_id(sid)
        if not student:
            raise KeyError(f"Student '{sid}' not found.")
        if amount <= 0:
            raise ValueError("Payment amount must be positive.")
        if amount > student.balance:
            raise ValueError("Payment exceeds remaining balance.")
            
        student.paid_fee += amount
        self.repo.save(student)
        return student.balance

# ------------------------------------------------------------------------------
# VERIFICATION SUITE
# ------------------------------------------------------------------------------
def test_institutional_scaffold():
    print("   [...] Testing Scaffolding Workflow: Models -> Repository -> Service...")
    
    # In-memory DB connection
    conn = sqlite3.connect(":memory:")
    repo = SQLiteStudentRepository(conn)
    service = InstitutionalAdmissionService(repo)

    # 1. Enroll Mamata at Barrackpore
    s1 = service.enroll_new_student("STU_BP_01", "Mamata", "Barrackpore", "Python Pro", 20000.0)
    assert s1.balance == 20000.0
    print("   [PASS] 1. Mamata enrolled via Service Layer (Saved to SQLite Repository)")

    # 2. Record Payment of Rs. 12,000
    rem = service.record_payment("STU_BP_01", 12000.0)
    assert rem == 8000.0
    print(f"   [PASS] 2. Payment recorded: New Balance = Rs. {rem:,.2f}")

    # 3. Verify persistence reload
    reloaded = repo.get_by_id("STU_BP_01")
    assert reloaded.paid_fee == 12000.0
    assert reloaded.balance == 8000.0
    print("   [PASS] 3. Database persistence verified across transactions")

def main():
    print("=" * 80)
    print("[CASE STUDY] Multi-Campus Scaffolding: Layered Architecture in Action")
    print("=" * 80)

    test_institutional_scaffold()

    print("=" * 80)
    print("[TAKEAWAY] Clean tiered architectures allow each layer to be developed,")
    print("           tested in isolation, and maintained with effortless scalability.")
    print("=" * 80)

if __name__ == "__main__":
    main()
