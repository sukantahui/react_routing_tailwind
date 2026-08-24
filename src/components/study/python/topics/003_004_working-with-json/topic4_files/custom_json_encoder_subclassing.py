# topic4_files/custom_json_encoder_subclassing.py
# Module: 003_004_working-with-json
# Topic: Handling custom Python objects with custom JSONEncoders & object_hook
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 1: Custom JSONEncoder Subclassing (`default` method override)
Demonstrates:
  1. Subclassing `json.JSONEncoder` to handle domain-specific Python objects
  2. Overriding `default(self, o)` for `datetime`, `Decimal`, `UUID`, `set`, and custom classes
  3. Delegating to `super().default(o)` to preserve standard `TypeError` behavior
"""

import json
from datetime import datetime
from decimal import Decimal
import uuid
from typing import Set

class StudentRecord:
    """Domain model representing an enrolled student."""
    def __init__(self, student_id: str, name: str, fee_paid: Decimal, enrollment_dt: datetime, badges: Set[str]):
        self.student_id = student_id
        self.name = name
        self.fee_paid = fee_paid
        self.enrollment_dt = enrollment_dt
        self.badges = badges


class EnterpriseJSONEncoder(json.JSONEncoder):
    """Custom JSONEncoder supporting datetime, Decimal, UUID, sets, and domain objects."""
    def default(self, o):
        if isinstance(o, StudentRecord):
            return {
                "__type__": "StudentRecord",
                "student_id": o.student_id,
                "name": o.name,
                "fee_paid": o.fee_paid,          # Re-routed through default() for Decimal
                "enrollment_dt": o.enrollment_dt,  # Re-routed through default() for datetime
                "badges": o.badges               # Re-routed through default() for set
            }
        elif isinstance(o, datetime):
            return o.isoformat()
        elif isinstance(o, Decimal):
            return float(o)
        elif isinstance(o, uuid.UUID):
            return str(o)
        elif isinstance(o, set):
            return sorted(list(o))
        # Let base class raise TypeError for unsupported types:
        return super().default(o)


def demonstrate_custom_encoder():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM JSONENCODER SUBCLASS")
    print("=" * 70)

    student = StudentRecord(
        student_id="STU-101",
        name="Sourav Mukherjee",
        fee_paid=Decimal("28500.50"),
        enrollment_dt=datetime(2026, 8, 24, 10, 30, 0),
        badges={"PYTHON_CORE", "AI_PRO", "DECORATORS_MASTER"}
    )

    # 1. Without Custom Encoder: Fails with TypeError
    print("1. Standard `json.dumps()` (No Custom Encoder):")
    try:
        json.dumps(student)
    except TypeError as exc:
        print(f"   * [DEFAULT ERROR BLOCKED] : {exc}\n")

    # 2. With EnterpriseJSONEncoder:
    print("2. Serializing with `cls=EnterpriseJSONEncoder`:")
    serialized_json = json.dumps(student, cls=EnterpriseJSONEncoder, indent=2)
    print(serialized_json)

    print(r"""
JSONEncoder Subclassing Golden Rules:
  1. Subclass `json.JSONEncoder` and override `default(self, o)`.
  2. Return a serializable primitive (dict, list, str, int, float, bool, None).
  3. ALWAYS call `return super().default(o)` at the end to ensure proper TypeErrors!
""")
    print("[PASSED] Custom JSONEncoder Subclass Verified.")


if __name__ == "__main__":
    demonstrate_custom_encoder()
