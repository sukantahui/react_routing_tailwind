# topic12_files/smart_student_batch_ledger.py
# Module: 003_001_object-oriented-python
# Topic: Magic / Dunder Methods: __str__, __repr__, __len__, __eq__, __add__
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 4: Smart Student Batch Ledger (Production Case Study)
Demonstrates:
  1. Complete integration of core dunders: `__repr__`, `__str__`, `__len__`, `__getitem__`
  2. `__contains__`, `__iter__`, and `__add__` (merging batches into a super-batch)
  3. `__call__` for instant student lookup and status verification
"""

from typing import List, Dict, Optional, Union, Any

class StudentEnrollment:
    """Individual student record."""
    def __init__(self, student_id: str, name: str, fee_paid: float):
        self.student_id = student_id
        self.name = name
        self.fee_paid = float(fee_paid)

    def __repr__(self) -> str:
        return f"StudentEnrollment({self.student_id!r}, {self.name!r}, fee=INR {self.fee_paid:,.2f})"

    def __str__(self) -> str:
        return f"[{self.student_id}] {self.name} (Paid: INR {self.fee_paid:,.2f})"

    def __eq__(self, other: object) -> bool:
        if isinstance(other, StudentEnrollment):
            return self.student_id == other.student_id
        return False


class AcademicBatchLedger:
    """Production container representing an institutional classroom batch."""

    def __init__(self, batch_code: str, course_title: str):
        self.batch_code = batch_code
        self.course_title = course_title
        self._students: List[StudentEnrollment] = []

    def enroll(self, student: StudentEnrollment):
        if student not in self._students:
            self._students.append(student)
            print(f"  [ENROLLED] {student.name} -> Batch {self.batch_code}")

    # 1. STRING REPRESENTATIONS
    def __str__(self) -> str:
        return f"Batch [{self.batch_code}]: '{self.course_title}' ({len(self._students)} Students Enrolled)"

    def __repr__(self) -> str:
        return f"AcademicBatchLedger({self.batch_code!r}, {self.course_title!r})"

    # 2. SEQUENCE & CONTAINER PROTOCOLS
    def __len__(self) -> int:
        return len(self._students)

    def __getitem__(self, index: Union[int, slice]) -> Any:
        return self._students[index]

    def __contains__(self, query: Union[StudentEnrollment, str]) -> bool:
        if isinstance(query, StudentEnrollment):
            return query in self._students
        elif isinstance(query, str):
            q_lower = query.lower()
            return any(s.student_id.lower() == q_lower or q_lower in s.name.lower() for s in self._students)
        return False

    def __iter__(self):
        return iter(self._students)

    # 3. MERGING BATCHES VIA '+'
    def __add__(self, other: "AcademicBatchLedger") -> "AcademicBatchLedger":
        if not isinstance(other, AcademicBatchLedger):
            return NotImplemented
        merged = AcademicBatchLedger(f"{self.batch_code}+{other.batch_code}", f"{self.course_title} & {other.course_title}")
        merged._students = list(self._students)
        for s in other._students:
            if s not in merged._students:
                merged._students.append(s)
        return merged

    # 4. INSTANT SEARCH FUNCTOR VIA ()
    def __call__(self, student_name_or_id: str) -> Optional[StudentEnrollment]:
        """Allows calling `batch('Sourav')` directly to search for records!"""
        for s in self._students:
            if s.student_id.lower() == student_name_or_id.lower() or student_name_or_id.lower() in s.name.lower():
                return s
        return None


def run_batch_ledger_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - SMART BATCH LEDGER (DUNDER SUITE)")
    print("=" * 70)

    # 1. Create Batch A
    batch_a = AcademicBatchLedger("PY-2026-A", "Python Pro Full-Stack")
    batch_a.enroll(StudentEnrollment("STU-01", "Sourav Mukherjee", 18000.0))
    batch_a.enroll(StudentEnrollment("STU-02", "Priyanka Sen", 18000.0))

    # 2. Create Batch B
    batch_b = AcademicBatchLedger("PY-2026-B", "Data Engineering Track")
    batch_b.enroll(StudentEnrollment("STU-03", "Rahul Verma", 22000.0))
    batch_b.enroll(StudentEnrollment("STU-04", "Debolina Roy", 22000.0))

    print(f"\n1. __str__: {batch_a}")
    print(f"2. __len__: len(batch_a) = {len(batch_a)} students")
    print(f"3. __getitem__: batch_a[0] = {batch_a[0]}")
    print(f"4. __contains__: 'Priyanka' in batch_a -> {'Priyanka' in batch_a}")

    # 5. Merging Batches via __add__
    print("\n5. Merging Batches via '+' (__add__):")
    mega_batch = batch_a + batch_b
    print(f"   Mega Batch: {mega_batch}")
    print(f"   Total combined students: {len(mega_batch)}")

    # 6. Lookup Functor via __call__
    print("\n6. Calling batch directly like a function (`batch('Rahul')` via __call__):")
    found = mega_batch("Rahul")
    print(f"   Search Result: {found}")

    print("\n[PASSED] Smart Batch Ledger Dunder Suite Completed Successfully.")


if __name__ == "__main__":
    run_batch_ledger_demo()
