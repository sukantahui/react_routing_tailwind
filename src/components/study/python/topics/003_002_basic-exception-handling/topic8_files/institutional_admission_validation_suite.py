# topic8_files/institutional_admission_validation_suite.py
# Module: 003_002_basic-exception-handling
# Topic: Creating User-Defined Custom Exception Classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 4: Enterprise Institutional Admission Validation Suite (Case Study)
Demonstrates:
  1. Complete domain exception hierarchy for educational admissions & billing
  2. Custom exception classes carrying domain payloads and error codes
  3. Safe multi-tiered error recovery and institutional reporting
"""

from typing import Dict, Any, List
import datetime as dt

# =====================================================================
# INSTITUTIONAL ADMISSION EXCEPTION HIERARCHY
# =====================================================================
class AdmissionPipelineError(Exception):
    """Base exception for all admission processing operations."""
    def __init__(self, message: str, error_code: str):
        self.error_code = error_code
        self.timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        super().__init__(f"[{error_code}] {message}")


class DuplicateStudentRecordError(AdmissionPipelineError):
    """Raised when an applicant with identical ID or PAN is already enrolled."""
    def __init__(self, student_id: str, existing_course: str):
        self.student_id = student_id
        self.existing_course = existing_course
        super().__init__(
            f"Student ID '{student_id}' is already enrolled in '{existing_course}'!",
            "ERR_DUPLICATE_APPLICANT"
        )


class CourseCapacityExceededError(AdmissionPipelineError):
    """Raised when batch seats are completely filled."""
    def __init__(self, course_code: str, max_capacity: int, waitlist_number: int):
        self.course_code = course_code
        self.max_capacity = max_capacity
        self.waitlist_number = waitlist_number
        super().__init__(
            f"Course '{course_code}' is FULL (Max: {max_capacity}). Assigned Waitlist #{waitlist_number}.",
            "ERR_CAPACITY_EXCEEDED"
        )


class TuitionSchemeViolationError(AdmissionPipelineError):
    """Raised when initial deposit is below institutional minimum threshold."""
    def __init__(self, course_code: str, min_required_fee: float, submitted_fee: float):
        self.course_code = course_code
        self.min_required_fee = min_required_fee
        self.submitted_fee = submitted_fee
        self.shortfall = min_required_fee - submitted_fee
        super().__init__(
            f"Minimum initial deposit for '{course_code}' is INR {min_required_fee:,.2f}. Submitted INR {submitted_fee:,.2f} (Shortfall: INR {self.shortfall:,.2f})",
            "ERR_TUITION_SCHEME_VIOLATION"
        )


# =====================================================================
# ADMISSION CONTROLLER
# =====================================================================
class InstitutionalAdmissionController:
    MIN_DEPOSIT_MAP = {
        "PY-ADV": 5000.0,
        "DATA-ENG": 8000.0,
        "AI-ML": 10000.0
    }

    def __init__(self, course_code: str, max_seats: int = 2):
        self.course_code = course_code
        self.max_seats = max_seats
        self.enrolled_roster: List[Dict[str, Any]] = []
        self.waitlist_count = 0

    def process_admission(self, student_id: str, name: str, deposit_fee: float) -> Dict[str, Any]:
        # Guard 1: Duplicate Check
        if any(s["id"] == student_id for s in self.enrolled_roster):
            raise DuplicateStudentRecordError(student_id, self.course_code)

        # Guard 2: Tuition Scheme Deposit Check
        min_fee = self.MIN_DEPOSIT_MAP.get(self.course_code, 5000.0)
        if deposit_fee < min_fee:
            raise TuitionSchemeViolationError(self.course_code, min_fee, deposit_fee)

        # Guard 3: Course Capacity Check
        if len(self.enrolled_roster) >= self.max_seats:
            self.waitlist_count += 1
            raise CourseCapacityExceededError(self.course_code, self.max_seats, self.waitlist_count)

        # Success: Record enrollment
        record = {
            "id": student_id,
            "name": name,
            "course": self.course_code,
            "deposit_paid": deposit_fee,
            "enrolled_at": dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.enrolled_roster.append(record)
        print(f"  [ADMISSION CONFIRMED] {name} ({student_id}) -> {self.course_code} (Deposit: INR {deposit_fee:,.2f})")
        return record


def run_admission_suite_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE ADMISSION VALIDATION SUITE")
    print("=" * 70)

    controller = InstitutionalAdmissionController("PY-ADV", max_seats=2)

    # 1. Successful Enrollments
    print("1. Enrolling initial 2 applicants:")
    controller.process_admission("STU-101", "Sourav Mukherjee", 6000.0)
    controller.process_admission("STU-102", "Priyanka Sen", 5000.0)

    # 2. Testing Tuition Scheme Violation
    print("\n2. Testing Underpaid Deposit (Submitted INR 2,000 for INR 5,000 min):")
    try:
        controller.process_admission("STU-103", "Rahul Verma", 2000.0)
    except TuitionSchemeViolationError as err:
        print(f"   [CAUGHT] {err}")
        print(f"   * Deficit Shortfall: INR {err.shortfall:,.2f}")

    # 3. Testing Capacity Exceeded (Waitlist Assignment)
    print("\n3. Testing Over-Capacity Applicant:")
    try:
        controller.process_admission("STU-104", "Debolina Roy", 7000.0)
    except CourseCapacityExceededError as err:
        print(f"   [CAUGHT] {err}")
        print(f"   * Assigned Waitlist Position: #{err.waitlist_number}")

    # 4. Testing Duplicate Student ID
    print("\n4. Testing Duplicate Enrollment (Re-submitting STU-101):")
    try:
        controller.process_admission("STU-101", "Sourav Duplicate", 8000.0)
    except DuplicateStudentRecordError as err:
        print(f"   [CAUGHT] {err}")

    print("\n[PASSED] Enterprise Admission Validation Suite Completed Successfully.")


if __name__ == "__main__":
    run_admission_suite_demo()
