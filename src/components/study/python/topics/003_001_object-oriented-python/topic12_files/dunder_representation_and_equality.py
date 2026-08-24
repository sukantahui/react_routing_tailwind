# topic12_files/dunder_representation_and_equality.py
# Module: 003_001_object-oriented-python
# Topic: Magic / Dunder Methods: __str__, __repr__, __len__, __eq__, __add__
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 1: String Representation, Equality & Total Ordering Dunders
Demonstrates:
  1. `__str__`: User-friendly informal string representation (called by `print()`, `str()`)
  2. `__repr__`: Unambiguous developer/debugger representation (eval-ready)
  3. `__eq__`, `__lt__` with `@functools.total_ordering` (auto-generates <=, >, >=)
  4. `__hash__`: Enabling objects as dictionary keys and set members
"""

from functools import total_ordering
from typing import Optional

@total_ordering
class StudentScoreRecord:
    """Demonstrates representation, comparison, and hashability dunders."""

    def __init__(self, student_id: str, full_name: str, score: float):
        self.student_id = student_id
        self.full_name = full_name
        self.score = float(score)

    # 1. USER-FRIENDLY STRING (print / str)
    def __str__(self) -> str:
        return f"{self.full_name} ({self.student_id}): {self.score:.1f}/100"

    # 2. DEVELOPER/DEBUGGER REPRESENTATION (Interactive REPL, logs, eval-ready)
    def __repr__(self) -> str:
        return f"StudentScoreRecord(student_id={self.student_id!r}, full_name={self.full_name!r}, score={self.score!r})"

    # 3. EQUALITY COMPARISON (==)
    def __eq__(self, other: object) -> bool:
        if isinstance(other, StudentScoreRecord):
            return self.student_id == other.student_id and self.score == other.score
        return False

    # 4. LESS-THAN COMPARISON (<) - @total_ordering auto-generates <=, >, >=
    def __lt__(self, other: object) -> bool:
        if isinstance(other, StudentScoreRecord):
            return self.score < other.score
        return NotImplemented

    # 5. HASHABILITY (__hash__)
    def __hash__(self) -> int:
        return hash((self.student_id, self.score))


def demonstrate_representation_and_equality():
    print("=" * 70)
    print("CODER & ACCOTAX - REPRESENTATION & COMPARISON DUNDERS")
    print("=" * 70)

    s1 = StudentScoreRecord("STU-101", "Sourav Mukherjee", 94.5)
    s2 = StudentScoreRecord("STU-102", "Priyanka Sen", 98.0)
    s3 = StudentScoreRecord("STU-101", "Sourav Mukherjee", 94.5)

    # 1. __str__ vs __repr__
    print(f"1. __str__  (User-Friendly) : {str(s1)}")
    print(f"   __repr__ (Eval-Ready)    : {repr(s1)}\n")

    # 2. __eq__ Equality Check
    print("2. Equality Comparisons (__eq__):")
    print(f"   s1 == s3 (Identical Data) : {s1 == s3}")
    print(f"   s1 == s2 (Different Data) : {s1 == s2}\n")

    # 3. Rich Comparisons (<, >, <=, >= via @total_ordering)
    print("3. Rich Comparisons (<, >, <=, >=):")
    print(f"   s1 < s2  : {s1 < s2} ({s1.score} < {s2.score})")
    print(f"   s1 > s2  : {s1 > s2}")
    print(f"   s1 <= s3 : {s1 <= s3}\n")

    # 4. Hashability in Sets and Dictionaries
    print("4. Hashability in Sets & Dicts (__hash__):")
    student_set = {s1, s2, s3}
    print(f"   Set contains {len(student_set)} unique records (s1 and s3 deduplicated!):")
    for rec in sorted(student_set):
        print(f"     * {rec}")

    print("\n[PASSED] Representation & Comparison Dunders Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_representation_and_equality()
