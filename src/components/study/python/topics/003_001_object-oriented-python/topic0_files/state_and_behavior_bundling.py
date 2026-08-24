# topic0_files/state_and_behavior_bundling.py
# Module: 003_001_object-oriented-python
# Topic: OOP Paradigm: Procedural vs Object-Oriented thinking
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: State & Behavior Cohesion (Self-Validating Entities)
Demonstrates:
  1. How OOP unifies data (attributes) and logic (methods) into cohesive units
  2. How methods guard invariants (e.g. temperature ranges, score limits 0-100)
  3. Eliminating scattered helper functions across different files
"""

from typing import List

class StudentScoreCard:
    """Self-validating student scorecard entity with encapsulated metrics."""

    def __init__(self, student_id: str, student_name: str):
        self.student_id = student_id
        self.student_name = student_name
        self._marks: List[float] = []

    def add_score(self, subject_marks: float) -> None:
        """Enforces invariant: marks must be strictly between 0 and 100."""
        if not (0.0 <= subject_marks <= 100.0):
            raise ValueError(f"Invalid marks: {subject_marks}. Must be between 0.0 and 100.0!")
        self._marks.append(float(subject_marks))
        print(f"  [SCORE ADDED] {self.student_name}: +{subject_marks:.1f}")

    def calculate_average(self) -> float:
        if not self._marks:
            return 0.0
        return sum(self._marks) / len(self._marks)

    def determine_grade(self) -> str:
        avg = self.calculate_average()
        if avg >= 90.0:
            return "A+ (Outstanding)"
        elif avg >= 75.0:
            return "A (Excellent)"
        elif avg >= 60.0:
            return "B (Good)"
        elif avg >= 40.0:
            return "C (Pass)"
        return "F (Needs Improvement)"

    def generate_report(self) -> str:
        return (
            f"Student: {self.student_name} (ID: {self.student_id}) | "
            f"Subjects: {len(self._marks)} | "
            f"Average: {self.calculate_average():.2f}% | "
            f"Grade: {self.determine_grade()}"
        )


def run_state_cohesion_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - STATE & BEHAVIOR BUNDLING DEMO")
    print("=" * 70)

    student = StudentScoreCard("STU-2026-01", "Sourav Mukherjee")
    student.add_score(88.0)
    student.add_score(94.5)
    student.add_score(91.0)

    print("\n--- GENERATED ACADEMIC REPORT ---")
    print(student.generate_report())

    print("\n[PASSED] State and Behavior Cohesion Verified.")


if __name__ == "__main__":
    run_state_cohesion_demo()
