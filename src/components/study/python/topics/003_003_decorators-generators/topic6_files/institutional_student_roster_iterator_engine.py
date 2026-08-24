# topic6_files/institutional_student_roster_iterator_engine.py
# Module: 003_003_decorators-generators
# Topic: Iteration protocol: __iter__() and __next__()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 4: Institutional Student Roster Iterator Engine (Case Study)
Demonstrates:
  1. Implementing custom separation of Iterable container and dedicated Iterator class
  2. Supporting parameterized filtered iteration (e.g. only distinction or cleared students)
  3. Proper `StopIteration` raising and clean `for` loop consumption
"""

from typing import List, Dict, Any, Optional

class StudentRecord:
    def __init__(self, student_id: str, name: str, course: str, fee_due: float, score: float):
        self.student_id = student_id
        self.name = name
        self.course = course
        self.fee_due = fee_due
        self.score = score

    def __repr__(self):
        return f"<Student {self.student_id}: {self.name} (Due: INR {self.fee_due:,.2f})>"


class StudentRosterIterator:
    """Dedicated Iterator class holding iteration state across calls."""
    def __init__(self, records: List[StudentRecord], only_paid_cleared: bool = False):
        self._records = records
        self._only_paid_cleared = only_paid_cleared
        self._cursor = 0

    def __iter__(self):
        """Idempotence requirement: iterator returns itself."""
        return self

    def __next__(self) -> StudentRecord:
        """Finds and returns next eligible student or raises StopIteration."""
        while self._cursor < len(self._records):
            current_student = self._records[self._cursor]
            self._cursor += 1

            if self._only_paid_cleared:
                if current_student.fee_due == 0.0:
                    return current_student
                # Otherwise loop continues to next candidate
            else:
                return current_student

        # Reached end of records
        raise StopIteration("Student roster iteration complete.")


class ClassroomRoster:
    """Iterable container holding collection of student records."""
    def __init__(self, classroom_name: str):
        self.classroom_name = classroom_name
        self.students: List[StudentRecord] = []

    def add_student(self, student_id: str, name: str, course: str, fee_due: float, score: float):
        self.students.append(StudentRecord(student_id, name, course, fee_due, score))

    def __iter__(self):
        """Returns a fresh new iterator for standard iteration."""
        return StudentRosterIterator(self.students, only_paid_cleared=False)

    def cleared_only_iterator(self):
        """Returns a specialized iterator filtering for students with zero dues."""
        return StudentRosterIterator(self.students, only_paid_cleared=True)


def run_roster_iterator_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL STUDENT ROSTER ITERATOR ENGINE")
    print("=" * 70)

    # 1. Populate Classroom Roster:
    roster = ClassroomRoster("AI & Python Batch 2026 (Barrackpore)")
    roster.add_student("STU-101", "Sourav Mukherjee", "Python Full-Stack & AI", 0.0, 92.5)
    roster.add_student("STU-102", "Priyanka Sen", "Data Science", 5000.0, 88.0)
    roster.add_student("STU-103", "Rahul Verma", "Python Core", 0.0, 78.5)
    roster.add_student("STU-104", "Debolina Roy", "AI & ML", 12000.0, 85.0)

    # 2. Iterate all students using standard for loop:
    print("1. Standard Iteration (All Enrolled Students):")
    for s in roster:
        print(f"   * [{s.student_id}] {s.name:<18} | Due: INR {s.fee_due:>8,.2f} | Score: {s.score:.1f}%")

    # 3. Filtered Iteration (Only Fee Cleared Students):
    print("\n2. Filtered Iteration (Only Students with Zero Due Balance):")
    for s in roster.cleared_only_iterator():
        print(f"   * [CLEARED] {s.name} ({s.student_id}) | Eligible for Official Certificate")

    print("\n[PASSED] Student Roster Iterator Engine Verified.")


if __name__ == "__main__":
    run_roster_iterator_demo()
