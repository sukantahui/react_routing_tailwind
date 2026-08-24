# topic4_files/deserializing_custom_objects_with_object_hook.py
# Module: 003_004_working-with-json
# Topic: Handling custom Python objects with custom JSONEncoders & object_hook
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: Custom Object Deserialization with `object_hook`
Demonstrates:
  1. Using `object_hook` callback in `json.loads()` to reconstruct Python class instances
  2. Inspecting type discriminator metadata (`"__type__"`) to instantiate appropriate classes
  3. Restoring Dataclass and custom domain models with methods
"""

import json
from datetime import datetime
from decimal import Decimal
from typing import Set

class StudentRecord:
    """Domain model representing an enrolled student."""
    def __init__(self, student_id: str, name: str, fee_paid: Decimal, enrollment_dt: datetime, badges: Set[str]):
        self.student_id = student_id
        self.name = name
        self.fee_paid = fee_paid
        self.enrollment_dt = enrollment_dt
        self.badges = badges

    def calculate_scholarship_rebate(self, discount_pct: float) -> Decimal:
        """Domain business logic method."""
        return round(self.fee_paid * (Decimal(str(discount_pct)) / Decimal("100.0")), 2)

    def __repr__(self):
        return f"StudentRecord(id='{self.student_id}', name='{self.name}', fee={self.fee_paid}, badges={len(self.badges)})"


def student_domain_object_hook(dct: dict):
    """Callback function converting JSON dictionaries back into rich Python domain models."""
    if dct.get("__type__") == "StudentRecord":
        return StudentRecord(
            student_id=dct["student_id"],
            name=dct["name"],
            fee_paid=Decimal(str(dct["fee_paid"])),
            enrollment_dt=datetime.fromisoformat(dct["enrollment_dt"]),
            badges=set(dct["badges"])
        )
    return dct


def demonstrate_object_hook():
    print("=" * 70)
    print("CODER & ACCOTAX - DESERIALIZATION WITH `object_hook`")
    print("=" * 70)

    sample_json = """
    {
        "batch_id": "BATCH-2026-AI",
        "student": {
            "__type__": "StudentRecord",
            "student_id": "STU-101",
            "name": "Sourav Mukherjee",
            "fee_paid": 28500.50,
            "enrollment_dt": "2026-08-24T10:30:00",
            "badges": ["PYTHON_CORE", "AI_PRO", "DECORATORS_MASTER"]
        }
    }
    """

    # 1. Standard Deserialization (Yields generic dict):
    print("1. Standard `json.loads()` (Yields standard Python dict):")
    standard_doc = json.loads(sample_json)
    print(f"   * Student Type : {type(standard_doc['student']).__name__}")
    print(f"   * Raw Dict     : {standard_doc['student']}\n")

    # 2. Deserialization with `object_hook`:
    print("2. Deserializing with `object_hook=student_domain_object_hook`:")
    reconstructed_doc = json.loads(sample_json, object_hook=student_domain_object_hook)
    student_obj: StudentRecord = reconstructed_doc["student"]

    print(f"   * Student Type : {type(student_obj).__name__} (Custom Domain Class!)")
    print(f"   * Object Repr  : {student_obj}")
    print(f"   * Badges Type  : {type(student_obj.badges).__name__} ({student_obj.badges})")
    print(f"   * Fee Type     : {type(student_obj.fee_paid).__name__} (INR {student_obj.fee_paid})")

    # Calling domain methods on restored object:
    rebate = student_obj.calculate_scholarship_rebate(10.0)
    print(f"   * Invoked Method calculate_scholarship_rebate(10%): INR {rebate}")

    print("\n[PASSED] Custom Object Deserialization with object_hook Verified.")


if __name__ == "__main__":
    demonstrate_object_hook()
