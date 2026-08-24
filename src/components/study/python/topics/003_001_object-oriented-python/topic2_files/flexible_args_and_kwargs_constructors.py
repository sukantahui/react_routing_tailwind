# topic2_files/flexible_args_and_kwargs_constructors.py
# Module: 003_001_object-oriented-python
# Topic: Constructors & the __init__() method
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: Flexible Constructors (*args, **kwargs) & Alternative Constructors
Demonstrates:
  1. Accepting variable keyword arguments (**kwargs) in __init__
  2. The Pythonic pattern for Multiple Constructors: @classmethod factory methods
  3. Constructing objects from raw JSON / dictionary payloads vs individual parameters
"""

import json
from typing import Dict, Any

class StudentProfile:
    """Demonstrates standard instantiation and alternative classmethod constructors."""

    def __init__(self, student_id: str, name: str, email: str, **metadata):
        self.student_id = student_id
        self.name = name
        self.email = email
        self.metadata = metadata  # Stores arbitrary extra attributes (city, phone, etc.)

    # =================================================================
    # ALTERNATIVE CONSTRUCTOR 1: From a Dictionary / JSON Payload
    # =================================================================
    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        """Constructs a StudentProfile directly from a dictionary payload."""
        return cls(
            student_id=data.get("id", "UNASSIGNED"),
            name=data.get("full_name", "Anonymous"),
            email=data.get("email_address", "no-reply@codernaccotax.co.in"),
            city=data.get("city", "Barrackpore")
        )

    # =================================================================
    # ALTERNATIVE CONSTRUCTOR 2: From a Comma-Separated CSV String
    # =================================================================
    @classmethod
    def from_csv_string(cls, csv_line: str):
        """Constructs a StudentProfile from a raw CSV record."""
        parts = [p.strip() for p in csv_line.split(",")]
        return cls(student_id=parts[0], name=parts[1], email=parts[2])

    def __str__(self) -> str:
        meta_str = f" | Extra: {self.metadata}" if self.metadata else ""
        return f"StudentProfile[{self.student_id}]: {self.name} <{self.email}>{meta_str}"


def demonstrate_alternative_constructors():
    print("=" * 70)
    print("CODER & ACCOTAX - FLEXIBLE & ALTERNATIVE CONSTRUCTORS")
    print("=" * 70)

    # 1. Standard Constructor
    s1 = StudentProfile("STU-101", "Rohan Das", "rohan@gmail.com", phone="+91-9830011111", city="Kolkata")
    print("1. Created via Standard Constructor (__init__ with **kwargs):")
    print(f"   {s1}\n")

    # 2. From Dictionary
    raw_payload = {"id": "STU-102", "full_name": "Sampa Paul", "email_address": "sampa@yahoo.com", "city": "Barrackpore"}
    s2 = StudentProfile.from_dict(raw_payload)
    print("2. Created via Alternative Constructor (StudentProfile.from_dict):")
    print(f"   {s2}\n")

    # 3. From CSV String
    csv_data = "STU-103, Aniket Roy, aniket.roy@gmail.com"
    s3 = StudentProfile.from_csv_string(csv_data)
    print("3. Created via Alternative Constructor (StudentProfile.from_csv_string):")
    print(f"   {s3}")

    print("\n[PASSED] Flexible Constructors Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_alternative_constructors()
