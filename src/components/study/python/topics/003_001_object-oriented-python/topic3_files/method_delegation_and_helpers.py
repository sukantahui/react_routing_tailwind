# topic3_files/method_delegation_and_helpers.py
# Module: 003_001_object-oriented-python
# Topic: Instance methods & the self parameter
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 3: Method Delegation, Internal Helpers & Method Callbacks
Demonstrates:
  1. Method delegation: Calling brother methods within the same class via `self.`
  2. The single-underscore `_helper_method(self)` internal private convention
  3. Passing bound instance methods as first-class callback callables
"""

from typing import List, Callable

class StudentAssessmentTracker:
    """Demonstrates internal method delegation and callback handlers."""

    def __init__(self, student_name: str):
        self.student_name = student_name
        self.scores: List[float] = []

    # =================================================================
    # INTERNAL HELPER METHOD (Prefixed with _ by convention)
    # =================================================================
    def _validate_score(self, score: float) -> bool:
        """Internal helper validating score boundaries."""
        return 0.0 <= score <= 100.0

    # =================================================================
    # PUBLIC METHOD DELEGATING TO HELPER
    # =================================================================
    def record_score(self, score: float) -> bool:
        if not self._validate_score(score):
            print(f"  [REJECTED] Invalid score for {self.student_name}: {score}")
            return False
        self.scores.append(score)
        print(f"  [RECORDED] {self.student_name}: +{score:.1f}")
        return True

    def calculate_gpa(self) -> float:
        if not self.scores:
            return 0.0
        return sum(self.scores) / len(self.scores)


def execute_audit_pipeline(callback_validator: Callable[[float], bool], marks_list: List[float]):
    """Higher-order function taking a bound method as a callback parameter."""
    print("Executing Batch Audit Pipeline via Passed Callback:")
    for mark in marks_list:
        is_valid = callback_validator(mark)
        print(f"  * Testing Mark {mark:<5} -> Valid: {is_valid}")


def demonstrate_delegation_and_callbacks():
    print("=" * 70)
    print("CODER & ACCOTAX - METHOD DELEGATION & CALLBACK PASSING")
    print("=" * 70)

    tracker = StudentAssessmentTracker("Souvik Paul")

    # 1. Method Delegation in Action
    tracker.record_score(88.5)
    tracker.record_score(92.0)
    tracker.record_score(150.0)  # Cleanly rejected by _validate_score

    print(f"\nFinal GPA: {tracker.calculate_gpa():.2f}")

    # 2. Passing Bound Method as Callback
    print("\nPassing `tracker._validate_score` bound method as higher-order argument:")
    sample_marks = [45.0, 99.0, -10.0, 105.0, 75.0]
    execute_audit_pipeline(tracker._validate_score, sample_marks)

    print("\n[PASSED] Method Delegation & Callback Passing Verified.")


if __name__ == "__main__":
    demonstrate_delegation_and_callbacks()
