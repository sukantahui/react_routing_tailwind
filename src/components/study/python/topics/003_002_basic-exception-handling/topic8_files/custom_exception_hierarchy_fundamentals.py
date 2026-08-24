# topic8_files/custom_exception_hierarchy_fundamentals.py
# Module: 003_002_basic-exception-handling
# Topic: Creating User-Defined Custom Exception Classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 1: Custom Exception Class Fundamentals & Hierarchies
Demonstrates:
  1. Creating custom user-defined exception classes by subclassing `Exception`
  2. Why you must inherit from `Exception` rather than `BaseException`
  3. Designing cohesive domain-specific exception hierarchies
"""

# =====================================================================
# 1. ROOT DOMAIN EXCEPTION (Base for all institute errors)
# =====================================================================
class CoderAccoTaxInstituteError(Exception):
    """Root base exception for all Coder & AccoTax domain errors.
    Allows callers to catch ANY institute error with a single except clause!
    """
    pass


# =====================================================================
# 2. SPECIALIZED SUB-HIERARCHIES
# =====================================================================
class AdmissionError(CoderAccoTaxInstituteError):
    """Base exception for enrollment and admission failures."""
    pass

class CourseQuotaExceededError(AdmissionError):
    """Raised when classroom seats are fully booked."""
    pass

class DuplicateEnrollmentError(AdmissionError):
    """Raised when a student attempts to enroll twice with the same ID."""
    pass


# =====================================================================
# 3. DOMAIN SERVICE IMPLEMENTATION
# =====================================================================
class ClassroomBatch:
    def __init__(self, course_name: str, max_capacity: int = 2):
        self.course_name = course_name
        self.max_capacity = max_capacity
        self.enrolled_students = []

    def enroll(self, student_id: str, student_name: str):
        if student_id in [s["id"] for s in self.enrolled_students]:
            raise DuplicateEnrollmentError(f"Student ID '{student_id}' is already enrolled in {self.course_name}!")

        if len(self.enrolled_students) >= self.max_capacity:
            raise CourseQuotaExceededError(f"Course '{self.course_name}' is FULL (Max capacity: {self.max_capacity} seats)!")

        self.enrolled_students.append({"id": student_id, "name": student_name})
        print(f"  [ENROLLED] {student_name} ({student_id}) -> {self.course_name}")


def demonstrate_custom_hierarchy():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM EXCEPTION CLASS HIERARCHY")
    print("=" * 70)

    batch = ClassroomBatch("Advanced Python & Cloud Architecture", max_capacity=2)

    # 1. Normal Admissions
    print("1. Enrolling initial 2 students:")
    batch.enroll("STU-101", "Sourav Mukherjee")
    batch.enroll("STU-102", "Priyanka Sen")

    # 2. Triggering DuplicateEnrollmentError
    print("\n2. Attempting Duplicate Enrollment (STU-101):")
    try:
        batch.enroll("STU-101", "Sourav Duplicate")
    except DuplicateEnrollmentError as err:
        print(f"   [CAUGHT SPECIFIC ERROR] DuplicateEnrollmentError: {err}")

    # 3. Triggering CourseQuotaExceededError
    print("\n3. Attempting to enroll 3rd student (Quota Full):")
    try:
        batch.enroll("STU-103", "Rahul Verma")
    except CourseQuotaExceededError as err:
        print(f"   [CAUGHT SPECIFIC ERROR] CourseQuotaExceededError: {err}")

    # 4. Catching via Root Domain Exception (Polymorphic Catching)
    print("\n4. Polymorphic Catching via Base `CoderAccoTaxInstituteError`:")
    try:
        batch.enroll("STU-104", "Debolina Roy")
    except CoderAccoTaxInstituteError as err:
        print(f"   [CAUGHT VIA ROOT DOMAIN BASE] {type(err).__name__}: {err}")

    print("\n[PASSED] Custom Exception Class Hierarchy Verified.")


if __name__ == "__main__":
    demonstrate_custom_hierarchy()
