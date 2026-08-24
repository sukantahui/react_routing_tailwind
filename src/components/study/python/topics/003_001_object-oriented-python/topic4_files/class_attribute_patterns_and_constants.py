# topic4_files/class_attribute_patterns_and_constants.py
# Module: 003_001_object-oriented-python
# Topic: Class attributes vs Instance attributes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: Production Design Patterns with Class Attributes
Demonstrates:
  1. Pattern 1: Domain Constants & Configuration Presets
  2. Pattern 2: Global Auto-Incrementing Sequence ID Generators
  3. Pattern 3: Centralized Class-Level Instance Registry & Garbage Collection
"""

from typing import List, Dict, ClassVar

class CertificateIssuer:
    """Demonstrates production usage of class attributes for tracking and constants."""

    # Pattern 1: Domain Constants (ClassVar annotation from typing)
    DEFAULT_EXPIRY_YEARS: ClassVar[int] = 3
    AUTHORIZED_ISSUER: ClassVar[str] = "Coder & AccoTax Educational Trust"
    
    # Pattern 2: Global Sequence Counter
    _sequence_counter: ClassVar[int] = 5000

    # Pattern 3: Centralized Registry tracking living instances
    _active_certificates: ClassVar[List['CertificateIssuer']] = []

    def __init__(self, student_name: str, course_name: str, grade: str):
        CertificateIssuer._sequence_counter += 1
        self.certificate_id = f"CERT-2026-{CertificateIssuer._sequence_counter}"
        self.student_name = student_name
        self.course_name = course_name
        self.grade = grade

        # Register instance in class-level registry:
        CertificateIssuer._active_certificates.append(self)

    @classmethod
    def get_total_certificates_issued(cls) -> int:
        return len(cls._active_certificates)

    def __str__(self) -> str:
        return (
            f"Certificate #{self.certificate_id} | Issued To: {self.student_name} | "
            f"Course: {self.course_name} (Grade: {self.grade}) | Issuer: {self.AUTHORIZED_ISSUER}"
        )


def demonstrate_class_patterns():
    print("=" * 70)
    print("CODER & ACCOTAX - PRODUCTION CLASS ATTRIBUTE PATTERNS")
    print("=" * 70)

    c1 = CertificateIssuer("Sourav Bhattacharya", "Python Pro Full-Stack", "A+")
    c2 = CertificateIssuer("Moumita Sen", "Data Analytics with Python", "A")
    c3 = CertificateIssuer("Kallol Das", "Financial Accounting & Tax", "A+")

    print("Issued Certificates Sample:")
    print(f"  * {c1}")
    print(f"  * {c2}")
    print(f"  * {c3}")

    print(f"\nTotal Active Certificates in Registry: {CertificateIssuer.get_total_certificates_issued()}")
    print("\n[PASSED] Production Class Attribute Patterns Demonstrated.")


if __name__ == "__main__":
    demonstrate_class_patterns()
