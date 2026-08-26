"""
# Module: 004_004_capstone-projects
# Topic 1: Integrating SQLite / JSON persistence, OOP models, and business logic
# File: repository_pattern_crud_operations.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating the Repository Pattern for clean CRUD abstraction.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional
import sqlite3

# 1. DOMAIN MODEL
@dataclass
class StudentRecord:
    sid: str
    name: str
    campus: str
    gpa: float = 0.0

# 2. ABSTRACT REPOSITORY INTERFACE
class IStudentRepository(ABC):
    @abstractmethod
    def add(self, student: StudentRecord) -> None:
        pass

    @abstractmethod
    def get(self, sid: str) -> Optional[StudentRecord]:
        pass

    @abstractmethod
    def list_by_campus(self, campus: str) -> list[StudentRecord]:
        pass

    @abstractmethod
    def update_gpa(self, sid: str, new_gpa: float) -> bool:
        pass

# 3. SQLITE CONCRETE IMPLEMENTATION
class SQLiteStudentRepository(IStudentRepository):
    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn
        self._init_schema()

    def _init_schema(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS student_registry (
                    sid TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    campus TEXT NOT NULL,
                    gpa REAL DEFAULT 0.0
                );
            """)

    def add(self, student: StudentRecord) -> None:
        with self.conn:
            self.conn.execute(
                "INSERT INTO student_registry (sid, name, campus, gpa) VALUES (?, ?, ?, ?);",
                (student.sid, student.name, student.campus, student.gpa)
            )

    def get(self, sid: str) -> Optional[StudentRecord]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT sid, name, campus, gpa FROM student_registry WHERE sid = ?;", (sid,))
        row = cursor.fetchone()
        if not row:
            return None
        return StudentRecord(*row)

    def list_by_campus(self, campus: str) -> list[StudentRecord]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT sid, name, campus, gpa FROM student_registry WHERE campus = ? ORDER BY name ASC;", (campus,))
        return [StudentRecord(*row) for row in cursor.fetchall()]

    def update_gpa(self, sid: str, new_gpa: float) -> bool:
        with self.conn:
            cursor = self.conn.execute(
                "UPDATE student_registry SET gpa = ? WHERE sid = ?;",
                (new_gpa, sid)
            )
            return cursor.rowcount > 0

def test_repository_pattern():
    print("   [...] Testing Repository Pattern CRUD Abstraction...")
    conn = sqlite3.connect(":memory:")
    repo = SQLiteStudentRepository(conn)

    # 1. Add students across Barrackpore and Kolkata
    repo.add(StudentRecord("STU_BP_01", "Mamata", "Barrackpore", 94.5))
    repo.add(StudentRecord("STU_BP_02", "Abhronila", "Barrackpore", 92.0))
    repo.add(StudentRecord("STU_CC_01", "Mahima", "Kolkata", 88.0))
    print("   [PASS] 1. Students created in repository")

    # 2. Query by ID
    s = repo.get("STU_BP_01")
    assert s is not None and s.name == "Mamata"
    print(f"   [PASS] 2. Fetched by ID: {s.name} (GPA: {s.gpa})")

    # 3. Filter by Campus
    bp_students = repo.list_by_campus("Barrackpore")
    assert len(bp_students) == 2
    print(f"   [PASS] 3. Filtered Barrackpore students count: {len(bp_students)} (Mamata, Abhronila)")

    # 4. Update GPA
    updated = repo.update_gpa("STU_BP_01", 96.0)
    assert updated is True
    assert repo.get("STU_BP_01").gpa == 96.0
    print("   [PASS] 4. GPA updated to 96.0 successfully")

def main():
    print("=" * 75)
    print("[REPOSITORY PATTERN] Clean CRUD Decoupling from SQL")
    print("=" * 75)

    test_repository_pattern()

    print("=" * 75)
    print("[TAKEAWAY] The repository pattern allows business services to query")
    print("           data without writing a single line of SQL in business logic.")
    print("=" * 75)

if __name__ == "__main__":
    main()
