# topic9_files/subsystem_exception_translation_layer.py
# Module: 003_002_basic-exception-handling
# Topic: Exception Chaining (raise ... from ...)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 3: Subsystem Exception Translation Layer Architecture
Demonstrates:
  1. The Subsystem Exception Translation pattern
  2. Translating low-level library/hardware errors into clean high-level domain exceptions
  3. Preserving root-cause telemetry for Sentry/Datadog and DevOps engineers
"""

from typing import Dict, Any

# High-Level Domain Exceptions
class StudentPortalServiceError(Exception):
    """Base domain exception for student portal microservices."""
    pass

class StudentRecordNotFoundError(StudentPortalServiceError):
    """High-level error raised when a requested student cannot be found."""
    pass

class FeePaymentProcessingError(StudentPortalServiceError):
    """High-level error raised when payment gateway operations fail."""
    pass


class MockDatabaseSubsystem:
    """Simulates a low-level key-value or SQL storage driver."""
    def __init__(self):
        self._raw_data = {
            "STU-101": {"name": "Sourav Mukherjee", "fee_balance": 5000.0}
        }

    def fetch_raw_row(self, key: str) -> Dict[str, Any]:
        # Raises low-level KeyError if row does not exist:
        return self._raw_data[key]


class StudentPortalService:
    """High-level application service translating low-level errors."""
    def __init__(self):
        self.db = MockDatabaseSubsystem()

    def get_student_profile(self, student_id: str) -> Dict[str, Any]:
        try:
            return self.db.fetch_raw_row(student_id)
        except KeyError as low_level_key_err:
            # TRANSLATE LOW-LEVEL KeyError -> HIGH-LEVEL StudentRecordNotFoundError
            raise StudentRecordNotFoundError(
                f"Student with registration ID '{student_id}' does not exist in Coder & AccoTax active registry!"
            ) from low_level_key_err


def demonstrate_translation_layer():
    print("=" * 70)
    print("CODER & ACCOTAX - SUBSYSTEM EXCEPTION TRANSLATION LAYER")
    print("=" * 70)

    service = StudentPortalService()

    # 1. Successful Query
    print("1. Fetching Existing Student Record (STU-101):")
    profile = service.get_student_profile("STU-101")
    print(f"   Record Found: {profile}\n")

    # 2. Triggering Translated Chained Error
    print("2. Fetching Non-Existent Student Record (STU-999):")
    try:
        service.get_student_profile("STU-999")
    except StudentRecordNotFoundError as domain_err:
        print(f"  [DOMAIN LEVEL ERROR]: {domain_err}")
        print(f"  [ORIGINAL ROOT CAUSE]: {type(domain_err.__cause__).__name__}: {domain_err.__cause__}")

    print(r"""
Architectural Benefits:
  1. Abstraction Boundary: Callers never need to know internal storage uses dicts, SQL, or MongoDB.
  2. Complete Traceability: DevOps can inspect `err.__cause__` to diagnose the exact low-level failure!
""")
    print("[PASSED] Subsystem Exception Translation Layer Verified.")


if __name__ == "__main__":
    demonstrate_translation_layer()
